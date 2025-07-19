import Meeting from "@/lib/db/models/meetingModel";
import User from "@/lib/db/models/userModel";
import { connectDB } from "@/lib/db/database";
import { NextResponse } from "next/server";
import { sendEmailToClient } from "@/lib/emails/SendEmailToClient/sendEmail";
import { sendEmailToHost } from "@/lib/emails/SendEmailToHost/sendEmail";
import { format } from "date-fns";

export const POST = async (req) => {
  await connectDB();

  try {
    const {
      clientName,
      clientEmail,
      clientMsg,
      meetingDate,
      meetingTime,
      ownerID,
      meetingDuration,
      meetingMode,
    } = await req.json();

    // console.log(
    //   clientName,
    //   clientEmail,
    //   clientMsg,
    //   meetingDate,
    //   meetingTime,
    //   ownerID,
    //   meetingDuration,
    //   meetingMode
    // );

    if (
      !clientName ||
      !clientEmail ||
      !clientMsg ||
      !meetingDate ||
      !meetingTime ||
      !ownerID
    ) {
      return NextResponse.json(
        { error: "Somthing Went missing" },
        { status: 404 }
      );
    }

    const meeting = await Meeting.create({
      clientName: clientName,
      clientEmail: clientEmail,
      clientMsg: clientMsg,
      meetingdate: meetingDate,
      meetingTime: meetingTime,
      ownerID: ownerID,
      meetingMode: meetingMode,
      meetingDuration: meetingDuration,
    });

    const user = await User.findByIdAndUpdate(ownerID, {
      $push: { Meetings: meeting._id },
    });

    if (!meeting) {
      return NextResponse.json(
        { error: "Error creating Meeting" },
        { status: 404 }
      );
    }

    const formattedDate = format(
      new Date(meeting.meetingdate),
      "eeee, MMMM do, yyyy"
    );


    if (meeting) {
      // Sending Email to client.
      sendEmailToClient({
        message: meeting.clientMsg,
        clientEmail: meeting.clientEmail,
        userEmail: user.Email,
        meetingDate: formattedDate,
        meetingTime: meeting.meetingTime,
      });

      // Sending Email to Host.
      sendEmailToHost({
        message: meeting.clientMsg,
        clientName:meeting.clientName,
        clientEmail: meeting.clientEmail,
        userEmail: user.Email,
        meetingDate: formattedDate,
        meetingTime: meeting.meetingTime,
      });
    }

    return NextResponse.json({ meeting }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
};
