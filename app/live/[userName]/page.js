"use client";
import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import UseLivePageStore from "@/store/LivepageStore";
import MeetingCardComp from "@/components/MeetingCardComp";

const Live = () => {
  const { userName } = useParams();
  const { user, setUser, schedule, setSchedule, meetingCard, setMeetingCard } =
    UseLivePageStore();

  const workingDays = Object.entries(schedule)
    .filter(([day, data]) => data.isWorking)
    .map(([day]) => day);

  // Function to find User via Username and then fetching the Meeting Card.
  const FindUser = async () => {
    try {
      const res = await fetch(
        `/api/openPage/fetchUserByUsername?userName=${userName}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();
      setUser(data.user);
      setMeetingCard(data.meetingCard);

      if (!res.ok) {
        console.log(data.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Function to find the Schedule of the user.
  useEffect(() => {
    if (!user.MeetingCardID) return;
    const FindSchedule = async () => {
      try {
        const res = await fetch(
          `/api/openPage/fetchScheduleForLivePage?MeetingCardId=${user.MeetingCardID}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await res.json();
        setSchedule(data.schedule);

        if (!res.ok) {
          console.log(data.error);
        }
      } catch (error) {
        console.log(error);
      }
    };

    FindSchedule();
  }, [user.MeetingCardID]);

  // UseEffect Running functions on first Load.
  useEffect(() => {
    FindUser();
  }, []);

  return (
    <div className="w-full h-screen text-white text-2xl flex justify-center items-center bg-black ">
      <div className="w-full h-[95%]">
        {meetingCard &&
          meetingCard.map((item, idx) => (
            <MeetingCardComp
              workingDays={workingDays}
              user={user}
              key={idx}
              cardDetails={item}
            />
          ))}
      </div>
    </div>
  );
};

export default Live;
