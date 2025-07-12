import express from 'express';
import questionController from '../controllers/questionController.js';
const router = express.Router();

router.post('/', questionController.createQuestion);
router.get('/', questionController.getQuestions);
router.get('/:id', questionController.getQuestionById);
router.put('/:id', questionController.updateQuestion);
router.delete('/:id', questionController.deleteQuestion);

export default router;
