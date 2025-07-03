import mongoose, { model, models, Schema } from "mongoose";

const scheduleSchema = new Schema({
  meetingCardId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MeetingCard",
    required: true,
  },

  Monday: {
    isWorking: { type: Boolean, default: false },
    timeSlots: {
      start: String,
      end: String,
    },
  },
  Tuesday: {
    isWorking: { type: Boolean, default: false },
    timeSlots: {
      start: String,
      end: String,
    },
  },
  Wednesday: {
    isWorking: { type: Boolean, default: false },
    timeSlots: {
      start: String,
      end: String,
    },
  },
  Thursday: {
    isWorking: { type: Boolean, default: false },
    timeSlots: {
      start: String,
      end: String,
    },
  },
  Friday: {
    isWorking: { type: Boolean, default: false },
    timeSlots: {
      start: String,
      end: String,
    },
  },
  Saturday: {
    isWorking: { type: Boolean, default: false },
    timeSlots: {
      start: String,
      end: String,
    },
  },
  Sunday: {
    isWorking: { type: Boolean, default: false },
    timeSlots: {
      start: String,
      end: String,
    },
  },
});

const Schedule = models.Schedule || model("Schedule", scheduleSchema);
export default Schedule;
