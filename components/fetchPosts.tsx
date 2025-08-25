"use client";

import { supabase } from "../lib/supabase";
import { useEffect, useState } from "react";

export default function FetchPosts() {
  const [posts, setPosts] = useState<any[] | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data: posts } = await supabase.from("posts").select("*");
      setPosts(posts);
      console.log(posts);
    };
    fetchPosts();
  }, []);

  const changeDateFormat = (timeStamp: any) => {
    const dateObj = new Date(timeStamp);
    const month = ['Jan', 'Feb', 'Mar','Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    const formatted = `${dateObj.getDate()} ${month[dateObj.getMonth()]} ${dateObj.getFullYear()}`;

    return formatted

  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      {posts?.map((post, index) => (
        <div className="shadow-lg bg-white rounded-xl hover:shadow-xl hover:scale-[1.01] transition-all  " key={index}>
          <img className="rounded-t-xl" src={post.imageUrl} alt={post.title} />
          <div className="flex flex-col items-start p-4 py-4">
            <p className="text-xs">{changeDateFormat(post.created_at)}</p>
            <h1 className="text-lg font-bold">{post.title}</h1>
          </div>
        </div>
      ))}
    </div>
  );
}
