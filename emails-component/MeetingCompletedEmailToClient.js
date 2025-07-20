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

export default function MeetingCompletedEmailToClient({
  clientEmail,
  hostName,
  meetingDate,
  meetingTime,
  feedbackLink,
}) {
  return (
    <Html>
      <Head />
      <Preview>Your meeting with {hostName} is completed</Preview>

      <Body style={main}>
        <Container style={container}>
          <Section>
            <Text style={emoji}>✅</Text>
            <Text style={title}>Your meeting has been completed</Text>
            <Text style={subtitle}>
              Thanks for attending your scheduled meeting with {hostName}.
            </Text>
          </Section>

          <Hr style={hr} />

          <Section>
            <Text style={label}>When</Text>
            <Text style={text}>
              {meetingDate} | {meetingTime}
            </Text>
          </Section>

          <Section>
            <Text style={label}>With</Text>
            <Text style={text}>
              {hostName} –{" "}
              <Link href={`mailto:${hostName}`} style={link}>
                {hostName}
              </Link>
            </Text>
          </Section>

          {feedbackLink && (
            <Section>
              <Text style={label}>We'd love your feedback</Text>
              <Text>
                <Link href={feedbackLink} style={button}>
                  Leave Feedback
                </Link>
              </Text>
            </Section>
          )}

          <Hr style={hr} />

          <Text style={footerText}>Thanks again for using wecanmeet</Text>
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

const emoji = {
  textAlign: "center",
  fontSize: "32px",
  marginBottom: "16px",
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

const link = {
  color: "#007aff",
  textDecoration: "underline",
};

const button = {
  display: "inline-block",
  padding: "10px 18px",
  backgroundColor: "#007aff",
  color: "#fff",
  borderRadius: "6px",
  textDecoration: "none",
  fontWeight: "bold",
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
