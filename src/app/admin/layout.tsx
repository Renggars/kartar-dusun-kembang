"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import { IoIosMenu } from "react-icons/io";
import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Overlay (mobile only) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Konten utama */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Header (mobile) */}
        <header className="md:hidden fixed top-0 left-0 right-0 flex items-center justify-between px-4 py-3 bg-[#1581bc] text-white shadow z-30">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-md bg-gray-800 hover:bg-gray-900 transition-colors cursor-pointer"
          >
            <IoIosMenu size={22} />
          </button>
          <Link href={"/admin/dashboard"} className="text-lg font-semibold">
            Admin Panel
          </Link>
        </header>

        {/* Main content scrollable */}
        <main className="flex-1 overflow-y-auto mt-12 md:mt-0">{children}</main>
      </div>
    </div>
  );
}
