import mongoose, { model, models, Schema } from "mongoose";

const meetingCardSchema = new Schema(
  {
    cardOwner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    cardTheme: {
      type: String,
      default: "",
      trim: true,
    },
    workingDays: [
      {
        type: String,
        enum: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
      },
    ],
    workingHours: [
      {
        type: String, // e.g. "09:00 - 17:00"
        trim: true,
      },
    ],
    bookedSlots: [
      {
        type: String, // e.g. ISO string: "2025-07-01T10:00"
        trim: true,
      },
    ],
  },
  { timestamps: true }
);

const MeetingCard =
  models.MeetingCard || model("MeetingCard", meetingCardSchema);
export default MeetingCard;
