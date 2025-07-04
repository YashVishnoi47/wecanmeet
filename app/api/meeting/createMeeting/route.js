import Meeting from "@/lib/db/models/meetingModel";
import User from "@/lib/db/models/userModel";
import { connectDB } from "@/lib/db/database";
import { NextResponse } from "next/server";

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
    } = await req.json();

    console.log(
      clientName,
      clientEmail,
      clientMsg,
      meetingDate,
      meetingTime,
      ownerID
    );

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
    });

    await User.findByIdAndUpdate(ownerID, {
      $push: { Meetings: meeting._id },
    });

    if (!meeting) {
      return NextResponse.json(
        { error: "Error creating Meeting" },
        { status: 404 }
      );
    }

    return NextResponse.json({ meeting }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
};
