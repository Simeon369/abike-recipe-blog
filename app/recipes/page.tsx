import FetchPosts from "@/components/fetchPosts";
import Navbar from "@/components/nav";
import Footer from "@/components/footer";

export default async function Recipes() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Navbar */}
      <header className="w-full fixed top-0 bg-white/70 backdrop-blur-md shadow-sm z-50">
        <Navbar />
      </header>

      {/* Hero Section */}
      <section className="pt-40 pb-16 px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800 mb-6">
          Delicious Recipes, Just for You 🍴
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          Explore a variety of recipes shared by Abike. Whether you’re craving something sweet, savory, or healthy — we’ve got you covered!
        </p>

        {/* Search Bar */}
        <div className="flex justify-center">
          <input
            type="text"
            placeholder="Search recipes..."
            className="w-full max-w-md px-4 py-3 rounded-2xl border border-gray-200 shadow-sm focus:ring-2 focus:ring-accent focus:outline-none"
          />
        </div>
      </section>

      {/* Recipes List */}
      <main className="flex-grow w-full px-6 pb-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-left">
            All Recipes
          </h2>
          <FetchPosts />
        </div>
      </main>
      <Footer />
    </div>
  );
}
