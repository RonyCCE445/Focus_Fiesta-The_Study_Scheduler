// AboutPage.jsx
import React from 'react';
import './AboutPage.css';  // Optional: for styling

const AboutPage = () => {
  return (
    <div className="about-container">
      <h1>About Focus Fiesta</h1>

      <section className="features">
        <h2>Features</h2>
        <ul>
          <li>Fun and interactive study routines</li>
          <li>Pomodoro timer to boost productivity</li>
          <li>Customizable schedules based on your subjects and exams</li>
          <li>Progress tracking to keep you motivated</li>
          <li>Light, Dark, and Eye Comfort mode for better usability</li>
        </ul>
      </section>

      <section className="developer-info">
        <h2>About the Developer</h2>
        <p>
          Hi! I am Koustav Chakraborty, a passionate learner and aspiring filmmaker with a keen interest in creating engaging and helpful digital tools. This app is built to make studying enjoyable and effective for everyone.
        </p>
      </section>
    </div>
  );
};

export default AboutPage;
