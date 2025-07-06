import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className=" text-black h-screen relative">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <HeroSection />

      {/* Scroll Indicator */}
      {/* <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-sm text-gray-400 animate-bounce">
        ↓ Scroll to explore more
      </div> */}
    </div>
  );
}
