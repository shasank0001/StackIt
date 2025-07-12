import { pool } from '../config/database.js';

// @desc    Add an answer to a question
const addAnswer = async (req, res, next) => {
    const { content } = req.body;
    const questionId = req.params.question_id;
    const userId = req.user.id;
    try {
        if (!content) {
            return res.status(400).json({ success: false, message: 'Answer content is required.' });
        }
        const result = await pool.query(
            'INSERT INTO answers (question_id, user_id, content, created_at, updated_at, votes, is_accepted) VALUES ($1, $2, $3, NOW(), NOW(), 0, false) RETURNING *',
            [questionId, userId, content]
        );
        res.status(201).json({ success: true, answer: result.rows[0] });
    } catch (error) {
        console.error('Error adding answer:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

// @desc    Update an answer
const updateAnswer = async (req, res, next) => {
    const { content } = req.body;
    const answerId = req.params.id;
    const userId = req.user.id;
    try {
        const answer = await pool.query('SELECT * FROM answers WHERE id = $1', [answerId]);
        if (answer.rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Answer not found.' });
        }
        if (answer.rows[0].user_id !== userId) {
            return res.status(403).json({ success: false, message: 'Not authorized to update this answer.' });
        }
        const result = await pool.query(
            'UPDATE answers SET content = $1, updated_at = NOW() WHERE id = $2 RETURNING *',
            [content, answerId]
        );
        res.status(200).json({ success: true, answer: result.rows[0] });
    } catch (error) {
        console.error('Error updating answer:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

// @desc    Delete an answer
const deleteAnswer = async (req, res, next) => {
    const answerId = req.params.id;
    const userId = req.user.id;
    try {
        const answer = await pool.query('SELECT * FROM answers WHERE id = $1', [answerId]);
        if (answer.rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Answer not found.' });
        }
        if (answer.rows[0].user_id !== userId) {
            return res.status(403).json({ success: false, message: 'Not authorized to delete this answer.' });
        }
        await pool.query('DELETE FROM answers WHERE id = $1', [answerId]);
        res.status(200).json({ success: true, message: 'Answer deleted.' });
    } catch (error) {
        console.error('Error deleting answer:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

// @desc    Vote on an answer
const voteOnAnswer = async (req, res, next) => {
    const answerId = req.params.id;
    const { vote } = req.body; // vote: 1 for upvote, -1 for downvote
    try {
        if (![1, -1].includes(vote)) {
            return res.status(400).json({ success: false, message: 'Invalid vote value.' });
        }
        const result = await pool.query(
            'UPDATE answers SET votes = votes + $1 WHERE id = $2 RETURNING *',
            [vote, answerId]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Answer not found.' });
        }
        res.status(200).json({ success: true, answer: result.rows[0] });
    } catch (error) {
        console.error('Error voting on answer:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

// @desc    Accept an answer
const acceptAnswer = async (req, res, next) => {
    const answerId = req.params.id;
    const userId = req.user.id;
    try {
        const answer = await pool.query('SELECT * FROM answers WHERE id = $1', [answerId]);
        if (answer.rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Answer not found.' });
        }
        const question = await pool.query('SELECT * FROM questions WHERE id = $1', [answer.rows[0].question_id]);
        if (question.rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Question not found.' });
        }
        if (question.rows[0].user_id !== userId) {
            return res.status(403).json({ success: false, message: 'Not authorized to accept this answer.' });
        }
        await pool.query('UPDATE answers SET is_accepted = false WHERE question_id = $1', [question.rows[0].id]);
        const result = await pool.query(
            'UPDATE answers SET is_accepted = true WHERE id = $1 RETURNING *',
            [answerId]
        );
        res.status(200).json({ success: true, answer: result.rows[0] });
    } catch (error) {
        console.error('Error accepting answer:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

export default { addAnswer, updateAnswer, deleteAnswer, voteOnAnswer, acceptAnswer };
