import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Hero from "../components/sections/Hero";
import Stats from "../components/sections/Stats";
import Servicios from "../components/sections/Servicios";
import Proceso from "../components/sections/Proceso";
import Planes from "../components/sections/Planes";
import Contacto from "../components/sections/Contacto";
import CtaFinal from "../components/sections/CtaFinal";

export default function MarketingSite() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Servicios />
        <Proceso />
        <Planes />
        <Contacto />
        <CtaFinal />
      </main>
      <Footer />
    </>
  );
}
