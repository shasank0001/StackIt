// @desc    Get user profile
const getUserProfile = (req, res, next) => {
    res.status(200).json({ success: true, message: `Fetched profile for user ${req.params.id}. (Placeholder)` });
};

export default { getUserProfile };
