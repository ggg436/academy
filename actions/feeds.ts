"use server";

import { revalidatePath } from "next/cache";

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

// Stub implementation

export async function listPosts(
	limit: number = 10,
	sort: "latest" | "top" = "latest",
	cursor?: number
): Promise<FeedPost[]> {
	return [];
}

export async function createPost(title: string, body: string) {
	const user = { id: "guest", imageUrl: "/mascot.svg", firstName: "Guest" };

	// TODO: Implement with Neon
	console.log("createPost stub");

	revalidatePath("/feeds");
	return { id: "stub-id" };
}

export async function votePost(id: string, delta: number) {
	const user = { id: "guest" };
	// Stub
	revalidatePath("/feeds");
}

export async function deletePost(id: string) {
	const user = { id: "guest" };
	// Stub
	revalidatePath("/feeds");
}

export async function listComments(postId: string, limit: number = 50): Promise<FeedComment[]> {
	return [];
}

export async function createComment(postId: string, body: string) {
	const user = { id: "guest" };
	// Stub
	revalidatePath("/feeds");
}

export async function deleteComment(postId: string, commentId: string) {
	const user = { id: "guest" };
	// Stub
	revalidatePath("/feeds");
}