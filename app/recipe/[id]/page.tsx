// app/recipe/[id]/page.tsx
import { supabase } from "@/lib/supabase";

interface Post {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  slug: string;
  created_at: string;
}

interface Props {
  params: { id: string };
}

// Fetch the post by ID
async function fetchPostById(id: string): Promise<Post | null> {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching post:", error.message);
    return null;
  }

  return data;
}

export default async function RecipePage({ params }: Props) {
  const post = await fetchPostById(params.id);

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <p>Post not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      {post.imageUrl && (
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full h-auto rounded-lg mb-6"
        />
      )}
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-700 mb-4">{post.content}</p>
      <p className="text-sm text-gray-500">
        Published on {new Date(post.created_at).toLocaleDateString()}
      </p>
    </div>
  );
}
