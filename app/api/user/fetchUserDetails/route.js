import { connectDB } from "@/lib/db/database";
import { NextResponse } from "next/server";
import User from "@/lib/db/models/userModel";

export const GET = async (req) => {
  await connectDB();

  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userID");

    if (!userId) {
      return NextResponse.json({ error: "UserId not found." }, { error: 202 });
    }

    const user = await User.findById(userId).select("userName Email FullName");

    if (!user) {
      return NextResponse.json(
        { error: "No user found with the given UserID" },
        { status: 202 }
      );
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
};
