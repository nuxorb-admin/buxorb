import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Hero from "../components/sections/Hero";
import Problema from "../components/sections/Problema";
import Solucion from "../components/sections/Solucion";
import Modulos from "../components/sections/Modulos";
import Niveles from "../components/sections/Niveles";
import Proceso from "../components/sections/Proceso";
import Contacto from "../components/sections/Contacto";
import CtaFinal from "../components/sections/CtaFinal";

export default function MarketingSite() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Problema />
        <Solucion />
        <Modulos />
        <Niveles />
        <Proceso />
        <Contacto />
        <CtaFinal />
      </main>
      <Footer />
    </>
  );
}
