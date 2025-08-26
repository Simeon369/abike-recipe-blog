"use client";

import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { postForm } from "@/store/store";
import { useEditPostStore } from "@/store/editPost";

export default function AddPost() {
  const { editPost, setEditPost } = useEditPostStore();
  const { isOpen, setIsOpen } = postForm();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  // Load editPost into form when it changes
  useEffect(() => {
    if (editPost) {
      setTitle(editPost.title);
      setContent(editPost.content);
      setImageUrl(editPost.imageUrl);
    } else {
      setTitle("");
      setContent("");
      setImageUrl("");
    }
  }, [editPost]);

  // Helper: generate slug from title
  function generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !content || !imageUrl) {
      alert("Please fill in all fields");
      return;
    }

    if (!editPost) {
      // Create new post
      const { data, error } = await supabase.from("posts").insert([
        {
          title,
          content,
          imageUrl,
          slug: generateSlug(title),
        },
      ]);

      if (error) {
        console.error("Error inserting post:", error);
        alert("Failed to add post");
      } else {
        console.log("Inserted:", data);
        alert("Post added successfully!");
      }

      setTitle("");
      setContent("");
      setImageUrl("");
      setIsOpen(false);
    } else {
      // Update existing post
      const { data, error } = await supabase
        .from("posts")
        .update({ title, content, imageUrl })
        .eq("id", editPost.id);

      if (error) {
        console.error("Error updating post:", error.message);
        alert("Failed to update post.");
      } else {
        alert("Post updated successfully!");
        setEditPost(data ? data[0] : null); // update Zustand store
        setIsOpen(false);
      }
    }
  };

  return (
    <div>
      {isOpen ? (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-black w-full rounded-lg px-2"
          />
          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={6}
            className="border border-black w-full rounded-lg px-2"
          />
          <input
            type="text"
            placeholder="Image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="border border-black w-full rounded-lg px-2"
          />
          <button
            type="submit"
            className="border border-black rounded-lg px-4 py-2"
          >
            {editPost ? "Update Post" : "Add Post"}
          </button>
        </form>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="border border-black rounded-lg px-4 py-2"
        >
          Add a Post
        </button>
      )}
    </div>
  );
}
