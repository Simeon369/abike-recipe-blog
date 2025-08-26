// app/page.tsx
"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/nav";
import { supabase } from "@/lib/supabase";
import Footer from "@/components/footer";

interface Post {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  slug: string;
  created_at: string;
}

export default function Home() {
  const [recipes, setRecipes] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(3);

      if (error) {
        console.error("Error fetching recipes:", error.message);
      } else {
        setRecipes(data || []);
      }
      setLoading(false);
    };

    fetchRecipes();
  }, []);

  return (
    <div className="flex flex-col">
      {/* Navbar */}
      <header className="w-full">
        <Navbar />
      </header>

      {/* Hero Section */}
      <main className="w-full flex flex-col items-center text-center py-20 pt-28 px-6 md:px-16 lg:px-32">
        <section className="relative w-full h-[400px] md:h-[500px] bg-gray-50 flex items-center justify-center rounded-lg overflow-hidden mb-16">
          
          <div className="relative text-center text-black px-4">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 hero">
              Welcome to Abike&apos;s Recipe Blog
            </h1>
            <p className="text-lg md:text-xl mb-6">
              Simple, delicious, and inspiring meals — straight from our kitchen to yours.
            </p>
            <a
              href="#recipe"
              className="bg-accent hover:bg-accent/80 px-6 py-3 text-white rounded-lg font-semibold transition"
            >
              Explore Recipes
            </a>
          </div>
        </section>

        {/* Categories Section */}
        <section className="mb-16 w-full text-left">
          <h2 className="text-2xl font-bold mb-6">Categories</h2>
          <div className="flex flex-wrap gap-4">
            {["Breakfast", "Lunch", "Dinner", "Desserts"].map((cat) => (
              <div
                key={cat}
                className="px-4 py-2 rounded-full bg-gradient-to-r from-accent/20 to-accent font-semibold cursor-pointer hover:scale-105 transition"
              >
                {cat}
              </div>
            ))}
          </div>
        </section>

        {/* Featured Recipes */}
        <section id="recipes" className="mb-16 w-full">
          <h2 className="text-2xl font-bold mb-6">Latest Recipes</h2>
          {loading ? (
            <p>Loading recipes...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recipes.map((recipe) => (
                <a
                  href={`/recipe/${recipe.slug}`}
                  key={recipe.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition"
                >
                  {recipe.imageUrl && (
                    <img
                      src={recipe.imageUrl}
                      alt={recipe.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-4 text-left">
                    <h3 className="text-xl font-bold mb-2">{recipe.title}</h3>
                    <p className="text-gray-600 line-clamp-2">{new Date(recipe.created_at).toLocaleDateString()}</p>
                  </div>
                </a>
              ))}
            </div>
          )}
        </section>

        {/* Newsletter CTA */}
        <section className="bg-gray-50 rounded-lg p-8 text-center mb-16 w-full">
          <h2 className="text-2xl font-bold mb-4">Join Our Community</h2>
          <p className="mb-6 text-gray-700">
            Get weekly recipes delivered straight to your inbox.
          </p>
          <form className="flex flex-col sm:flex-row justify-center gap-4 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 border border-gray-300 rounded-lg flex-1"
            />
            <button
              type="submit"
              className="bg-accent hover:bg-accent/80 text-white px-6 py-2 rounded-lg font-semibold transition"
            >
              Subscribe
            </button>
          </form>
        </section>
      </main>
      <Footer />
    </div>
  );
}
