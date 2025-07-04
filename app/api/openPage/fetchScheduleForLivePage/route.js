import { connectDB } from "@/lib/db/database";
import Schedule from "@/lib/db/models/schedeleModel";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  await connectDB();

  try {
    const { searchParams } = new URL(req.url);
    const meetingCardId = searchParams.get("MeetingCardId");
    console.log(meetingCardId)

    if (!meetingCardId) {
      return NextResponse.json(
        { error: "MeetingCardId Was not found." },
        { status: 404 }
      );
    }

    const schedule = await Schedule.findOne({ meetingCardId: meetingCardId });

    if (!schedule) {
      return NextResponse.json(
        { error: "No schedule found with the given MeetingCardId" },
        { status: 404 }
      );
    }

    return NextResponse.json({ schedule }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
};
