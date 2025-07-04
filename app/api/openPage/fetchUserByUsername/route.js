import { connectDB } from "@/lib/db/database";
import User from "@/lib/db/models/userModel";
import { NextResponse } from "next/server";
import MeetingCard from "@/lib/db/models/meetingCardModel";

export const GET = async (req) => {
  await connectDB();

  try {
    const { searchParams } = new URL(req.url);

    const UserName = searchParams.get("userName");

    if (!UserName) {
      return NextResponse.json(
        { error: "UserName not found" },
        { status: 404 }
      );
    }

    const user = await User.findOne({ userName: UserName }).select("-password");
    const meetingCard = await MeetingCard.find({ _id: user.MeetingCardID });

    if (!user) {
      return NextResponse.json(
        {
          error: "No user found with the giver UserName",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({ user, meetingCard }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
};
