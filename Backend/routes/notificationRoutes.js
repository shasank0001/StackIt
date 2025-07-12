import express from 'express';
import notificationController from '../controllers/notificationController.js';
const router = express.Router();

router.get('/', notificationController.getNotifications);
router.put('/:id/read', notificationController.markNotificationAsRead);

export default router;
