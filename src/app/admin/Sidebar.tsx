"use client";
import { useState } from "react";
import Link from "next/link";
import { FaHome } from "react-icons/fa";
import { FiUsers, FiImage } from "react-icons/fi";
import { LuNewspaper } from "react-icons/lu";
import { CiSettings } from "react-icons/ci";
import { MdMailOutline, MdOutlineDashboard } from "react-icons/md";
import { IoIosClose } from "react-icons/io";
import Image from "next/image";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [active, setActive] = useState("Dashboard");

  const menus = [
    {
      name: "Dashboard",
      icon: <MdOutlineDashboard size={18} />,
      href: "/admin/dashboard",
    },
    { name: "Hero Section", icon: <FaHome size={18} />, href: "/admin/hero" },
    {
      name: "Tentang Kami",
      icon: <FiUsers size={18} />,
      href: "/admin/tentang",
    },
    { name: "Pengurus", icon: <FiUsers size={18} />, href: "/admin/pengurus" },
    {
      name: "Program & Kegiatan",
      icon: <LuNewspaper size={18} />,
      href: "/admin/program",
    },
    {
      name: "Galeri Foto",
      icon: <FiImage size={18} />,
      href: "/admin/gallery",
    },
    {
      name: "Berita Terbaru",
      icon: <LuNewspaper size={18} />,
      href: "/admin/berita",
    },
    {
      name: "Pesan Masuk",
      icon: <MdMailOutline size={18} />,
      href: "/admin/pesan",
    },
    {
      name: "Pengaturan Website",
      icon: <CiSettings size={18} />,
      href: "/admin/pengaturan",
    },
  ];

  return (
    <aside
      className={`fixed md:static top-0 left-0 z-50 h-screen w-72 bg-blue-800 text-white flex flex-col transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}
    >
      {/* Header di sidebar */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-blue-700">
        <Image src="/logo.png" alt="Logo" width={40} height={40} />
        <h1 className="text-lg font-semibold">Admin Panel</h1>
      </div>

      {/* Tombol close (mobile only) */}
      <button
        onClick={onClose}
        className="md:hidden absolute top-4 right-4 p-1 rounded-md hover:bg-blue-700"
      >
        <IoIosClose size={22} />
      </button>

      {/* Menu navigasi */}
      <nav className="flex-1 overflow-y-auto mt-4 px-3 pb-6">
        {menus.map((menu) => (
          <Link
            key={menu.name}
            href={menu.href}
            onClick={() => {
              setActive(menu.name);
              onClose();
            }}
            className={`flex items-center gap-3 px-4 py-3 font-medium rounded-lg transition-colors 
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
