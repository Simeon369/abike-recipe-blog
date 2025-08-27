'use client';

import AddPost from "@/components/addpost";
import Navbar from "@/components/nav";
import PostsTable from "@/components/adminPostTable";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";


export default function AdminPage() {
 const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const userId = searchParams.get("userId");

  useEffect(() => {
    const checkAdmin = async () => {
      if (!userId) {
        router.push("/login");
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("is_admin")
        .eq("id", userId)
        .single();

      if (profile?.is_admin === true) {
        setIsAdmin(true);
      } else {
        router.push("/");
      }
      setLoading(false);
    };

    checkAdmin();
  }, [userId, router]);

  if (loading) return <p>Loading...</p>;
  if (!isAdmin) return null;

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
