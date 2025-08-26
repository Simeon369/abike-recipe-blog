"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function AddPost() {
    const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-") // replace non-alphanumeric with "-"
    .replace(/^-+|-+$/g, "");   // remove starting/ending "-"
}

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !content || !imageUrl) {
      alert("Please fill in all fields");
      return;
    }

    const { data, error } = await supabase
      .from("posts") // 👈 your table name
      .insert([
        {
          title: title,
          content: content,
          imageUrl: imageUrl,
          slug: generateSlug(title),
        },
      ]);

    if (error) {
      console.error("Error inserting data:", error);
    } else {
      console.log("Inserted:", data);
    }

    setTitle("");
    setContent("");
    setImageUrl("");
    setIsAdding(false);
  };

  return (
    <div className="">

        {isAdding ? (
            <div>
          <form action="" className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          className="border border-black w-full rounded-lg px-2 "
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="border border-black w-full rounded-lg px-2 "
          name="content"
          rows={6}
          id=""
          placeholder="Blog Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <input
          className="border border-black w-full rounded-lg px-2 "
          type="text"
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <button className="border border-black rounded-lg" type="submit">
          Add Post
        </button>
      </form>
        </div>
        ) : (
            <button onClick={() => setIsAdding(true)} className="border border-black rounded-lg px-4 py-2">
                Add a post
            </button>
        )}
        
      
    </div>
  );
}
