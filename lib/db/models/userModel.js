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
});

const User = models.User || model("User", userSchema);
export default User;
