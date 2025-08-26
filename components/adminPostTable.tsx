"use client";

import { supabase } from "../lib/supabase";
import { useEffect, useState } from "react";
import Link from "next/link";
import deletePost from "../functions/deletePost";
import { postForm } from "@/store/store";
import { useEditPostStore } from "@/store/editPost";

type Post = {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  slug: string;
  created_at: string;
};

export default function PostsTable() {
  const [posts, setPosts] = useState<Post[]>([]);
  const {setEditPost} = useEditPostStore();
  const {isOpen, setIsOpen} = postForm();

  const handleDelete = async (id: string) => {
    const confirmed = confirm("Are you sure?");

    if (confirmed) {
      const success = await deletePost(id);
      if (success) {
        setPosts(posts.filter((post) => post.id !== id));
      } else {
        alert("Failed to delete the post. Please try again.");
      }
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error(error);
      } else if (data) {
        setPosts(data);
      }

      console.log(data);
    };
    fetchPosts();
  }, []);

  return (
    <div className="space-y-5 w-full">
      <h1 className=" uppercase font-bold text-3xl">Posts</h1>

      <div className="flex flex-col gap-3">
        {posts.map((post) => (
          <div key={post.id} className="flex w-full gap-3 items-center">
            <div className="flex gap-3 items-center">
              <img
                src={post.imageUrl}
                className="w-[70px] h-[70px] rounded-md"
                alt=""
              />
              <div onClick={() => {setIsOpen(true); setEditPost(post)}} className="cursor-pointer">
                <h1 className="font-bold">{post.title}</h1>
                <p className="text-sm text-gray-400">
                  {new Date(post.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>

            <button
              onClick={() => handleDelete(post.id)}
              className="ml-auto bg-red-500 text-white rounded-xl px-3 py-1"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
