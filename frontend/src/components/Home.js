import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8 offset-md-2 text-center">
          <h1 className="display-4">Welcome to Online Quiz Maker</h1>
          <p className="lead">Create, take, and manage quizzes with ease.</p>
          <div className="mt-4">
            <Link to="/quizzes" className="btn btn-primary btn-lg me-3">Browse Quizzes</Link>
            <Link to="/register" className="btn btn-outline-primary btn-lg">Get Started</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
