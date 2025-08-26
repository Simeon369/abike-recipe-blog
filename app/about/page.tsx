import Navbar from "@/components/nav";
import Footer from "@/components/footer";

export default function About() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-background to-muted/20">
      <header className="w-full">
        <Navbar />
      </header>

      <main className="w-full flex flex-col pt-32 pb-20 px-6 items-center text-center max-w-3xl mx-auto">
        <h1 className="text-5xl font-bold mb-6 text-primary">About Abike&apos;s Recipe Blog</h1>
        <p className="text-lg text-muted-foreground leading-relaxed mb-10">
          Abike&apos;s Recipe Blog was created to share the love of food and the joy of cooking. 
          Here, you’ll find a mix of traditional favorites, modern twists, and easy-to-follow recipes 
          that bring warmth to every kitchen. Whether you’re a seasoned cook or just starting out, 
          our mission is to inspire creativity and make cooking fun and approachable.
        </p>

        <div className="grid gap-8 md:grid-cols-2 w-full">
          <div className="p-6 rounded-2xl bg-card shadow hover:shadow-lg transition">
            <h2 className="text-2xl font-semibold mb-3 text-primary">Our Mission</h2>
            <p className="text-muted-foreground text-base leading-relaxed">
              To bring people together through food by offering recipes that are 
              simple, delicious, and filled with culture and love.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-card shadow hover:shadow-lg transition">
            <h2 className="text-2xl font-semibold mb-3 text-primary">Why This Blog?</h2>
            <p className="text-muted-foreground text-base leading-relaxed">
              Cooking is more than just making meals—it&apos;s about memories, 
              creativity, and connection. This blog is a space to share those 
              experiences with the world.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
