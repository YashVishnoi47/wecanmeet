import { connectDB } from "@/lib/db/database";
import Schedule from "@/lib/db/models/schedeleModel";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  await connectDB();

  try {
    const { meetingCardId, schedule } = await req.json();

    if (!meetingCardId || !schedule) {
      return NextResponse.json(
        {
          message: "something was not found.",
        },
        { status: 404 }
      );
    }

    const updated = await Schedule.findOneAndUpdate(
      { meetingCardId },
      schedule,
      { new: true }
    );

    if (!updated) {
      return NextResponse.json(
        {
          message: "Error Updating Schedule",
        },
        { status: 404 }
      );
    }

    return Response.json({ message: "Schedule Updated", updated });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
};
