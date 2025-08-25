"use client";

import { useState } from "react";

type Post = {
  id: string;
  title: string;
  body: string;
  votes: number;
  comments: number;
  author: string;
  createdAt: string;
};

export default function FeedsPage() {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: "1",
      title: "What's the difference between let, const, and var?",
      body: "I see these used in JS codebases. When should I use each?",
      votes: 42,
      comments: 12,
      author: "alex",
      createdAt: "2h",
    },
    {
      id: "2",
      title: "How do I center a div in CSS?",
      body: "Tried margin auto, flex, grid — what's the most robust pattern in 2025?",
      votes: 31,
      comments: 9,
      author: "mira",
      createdAt: "5h",
    },
  ]);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const addPost = () => {
    if (!title.trim()) return;
    const newPost: Post = {
      id: String(Date.now()),
      title: title.trim(),
      body: body.trim(),
      votes: 0,
      comments: 0,
      author: "you",
      createdAt: "now",
    };
    setPosts([newPost, ...posts]);
    setTitle("");
    setBody("");
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <img src="/learn.svg" alt="Feeds" className="h-10 w-10" />
        <h1 className="text-3xl font-extrabold tracking-tight text-neutral-800">Feeds</h1>
      </div>

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
            onClick={addPost}
            className="rounded-md bg-green-600 px-4 py-2 text-white font-semibold hover:bg-green-700"
          >
            Post
          </button>
        </div>
      </div>

      {/* Feed list */}
      <div className="space-y-4">
        {posts.map((p) => (
          <article key={p.id} className="rounded-2xl border-2 border-b-4 bg-white p-4">
            <div className="flex items-start gap-4">
              <div className="flex flex-col items-center px-2 py-1 rounded-md bg-gray-50 border">
                <button className="text-neutral-500 hover:text-green-600">▲</button>
                <div className="font-semibold text-neutral-700">{p.votes}</div>
                <button className="text-neutral-500 hover:text-rose-600">▼</button>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-neutral-800">{p.title}</h3>
                {p.body && <p className="text-neutral-600 mt-1 leading-relaxed">{p.body}</p>}
                <div className="mt-3 flex items-center gap-4 text-sm text-neutral-500">
                  <span>by {p.author}</span>
                  <span>•</span>
                  <span>{p.createdAt}</span>
                  <span>•</span>
                  <button className="hover:text-neutral-700">{p.comments} comments</button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
} 