import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Result = () => {
  const { id } = useParams();
  const [result, setResult] = useState(null);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:5000/api/results/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setResult(response.data);
      } catch (error) {
        console.error('Error fetching result:', error);
      }
    };
    fetchResult();
  }, [id]);

  if (!result) return <div>Loading...</div>;

  return (
    <div className="container mt-5">
      <h2>Quiz Result</h2>
      <div className="card">
        <div className="card-body">
          <h5>Score: {result.score} / {result.totalMarks}</h5>
          <p>Percentage: {((result.score / result.totalMarks) * 100).toFixed(2)}%</p>
          <p>Taken at: {new Date(result.takenAt).toLocaleString()}</p>
          {result.score >= result.totalMarks * 0.7 && (
            <button className="btn btn-success">Download Certificate</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Result;
