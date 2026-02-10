import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const QuizTake = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/quizzes/${id}`);
        setQuiz(response.data);
        setTimeLeft(response.data.timeLimit * 60); // Convert to seconds
      } catch (error) {
        console.error('Error fetching quiz:', error);
      }
    };
    fetchQuiz();
  }, [id]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && quiz) {
      handleSubmit();
    }
  }, [timeLeft, quiz]);

  const handleAnswerChange = (questionId, answer) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(`http://localhost:5000/api/quizzes/${id}/submit`, { answers }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate(`/result/${response.data.resultId}`);
    } catch (error) {
      console.error('Error submitting quiz:', error);
    }
  };

  if (!quiz) return <div>Loading...</div>;

  const question = quiz.questions[currentQuestion];

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>{quiz.title}</h2>
        <div>Time Left: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</div>
      </div>
      <div className="card">
        <div className="card-body">
          <h5>Question {currentQuestion + 1} of {quiz.questions.length}</h5>
          <p>{question.questionText}</p>
          {question.options.map((option, index) => (
            <div key={index} className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name={`question-${question._id}`}
                value={String.fromCharCode(65 + index)}
                onChange={(e) => handleAnswerChange(question._id, e.target.value)}
                checked={answers[question._id] === String.fromCharCode(65 + index)}
              />
              <label className="form-check-label">
                {String.fromCharCode(65 + index)}. {option}
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-3">
        {currentQuestion > 0 && (
          <button className="btn btn-secondary me-2" onClick={() => setCurrentQuestion(currentQuestion - 1)}>Previous</button>
        )}
        {currentQuestion < quiz.questions.length - 1 ? (
          <button className="btn btn-primary" onClick={() => setCurrentQuestion(currentQuestion + 1)}>Next</button>
        ) : (
          <button className="btn btn-success" onClick={handleSubmit}>Submit Quiz</button>
        )}
      </div>
    </div>
  );
};

export default QuizTake;
