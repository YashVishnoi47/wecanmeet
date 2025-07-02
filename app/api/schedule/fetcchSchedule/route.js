import User from "@/lib/db/models/userModel";
import { NextResponse } from "next/server";
import MeetingCard from "@/lib/db/models/meetingCardModel";
import { connectDB } from "@/lib/db/database";
import Schedule from "@/lib/db/models/schedeleModel";

export const GET = async (req) => {
  await connectDB();

  try {
    const { searchParams } = new URL(req.url);
    const meetingCardID = searchParams.get("MeetingCardID");

    if (!meetingCardID) {
      return NextResponse.json(
        { error: "MeetingCardID is required." },
        { status: 400 } // Bad Request is more appropriate than 404
      );
    }

    const schedule = await Schedule.findOne({
      meetingCardId: meetingCardID,
    }).select("-meetingCardId");

    if (!schedule || schedule.length === 0) {
      return NextResponse.json(
        { error: "No schedule found for the given MeetingCardID." },
        { status: 404 }
      );
    }

    return NextResponse.json({ schedule }, { status: 200 });
  } catch (error) {
    console.error("Error fetching schedule:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
