import Meeting from "@/lib/db/models/meetingModel";
import { connectDB } from "@/lib/db/database";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  await connectDB();

  try {
    const { searchParams } = new URL(req.url);
    const OwnerId = searchParams.get("ownerID");

    if (!OwnerId) {
      return NextResponse.json(
        { error: "Owner Id not found." },
        { status: 404 }
      );
    }

    const meetings = await Meeting.find({
      ownerID: OwnerId,
    });

    if (!meetings) {
      return NextResponse.json(
        { error: "No meetings found with the give Owner-ID." },
        { status: 404 }
      );
    }

    return NextResponse.json({ meetings }, { status: 202 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Serever Error." },
      { status: 500 }
    );
  }
};
