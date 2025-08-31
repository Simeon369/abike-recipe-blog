"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Button from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { User } from "@supabase/supabase-js";

export default function Navbar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      const currentUser = data.session?.user ?? null;
      setUser(currentUser);

      if (currentUser) {
        // check if user is admin
        const { data: profile } = await supabase
          .from("profiles")
          .select("is_admin")
          .eq("id", currentUser.id)
          .single();

        setIsAdmin(profile?.is_admin === true);
      }
    };
    getSession();

    // Listen for auth state changes
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        const currentUser = session?.user ?? null;
        setUser(currentUser);

        if (currentUser) {
          supabase
            .from("profiles")
            .select("is_admin")
            .eq("id", currentUser.id)
            .single()
            .then(({ data: profile }) => {
              setIsAdmin(profile?.is_admin === true);
            });
        } else {
          setIsAdmin(false);
        }
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
    setUser(null);
    setIsAdmin(false);
  };

  return (
    <nav className="w-full shadow-md bg-white fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-accent">
          Abike&apos;s Recipe Blog
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/" className="text-gray-700 hover:text-accent">
            Home
          </Link>
          <Link href="/recipes" className="text-gray-700 hover:text-accent">
            Recipes
          </Link>
          <Link href="/about" className="text-gray-700 hover:text-accent">
            About
          </Link>
          <Link href="/contact" className="text-gray-700 hover:text-accent">
            Contact
          </Link>

          {/* Show admin link only if admin */}
          {isAdmin && (
            <Link href="/admin" className="text-gray-700 hover:text-accent">
              Admin Dashboard
            </Link>
          )}

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            {!user ? (
              <>
                <Link href="/login">
                  <Button variant="outline" size="sm">
                    Login
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button size="sm" className="bg-accent text-white hover:bg-accent/80">
                    Sign Up
                  </Button>
                </Link>
              </>
            ) : (
              <Button
                size="sm"
                onClick={handleLogout}
                className="bg-red-500 text-white hover:bg-red-600"
              >
                Logout
              </Button>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button variant="ghost" size="sm" onClick={toggleMenu}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <div
        className={`md:hidden bg-white shadow-md overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col space-y-4 px-6 py-4">
          <Link href="/" className="text-gray-700 hover:text-accent" onClick={toggleMenu}>
            Home
          </Link>
          <Link href="/recipes" className="text-gray-700 hover:text-accent" onClick={toggleMenu}>
            Recipes
          </Link>
          <Link href="/about" className="text-gray-700 hover:text-accent" onClick={toggleMenu}>
            About
          </Link>
          <Link href="/contact" className="text-gray-700 hover:text-accent" onClick={toggleMenu}>
            Contact
          </Link>

          {/* Admin link (mobile) */}
          {isAdmin && (
            <Link href="/admin" className="text-gray-700 hover:text-accent" onClick={toggleMenu}>
              Admin Dashboard
            </Link>
          )}

          {/* Auth Buttons (Mobile) */}
          <div className="flex flex-col space-y-3 pt-4 border-t">
            {!user ? (
              <>
                <Link href="/login" onClick={toggleMenu}>
                  <Button variant="outline" size="sm" className="w-full">
                    Login
                  </Button>
                </Link>
                <Link href="/signup" onClick={toggleMenu}>
                  <Button size="sm" className="w-full bg-accent text-white hover:bg-accent/80">
                    Sign Up
                  </Button>
                </Link>
              </>
            ) : (
              <Button
                size="sm"
                onClick={() => {
                  handleLogout();
                  toggleMenu();
                }}
                className="w-full bg-red-500 text-white hover:bg-red-600"
              >
                Logout
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
