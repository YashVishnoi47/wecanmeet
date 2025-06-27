import { connectDB } from "@/lib/db/database";
import User from "@/lib/db/models/userModel";
import { NextResponse } from "next/server";
import { hash } from "bcryptjs";

export const POST = async (req) => {
  await connectDB();

  try {
    const { userName, Email, password, FullName } = await req.json();
    //   console.log(userName, Email, password, FullName);

    if (!userName || !Email || !password || !FullName) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    const existedUser = await User.findOne({ userName: userName });

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
      return NextResponse.json({ message:"User Created Succesfully" }, { status: 201 });
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: err }, { status: 500 });
  }
};
