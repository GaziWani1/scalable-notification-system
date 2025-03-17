import Queue from "bull";
import { processNotification } from "../services/notification.service.js";
import { REDIS_HOST, REDIS_PASSWORD, REDIS_PORT } from "../config/env.js";

const notificationQueue = new Queue("notifications", {
  redis: { host: REDIS_HOST, port: REDIS_PORT , password:REDIS_PASSWORD },
});

notificationQueue.process(async (job) => {
  await processNotification(job.data);
});

// Add job function
const addNotificationToQueue = (notification) => {
  notificationQueue.add(notification, { attempts: 3, backoff: 5000 });
};

export { notificationQueue, addNotificationToQueue };
