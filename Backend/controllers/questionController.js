import { pool } from '../config/database.js';

// @desc    Create a new question
const createQuestion = async (req, res, next) => {
    const { title, description } = req.body;
    const userId = req.user.id;
    try {
        if (!title || !description) {
            return res.status(400).json({ success: false, message: 'Title and description are required.' });
        }
        const result = await pool.query(
            'INSERT INTO questions (user_id, title, description) VALUES ($1, $2, $3) RETURNING *',
            [userId, title, description]
        );
        res.status(201).json({ success: true, question: result.rows[0] });
    } catch (error) {
        console.error('Error creating question:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

// @desc    Get all questions
const getQuestions = async (req, res, next) => {
    try {
        const result = await pool.query('SELECT * FROM questions ORDER BY created_at DESC');
        res.status(200).json({ success: true, questions: result.rows });
    } catch (error) {
        console.error('Error fetching questions:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

// @desc    Get a single question by ID
const getQuestionById = async (req, res, next) => {
    const questionId = req.params.id;
    try {
        const result = await pool.query('SELECT * FROM questions WHERE id = $1', [questionId]);
        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Question not found.' });
        }
        res.status(200).json({ success: true, question: result.rows[0] });
    } catch (error) {
        console.error('Error fetching question:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

// @desc    Update a question
const updateQuestion = async (req, res, next) => {
    const questionId = req.params.id;
    const { title, description } = req.body;
    const userId = req.user.id;
    try {
        const question = await pool.query('SELECT * FROM questions WHERE id = $1', [questionId]);
        if (question.rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Question not found.' });
        }
        if (question.rows[0].user_id !== userId) {
            return res.status(403).json({ success: false, message: 'Not authorized to update this question.' });
        }
        const result = await pool.query(
            'UPDATE questions SET title = $1, description = $2 WHERE id = $3 RETURNING *',
            [title, description, questionId]
        );
        res.status(200).json({ success: true, question: result.rows[0] });
    } catch (error) {
        console.error('Error updating question:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

// @desc    Delete a question
const deleteQuestion = async (req, res, next) => {
    const questionId = req.params.id;
    const userId = req.user.id;
    try {
        const question = await pool.query('SELECT * FROM questions WHERE id = $1', [questionId]);
        if (question.rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Question not found.' });
        }
        if (question.rows[0].user_id !== userId) {
            return res.status(403).json({ success: false, message: 'Not authorized to delete this question.' });
        }
        await pool.query('DELETE FROM questions WHERE id = $1', [questionId]);
        res.status(200).json({ success: true, message: 'Question deleted.' });
    } catch (error) {
        console.error('Error deleting question:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

export default { createQuestion, getQuestions, getQuestionById, updateQuestion, deleteQuestion };
