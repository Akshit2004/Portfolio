import Hero from "@/components/Hero";
import Ribbons from "@/components/Ribbons";
import About from "@/components/About";
import Work from "@/components/Work";
import Experience from "@/components/Experience";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col">
      <Hero />
      <Ribbons />
      <About />
      <Work />
      <Experience />
      <Testimonials />
      <Contact />
    </main>
  );
}
