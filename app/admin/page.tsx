"use client";

import AddPost from "@/components/addpost";
import Navbar from "@/components/nav";
import PostsTable from "@/components/adminPostTable";

export default function AdminPage() {
  return (
    <div className="flex flex-col items-center md:justify-center min-h-screen py-2">
      <Navbar />

      <div className="w-full md:max-w-[600px] mt-20 p-6 bg-white flex flex-col md:items-center space-y-5 rounded-lg">
        <h1 className="text-3xl font-bold">Admin Page</h1>
        <AddPost   />

        <PostsTable />
      </div>
    </div>
  );
}
