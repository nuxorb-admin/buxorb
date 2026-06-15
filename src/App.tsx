import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./components/sections/Hero";
import Stats from "./components/sections/Stats";
import Servicios from "./components/sections/Servicios";
import Proceso from "./components/sections/Proceso";
import Planes from "./components/sections/Planes";
import Nosotros from "./components/sections/Nosotros";
import Contacto from "./components/sections/Contacto";
import CtaFinal from "./components/sections/CtaFinal";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Servicios />
        <Proceso />
        <Planes />
        <Nosotros />
        <Contacto />
        <CtaFinal />
      </main>
      <Footer />
    </>
  );
}
