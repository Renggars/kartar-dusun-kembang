import Link from "next/link";
import { MdOutlineEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";

const ContactSection = () => {
  return (
    <section className="w-full bg-white lg:py-16">
      <div className="container mx-auto px-2 md:px-20">
        {/* Grid Layout */}
        <div className="grid grid-cols-1  gap-10 md:gap-16 items-start">
          {/* LEFT - MAPS (mobile first = tampil di atas) */}
          <div className="order-1 md:order-1">
            <h3 className="text-lg xl:text-2xl font-semibold text-gray-700 mb-4">
              Maps Location
            </h3>
            <div className="rounded-2xl overflow-hidden shadow-md">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d247.1455749731414!2d112.55946710810753!3d-7.647705125045891!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e78771b2f2e94b9%3A0x6a4cfad655a981bc!2s9H25%2BWVM%2C%20Kembang%2C%20Kembangbelor%2C%20Kec.%20Pacet%2C%20Kabupaten%20Mojokerto%2C%20Jawa%20Timur%2061374!5e0!3m2!1sid!2sid!4v1761446859089!5m2!1sid!2sid"
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-[200px] md:h-[300px] border-0"
              />
            </div>
          </div>

          {/* RIGHT - CONTACT INFO (mobile = tampil di bawah maps) */}
          <div className="order-2 md:order-2">
            <div className="space-y-6 text-gray-700">
              {/* Alamat */}
              <div>
                <h3 className="font-semibold text-gray-800 text-lg xl:text-2xl">
                  Our Location
                </h3>
                <p className="text-gray-600 leading-relaxed mt-1 ">
                  Dusun Kembang, Desa Kembang Belor, Kecamatan Pacet, Kabupaten
                  Mojokerto, Jawa Timur, 61374
                </p>

                <a
                  href="#"
                  className="inline-block bg-[#1581bc] text-white px-5 py-2 mt-4 rounded-full text-sm font-medium hover:bg-blue-500 transition"
                >
                  GET DIRECTIONS
                </a>
              </div>

              {/* Email */}
              <div className="flex items-center gap-3 text-[#1581bc]  hover:text-[#3BABEC] transition">
                <MdOutlineEmail className="text-2xl shrink-0" />
                <Link
                  href="mailto:info.ktdusunkembang@email.com"
                  className="text-lg font-semibold"
                >
                  info.ktdusunkembang@email.com
                </Link>
              </div>

              {/* Telepon */}
              <div className="flex items-center gap-3 text-[#1581bc] hover:text-[#3BABEC] transition">
                <FaPhoneAlt className="text-xl shrink-0" />
                <Link href="tel:0123456789" className="text-lg font-semibold">
                  +62 812-3456-7890 (Chat Only)
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
