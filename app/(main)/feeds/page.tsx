"use client";

import { useEffect, useTransition, useState } from "react";
import { listPosts, createPost, votePost, listComments, createComment, deletePost, deleteComment, type FeedPost, type FeedComment } from "@/actions/feeds";

export default function FeedsPage() {
  const [posts, setPosts] = useState<FeedPost[]>([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [pending, start] = useTransition();
  const [openComments, setOpenComments] = useState<Record<string, boolean>>({});
  const [comments, setComments] = useState<Record<string, FeedComment[]>>({});
  const [commentDraft, setCommentDraft] = useState<Record<string, string>>({});
  const [error, setError] = useState<string>("");
  const [sort, setSort] = useState<"latest" | "top">("latest");
  const [cursor, setCursor] = useState<number | undefined>(undefined);

  useEffect(() => {
    load(true);
  }, [sort]);

  const load = (reset = false) => start(async () => {
    setError("");
    const page = await listPosts(10, sort, reset ? undefined : cursor);
    setPosts((prev) => (reset ? page : [...prev, ...page]));
    if (page.length > 0) {
      setCursor(sort === "top" ? page[page.length - 1].votes : page[page.length - 1].createdAt);
    }
  });

  const refresh = () => start(async () => setPosts(await listPosts(10, sort, undefined)));

  const onCreate = () => {
    if (!title.trim()) return;
    start(async () => {
      setError("");
      try {
        await createPost(title, body);
      } catch (e: any) {
        setError(e?.message || "Failed to post");
      }
      setTitle("");
      setBody("");
      await refresh();
      setCursor(undefined);
    });
  };

  const onVote = (id: string, delta: number) => {
    start(async () => {
      setError("");
      try { await votePost(id, delta); } catch {}
      await refresh();
      setCursor(undefined);
    });
  };

  const toggleComments = (postId: string) => {
    const isOpen = !!openComments[postId];
    if (!isOpen) {
      start(async () => {
        const list = await listComments(postId);
        setComments((prev) => ({ ...prev, [postId]: list }));
      });
    }
    setOpenComments((prev) => ({ ...prev, [postId]: !isOpen }));
  };

  const onCreateComment = (postId: string) => {
    const draft = (commentDraft[postId] || "").trim();
    if (!draft) return;
    start(async () => {
      setError("");
      try {
        await createComment(postId, draft);
        const list = await listComments(postId);
        setComments((prev) => ({ ...prev, [postId]: list }));
        await refresh();
      } catch (e: any) {
        setError(e?.message || "Failed to comment");
      }
      setCommentDraft((p) => ({ ...p, [postId]: "" }));
    });
  };

  const onDeletePost = (postId: string) => {
    start(async () => {
      setError("");
      try { await deletePost(postId); } catch (e: any) { setError(e?.message || "Failed to delete"); }
      await refresh();
      setCursor(undefined);
    });
  };

  const onDeleteComment = (postId: string, commentId: string) => {
    start(async () => {
      setError("");
      try { await deleteComment(postId, commentId); } catch (e: any) { setError(e?.message || "Failed to delete comment"); }
      const list = await listComments(postId);
      setComments((prev) => ({ ...prev, [postId]: list }));
      await refresh();
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <img src="/learn.svg" alt="Feeds" className="h-10 w-10" />
          <h1 className="text-3xl font-extrabold tracking-tight text-neutral-800">Feeds</h1>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-neutral-500">Sort</span>
          <select value={sort} onChange={(e) => setSort(e.target.value as any)} className="border rounded-md px-2 py-1 text-sm">
            <option value="latest">Latest</option>
            <option value="top">Top</option>
          </select>
        </div>
      </div>

      {error && (
        <div className="rounded-md border border-rose-300 bg-rose-50 text-rose-700 px-3 py-2 text-sm">{error}</div>
      )}

      {/* Composer */}
      <div className="rounded-2xl border-2 border-b-4 bg-white p-4">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ask a question or share a tip..."
          className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Add more details (optional)"
          className="mt-3 w-full rounded-md border px-3 py-2 h-24 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <div className="mt-3 flex justify-end">
          <button
            onClick={onCreate}
            disabled={pending}
            className="rounded-md bg-green-600 px-4 py-2 text-white font-semibold hover:bg-green-700 disabled:opacity-50"
          >
            {pending ? "Posting..." : "Post"}
          </button>
        </div>
      </div>

      {/* Feed list */}
      <div className="space-y-4">
        {posts.map((p) => (
          <article key={p.id} className="rounded-2xl border-2 border-b-4 bg-white p-4">
            <div className="flex items-start gap-4">
              <div className="flex flex-col items-center px-2 py-1 rounded-md bg-gray-50 border">
                <button className="text-neutral-500 hover:text-green-600" onClick={() => onVote(p.id, +1)}>▲</button>
                <div className="font-semibold text-neutral-700">{p.votes}</div>
                <button className="text-neutral-500 hover:text-rose-600" onClick={() => onVote(p.id, -1)}>▼</button>
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    {p.authorImage && (<img src={p.authorImage} alt="" className="h-7 w-7 rounded-full" />)}
                    <div>
                      <h3 className="text-lg font-bold text-neutral-800">{p.title}</h3>
                      <div className="text-xs text-neutral-500">by {p.authorName || p.author}</div>
                      {p.body && <p className="text-neutral-600 mt-1 leading-relaxed">{p.body}</p>}
                    </div>
                  </div>
                  <button onClick={() => onDeletePost(p.id)} className="text-sm text-rose-600 hover:text-rose-700">Delete</button>
                </div>
                <div className="mt-3 flex items-center gap-4 text-sm text-neutral-500">
                  <span>{new Date(p.createdAt).toLocaleString()}</span>
                  <span>•</span>
                  <button className="hover:text-neutral-700" onClick={() => toggleComments(p.id)}>
                    {openComments[p.id] ? "Hide" : "View"} comments ({p.comments})
                  </button>
                </div>

                {openComments[p.id] && (
                  <div className="mt-4 space-y-3">
                    <div className="flex gap-2">
                      <input
                        value={commentDraft[p.id] || ""}
                        onChange={(e) => setCommentDraft((prev) => ({ ...prev, [p.id]: e.target.value }))}
                        placeholder="Write a comment..."
                        className="flex-1 rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                      />
                      <button
                        onClick={() => onCreateComment(p.id)}
                        disabled={pending}
                        className="rounded-md bg-green-600 hover:bg-green-700 text-white px-3 py-2 text-sm font-semibold disabled:opacity-50"
                      >
                        {pending ? "Sending..." : "Send"}
                      </button>
                    </div>

                    <div className="space-y-2">
                      {(comments[p.id] || []).map((c) => (
                        <div key={c.id} className="border rounded-md p-2 bg-gray-50 flex items-start justify-between gap-3">
                          <div>
                            <div className="text-sm text-neutral-600">{c.body}</div>
                            <div className="text-xs text-neutral-400 mt-1">by {c.authorName || c.author} • {new Date(c.createdAt).toLocaleString()}</div>
                          </div>
                          <button onClick={() => onDeleteComment(p.id, c.id)} className="text-xs text-rose-600 hover:text-rose-700">Delete</button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="flex justify-center">
        <button onClick={() => load(false)} disabled={pending} className="rounded-md bg-gray-100 border px-3 py-2 text-sm hover:bg-gray-200 disabled:opacity-50">
          {pending ? "Loading..." : "Load more"}
        </button>
      </div>
    </div>
  );
} 
