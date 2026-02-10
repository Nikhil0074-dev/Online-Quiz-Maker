const Quiz = require('../models/Quiz');
const Result = require('../models/Result');

exports.getQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find().populate('createdBy', 'name');
    res.json(quizzes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    res.json(quiz);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.createQuiz = async (req, res) => {
  try {
    const { title, description, timeLimit, questions } = req.body;

    const quiz = new Quiz({
      title,
      description,
      timeLimit,
      questions,
      createdBy: req.user.id,
    });

    await quiz.save();
    res.json(quiz);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.submitQuiz = async (req, res) => {
  try {
    const { answers } = req.body;
    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    let score = 0;
    const totalMarks = quiz.questions.length;
    const answerDetails = [];

    quiz.questions.forEach((question, index) => {
      const selectedOption = answers[question._id];
      const isCorrect = selectedOption === question.correctOption;
      if (isCorrect) {
        score++;
      }
      answerDetails.push({
        question: question._id,
        selectedOption,
        isCorrect,
      });
    });

    const result = new Result({
      user: req.user.id,
      quiz: req.params.id,
      score,
      totalMarks,
      answers: answerDetails,
    });

    await result.save();
    res.json({ resultId: result._id, score, totalMarks });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
