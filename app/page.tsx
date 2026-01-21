import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Amenities from "./components/Amenities";
import Gallery from "./components/Gallery";
import News from "./components/News";
import Contact from "./components/Contact";
import LocationMap from "./components/LocationMap";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Amenities />
        <Gallery />
        <News />
        <Contact />
        <LocationMap />
      </main>
      <Footer />
    </>
  );
}
