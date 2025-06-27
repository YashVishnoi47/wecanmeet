import User from "@/lib/db/models/userModel";
import MeetingCard from "@/lib/db/models/meetingCardModel";
import { connectDB } from "@/lib/db/database";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  await connectDB();
  try {
    const { cardOwnerId } = await req.json();

    if (!cardOwnerId) {
      return NextResponse.json(
        { error: "UserId is required." },
        { status: 404 }
      );
    }

    const Owner = await User.findById(cardOwnerId).select("MeetingCardID");

    if (Owner.MeetingCardID < 1) {
      const card = await MeetingCard.create({
        cardOwner: cardOwnerId,
      });

      if (card) {
        await User.findByIdAndUpdate(
          cardOwnerId,
          {
            $push: { MeetingCardID: card._id },
          },
          { new: true }
        );
        return NextResponse.json({ card }, { status: 201 });
      }
    } else {
      return NextResponse.json(
        { error: "You already have one meeting card." },
        { status: 409 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
