import DummyMeetingCard from "@/components/LandingPageComponents/DummyMeetingcard";
import HeroSection from "@/components/LandingPageComponents/HeroSection";
import Section2 from "@/components/LandingPageComponents/Section2";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <>
      <div className="text-black h-[150vh] border-black relative ">
        <HeroSection />
        <DummyMeetingCard />
      </div>

      <div className="text-black w-full h-[100vh] border-black relative">
        <Section2 />
      </div>
    </>
  );
}
