"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaShop } from "react-icons/fa6";

const navLinks = [
  { name: "Home", href: "#" },
  { name: "Activities", href: "#" },
  { name: "About", href: "#" },
  { name: "Structure", href: "#" },
  { name: "UMKM", href: "#" },
  { name: "Gallery", href: "#" },
  { name: "Marketplace", href: "#" },
  { name: "News", href: "#" },
  { name: "Contact", href: "#" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* NAVBAR ATAS */}
      <nav className="fixed top-0 left-0 z-50 w-full flex items-center justify-between px-4 sm:px-20 py-3">
        {/* Logo kiri */}
        <Link
          href="/"
          className="relative w-12 h-12 sm:w-16 sm:h-1 md:w-16 md:h-16"
        >
          <Image src="/logo.png" alt="Logo" fill className="object-contain" />
        </Link>

        {/* Kanan: Store + Hamburger */}
        <div className="flex items-center gap-2 xl:gap-3 sm:gap-5">
          <Link
            href="/marketplace"
            className="flex items-center gap-2 bg-lime-400 text-black font-bold px-2 xl:px-4 py-3 rounded-md hover:bg-lime-500 transition xl:text-2xl"
          >
            <FaShop className=":w-6 h-6" />
            STORE
          </Link>

          {/* Tombol menu */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="bg-gray-100 p-3 xl:p-4 rounded-md hover:bg-gray-200 transition"
          >
            {menuOpen ? (
              // Icon X
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-black"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              // Icon hamburger
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-black"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m0 6H4"
                />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* FULLSCREEN MENU OVERLAY */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-[#1e1e1c] text-white flex flex-col items-center justify-center gap-6 text-4xl font-bold">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="hover:text-lime-400 transition"
              onClick={() => setMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
