import nodemailer from "nodemailer";
import { render } from "@react-email/render";
import MeetingBookedEmailToHost from "@/emails-component/MeetingBookedEmailToHost";

export async function sendEmailToHost({
  message,
  clientEmail,
  userEmail,
  meetingDate,
  meetingTime,
  clientName,
  hostName,
}) {
  try {
    // console.log(message, meetingDate, clientEmail, userEmail, meetingTime);

    if (
      !message ||
      !clientEmail ||
      !userEmail ||
      !meetingTime ||
      !clientName ||
      !hostName
    ) {
      return { success: false, message: "Missing required fields." };
    }

    const emailHtml = await render(
      <MeetingBookedEmailToHost
        hostName={hostName}
        clientEmail={clientEmail}
        message={message}
        meetingDate={meetingDate}
        meetingTime={meetingTime}
        clientName={clientName}
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
      to: userEmail,
      replyTo: clientEmail,
      subject: "📅 Meeting Booked with " + clientEmail,
      html: emailHtml,
    });

    // console.log("✅ Email sent:HOST", result);
    if (result) {
      return { success: true, message: "Email sent successfully" };
    }
  } catch (error) {
    console.error("❌ Email sending error:", error);
    return { success: false, message: "Failed to send email" };
  }
}
