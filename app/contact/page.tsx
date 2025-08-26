import Navbar from "@/components/nav";
import Button from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textArea";
import { Mail, Phone, Instagram, Twitter, Facebook } from "lucide-react";
import Link from "next/link";
import Footer from "@/components/footer";

export default function Contact() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="w-full">
        <Navbar />
      </header>

      <main className="w-full flex flex-col pt-40 py-14 px-5 items-center text-center">
        <h1 className="text-5xl font-bold mb-10">Get in Touch</h1>
        <p className="text-lg text-gray-600 mb-12 max-w-xl">
          Have questions, suggestions, or just want to say hi?  
          Fill out the form below or reach out via social media.
        </p>

        {/* Contact Form */}
        <form className="w-full max-w-md flex flex-col gap-4 text-left">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <Input type="text" placeholder="Your name" required />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <Input type="email" placeholder="you@example.com" required />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Message</label>
            <Textarea placeholder="Write your message..." rows={4} required />
          </div>

          <Button type="submit" className="w-full mt-4">
            Send Message
          </Button>
        </form>

        {/* Contact Info */}
        <div className="flex flex-col items-center mt-16 gap-3 text-gray-700">
          <p className="flex items-center gap-2">
            <Mail className="w-5 h-5" /> abike@example.com
          </p>
          <p className="flex items-center gap-2">
            <Phone className="w-5 h-5" /> +234 800 123 4567
          </p>
        </div>

        {/* Social Links */}
        <div className="flex gap-6 mt-10">
          <Link href="https://instagram.com" target="_blank" className="hover:text-pink-500 transition-colors">
            <Instagram className="w-6 h-6" />
          </Link>
          <Link href="https://twitter.com" target="_blank" className="hover:text-blue-500 transition-colors">
            <Twitter className="w-6 h-6" />
          </Link>
          <Link href="https://facebook.com" target="_blank" className="hover:text-blue-700 transition-colors">
            <Facebook className="w-6 h-6" />
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
