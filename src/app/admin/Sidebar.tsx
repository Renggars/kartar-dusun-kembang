"use client";
import { useState } from "react";
import Link from "next/link";
import {
  Home,
  Image,
  Users,
  Settings,
  LayoutDashboard,
  Newspaper,
  Mail,
} from "lucide-react";

export default function Sidebar() {
  const [active, setActive] = useState("Dashboard");

  const menus = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard size={18} />,
      href: "/admin/dashboard",
    },
    { name: "Hero Section", icon: <Home size={18} />, href: "/admin/hero" },
    { name: "Tentang Kami", icon: <Users size={18} />, href: "/admin/tentang" },
    { name: "Pengurus", icon: <Users size={18} />, href: "/admin/pengurus" },
    {
      name: "Program & Kegiatan",
      icon: <Newspaper size={18} />,
      href: "/admin/program",
    },
    { name: "Galeri Foto", icon: <Image size={18} />, href: "/admin/gallery" },
    {
      name: "Berita Terbaru",
      icon: <Newspaper size={18} />,
      href: "/admin/berita",
    },
    { name: "Pesan Masuk", icon: <Mail size={18} />, href: "/admin/pesan" },
    {
      name: "Pengaturan Website",
      icon: <Settings size={18} />,
      href: "/admin/pengaturan",
    },
  ];

  return (
    <aside className="w-72 h-screen bg-blue-800 text-white flex flex-col px-5">
      <Link
        className="flex items-center gap-3 px-5 py-4 border-b border-blue-700"
        href="/"
      >
        <img src="/logo.png" alt="Logo" className="w-10 h-10" />
        <h1 className="text-lg font-semibold">Admin Panel</h1>
      </Link>

      <nav className="flex-1 overflow-y-auto mt-4">
        {menus.map((menu) => (
          <Link
            key={menu.name}
            href={menu.href}
            onClick={() => setActive(menu.name)}
            className={`flex items-center gap-3 px-6 py-3 font-medium cursor-pointer transition-colors mt-2 rounded-xl
              ${active === menu.name ? "bg-blue-600" : "hover:bg-blue-700"}
            `}
          >
            {menu.icon}
            {menu.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
