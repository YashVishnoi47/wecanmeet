"use client";
import React from "react";
import { useSession } from "next-auth/react";
import MeetingCardComp from "./MeetingCardComp";

const Meetings = ({card}) => {
  const { data: session } = useSession();
  return (
    <div className="w-full h-full flex justify-center items-center">
      {session?.user.Meetings.length > 0
        ? "Meeting Available"
        : "No meeting available"}

        {card.map((item, idx) => (
        <MeetingCardComp key={idx} cardDetails={item} />
      ))}
    </div>
  );
};

export default Meetings;
