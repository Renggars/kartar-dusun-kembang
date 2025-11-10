"use client";

import { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";

export default function AosInitializer() {
  useEffect(() => {
    Aos.init({
      once: true, // animasi hanya jalan sekali
      startEvent: "load", // mulai begitu page selesai load
      offset: 0, // animasi jalan walau elemen sudah di layar
      duration: 800, // durasi animasi
      easing: "ease-in-out", // efek transisi
    });

    Aos.refresh(); // paksa refresh posisi elemen
  }, []);

  // Komponen ini tidak perlu me-render apapun
  return null;
}
