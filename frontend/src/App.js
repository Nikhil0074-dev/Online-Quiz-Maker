import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import QuizList from './components/QuizList';
import QuizCreate from './components/QuizCreate';
import QuizTake from './components/QuizTake';
import Result from './components/Result';
import Login from './components/Login';
import Register from './components/Register';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quizzes" element={<QuizList />} />
          <Route path="/create-quiz" element={<QuizCreate />} />
          <Route path="/take-quiz/:id" element={<QuizTake />} />
          <Route path="/result/:id" element={<Result />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
