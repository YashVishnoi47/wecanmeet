"use client";
import React from "react";
import { useSession } from "next-auth/react";
import MeetingCardComp from "./MeetingCardComp";
import UseUserStore from "@/store/userStore";

const Meetings = () => {
  const { data: session } = useSession();
  const { userCard } = UseUserStore();
  // console.log("User Card",userCard)

  return (
    <div className="w-full h-full flex justify-center items-center">
      {session?.user.Meetings.length > 0
        ? "Meeting Available"
        : "No meeting available"}

      {userCard && userCard.map((item, idx) => (
        <MeetingCardComp key={idx} cardDetails={item} />
      ))}
    </div>
  );
};

export default Meetings;
