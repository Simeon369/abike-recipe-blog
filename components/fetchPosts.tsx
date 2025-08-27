import { supabase } from "@/lib/supabase";
import Link from "next/link";

interface Post {
  id: string;
  title: string;
  slug: string;
  description: string;
  image: string; // stored public URL or storage path
  prep_time: number;
  cook_time: number;
  ingredients: string[];
  instructions: string[];
  created_at: string;
}

export default async function FetchPosts() {
  // fetch posts directly on the server
  const { data: posts, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching posts:", error.message);
    return <p className="text-red-500">Failed to load posts.</p>;
  }

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
      {posts?.map((post) => (
        <Link
          href={`/recipes/${post.slug}`}
          key={post.id}
          className="shadow-lg bg-white rounded-xl hover:shadow-xl hover:scale-[1.01] transition-all"
        >
          <img
            className="rounded-t-xl w-full h-48 object-cover"
            src={post.image}   // ✅ FIXED: use "image" instead of "imageUrl"
            alt={post.title}
          />
          <div className="flex flex-col items-start p-4">
            <p className="text-xs text-gray-500">
              {changeDateFormat(post.created_at)}
            </p>
            <h1 className="text-lg font-bold">{post.title}</h1>
          </div>
        </Link>
      ))}
    </div>
  );
}
