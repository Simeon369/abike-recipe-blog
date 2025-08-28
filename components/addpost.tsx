"use client";

import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { postForm } from "@/store/store";
import { useEditPostStore } from "@/store/editPost";

// Helper functions remain unchanged...
async function uploadImage(file: File, userId: string) {
  const fileName = `${userId}-${Date.now()}-${file.name}`;
  const { data, error } = await supabase.storage
    .from("post-images")
    .upload(fileName, file);

  if (error) {
    console.error("Image upload error:", error.message);
    return null;
  }

  // return public URL
  const { data: publicUrl } = supabase.storage
    .from("post-images")
    .getPublicUrl(fileName);

  return publicUrl.publicUrl;
}

// 🔹 Helper: slug generator
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}
// uploadImage and generateSlug...

const inputClass =
  "w-full rounded-xl border border-gray-300 px-4 py-3 text-base shadow-sm outline-none placeholder-gray-400 focus:border-accent focus:ring-2 focus:ring-accent/40 transition";

export default function AddPost() {
  const { editPost, setEditPost } = useEditPostStore();
  const { isOpen, setIsOpen } = postForm();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [prepTime, setPrepTime] = useState<string>("");
  const [cookTime, setCookTime] = useState<string>("");
  const [ingredients, setIngredients] = useState<string>("");
  const [instructions, setInstructions] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (title) setSlug(generateSlug(title));
  }, [title]);

  useEffect(() => {
    if (editPost) {
      setTitle(editPost.title);
      setSlug(editPost.slug);
      setDescription(editPost.description);
      setPrepTime(editPost.prepTime?.toString() ?? "");
      setCookTime(editPost.cookTime?.toString() ?? "");
      setIngredients(editPost.ingredients.join("\n"));
      setInstructions(editPost.instructions.join("\n"));
    } else {
      setTitle("");
      setSlug("");
      setDescription("");
      setPrepTime("");
      setCookTime("");
      setIngredients("");
      setInstructions("");
      setImageFile(null);
    }
  }, [editPost]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !title ||
      !description ||
      !prepTime ||
      !cookTime ||
      !ingredients ||
      !instructions
    ) {
      alert("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      let imageUrl = editPost?.image || "";
      if (imageFile) {
        const uploaded = await uploadImage(imageFile, "user");
        if (!uploaded) {
          alert("Failed to upload image");
          setLoading(false);
          return;
        }
        imageUrl = uploaded;
      }

      if (!editPost) {
        const { error } = await supabase.from("posts").insert([
          {
            title,
            slug,
            description,
            prepTime: Number(prepTime),
            cookTime: Number(cookTime),
            ingredients: ingredients.split("\n"),
            instructions: instructions.split("\n"),
            image: imageUrl,
          },
        ]);
        if (error) throw error;
        alert("✅ Post added successfully!");
      } else {
        const { data, error } = await supabase
          .from("posts")
          .update({
            title,
            slug,
            description,
            prepTime: Number(prepTime),
            cookTime: Number(cookTime),
            ingredients: ingredients.split("\n"),
            instructions: instructions.split("\n"),
            image: imageUrl,
          })
          .eq("id", editPost.id);

        if (error) throw error;
        alert("✅ Post updated successfully!");
        setEditPost(data ? data[0] : null);
      }

      // Reset form
      setTitle("");
      setSlug("");
      setDescription("");
      setPrepTime("");
      setCookTime("");
      setIngredients("");
      setInstructions("");
      setImageFile(null);
      setIsOpen(false);
    } catch (error: any) {
      alert("Failed to submit post: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl flex flex-col items-center mx-auto mt-10 relative">
      {loading && (
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center z-50 rounded-2xl">
          <div className="loader border-t-4 border-white border-solid rounded-full w-12 h-12 animate-spin"></div>
        </div>
      )}

      {isOpen ? (
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-xl rounded-2xl p-8 flex flex-col gap-6 border border-gray-100 w-full"
        >
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
            {editPost ? "✏️ Edit Post" : "➕ Add New Post"}
          </h2>

          <input
            type="text"
            placeholder="Post title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={inputClass}
          />

          <input
            type="text"
            value={slug}
            readOnly
            className={inputClass + " bg-gray-100 text-gray-500 cursor-not-allowed"}
            placeholder="Slug (auto-generated)"
          />

          <textarea
            placeholder="Short description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className={inputClass}
          />

          <div className="flex gap-4">
            <input
              type="number"
              placeholder="Prep Time (mins)"
              value={prepTime}
              onChange={(e) => setPrepTime(e.target.value)}
              className={inputClass + " flex-1"}
            />
            <input
              type="number"
              placeholder="Cook Time (mins)"
              value={cookTime}
              onChange={(e) => setCookTime(e.target.value)}
              className={inputClass + " flex-1"}
            />
          </div>

          <textarea
            placeholder="Ingredients (one per line)"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            rows={4}
            className={inputClass}
          />

          <textarea
            placeholder="Instructions (one per line)"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            rows={6}
            className={inputClass}
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
            className="w-full text-gray-600 text-sm file:mr-4 file:py-2 file:px-4 
                       file:rounded-lg file:border-0 
                       file:text-sm file:font-semibold 
                       file:bg-accent file:text-white 
                       hover:file:bg-accent/90 cursor-pointer"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-accent text-white font-semibold rounded-xl py-3 transition hover:bg-accent/90 shadow-md disabled:opacity-50"
          >
            {loading ? "Uploading..." : editPost ? "Update Post ✨" : "Publish Post 🚀"}
          </button>
        </form>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="w-full max-w-sm mx-auto bg-accent text-white font-semibold rounded-xl py-3 px-6 transition hover:bg-accent/90 shadow-md"
        >
          ➕ Add a Post
        </button>
      )}

      {/* Loader CSS */}
      <style jsx>{`
        .loader {
          border-top-color: transparent;
          border-width: 4px;
        }
      `}</style>
    </div>
  );
}
