import { connectDB } from "@/lib/db/database";
import User from "@/lib/db/models/userModel";
import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import Schedule from "@/lib/db/models/schedeleModel";
import MeetingCard from "@/lib/db/models/meetingCardModel";

export const POST = async (req) => {
  await connectDB();

  try {
    const { userName, Email, password, FullName } = await req.json();

    if (!userName || !Email || !password || !FullName) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    const existedUser = await User.findOne({ userName });

    if (existedUser) {
      return NextResponse.json(
        { message: "Username is already taken." },
        { status: 409 }
      );
    }

    const hashPassword = await hash(password, 12);
    const newUser = await User.create({
      userName,
      Email,
      FullName,
      password: hashPassword,
    });

    if (newUser) {
      const card = await MeetingCard.create({
        cardOwner: newUser._id,
      });

      if (!card) {
        return NextResponse.json(
          { message: "Error creating Meeting Card" },
          { status: 500 }
        );
      }

      // ✅ Update user with meetingCardId
      await User.findByIdAndUpdate(newUser._id, {
        MeetingCardID: card._id,
      });

      const newSchedule = await Schedule.create({
        meetingCardId: card._id,
        // Add default schedule structure.
      });

      if (!newSchedule) {
        return NextResponse.json(
          { message: "Error creating schedule" },
          { status: 500 }
        );
      }

      return NextResponse.json(
        { message: "User created successfully" },
        { status: 201 }
      );
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
