import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Origenes } from "@/components/origenes";
import { Equipo } from "@/components/equipo";
import { Impacto } from "@/components/impacto";
import { Clientes } from "@/components/clientes";
import { Catalogo } from "@/components/catalogo";
import { Servicios } from "@/components/servicios";
import { Contacto } from "@/components/contacto";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Origenes />
        <Equipo />
        <Impacto />
        <Clientes />
        <Catalogo />
        <Servicios />
        <Contacto />
      </main>
      <Footer />
    </>
  );
}
