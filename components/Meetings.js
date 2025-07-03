"use client";
import React from "react";
import { useSession } from "next-auth/react";
import UseUserStore from "@/store/userStore";
import Topbar from "./Topbar";

const Meetings = () => {
  const { data: session } = useSession();

  return (
    <div className="w-full h-full flex flex-col justify-between items-center">
      <Topbar
        Heading="Your Meetings"
        text="Here are your scheduled meetings."
      />

      <div className="w-full h-[90%] flex justify-center items-center">
        {session?.user.Meetings.length > 0
          ? "Meeting Available"
          : "No meeting available"}
      </div>
    </div>
  );
};

export default Meetings;
