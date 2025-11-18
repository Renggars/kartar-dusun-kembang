import React from "react";
import ContactSection from "./ContactSection";
import { CommentForm } from "./CommentForm";

const Contact = () => {
  return (
    <section
      id="contact"
      className="w-full bg-gray-50 text-gray-800 min-h-screen flex flex-col items-center justify-center py-20 px-6 sm:px-12 md:px-16 lg:px-24"
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
        className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
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
  );
};

export default Contact;
