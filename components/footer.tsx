import Link from "next/link";
import { Instagram, Youtube, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-accent text-white py-10 mt-20">
      <div className="max-w-6xl mx-auto px-5 flex flex-col md:flex-row justify-between items-center">
        {/* Logo / Title */}
        <h2 className="text-lg font-bold mb-6 md:mb-0">
          Abike Recipe Blog
        </h2>

        {/* Social Links */}
        <div className="flex gap-6">
          <Link
            href="https://tiktok.com"
            target="_blank"
            className="hover:text-gray-400 transition-colors"
          >
            <Twitter className="w-6 h-6" />
          </Link>
          <Link
            href="https://instagram.com"
            target="_blank"
            className="hover:text-gray-400 transition-colors"
          >
            <Instagram className="w-6 h-6" />
          </Link>
          <Link
            href="https://youtube.com"
            target="_blank"
            className="hover:text-gray-400 transition-colors"
          >
            <Youtube className="w-6 h-6" />
          </Link>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="mt-6 text-center text-sm text-white">
        © {new Date().getFullYear()} Abike Recipe <Link href={'/admin'}>Blog</Link>. All rights reserved.
      </div>
    </footer>
  );
}
