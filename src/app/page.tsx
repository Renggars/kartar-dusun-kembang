import About from "../components/About";
import Activities from "../components/Activities";
import Gallery from "../components/Gallery";
import Hero from "../components/Hero";
import Marketplace from "../components/Marketplace";
import StructurePage from "../components/Structure";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Activities />
      <About />
      <StructurePage />
      <Gallery />
      <Marketplace limit={6} />
      <Contact />
    </>
  );
}
