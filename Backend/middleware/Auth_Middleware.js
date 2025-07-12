import jwt from 'jsonwebtoken';
import { pool } from '../config/database.js';

// @desc    Protect routes - Authentication middleware
const protect = async (req, res, next) => {
    try {
        let token;

        // Check for token in cookies first, then in Authorization header
        if (req.cookies.token) {
            token = req.cookies.token;
        } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Not authorized to access this route'
            });
        }

        try {
            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            // Get user from database
            const userQuery = `
                SELECT id, username, email, role, created_at 
                FROM users 
                WHERE id = $1
            `;
            const userResult = await pool.query(userQuery, [decoded.id]);

            if (userResult.rows.length === 0) {
                return res.status(401).json({
                    success: false,
                    message: 'User not found'
                });
            }

            req.user = userResult.rows[0];
            next();

        } catch (error) {
            return res.status(401).json({
                success: false,
                message: 'Not authorized to access this route'
            });
        }

    } catch (error) {
        console.error('Auth middleware error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// @desc    Grant access to specific roles
const authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: `User role ${req.user.role} is not authorized to access this route`
            });
        }
        next();
    };
};

// @desc    Optional authentication - doesn't block if no token
const optionalAuth = async (req, res, next) => {
    try {
        let token;

        // Check for token in cookies first, then in Authorization header
        if (req.cookies.token) {
            token = req.cookies.token;
        } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (token) {
            try {
                // Verify token
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                
                // Get user from database
                const userQuery = `
                    SELECT id, username, email, role, created_at 
                    FROM users 
                    WHERE id = $1
                `;
                const userResult = await pool.query(userQuery, [decoded.id]);

                if (userResult.rows.length > 0) {
                    req.user = userResult.rows[0];
                }
            } catch (error) {
                // Token is invalid, but we continue without setting req.user
                console.log('Invalid token in optional auth');
            }
        }

        next();

    } catch (error) {
        console.error('Optional auth middleware error:', error);
        next(); // Continue even if there's an error
    }
};

export { protect, authorize, optionalAuth };