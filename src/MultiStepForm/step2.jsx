import React from 'react';
import './form.css';

export default function Step2({ formData, updateFormData }) {
  const { subjects, examDates } = formData;

  const handleExamDateChange = (subject, value) => {
    updateFormData({ examDates: { ...examDates, [subject]: value } });
  };

  return (
    <div>
      <h2>Step 2: Enter Exam Dates</h2>
      {subjects.map((subject, index) => (
        <div key={index} className="subject-group">
          <label>{subject.name || `Subject ${index + 1}`}</label>
          <input
            type="date"
            value={examDates[subject.name] || ''}
            onChange={(e) => handleExamDateChange(subject.name, e.target.value)}
            required
          />
        </div>
      ))}
    </div>
  );
}