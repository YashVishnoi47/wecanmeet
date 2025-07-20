import Meeting from "@/lib/db/models/meetingModel";
import { connectDB } from "@/lib/db/database";
import { NextResponse } from "next/server";
import { EmailForMeetingDeletedByHost } from "@/lib/emails/MeetingCamcelledByHostEmail/SendEmail";
import { format } from "date-fns";
import User from "@/lib/db/models/userModel";

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
    const host = await User.findById(DeletedMeeting.ownerID).select(
      "Email FullName"
    );

    if (!DeletedMeeting) {
      return NextResponse({ error: "error canceling Meeting" });
    }

    const formattedDate = format(
      new Date(DeletedMeeting.meetingdate),
      "eeee, MMMM do, yyyy"
    );

    if (DeletedMeeting && DeletedMeeting.completed === false) {
      await EmailForMeetingDeletedByHost({
        message: DeletedMeeting.clientMsg,
        clientEmail: DeletedMeeting.clientEmail,
        userEmail: host.Email,
        hostName: host.FullName,
        meetingDate: formattedDate,
        meetingTime: DeletedMeeting.meetingTime,
      });
    }

    return NextResponse.json({ succcess: true }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse({ error: "Internal sever error" }, { status: 500 });
  }
};
