// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
// You would also import your User model here to find the user from the token
// const User = require('../models/User');

exports.protect = (req, res, next) => {
    let token;

    // Check for token in the authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // In a real app, you would get user from the token and attach it to the request
            // req.user = await User.findById(decoded.id).select('-password');

            console.log('Token is valid');
            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ success: false, message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ success: false, message: 'Not authorized, no token' });
    }
};
