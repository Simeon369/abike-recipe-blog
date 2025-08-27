import { supabase } from "@/lib/supabase";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";

interface Post {
  id: string;
  title: string;
  description: string;
  image: string; // Supabase Storage URL
  prepTime: number; // minutes
  cookTime: number; // minutes
  ingredients: string[]; // stored as array in DB
  instructions: string[]; // stored as array in DB
  created_at: string;
}

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
    .single<Post>();

    console.log(data)

  if (error || !data) {
    return notFound();
  }

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
        {data.title}
        
      </h1>

      {/* Date */}
      <p className="text-sm text-gray-500 mb-8">
        {new Date(data.created_at).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>

      {/* Featured image */}
      {data.image && (
        <div className="mb-10 overflow-hidden rounded-2xl shadow-lg">
          <img
            src={data.image}
            alt={data.title}
            width={1200}
            height={600}
            className="w-full h-auto object-cover"
          />
        </div>
      )}

      {/* Description */}
      <p className="text-lg text-gray-700 mb-8">{data.description}</p>

      {/* Prep & Cook Times */}
      <div className="flex items-center gap-6 mb-10 text-gray-700">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-accent" />
          <span>Prep: {data.prepTime} mins</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-accent" />
          <span>Cook: {data.cookTime} mins</span>
        </div>
      </div>

      {/* Ingredients */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Ingredients</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          {data.ingredients.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </section>

      {/* Instructions */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Instructions</h2>
        <ol className="list-decimal list-inside space-y-3 text-gray-700 leading-relaxed">
          {data.instructions.map((step, idx) => (
            <li key={idx}>{step}</li>
          ))}
        </ol>
      </section>
    </article>
  );
}
