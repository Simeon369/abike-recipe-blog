
import FetchPosts from "@/components/fetchPosts";
import Navbar from "@/components/nav";


export default async function Home() {
  return (
    <div className="flex flex-col">
      <header className="w-full">
        <Navbar />
      </header>

      <main className="w-full flex flex-col pt-40 py-14 px-5 items-center text-center">
        <h1 className="text-5xl font-bold mb-20 hero">
          Welcome to Abike&apos;s Recipe Blog
        </h1>

        <FetchPosts />
      </main>
    </div>
  );
}
