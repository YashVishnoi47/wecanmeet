import DummyMeetingCard from "@/components/DummyMeetingcard";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <>
      <div className="text-black  h-[150vh] border-2 border-black relative bg-gradient-to-br from-white via-gray-100 to-gray-50">
        <Navbar />
        <HeroSection />

        <DummyMeetingCard /> {/* Meeting Card */}
      </div>
    </>
  );
}
