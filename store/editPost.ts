// store/useEditPostStore.ts
import { create } from "zustand";

interface Post {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  slug: string;
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
