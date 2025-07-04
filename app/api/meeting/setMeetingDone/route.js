import { connectDB } from "@/lib/db/database";
import Meeting from "@/lib/db/models/meetingModel";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  await connectDB();

  try {
    const { searchParams } = new URL(req.url);

    const meetingId = searchParams.get("meetingId");
    const completed = searchParams.get("completed");

    if (!meetingId) {
      return NextResponse.json(
        { error: "Meeting-Id was not found" },
        { status: 404 }
      );
    }

    const updatedMeeting = await Meeting.findByIdAndUpdate(meetingId, {
      completed: completed,
    });

    if (!updatedMeeting) {
      return NextResponse.json(
        { error: "Error updating Meeting." },
        { status: 404 }
      );
    }

    return NextResponse.json({ updatedMeeting }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
