import mongoose, { model, models, Schema } from "mongoose";

const meetingCardSchema = new Schema({
  cardOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  cardTheme: {
    type: String,
    default: "",
  },
});

const MeetingCard =
  models.MeetingCard || model("MeetingCard", meetingCardSchema);
export default MeetingCard;
