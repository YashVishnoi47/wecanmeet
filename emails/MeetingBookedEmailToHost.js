// emails/MeetingBookedEmailToHost.jsx

import React from "react";
import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Text,
  Button,
} from "@react-email/components";

const MeetingBookedEmailToHost = ({
  hostName,
  clientName,
  clientEmail,
  meetingDate,
  meetingTime,
  meetingLink,
  message,
}) => {
  return (
    <Html>
      <Head />
      <Preview>{clientName} booked a meeting with you</Preview>
      <Body
        style={{
          backgroundColor: "#f9f9f9",
          padding: "20px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <Container
          style={{
            backgroundColor: "#ffffff",
            padding: "24px",
            borderRadius: "10px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
          }}
        >
          <Text
            style={{
              fontSize: "22px",
              fontWeight: "bold",
              marginBottom: "10px",
            }}
          >
            📅 New Meeting Booked!
          </Text>

          <Text style={{ fontSize: "16px", marginBottom: "20px" }}>
            Hey {hostName},<br />
            <strong>{clientName}</strong> just booked a meeting with you.
          </Text>

          <Section style={{ marginBottom: "20px" }}>
            <Text>
              <strong>Date:</strong> {meetingDate}
            </Text>
            <Text>
              <strong>Time:</strong> {meetingTime}
            </Text>
            {clientEmail && (
              <Text>
                <strong>Client Email:</strong> {clientEmail}
              </Text>
            )}
          </Section>

          {message && (
            <Section style={{ marginBottom: "20px" }}>
              <Text>
                <strong>Client's Message:</strong>
              </Text>
              <Text
                style={{
                  fontStyle: "italic",
                  backgroundColor: "#f4f4f4",
                  padding: "10px",
                  borderRadius: "6px",
                }}
              >
                {message}
              </Text>
            </Section>
          )}

          <Section>
            <Text>
              <strong>Meeting Link:</strong>
            </Text>
            <Button
              href={meetingLink}
              style={{
                backgroundColor: "#4f46e5",
                color: "#ffffff",
                padding: "10px 18px",
                fontSize: "14px",
                borderRadius: "6px",
                textDecoration: "none",
              }}
            >
              Join Meeting
            </Button>
          </Section>

          <Text style={{ fontSize: "14px", color: "#999", marginTop: "30px" }}>
            – wecanmeet team 🚀
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default MeetingBookedEmailToHost;
