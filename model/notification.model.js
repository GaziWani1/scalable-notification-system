import { Schema, model } from "mongoose";

const notificationSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, enum: ["email", "sms", "push", "in-app"], required: true },
  message: { type: String, required: true },
  status: { type: String, enum: ["pending", "sent", "failed"], default: "pending" },
  isRead: { type: Boolean, default: false },
}, { timestamps: true });

const Notification = model("Notification", notificationSchema);
export default Notification;
