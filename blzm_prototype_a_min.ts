interface User {
  id: string;
  username: string;
}

interface Notification {
  id: string;
  userId: string;
  message: string;
  timestamp: number;
}

interface Config {
  botName: string;
  notifyInterval: number; // in seconds
  maxNotifications: number;
  users: User[];
}

const config: Config = {
  botName: 'BlzmBot',
  notifyInterval: 60, // 1 minute
  maxNotifications: 10,
  users: [
    { id: 'user-1', username: 'johnDoe' },
    { id: 'user-2', username: 'janeDoe' },
  ],
};

const notifications: Notification[] = [];

const notifyUser = (userId: string, message: string) => {
  const notification: Notification = {
    id: `notif-${Date.now()}`,
    userId,
    message,
    timestamp: Date.now(),
  };
  notifications.push(notification);
  console.log(`Notification sent to ${userId}: ${message}`);
};

const checkNotifications = () => {
  setInterval(() => {
    notifications
      .filter((notif) => notif.timestamp + config.notifyInterval * 1000 < Date.now())
      .forEach((notif) => {
        notifyUser(notif.userId, `Reminder: ${notif.message}`);
      });
  }, config.notifyInterval * 1000);
};

checkNotifications();