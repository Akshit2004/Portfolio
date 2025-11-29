import Hero from "./components/Hero";
import About from "./components/About";
import Work from "./components/Work";
import Experience from "./components/Experience";
import Contact from "./components/Contact";

/**
 * Renders the site's main page by composing the primary section components.
 *
 * @returns The root JSX element containing Hero, About, Work, Experience, and Contact arranged in a vertical flex container.
 */
export default function Home() {
  return (
    <main className="flex flex-col w-full min-h-screen">
      <Hero />
      <About />
      <Work />
      <Experience />
      <Contact />
    </main>
  );
}