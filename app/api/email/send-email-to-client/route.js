import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { render } from "@react-email/render";
import MeetingBookedEmail from "@/emails/MeetingBookedEmailToClient";

export async function POST(req) {
  try {
    const { message, clientEmail, userEmail, meetingDate, meetingTime } =
      await req.json();

    // console.log(message, clientEmail, userEmail, meetingTime);

    if (!message || !clientEmail || !userEmail || !meetingTime) {
      return NextResponse.json(
        { message: "Missing required fields." },
        { status: 400 }
      );
    }

    const emailHtml = render(
      <MeetingBookedEmail
        message={message}
        clientEmail={clientEmail}
        hostName={userEmail}
        meetingDate={meetingDate}
        meetingTime={meetingTime}
      />
    );

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: clientEmail,
      replyTo: userEmail,
      subject: "📅 Meeting Booked with " + userEmail,
      html: emailHtml,
    });

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Email sending error:", error);
    return NextResponse.json(
      { message: "Failed to send email" },
      { status: 500 }
    );
  }
}
