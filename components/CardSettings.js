import UseUserStore from "@/store/userStore";
import React from "react";
import MeetingCardComp from "./MeetingCardComp";
import Topbar from "./Topbar";

const CardSettings = () => {
  const { userCard } = UseUserStore();
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <Topbar
        Heading="Your Meeting Card"
        text="Make changes in your meeting Card"
      />
      <div className="w-full h-[95%]">
        {userCard &&
          userCard.map((item, idx) => (
            <MeetingCardComp key={idx} cardDetails={item} />
          ))}
      </div>
    </div>
  );
};

export default CardSettings;
