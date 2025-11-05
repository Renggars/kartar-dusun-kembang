"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import { Menu } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Overlay (mobile only) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-white bg-opacity-40 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Konten utama */}
      <div className="flex-1 flex flex-col">
        <header className="md:hidden fixed top-0 left-0 right-0 flex items-center justify-between px-4 py-3 bg-blue-800 text-white shadow z-30">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-md bg-blue-700 hover:bg-blue-600 transition-colors"
          >
            <Menu size={22} />
          </button>
          <h1 className="text-lg font-semibold">Admin Panel</h1>
        </header>

        {/* Main content */}
        <main className="flex-1 p-6 mt-12">{children}</main>
      </div>
    </div>
  );
}
