"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { adminDb } from "@/lib/firebase-admin";

// Helper to get Firebase user ID from cookies
async function getFirebaseUserId(): Promise<string | null> {
  try {
    const cookieStore = await cookies();
    const authCookie = cookieStore.get('firebase-auth');
    if (authCookie?.value) {
      const authData = JSON.parse(authCookie.value);
      return authData.uid || null;
    }
  } catch {}
  return null;
}

// Helper to get Firebase user data from cookies
async function getFirebaseUserData(): Promise<{ uid: string; displayName?: string; photoURL?: string } | null> {
  try {
    const cookieStore = await cookies();
    const authCookie = cookieStore.get('firebase-auth');
    if (authCookie?.value) {
      const authData = JSON.parse(authCookie.value);
      return authData || null;
    }
  } catch {}
  return null;
}

export type FeedPost = {
  id: string;
  title: string;
  body: string;
  votes: number;
  comments: number;
  author: string;
  authorName?: string;
  authorImage?: string;
  createdAt: number;
};

export type FeedComment = {
  id: string;
  postId: string;
  author: string;
  authorName?: string;
  authorImage?: string;
  body: string;
  createdAt: number;
};

async function assertRateLimit(kind: "post" | "comment") {
  const userId = await getFirebaseUserId();
  if (!userId) throw new Error("Unauthorized");
  const ref = adminDb.collection("ratelimits").doc(userId);
  const snap = await ref.get();
  const now = Date.now();
  const gap = 15_000; // 15s
  const data = snap.exists ? (snap.data() as any) : {};
  const last = kind === "post" ? data.lastPostAt || 0 : data.lastCommentAt || 0;
  if (now - last < gap) {
    throw new Error("Please wait a moment before posting again.");
  }
  await ref.set(
    kind === "post"
      ? { lastPostAt: now }
      : { lastCommentAt: now },
    { merge: true }
  );
}

export async function listPosts(
  limit: number = 10,
  sort: "latest" | "top" = "latest",
  cursor?: number
): Promise<FeedPost[]> {
  let q = adminDb.collection("posts") as FirebaseFirestore.Query;
  if (sort === "top") {
    q = q.orderBy("votes", "desc").orderBy("createdAt", "desc");
    if (cursor) q = q.where("votes", "<=", cursor);
  } else {
    q = q.orderBy("createdAt", "desc");
    if (cursor) q = q.where("createdAt", "<", cursor);
  }
  const snap = await q.limit(limit).get();
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) })) as FeedPost[];
}

export async function createPost(title: string, body: string) {
  const userId = await getFirebaseUserId();
  if (!userId) throw new Error("Unauthorized");
  await assertRateLimit("post");
  const userData = await getFirebaseUserData();
  const doc = await adminDb.collection("posts").add({
    title: title.trim(),
    body: body.trim(),
    votes: 0,
    comments: 0,
    author: userId,
    authorName: userData?.displayName || "User",
    authorImage: userData?.photoURL || null,
    createdAt: Date.now(),
  });
  revalidatePath("/feeds");
  return { id: doc.id };
}

export async function votePost(id: string, delta: number) {
  const userId = await getFirebaseUserId();
  if (!userId) throw new Error("Unauthorized");
  const ref = adminDb.collection("posts").doc(id);
  await adminDb.runTransaction(async (tx) => {
    const snap = await tx.get(ref);
    if (!snap.exists) return;
    const current = snap.data() as any;
    const nextVotes = (current.votes || 0) + delta;
    tx.update(ref, { votes: nextVotes });
  });
  revalidatePath("/feeds");
}

export async function deletePost(id: string) {
  const userId = await getFirebaseUserId();
  if (!userId) throw new Error("Unauthorized");
  const ref = adminDb.collection("posts").doc(id);
  const snap = await ref.get();
  if (!snap.exists) throw new Error("Not found");
  const data = snap.data() as any;
  if (data.author !== userId) throw new Error("Forbidden");
  // delete comments
  const commSnap = await ref.collection("comments").get();
  const batch = adminDb.batch();
  commSnap.docs.forEach((d) => batch.delete(d.ref));
  batch.delete(ref);
  await batch.commit();
  revalidatePath("/feeds");
}

export async function listComments(postId: string, limit: number = 50): Promise<FeedComment[]> {
  const snap = await adminDb
    .collection("posts").doc(postId)
    .collection("comments")
    .orderBy("createdAt", "asc")
    .limit(limit)
    .get();
  return snap.docs.map((d) => ({ id: d.id, postId, ...(d.data() as any) })) as FeedComment[];
}

export async function createComment(postId: string, body: string) {
  const userId = await getFirebaseUserId();
  if (!userId) throw new Error("Unauthorized");
  await assertRateLimit("comment");
  const userData = await getFirebaseUserData();
  const postRef = adminDb.collection("posts").doc(postId);
  const commentRef = postRef.collection("comments").doc();
  await adminDb.runTransaction(async (tx) => {
    const snap = await tx.get(postRef);
    if (!snap.exists) throw new Error("Post not found");
    const current = snap.data() as any;
    const nextComments = (current.comments || 0) + 1;
    tx.set(commentRef, {
      postId,
      author: userId,
      authorName: userData?.displayName || "User",
      authorImage: userData?.photoURL || null,
      body: body.trim(),
      createdAt: Date.now(),
    });
    tx.update(postRef, { comments: nextComments });
  });
  revalidatePath("/feeds");
}

export async function deleteComment(postId: string, commentId: string) {
  const userId = await getFirebaseUserId();
  if (!userId) throw new Error("Unauthorized");
  const postRef = adminDb.collection("posts").doc(postId);
  const commentRef = postRef.collection("comments").doc(commentId);
  await adminDb.runTransaction(async (tx) => {
    const cSnap = await tx.get(commentRef);
    if (!cSnap.exists) throw new Error("Not found");
    const cData = cSnap.data() as any;
    if (cData.author !== userId) throw new Error("Forbidden");
    tx.delete(commentRef);
    const pSnap = await tx.get(postRef);
    if (pSnap.exists) {
      const pData = pSnap.data() as any;
      tx.update(postRef, { comments: Math.max(0, (pData.comments || 1) - 1) });
    }
  });
  revalidatePath("/feeds");
} 