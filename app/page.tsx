import Image from "next/image";
import { supabase } from "../lib/supabase";
import FetchPosts from "@/components/fetchPosts";

export default async function Home() {
  return (
    <div className="w-full h-screen flex flex-col py-14 items-center text-center">
      <h1 className="text-5xl font-bold mb-20 hero">Welcome to Abike's Recipe Blog</h1>

      <FetchPosts />
    </div>
  );
}
