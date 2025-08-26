"use client";

import { supabase } from "../lib/supabase";
import { useEffect, useState } from "react";
import Link from "next/link";

type Post = {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  slug: string;
  created_at: string;
};

export default function FetchPosts() {
  const [posts, setPosts] = useState<Post[]>([]);

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

  const changeDateFormat = (timeStamp: string) => {
    const dateObj = new Date(timeStamp);
    const month = [
      "Jan","Feb","Mar","Apr","May","Jun",
      "Jul","Aug","Sep","Oct","Nov","Dec"
    ];
    return `${dateObj.getDate()} ${month[dateObj.getMonth()]} ${dateObj.getFullYear()}`;
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-10">
      {posts.map((post) => (
        <Link
          href={`/recipe/${post.slug}`}
          className="shadow-lg bg-white rounded-xl hover:shadow-xl hover:scale-[1.01] transition-all"
          key={post.id}
        >
          <img className="rounded-t-xl w-full h-48 object-cover" src={post.imageUrl} alt={post.title} />
          <div className="flex flex-col items-start p-4">
            <p className="text-xs">{changeDateFormat(post.created_at)}</p>
            <h1 className="text-lg font-bold">{post.title}</h1>
          </div>
        </Link>
      ))}
    </div>
  );
}
