import { Server } from "socket.io";

const io = new Server(3001, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("subscribe", (userId) => {
    socket.join(userId);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// Function to send real-time notifications
const sendRealTimeNotification = (userId, notification) => {
  io.to(userId).emit("new_notification", notification);
};

export { sendRealTimeNotification };
