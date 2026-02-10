const express = require('express');
const router = express.Router();
const { getQuizzes, getQuiz, createQuiz, submitQuiz } = require('../controllers/quizController');
const auth = require('../middleware/auth');

router.get('/', getQuizzes);
router.get('/:id', getQuiz);
router.post('/', auth, createQuiz);
router.post('/:id/submit', auth, submitQuiz);

module.exports = router;
