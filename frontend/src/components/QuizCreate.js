import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const QuizCreate = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [timeLimit, setTimeLimit] = useState(30);
  const [questions, setQuestions] = useState([{ questionText: '', options: ['', '', '', ''], correctOption: 'A' }]);
  const navigate = useNavigate();

  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...questions];
    if (field === 'questionText') {
      newQuestions[index].questionText = value;
    } else if (field.startsWith('option')) {
      const optionIndex = parseInt(field.replace('option', '')) - 1;
      newQuestions[index].options[optionIndex] = value;
    } else if (field === 'correctOption') {
      newQuestions[index].correctOption = value;
    }
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([...questions, { questionText: '', options: ['', '', '', ''], correctOption: 'A' }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post('http://localhost:5000/api/quizzes', {
        title,
        description,
        timeLimit,
        questions
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate('/quizzes');
    } catch (error) {
      console.error('Error creating quiz:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Create New Quiz</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Time Limit (minutes)</label>
          <input type="number" className="form-control" value={timeLimit} onChange={(e) => setTimeLimit(e.target.value)} required />
        </div>
        {questions.map((question, index) => (
          <div key={index} className="mb-4">
            <h5>Question {index + 1}</h5>
            <div className="mb-3">
              <input type="text" className="form-control" placeholder="Question text" value={question.questionText} onChange={(e) => handleQuestionChange(index, 'questionText', e.target.value)} required />
            </div>
            {question.options.map((option, optIndex) => (
              <div key={optIndex} className="mb-2">
                <input type="text" className="form-control" placeholder={`Option ${String.fromCharCode(65 + optIndex)}`} value={option} onChange={(e) => handleQuestionChange(index, `option${optIndex + 1}`, e.target.value)} required />
              </div>
            ))}
            <div className="mb-3">
              <label className="form-label">Correct Option</label>
              <select className="form-select" value={question.correctOption} onChange={(e) => handleQuestionChange(index, 'correctOption', e.target.value)}>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
              </select>
            </div>
          </div>
        ))}
        <button type="button" className="btn btn-secondary me-2" onClick={addQuestion}>Add Question</button>
        <button type="submit" className="btn btn-primary">Create Quiz</button>
      </form>
    </div>
  );
};

export default QuizCreate;
