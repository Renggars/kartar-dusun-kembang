import { CommentForm } from "@/components/CommentForm";
import About from "../components/About";
import Activities from "../components/Activities";
import ContactSection from "../components/ContactSection";
import Gallery from "../components/Gallery";
import Hero from "../components/Hero";
import Marketplace from "../components/Marketplace";
import StructurePage from "../components/Structure";

export default function Home() {
  return (
    <>
      <Hero />
      <Activities />
      <About />
      <StructurePage />
      <Gallery />
      <Marketplace limit={6} />
      <section
        id="contact"
        className="w-full bg-white text-gray-800 min-h-screen flex flex-col items-center justify-center py-20 px-6 sm:px-12 md:px-16 lg:px-24"
      >
        {/* Title Section */}
        <h2
          className="text-4xl md:text-5xl font-bold bg-linear-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent text-center mb-6"
          data-aos="fade-up"
        >
          Contact Us
        </h2>

        {/* Content Grid */}
        <div
          className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12  items-center"
          data-aos="fade-up"
          data-aos-delay="150"
        >
          <div className="flex justify-center">
            <ContactSection />
          </div>
          <div className="flex justify-center">
            <CommentForm />
          </div>
        </div>
      </section>
    </>
  );
}
