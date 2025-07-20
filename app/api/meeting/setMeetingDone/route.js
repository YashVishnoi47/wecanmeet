import { connectDB } from "@/lib/db/database";
import Meeting from "@/lib/db/models/meetingModel";
import User from "@/lib/db/models/userModel";
import { MeetingCompletedEmailToClientFunc } from "@/lib/emails/EmailForMeetingCompleted/SendEmail";
import { format } from "date-fns";
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
    const host = await User.findById(updatedMeeting.ownerID).select(
      "Email FullName"
    );

    if (!updatedMeeting) {
      return NextResponse.json(
        { error: "Error updating Meeting." },
        { status: 404 }
      );
    }

    const formattedDate = format(
      new Date(updatedMeeting.meetingdate),
      "eeee, MMMM do, yyyy"
    );

    if (updatedMeeting) {
      await MeetingCompletedEmailToClientFunc({
        message: updatedMeeting.clientMsg,
        clientEmail: updatedMeeting.clientEmail,
        userEmail: host.Email,
        meetingDate: formattedDate,
        meetingTime: updatedMeeting.meetingTime,
        hostName: host.FullName,
      });
    }

    return NextResponse.json({ updatedMeeting }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
