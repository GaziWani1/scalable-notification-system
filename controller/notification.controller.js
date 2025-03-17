import Notification from '../model/notification.model.js';
import { addNotificationToQueue } from '../queue/notification.queue.js';
import runTransaction from '../utils/transactionHelper.js';

export const postNotification = async (req, res, next) => {
  try {
    const { type, message } = req.body;
    const result = await runTransaction(async (session) => {
      const notifications = await Notification.create(
        [
          {
            userId: req.user.userId,
            type,
            message,
          },
        ],
        {
          session,
        }
      );

      return { notification: notifications[0] };
    });

    addNotificationToQueue(result.notification);
    // sendRealTimeNotification(req.user.userId, notification);

    res.status(201).json({ success: true, notification: result.notification });
  } catch (error) {
    next(error);
  }
};

export const getNotification = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
