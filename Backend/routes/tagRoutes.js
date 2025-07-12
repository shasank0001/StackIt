import express from 'express';
import tagController from '../controllers/tagController.js';
const router = express.Router();

router.get('/', tagController.getTags);
router.get('/:name/questions', tagController.getQuestionsByTag);

export default router;
