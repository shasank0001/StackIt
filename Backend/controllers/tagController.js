// @desc    Get all tags
const getTags = (req, res, next) => {
    res.status(200).json({ success: true, message: 'Fetched all tags. (Placeholder)' });
};

// @desc    Get questions by tag name
const getQuestionsByTag = (req, res, next) => {
    res.status(200).json({ success: true, message: `Fetched questions for tag ${req.params.name}. (Placeholder)` });
};

export default { getTags, getQuestionsByTag };
