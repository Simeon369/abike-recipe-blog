"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaYoutube, FaTwitter, FaTiktok, FaWhatsapp, FaEnvelope, FaPhone } from "react-icons/fa";
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

export default function Footer() {
  const [contact, setContact] = useState<Contact | null>(null);

  useEffect(() => {
    const fetchContacts = async () => {
      const { data, error } = await supabase.from("contacts").select("*").single();
      if (error) {
        console.error("Error fetching contacts:", error);
      } else {
        setContact(data);
      }
    };

    fetchContacts();
  }, []);

  if (!contact) return null;

  return (
    <footer className="w-full bg-accent text-white py-10 mt-20">
      <div className="max-w-6xl mx-auto px-5 flex flex-col md:flex-row justify-between items-center">
        {/* Logo / Title */}
        <h2 className="text-lg font-bold mb-6 md:mb-0">Abike Recipe Blog</h2>

        {/* Social Links */}
        <div className="flex gap-6">
          {contact.facebook && (
            <Link href={contact.facebook} target="_blank" className="hover:text-gray-400 transition-colors">
              <FaFacebookF size={24} />
            </Link>
          )}
          {contact.instagram && (
            <Link href={contact.instagram} target="_blank" className="hover:text-gray-400 transition-colors">
              <FaInstagram size={24} />
            </Link>
          )}
          {contact.youtube && (
            <Link href={contact.youtube} target="_blank" className="hover:text-gray-400 transition-colors">
              <FaYoutube size={24} />
            </Link>
          )}
          {contact.twitter && (
            <Link href={contact.twitter} target="_blank" className="hover:text-gray-400 transition-colors">
              <FaTwitter size={24} />
            </Link>
          )}
          {contact.tiktok && (
            <Link href={contact.tiktok} target="_blank" className="hover:text-gray-400 transition-colors">
              <FaTiktok size={24} />
            </Link>
          )}
          {contact.whatsapp && (
            <Link href={`https://wa.me/${contact.whatsapp}`} target="_blank" className="hover:text-gray-400 transition-colors">
              <FaWhatsapp size={24} />
            </Link>
          )}
        </div>

        
        
      </div>

      {/* Bottom Text */}
      <div className="mt-6 text-center text-sm text-white">
        © {new Date().getFullYear()} Abike Recipe <Link href={'/admin'}>Blog</Link>. All rights reserved.
      </div>
    </footer>
  );
}
