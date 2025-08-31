import { create } from "zustand";

interface useState {
  userStoreId: any;
  setUserStoreId: (value: any) => void;
}

export const userIdState = create<useState>((set) => ({
  userStoreId: null,
  setUserStoreId: (value) => set({ userStoreId: value }),
}));