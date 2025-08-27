"use client";

import { supabase } from "../lib/supabase";
import { useEffect, useState } from "react";
import deletePost from "../functions/deletePost";
import { postForm } from "@/store/store";
import { useEditPostStore } from "@/store/editPost";

interface Post {
  id: string;
  title: string;
  slug: string;
  description: string;
  image: string; // file path in Supabase Storage
  prepTime: number;
  cookTime: number;
  ingredients: string[];
  instructions: string[];
  created_at: string;
}

export default function PostsTable() {
  const [posts, setPosts] = useState<Post[]>([]);
  const { setEditPost } = useEditPostStore();
  const { setIsOpen } = postForm();

  const handleDelete = async (id: string) => {
    const confirmed = confirm("Are you sure you want to delete this post?");
    if (!confirmed) return;

    const success = await deletePost(id);
    if (success) {
      setPosts(posts.filter((post) => post.id !== id));
    } else {
      alert("Failed to delete the post. Please try again.");
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
        return;
      }

      // Map posts to include accessible image URL
      const postsWithUrls = await Promise.all(
        data.map(async (post: Post) => {
          if (post.image) {
            // // For public bucket
            // const { data: publicUrlData } = supabase.storage
            //   .from("post-images") // your bucket name
            //   .getPublicUrl(post.image);

            // // For private bucket, use createSignedUrl
            // // const { data: signedUrlData, error } = await supabase.storage
            // //   .from("post-images")
            // //   .createSignedUrl(post.image, 60); // expires in 60s
            // // if (error) console.error(error);
            // // const imageUrl = signedUrlData?.signedUrl || "";
            // console.log(publicUrlData.publicUrl, post.image);
            
            // const imageUrl = publicUrlData?.publicUrl || "";
            return { ...post, image: post.image };
          }
          return post;
        })
      );

      setPosts(postsWithUrls);
    };

    fetchPosts();
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">📋 Posts</h1>

      <div className="space-y-4">
        {posts.length === 0 ? (
          <p className="text-gray-500 text-center">No posts available yet.</p>
        ) : (
          posts.map((post) => (
            <div
              key={post.id}
              className="flex items-center gap-4 bg-white border border-gray-200 shadow-sm hover:shadow-md rounded-xl p-4 transition"
            >
              {/* Thumbnail */}
              {post.image ? (
                <img
                  src={post.image}
                  className="w-20 h-20 rounded-lg object-cover"
                  alt={post.title}
                />
              ) : (
                <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500 text-xs">
                  No Image
                </div>
              )}

              {/* Content */}
              <div
                onClick={() => {
                  setIsOpen(true);
                  setEditPost(post);
                }}
                className="cursor-pointer flex flex-col"
              >
                <h2 className="font-semibold text-lg text-gray-800 hover:text-accent transition">
                  {post.title}
                </h2>
                <p className="text-sm text-gray-500">
                  {new Date(post.created_at).toLocaleDateString()}
                </p>
              </div>

              {/* Delete button */}
              <button
                onClick={() => handleDelete(post.id)}
                className="ml-auto bg-red-500 hover:bg-red-600 text-white rounded-lg px-4 py-2 text-sm font-medium transition"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
