import Notification from "../model/notification.model.js"; 

export const processNotification = async (notification) => {
  // test data
  // console.log("Processing Notification:", notification); 

  // Check the notification type and process it
  if (notification.type === "email") {
    console.log(`Sending Email: ${notification.message}`);
  } else if (notification.type === "sms") {
    console.log(`Sending SMS: ${notification.message}`);
  } else if (notification.type === "push") {
    console.log(`Sending Push Notification: ${notification.message}`);
  }

  await Notification.findByIdAndUpdate(notification._id, { status: "sent" });

  console.log("Notification Processed Successfully");
};
