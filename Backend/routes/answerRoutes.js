import express from 'express';
import answerController from '../controllers/answerController.js';
const router = express.Router();

router.post('/:question_id', answerController.addAnswer);
router.put('/:id', answerController.updateAnswer);
router.delete('/:id', answerController.deleteAnswer);
router.post('/:id/vote', answerController.voteOnAnswer);
router.post('/:id/accept', answerController.acceptAnswer);

export default router;
