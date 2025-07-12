import { pool } from '../config/database.js';

// @desc    Get all tags
const getTags = async (req, res, next) => {
    try {
        const result = await pool.query('SELECT * FROM tags ORDER BY name ASC');
        res.status(200).json({ success: true, tags: result.rows });
    } catch (error) {
        console.error('Error fetching tags:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

// @desc    Get questions by tag name
const getQuestionsByTag = async (req, res, next) => {
    const tagName = req.params.name;
    try {
        const tagResult = await pool.query('SELECT id FROM tags WHERE name = $1', [tagName]);
        if (tagResult.rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Tag not found.' });
        }
        const tagId = tagResult.rows[0].id;
        const questionsResult = await pool.query(
            `SELECT q.* FROM questions q
             JOIN question_tags qt ON q.id = qt.question_id
             WHERE qt.tag_id = $1
             ORDER BY q.created_at DESC`,
            [tagId]
        );
        res.status(200).json({ success: true, questions: questionsResult.rows });
    } catch (error) {
        console.error('Error fetching questions by tag:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

export default { getTags, getQuestionsByTag };
