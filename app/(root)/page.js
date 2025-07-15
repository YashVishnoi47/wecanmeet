import DummyMeetingCard from "@/components/DummyMeetingcard";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <>
      <div className="text-black h-[150vh] border-black relative ">
        <HeroSection />
        <DummyMeetingCard />
      </div>
      <div className="text-black h-[100vh] border-black relative"></div>
    </>
  );
}
