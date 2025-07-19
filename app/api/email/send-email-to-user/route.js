import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // Parse JSON body from request
    const { message, clientEmail, userEmail } = await req.json();

    // Validate message
    if (!message || !clientEmail) {
      return NextResponse.json(
        { message: "Message and email are required." },
        { status: 400 }
      );
    }

    // Create a transporter using Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // Your Gmail
        pass: process.env.EMAIL_PASS, // Your App Password
      },
    });

    // Define email options
    const mailOptions = {
      from: userEmail,
      to: clientEmail,
      subject: "New Client Message from Portfolio.",
      text: `Message: ${message}\nClient Email: ${clientEmail}`, // Email body from cfrontend
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Respond success
    return NextResponse.json(
      { message: "Email sent successfully" },
      {
        status: 200,
      }
    );


  } catch (error) {
    console.error("Email sending error:", error);
    return new Response(JSON.stringify({ message: "Failed to send email" }), {
      status: 500,
    });
  }
}
