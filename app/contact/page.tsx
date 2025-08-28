"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/nav";
import Footer from "@/components/footer";
import Button from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textArea";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaTwitter, FaWhatsapp, FaTiktok, FaEnvelope, FaPhone, FaYoutube } from "react-icons/fa";
import { supabase } from "@/lib/supabase";

type Contact = {
  facebook?: string | null;
  youtube?: string | null;
  instagram?: string | null;
  whatsapp?: string | null;
  tiktok?: string | null;
  twitter?: string | null;
  email?: string | null;
  phoneNumber?: string | null;
};

export default function Contact() {
  const [contact, setContact] = useState<Contact | null>(null);

  useEffect(() => {
    const fetchContacts = async () => {
      const { data, error } = await supabase.from("contacts").select("*").single();
      if (error) console.error("Error fetching contacts:", error);
      else setContact(data);
    };
    fetchContacts();
  }, []);

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
          {contact?.email && (
            <p className="flex items-center gap-2">
              <FaEnvelope /> {contact.email}
            </p>
          )}
          {contact?.phoneNumber && (
            <p className="flex items-center gap-2">
              <FaPhone /> {contact.phoneNumber}
            </p>
          )}
        </div>

        {/* Social Links */}
        <div className="flex gap-6 mt-10">
          {contact?.instagram && (
            <Link href={contact.instagram} target="_blank" className="hover:text-pink-500 transition-colors">
              <FaInstagram size={24} />
            </Link>
          )}
          {contact?.twitter && (
            <Link href={contact.twitter} target="_blank" className="hover:text-blue-500 transition-colors">
              <FaTwitter size={24} />
            </Link>
          )}
          {contact?.facebook && (
            <Link href={contact.facebook} target="_blank" className="hover:text-blue-700 transition-colors">
              <FaFacebookF size={24} />
            </Link>
          )}
          {contact?.youtube && (
            <Link href={contact.youtube} target="_blank" className="hover:text-red-600 transition-colors">
              <FaYoutube size={24} />
            </Link>
          )}
          {contact?.tiktok && (
            <Link href={contact.tiktok} target="_blank" className="hover:text-black transition-colors">
              <FaTiktok size={24} />
            </Link>
          )}
          {contact?.whatsapp && (
            <Link href={`https://wa.me/${contact.whatsapp}`} target="_blank" className="hover:text-green-500 transition-colors">
              <FaWhatsapp size={24} />
            </Link>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
