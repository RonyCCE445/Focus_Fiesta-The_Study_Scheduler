import React from 'react';
import { useNavigate } from 'react-router-dom';
import './FocusFiesta.css';

const FocusFiesta = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/auth');
  };

  return (
    <div className="app-container">
      <div className="card">
        <h1 className="focus-title">Focus Fiesta</h1>
        <p className="focus-subtitle">For your FunDamentals</p>
        <button className="focus-button" onClick={handleGetStarted}>
          Get Started →
        </button>
      </div>
    </div>
  );
};

export default FocusFiesta;
