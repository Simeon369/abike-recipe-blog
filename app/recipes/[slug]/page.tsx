"use client";

import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface Post {
  id: string;
  title: string;
  description: string;
  image: string; // Supabase Storage URL
  prepTime: number; // minutes
  cookTime: number; // minutes
  ingredients: string[];
  instructions: string[];
  created_at: string;
}

export default function BlogPostPage() {
  const { slug } = useParams(); // <-- works in client components
  const [post, setPost] = useState<Post>({
    id: "",
    title: "",
    description: "",
    image: "",
    prepTime: 0,
    cookTime: 0,
    ingredients: [],
    instructions: [],
    created_at: "",
  });

  useEffect(() => {
    if (!slug) return;

    const fetchPost = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      console.log("Session data:", session);

      if (!session?.user) {
        redirect("/login");
      }

      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("slug", slug)
        .single();

      if (error || !data) {
        notFound(); // ❌ won't work in client — instead, redirect or show error state
      } else {
        setPost(data);
      }
    };

    fetchPost();
  }, [slug]);

  // ✅ Get the current user session

  // if (!session?.user) {
  //   redirect("/login"); // force login
  // }

  // // ✅ Check if user is admin or public
  // const { data: profile } = await supabase
  //   .from("profiles")
  //   .select("is_admin, is_public")
  //   .eq("id", session.user.id)
  //   .single();

  // if (!profile || (!profile.is_admin && !profile.is_public)) {
  //   return notFound(); // deny access
  // }

  return (
    <article className="max-w-3xl mx-auto px-6 py-12">
      {/* Back to recipes */}
      <Link
        href="/recipes"
        className="inline-flex items-center text-gray-600 hover:text-accent transition mb-8 group"
      >
        <ArrowLeft className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" />
        <span className="font-medium">Back to Recipes</span>
      </Link>

      {/* Title */}
      <h1 className="text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
        {post.title}
      </h1>

      {/* Date */}
      <p className="text-sm text-gray-500 mb-8">
        {new Date(post.created_at).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>

      {/* Featured image */}
      {post.image && (
        <div className="mb-10 overflow-hidden rounded-2xl shadow-lg">
          <img
            src={post.image}
            alt={post.title}
            width={1200}
            height={600}
            className="w-full h-auto object-cover"
          />
        </div>
      )}

      {/* Description */}
      <p className="text-lg text-gray-700 mb-8">{post.description}</p>

      {/* Prep & Cook Times */}
      <div className="flex items-center gap-6 mb-10 text-gray-700">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-accent" />
          <span>Prep: {post.prepTime} mins</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-accent" />
          <span>Cook: {post.cookTime} mins</span>
        </div>
      </div>

      {/* Ingredients */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Ingredients</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          {post.ingredients.map((item: string, idx: number) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </section>

      {/* Instructions */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Instructions</h2>
        <ol className="list-decimal list-inside space-y-3 text-gray-700 leading-relaxed">
          {post.instructions.map((step: string, idx: number) => (
            <li key={idx}>{step}</li>
          ))}
        </ol>
      </section>
    </article>
  );
}
