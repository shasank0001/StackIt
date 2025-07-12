import React, { useEffect, useState } from 'react';
import socket from '../socket';
import api from '../lib/api';

interface Notification {
  id: number;
  message: string;
  created_at: string;
}

interface NotificationsProps {
  userId: string | number;
}

const Notifications: React.FC<NotificationsProps> = ({ userId }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    if (userId) {
      // Fetch notifications on mount
      api.get(`/api/notifications`).then(res => {
        if (res.data.success && Array.isArray(res.data.notifications)) {
          setNotifications(res.data.notifications);
        }
      });
      // Listen for real-time notifications
      socket.emit('join', userId);
      socket.on('notification', (data: Notification) => {
        setNotifications((prev) => [data, ...prev]);
      });
      return () => {
        socket.off('notification');
      };
    }
  }, [userId]);

  return (
    <div>
      <h3>Notifications</h3>
      <ul>
        {notifications.map((notif) => (
          <li key={notif.id}>
            {notif.message} <span>({new Date(notif.created_at).toLocaleString()})</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications; 