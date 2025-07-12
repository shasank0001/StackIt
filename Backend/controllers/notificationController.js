import { pool } from '../config/database.js';

// @desc    Get user notifications
const getNotifications = async (req, res, next) => {
    const userId = req.user.id;
    try {
        const result = await pool.query(
            'SELECT id, message, is_read, created_at FROM notifications WHERE user_id = $1 ORDER BY created_at DESC',
            [userId]
        );
        res.status(200).json({ success: true, notifications: result.rows });
    } catch (error) {
        console.error('Error fetching notifications:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

// @desc    Mark notification as read
const markNotificationAsRead = async (req, res, next) => {
    const notificationId = req.params.id;
    const userId = req.user.id;
    try {
        // Ensure the notification belongs to the user
        const notif = await pool.query('SELECT * FROM notifications WHERE id = $1 AND user_id = $2', [notificationId, userId]);
        if (notif.rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Notification not found.' });
        }
        await pool.query('UPDATE notifications SET is_read = true WHERE id = $1', [notificationId]);
        res.status(200).json({ success: true, message: 'Notification marked as read.' });
    } catch (error) {
        console.error('Error marking notification as read:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

// @desc    Create a notification and emit via socket.io
const createNotification = async (req, res, next) => {
    const userId = req.body.userId; // The user to notify
    const message = req.body.message;
    try {
        // Save notification to DB
        const result = await pool.query(
            'INSERT INTO notifications (user_id, message, is_read, created_at) VALUES ($1, $2, false, NOW()) RETURNING *',
            [userId, message]
        );
        // Emit real-time notification via socket.io
        const io = req.app.get('io');
        io.to(userId).emit('notification', {
            id: result.rows[0].id,
            message: result.rows[0].message,
            created_at: result.rows[0].created_at
        });
        res.status(201).json({ success: true, notification: result.rows[0] });
    } catch (error) {
        console.error('Error creating notification:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

export default { getNotifications, markNotificationAsRead, createNotification };
