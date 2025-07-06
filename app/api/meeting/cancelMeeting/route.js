import Meeting from "@/lib/db/models/meetingModel";
import { connectDB } from "@/lib/db/database";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  await connectDB();

  try {
    const { meetingId } = await req.json();

    if (!meetingId) {
      return NextResponse.json(
        { error: "MeetingId not found" },
        { status: 404 }
      );
    }

    const DeletedMeeting = await Meeting.findByIdAndDelete(meetingId);

    if (!DeletedMeeting) {
      return NextResponse({ error: "error canceling Meeting" });
    }

    return NextResponse.json({ succcess: true }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse({ error: "Internal sever error" }, { status: 500 });
  }
};
