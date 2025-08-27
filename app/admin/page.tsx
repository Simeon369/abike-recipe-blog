// app/admin/page.tsx  (no 'use client')

import AddPost from "@/components/addpost";
import Navbar from "@/components/nav";
import PostsTable from "@/components/adminPostTable";
import { redirect } from "next/navigation";
import { supabase } from "@/lib/supabase";

interface Props {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function AdminPage({ searchParams }: Props) {
  const userId = searchParams.userId as string | undefined;

  if (!userId) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", userId)
    .single();

  if (!profile?.is_admin) {
    redirect("/");
  }

  return (
    <div className="flex flex-col items-center md:justify-center min-h-screen py-2">
      <Navbar />

      <div className="w-full md:max-w-[600px] mt-20 p-6 bg-white flex flex-col md:items-center space-y-5 rounded-lg">
        <h1 className="text-3xl font-bold">Admin Page</h1>
        <AddPost />
        <PostsTable />
      </div>
    </div>
  );
}
