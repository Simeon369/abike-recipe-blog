// components/Navbar.tsx
"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import  Button  from "@/components/ui/button"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <nav className="w-full shadow-md bg-white fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-green-600">
          Abike&apos;s Recipe Blog
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-8">
          <Link href="/" className="text-gray-700 hover:text-green-600">
            Home
          </Link>
          <Link href="/recipes" className="text-gray-700 hover:text-green-600">
            Recipes
          </Link>
          <Link href="/about" className="text-gray-700 hover:text-green-600">
            About
          </Link>
          <Link href="/contact" className="text-gray-700 hover:text-green-600">
            Contact
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button variant="ghost" size="sm" onClick={toggleMenu}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md">
          <div className="flex flex-col space-y-4 px-6 py-4">
            <Link href="/" className="text-gray-700 hover:text-green-600" onClick={toggleMenu}>
              Home
            </Link>
            <Link href="/recipes" className="text-gray-700 hover:text-green-600" onClick={toggleMenu}>
              Recipes
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-green-600" onClick={toggleMenu}>
              About
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-green-600" onClick={toggleMenu}>
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
