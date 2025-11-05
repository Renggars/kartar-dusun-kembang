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
  X,
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
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
    <aside
      className={`fixed md:static z-50 top-0 left-0 h-screen w-72 bg-blue-800 text-white flex flex-col px-5 transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}
    >
      {/* Header di sidebar (desktop) */}
      <div className="hidden md:flex items-center gap-3 px-5 py-4 border-b border-blue-700">
        <img src="/logo.png" alt="Logo" className="w-10 h-10" />
        <h1 className="text-lg font-semibold">Admin Panel</h1>
      </div>

      {/* Tombol close (mobile only) */}
      <div className="flex md:hidden items-center justify-between py-4 px-3 border-b border-blue-700">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Logo" className="w-8 h-8" />
          <h1 className="font-semibold text-white">Menu</h1>
        </div>
        <button onClick={onClose}>
          <X size={22} />
        </button>
      </div>

      {/* Menu navigasi */}
      <nav className="flex-1 overflow-y-auto mt-4">
        {menus.map((menu) => (
          <Link
            key={menu.name}
            href={menu.href}
            onClick={() => {
              setActive(menu.name);
              onClose(); // auto close di mobile
            }}
            className={`flex items-center gap-3 px-6 py-3 font-medium rounded-xl mt-2 transition-colors 
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
