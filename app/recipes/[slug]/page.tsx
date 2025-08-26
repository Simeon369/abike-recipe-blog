import { supabase } from "@/lib/supabase";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type Post = {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  slug: string;
  created_at: string;
};

type Props = {
  params: {
    slug: string;
  };
};

export default async function BlogPostPage({ params }: Props) {
  const { slug } = params;

  // fetch from supabase
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !data) {
    return notFound();
  }

  return (
    <article className="max-w-3xl mx-auto px-4 py-8">
      {/* Back to recipes */}
      <Link href="/recipes" className="flex items-center text-gray-600 hover:text-gray-900 mb-6">
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Recipes
      </Link>

      <h1 className="text-3xl font-bold mb-4">{data.title}</h1>
      <p className="text-sm text-gray-500 mb-6">
        {new Date(data.created_at).toLocaleDateString()}
      </p>
      {data.imageUrl && (
        <Image
          src={data.imageUrl}
          alt={data.title}
          width={200}
          height={200}
          className="rounded-lg mb-6"
        />
      )}
      <div className="prose prose-lg max-w-none">
        {data.content}
      </div>
    </article>
  );
}
