# 🚀 Scalable Notification System

## **📌 Overview**
This is a **scalable notification system** built with **Node.js**, **Redis**, and **BullMQ**. It supports **email, SMS, push, and in-app notifications** with real-time processing and automatic retries.

---

## **🛠️ Tech Stack**
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose)
- **Message Queue:** Redis + BullMQ
- **Authentication:** JWT
- **Real-Time:** Socket.io
- **Job Processing:** Background workers (BullMQ)
- **Deployment:** Docker & Kubernetes (optional for scalability)

---

## **📌 Features**
✅ **Supports multiple notification types** (Email, SMS, Push, In-App)
✅ **Asynchronous Processing** using Redis-based queues
✅ **Automatic retries** for failed jobs
✅ **Real-time notifications** with Socket.io
✅ **Scheduled & Delayed notifications**
✅ **Scalable & Fault-Tolerant** architecture

---

## **📌 Project Structure**
```
scalable-notifications/
│── config/             # Database and app configurations
│── controllers/        # Handles request logic
│── middleware/         # Authentication & error handling
│── models/             # Mongoose models (User, Notification)
│── routes/             # Express routes (API endpoints)
│── services/           # Business logic (notification processing)
│── queue/              # Redis BullMQ setup
│── socket/             # WebSocket (real-time notifications)
│── views/              # (Optional) UI Templates
│── index.js            # Main Express app
│── server.js           # Entry point
│── .env                # Environment variables
│── package.json        # Dependencies
```

---

## **🚀 Installation & Setup**
### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/your-repo/scalable-notification-system.git
cd scalable-notification-system
```

### **2️⃣ Install Dependencies**
```sh
npm install
```

### **3️⃣ Setup Environment Variables**
Create a `.env` file in the root directory and add:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/notificationsDB
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
REDIS_PASSWORD=your_redis_password  # Leave empty if not required
```

### **4️⃣ Start Redis Server**
```sh
redis-server
```

### **5️⃣ Start the Application**
```sh
npm start
```

---

## **📌 API Endpoints**
### **🔹 Authentication**
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/auth/register` | `POST` | Register a new user |
| `/api/auth/login` | `POST` | Login and get JWT token |

### **🔹 Notifications**
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/notifications` | `POST` | Send a new notification |
| pending GET/:id , PUT/:id

---

## **📌 Message Queue (BullMQ + Redis)**
### **🔹 Setting Up the Notification Queue**
```javascript
import Queue from "bull";
import { processNotification } from "../services/notification.service.js";

const notificationQueue = new Queue("notifications", {
  redis: { host: process.env.REDIS_HOST, port: process.env.REDIS_PORT },
});

notificationQueue.process(async (job) => {
  await processNotification(job.data);
});

const addNotificationToQueue = (notification) => {
  notificationQueue.add(notification, { attempts: 3, backoff: 5000, ttl: 86400000 });
};

export { notificationQueue, addNotificationToQueue };
```

### **🔹 Redis Commands to Monitor Jobs**
```sh
redis-cli
keys *  # List all Redis keys
LRANGE bull:notifications:waiting 0 -1  # Check pending jobs
ZRANGE bull:notifications:delayed 0 -1 WITHSCORES  # Check delayed jobs
```

---

## **📌 Real-Time Notifications (Socket.io)**
### **🔹 Backend WebSocket Setup**
```javascript
import { Server } from "socket.io";

const io = new Server(3001, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);
  socket.on("subscribe", (userId) => socket.join(userId));
});

const sendRealTimeNotification = (userId, notification) => {
  io.to(userId).emit("new_notification", notification);
};

export { sendRealTimeNotification };
```


## **📌 Future Enhancements**
🚀 **Push Notifications with Firebase FCM**  
🚀 **Admin Panel for Notification Management**  
🚀 **Kafka/RabbitMQ for Large-Scale Queuing**  
🚀 **Monitoring Dashboard with Bull Board**  

---

## **📌 Contributing**
Feel free to contribute! Open an issue or submit a pull request. 😊

---

## **📌 License**
This project is licensed under the MIT License.

