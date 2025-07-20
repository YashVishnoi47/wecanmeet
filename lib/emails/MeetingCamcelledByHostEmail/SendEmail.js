import nodemailer from "nodemailer";
import { render } from "@react-email/render";
import MeetingCancelledByHost from "@/emails-component/MeetingCancelledByHost";

export async function EmailForMeetingDeletedByHost({
  message,
  clientEmail,
  userEmail,
  meetingDate,
  meetingTime,
  hostName,
}) {
  try {
    console.log(message, meetingDate, clientEmail, userEmail, meetingTime);

    if (
      !message ||
      !clientEmail ||
      !userEmail ||
      !meetingTime ||
      !meetingDate ||
      !hostName
    ) {
      return { success: false, message: "Missing required fields." };
    }

    // render the email body using a React email component
    const emailHtml = await render(
      <MeetingCancelledByHost
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

    // send the email to the client
    const result = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: clientEmail,
      replyTo: userEmail,
      subject: "❌ Meeting Deleted by " + userEmail,
      html: emailHtml,
    });

    console.log("✅ Email sent:", result);

    if (result) {
      return { success: true, message: "Email sent successfully" };
    }
  } catch (error) {
    console.error("❌ Email sending error:", error);
    return { success: false, message: "Failed to send email" };
  }
}
