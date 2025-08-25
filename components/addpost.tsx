"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function AddPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if(!title || !content || !imageUrl) {
      alert("Please fill in all fields");
      return
    }

    const { data, error } = await supabase
      .from("posts") // 👈 your table name
      .insert([
        {
          title: title,
          content: content,
          imageUrl: imageUrl,
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
  };

  return (
    <div className="">
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
  );
}
