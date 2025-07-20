import nodemailer from "nodemailer";
import { render } from "@react-email/render";
import MeetingBookedEmail from "@/emails-component/MeetingBookedEmailToClient";

export async function sendEmailToClient({
  message,
  clientEmail,
  userEmail,
  meetingDate,
  meetingTime,
  hostName,
}) {
  try {
    // console.log(message, meetingDate, clientEmail, userEmail, meetingTime);

    if (!message || !clientEmail || !userEmail || !meetingTime || !hostName) {
      return { success: false, message: "Missing required fields." };
    }

    const emailHtml = await render(
      <MeetingBookedEmail
        message={message}
        clientEmail={clientEmail}
        hostName={hostName}
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

    const result = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: clientEmail,
      replyTo: userEmail,
      subject: "📅 Meeting Booked with " + userEmail,
      html: emailHtml,
    });

    // console.log("✅ Email sent:", result);
    if (result) {
      return { success: true, message: "Email sent successfully" };
    }
  } catch (error) {
    console.error("❌ Email sending error:", error);
    return { success: false, message: "Failed to send email" };
  }
}
