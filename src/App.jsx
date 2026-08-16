import { ThemeProvider } from "./context/ThemeContext";
import CursorGlow from "./components/CursorGlow";
import CustomCursor from "./components/CustomCursor";
import ScrollProgress from "./components/ScrollProgress";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Stats from "./components/Stats";
import About from "./components/About";
import Skills from "./components/Skills";
import Process from "./components/Process";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";

export default function App() {
  return (
    <ThemeProvider>
      <div
        className="relative min-h-screen"
        style={{ background: "var(--bg-primary)" }}
      >
        <CursorGlow />
        <CustomCursor />
        <ScrollProgress />
        <div className="relative z-10">
          <Navbar />
          <main>
            <Hero />
            <Marquee />
            <Stats />
            <About />
            <Skills />
            <Process />
            <Projects />
            <Contact />
          </main>
          <Footer />
          <BackToTop />
        </div>
      </div>
    </ThemeProvider>
  );
}
