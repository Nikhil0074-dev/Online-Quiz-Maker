const Result = require('../models/Result');

exports.getResult = async (req, res) => {
  try {
    const result = await Result.findById(req.params.id).populate('user', 'name').populate('quiz', 'title');
    if (!result) {
      return res.status(404).json({ message: 'Result not found' });
    }
    // Check if the result belongs to the authenticated user
    if (result.user._id.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }
    res.json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getUserResults = async (req, res) => {
  try {
    const results = await Result.find({ user: req.user.id }).populate('quiz', 'title').sort({ takenAt: -1 });
    res.json(results);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
