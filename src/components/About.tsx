"use client";

import Image from "next/image";

export default function About() {
  return (
    <div className="bg-white font-sans" id="about">
      <main className="flex flex-col md:flex-row min-h-screen">
        {/* Left side: Image Section */}
        <div className="w-full md:w-1/2 h-64 md:h-screen relative">
          {/* Using a standard img tag for broader compatibility.
              Tailwind classes are used to make the image cover the container.
          */}
          <Image
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070&auto=format&fit=crop"
            alt="Scenic mountain view with a person and a bicycle"
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
            width={2070}
            height={1380}
          />
        </div>

        {/* Right side: Content Section */}
        <div className="w-full md:w-1/2 bg-gray-50 flex items-center justify-center p-8 sm:p-12 md:p-16">
          <div className="max-w-lg w-full">
            {/* Main Title */}
            <h1 className="text-4xl md:text-5xl font-serif text-gray-800 leading-tight">
              Tentang Karang Taruna <br />
              <span className="font-bold">Dusun Kembang</span>
            </h1>

            {/* Content Sections */}
            <div className="mt-10 space-y-8">
              {/* Health Section */}
              <div>
                <h2 className="text-xl font-bold text-gray-900">VISI</h2>
                <p className="mt-3 text-gray-600 leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Dui vivamus arcu felis bibendum ut tristique et egestas quis.
                </p>
              </div>

              {/* Education Section */}
              <div>
                <h2 className="text-xl font-bold text-gray-900">MISI</h2>
                <p className="mt-3 text-gray-600 leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Dui vivamus arcu felis bibendum ut tristique et egestas quis.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
