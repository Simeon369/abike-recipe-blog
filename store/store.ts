import { create } from "zustand";

//postform store

interface useState {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export const postForm = create<useState>((set) => ({
  isOpen: false,
  setIsOpen: (value) => set({ isOpen: value }),
}));