import { connectDB } from "@/lib/db/database";
import User from "@/lib/db/models/userModel";
import { NextResponse } from "next/server";

export const PUT = async (req) => {
  await connectDB();

  try {
    const { userId, email, FullName, userName } = await req.json();

    if (!userId || !email || !FullName || !userName) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        Email: email,
        FullName,
        userName,
      },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Send updated user in response
    return NextResponse.json({ user: updatedUser }, { status: 200 });
  } catch (error) {
    console.error("Update failed:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
