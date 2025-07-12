// @desc    Get user notifications
const getNotifications = (req, res, next) => {
    res.status(200).json({ success: true, message: 'Fetched notifications. (Placeholder)' });
};

// @desc    Mark notification as read
const markNotificationAsRead = (req, res, next) => {
    res.status(200).json({ success: true, message: `Marked notification ${req.params.id} as read. (Placeholder)` });
};

export default { getNotifications, markNotificationAsRead };
