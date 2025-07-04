import mongoose, { model, models, Schema } from "mongoose";

const meetingSchema = new Schema(
  {
    ownerID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    clientName: {
      type: String,
    },
    clientEmail: {
      type: String,
    },
    clientMsg: {
      type: String,
    },

    meetingdate: {
      type: Date,
    },
    meetingTime: {
      type: String,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Meeting = models.Meeting || model("Meeting", meetingSchema);
export default Meeting;
