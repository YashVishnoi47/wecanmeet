"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import UseUserStore from "@/store/userStore";
import UseCompStore from "@/store/componentStore";
import dynamic from "next/dynamic";
import { Radio } from "lucide-react";
import Link from "next/link";

// Dynamic Components
const Availability = dynamic(() => import("@/components/Availability"));
const Meetings = dynamic(() => import("@/components/Meetings"));
const CardSettings = dynamic(() => import("@/components/CardSettings"));

const Dashboard = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const { setUserCard, userMeetings, setuserMeetings } = UseUserStore();
  const { dashboardComp, setDashboardComp } = UseCompStore();

  // Fetching Cards When the session is available
  useEffect(() => {
    if (!session?.user?._id) return;
    const fetcCard = async () => {
      try {
        const res = await fetch(
          `/api/meeting/fetchMeetingCard?ownerID=${session?.user._id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await res.json();

        if (res.ok) {
          setUserCard(data.Cards);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetcCard();
  }, [session]);

  useEffect(() => {
    if (!session) return;
    const fetchMeeting = async () => {
      try {
        const res = await fetch(
          `/api/meeting/fetchMeetings?ownerID=${session?.user._id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await res.json();

        if (res.ok) {
          setuserMeetings(data.meetings);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchMeeting();
  }, [session]);

  if (!session) {
    return (
      <div className="w-full h-screen bg-black text-white flex flex-col items-center justify-center px-4">
        <motion.h1
          className="text-4xl md:text-6xl font-bold text-center"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Access Denied
        </motion.h1>

        <motion.p
          className="mt-4 text-sm md:text-base text-gray-300 text-center max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          You are not authorized to view this page. Please log in to continue.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-6"
        >
          <Button
            className="bg-white text-black hover:bg-black hover:text-white  hover:border-white active:scale-95 border  border-black transition-all duration-300 ease-in-out px-6 py-2 rounded-xl shadow-lg cursor-pointer"
            onClick={() => router.push("/sign-in")}
          >
            Go to Login
          </Button>
        </motion.div>
      </div>
    );
  }
  return (
    <div className="w-full h-screen bg-black text-white flex justify-start items-center">
      {/* side Bar */}
      <div className="h-full w-[15%] flex flex-col items-center justify-between text-white shadow-md border-r border-white/10">
        {/* Navigation and header */}
        <div className="w-full h-1/2 flex flex-col ">
          {/* Header */}
          <div className="w-full h-[20%] border-b border-white/10 flex justify-start p-4 items-center text-4xl font-semibold">
            User
          </div>

          {/* Navigation */}
          <div className="w-full flex flex-col items-center mt-4 space-y-2 px-2">
            {["Meetings", "Availability", "CardSettings"].map((item, idx) => (
              <button
                onClick={() => setDashboardComp(item)}
                key={idx}
                className={`w-full py-2.5 px-3 rounded-lg text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200 cursor-pointer text-start ${
                  item === dashboardComp && "bg-white/10 text-white"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="w-full flex flex-col items-center mb-4 space-y-2 px-2">
          {["Your Live Page"].map((item, idx) => (
            <Link
              href={`/live/${session?.user.userName}`}
              target="_blank"
              // onClick={() => router.push(`/live/${session?.user.userName}`)}
              key={idx}
              className={`w-full flex gap-2 py-2.5 justify-start items-center px-3 rounded-lg text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200 cursor-pointer text-start ${
                item === dashboardComp && "bg-white/10 text-white"
              }`}
            >
              {item === "Your Live Page" && <Radio className="text-sm" />}
              {item}
            </Link>
          ))}
        </div>
      </div>

      {/* Main */}
      <div
        className="h-full w-[85%] flex justify-center items-center
       "
      >
        {dashboardComp === "Availability" && <Availability />}
        {dashboardComp === "Meetings" && <Meetings />}
        {dashboardComp === "CardSettings" && <CardSettings session={session} />}
      </div>
    </div>
  );
};

export default Dashboard;
