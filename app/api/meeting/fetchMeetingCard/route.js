import MeetingCard from "@/lib/db/models/meetingCardModel";
import { connectDB } from "@/lib/db/database";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  await connectDB();

  try {
    const { searchParams } = new URL(req.url);

    const OwnerId = searchParams.get("ownerID");
    if (!OwnerId) {
      return NextResponse.json(
        { message: "Owner Id is required" },
        { status: 404 }
      );
    }

    const Cards = await MeetingCard.find({ cardOwner: OwnerId });

    if (Cards) {
      return NextResponse.json({ Cards }, { status: 200 });
    } else {
      return NextResponse.json({ error: "Card not found." }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
