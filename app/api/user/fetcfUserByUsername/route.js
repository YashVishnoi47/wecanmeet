import { connectDB } from "@/lib/db/database";
import User from "@/lib/db/models/userModel";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  await connectDB();
  try {
    const { searchParams } = new URL(req.url);
    const userName = searchParams.get("userName");

    if (!userName) {
      return NextResponse.json(
        { error: "Username Not found" },
        { status: 404 }
      );
    }

    const user = await User.findOne({ userName: userName });

    if (!user) {
      return NextResponse.json(
        { error: "No user found with the given Username" },
        { status: 404 }
      );
    }

    console.log(user);
    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
};
