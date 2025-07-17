import DummyMeetingCard from "@/components/LandingPageComponents/DummyMeetingcard";
import Footer from "@/components/LandingPageComponents/Footer";
import HeroSection from "@/components/LandingPageComponents/HeroSection";
import Section2 from "@/components/LandingPageComponents/Section2";
import Section3 from "@/components/LandingPageComponents/Section3";
import Section4 from "@/components/LandingPageComponents/Section4";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <>
      {/* Hero Section + Meeting Card */}
      <div className="text-black min-h-[100vh] sm:min-h-[120vh] lg:min-h-[150vh] border-black relative">
        <HeroSection />
        <DummyMeetingCard />
      </div>

      {/* Section 2 */}
      <div className="text-black w-full min-h-[70vh] sm:min-h-[80vh] border-black relative">
        <Section2 />
      </div>

      {/* Section 3 */}
      <div className="text-black w-full min-h-[50vh] sm:min-h-[60vh] border-black relative">
        <Section3 />
      </div>

      {/* Section 4 */}
      <div className="text-black w-full mt-2 min-h-[70vh] sm:min-h-[80vh] border-black relative">
        <Section4 />
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
}
