import mongoose, { model, models, Schema } from "mongoose";

const userSchema = new Schema({
  userName: {
    type: String,
  },
  Email: {
    type: String,
  },
  password: {
    type: String,
  },
  FullName: {
    type: String,
  },
  profession: {
    type: String,
  },

  // All meetings related data.

  Meetings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Meeting",
    },
  ],
  MeetingCardID: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MeetingCard",
    },
  ],

  Available_WeekDays: {
    type: String,
  },

  Max_Meetings_In_OneDay: {
    type: String,
  },
});

const User = models.User || model("User", userSchema);
export default User;
