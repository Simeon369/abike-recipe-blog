// store/useEditPostStore.ts
import { create } from "zustand";

interface Post {
  id: string;
  title: string;
  slug: string;
  description: string;
  image: string; // Supabase Storage URL
  prepTime: number; // minutes
  cookTime: number; // minutes
  ingredients: string[]; // stored as array in DB
  instructions: string[]; // stored as array in DB
  created_at: string;
}

interface EditPostStore {
  editPost: Post | null;
  setEditPost: (post: Post | null) => void; // set or clear post
}

export const useEditPostStore = create<EditPostStore>((set) => ({
  editPost: null,
  setEditPost: (post) => set({ editPost: post }),
}));
