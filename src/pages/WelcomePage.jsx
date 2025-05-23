// src/pages/WelcomePage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './WelcomePage.css';

const WelcomePage = () => {
  const navigate = useNavigate();

  const handleAgree = () => {
    navigate('/subject-input'); // Adjust the route to your form page
  };

  return (
    <div className="welcome-wrapper">
      <div className="welcome-card">
        <h1>Welcome to Focus Fiesta!</h1>
        <p>
          After you log in or sign up, please provide your subjects, chapters, and exam dates.
          This will help us create a personalized study schedule for you.
        </p>
        <button onClick={handleAgree} className="agree-btn">
          Agree and Continue
        </button>
      </div>
    </div>
  );
};

export default WelcomePage;
