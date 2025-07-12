import { pool } from '../config/database.js';

// @desc    Get user profile
const getUserProfile = async (req, res, next) => {
    const userId = req.params.id;
    try {
        const userResult = await pool.query(
            'SELECT id, fullname, email, created_at FROM users WHERE id = $1',
            [userId]
        );
        if (userResult.rows.length === 0) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        const user = userResult.rows[0];
        res.status(200).json({ success: true, user });
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

export default { getUserProfile };
