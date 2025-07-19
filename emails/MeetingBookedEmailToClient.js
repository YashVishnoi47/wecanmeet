// /emails/MeetingBookedEmailToClient.tsx

import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Link,
  Hr,
  Preview,
} from "@react-email/components";

export default function MeetingBookedEmailToClient({
  clientEmail,
  hostName,
  meetingDate,
  meetingTime,
  meetingLink,
}) {
  return (
    <Html>
      <Head />
      <Preview>Your event has been scheduled</Preview>

      <Body style={main}>
        <Container style={container}>
          <Section>
            <Text style={successIcon}>✅</Text>
            <Text style={title}>Your event has been scheduled</Text>
            <Text style={subtitle}>
              We sent an email to everyone with this information.
            </Text>
          </Section>

          <Hr style={hr} />

          <Section>
            <Text style={label}>What</Text>
            <Text style={text}>15 Min Meeting between {hostName} and you</Text>
          </Section>

          <Section>
            <Text style={label}>When</Text>
            <Text style={text}>
              {meetingDate} | {meetingTime}
            </Text>
          </Section>

          <Section>
            <Text style={label}>Who</Text>
            <Text style={text}>
              {hostName} – Organizer{" "}
              <Link href={`mailto:${hostName}`} style={link}>
                {hostName}
              </Link>
              <br />
              You – Guest{" "}
              <Link href={`mailto:${clientEmail}`} style={link}>
                {clientEmail}
              </Link>
            </Text>
          </Section>

          <Section>
            <Text style={label}>Where</Text>
            <Text style={text}>
              <Link href={meetingLink || "#"} style={link}>
                Join Meeting
              </Link>
            </Text>
          </Section>

          <Hr style={hr} />

          <Text style={footerText}>
            Need to make a change?{" "}
            <Link href="#" style={link}>
              Reschedule
            </Link>{" "}
            or{" "}
            <Link href="#" style={link}>
              Cancel
            </Link>
          </Text>

          <Text style={brand}>wecanmeet</Text>
        </Container>
      </Body>
    </Html>
  );
}

// ✨ Styles
const main = {
  backgroundColor: "#f6f9fc",
  fontFamily: "Helvetica, Arial, sans-serif",
  padding: "20px 0",
};

const container = {
  backgroundColor: "#ffffff",
  border: "1px solid #eaeaea",
  borderRadius: "10px",
  padding: "32px",
  maxWidth: "500px",
  margin: "auto",
};

const title = {
  fontSize: "20px",
  fontWeight: "bold",
  textAlign: "center",
  marginBottom: "8px",
};

const subtitle = {
  fontSize: "14px",
  textAlign: "center",
  color: "#555",
  marginBottom: "16px",
};

const label = {
  fontWeight: "bold",
  fontSize: "14px",
  color: "#111",
  marginBottom: "2px",
};

const text = {
  fontSize: "14px",
  color: "#444",
  marginBottom: "12px",
};

const successIcon = {
  textAlign: "center",
  fontSize: "32px",
  marginBottom: "16px",
};

const link = {
  color: "#007aff",
  textDecoration: "underline",
};

const hr = {
  borderTop: "1px solid #eee",
  margin: "20px 0",
};

const footerText = {
  fontSize: "12px",
  textAlign: "center",
  color: "#888",
};

const brand = {
  fontSize: "12px",
  textAlign: "center",
  color: "#aaa",
  marginTop: "12px",
};
