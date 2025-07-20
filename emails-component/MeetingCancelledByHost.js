// emails/MeetingCancelledByHost.jsx

import React from 'react';
import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Text,
  Button,
} from '@react-email/components';

const MeetingCancelledByHost = ({ clientName, hostName, meetingDate, meetingTime, reason, rescheduleLink }) => {
  return (
    <Html>
      <Head />
      <Preview>Your meeting with {hostName} has been cancelled</Preview>
      <Body style={{ backgroundColor: '#f4f4f4', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <Container style={{ backgroundColor: '#ffffff', padding: '24px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
          <Text style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '10px', color: '#dc2626' }}>
            ❌ Meeting Cancelled
          </Text>

          <Text style={{ fontSize: '16px', marginBottom: '20px' }}>
            Hello {clientName},<br />
            Unfortunately, your scheduled meeting with <strong>{hostName}</strong> on <strong>{meetingDate}</strong> at <strong>{meetingTime}</strong> has been cancelled.
          </Text>

          {reason && (
            <Section style={{ marginBottom: '20px' }}>
              <Text><strong>Reason:</strong></Text>
              <Text style={{ backgroundColor: '#f3f4f6', padding: '10px', borderRadius: '6px', fontStyle: 'italic' }}>
                {reason}
              </Text>
            </Section>
          )}

          {rescheduleLink && (
            <Section style={{ marginBottom: '20px' }}>
              <Text>If you'd like to reschedule, click below:</Text>
              <Button
                href={rescheduleLink}
                style={{
                  backgroundColor: '#2563eb',
                  color: '#fff',
                  padding: '10px 18px',
                  fontSize: '14px',
                  borderRadius: '6px',
                  textDecoration: 'none',
                }}
              >
                Reschedule Meeting
              </Button>
            </Section>
          )}

          <Text style={{ fontSize: '14px', color: '#999', marginTop: '30px' }}>
            – The wecanmeet Team
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default MeetingCancelledByHost;
