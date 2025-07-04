import UseUserStore from "@/store/userStore";
import React from "react";
import MeetingCardComp from "./MeetingCardComp";
import Topbar from "./Topbar";
import UseLivePageStore from "@/store/LivepageStore";

const CardSettings = () => {
  const { userCard } = UseUserStore();
  const { schedule } = UseLivePageStore();

  const workingDays = Object.entries(schedule)
    .filter(([day, data]) => data.isWorking)
    .map(([day]) => day);
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <Topbar
        Heading="Your Meeting Card"
        text="Make changes in your meeting Card"
      />
      <div className="w-full h-[95%]">
        {userCard &&
          userCard.map((item, idx) => (
            <MeetingCardComp workingDays={workingDays} key={idx} cardDetails={item} />
          ))}
      </div>
    </div>
  );
};

export default CardSettings;
