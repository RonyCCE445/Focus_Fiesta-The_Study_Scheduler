import React from 'react';
import './form.css';

export default function Step1({ formData, updateFormData }) {
  const { subjects } = formData;

  const handleSubjectChange = (index, field, value) => {
    const updatedSubjects = [...subjects];
    updatedSubjects[index][field] = value;
    updateFormData({ subjects: updatedSubjects });
  };

  const addSubject = () => {
    updateFormData({ subjects: [...subjects, { name: '', chapters: '' }] });
  };

  const removeSubject = (index) => {
    const updatedSubjects = subjects.filter((_, i) => i !== index);
    updateFormData({ subjects: updatedSubjects });
  };

  return (
    <div>
      <h2>Step 1: Enter Your Subjects and Chapters</h2>
      {subjects.map((subject, index) => (
        <div key={index} className="subject-group">
          <input
            type="text"
            placeholder="Subject name"
            value={subject.name}
            onChange={(e) => handleSubjectChange(index, 'name', e.target.value)}
            required
          />
          <input
            type="number"
            min="1"
            placeholder="Number of chapters"
            value={subject.chapters}
            onChange={(e) => handleSubjectChange(index, 'chapters', e.target.value)}
            required
          />
          {subjects.length > 1 && (
            <button type="button" onClick={() => removeSubject(index)} className="remove-subject-btn">
              Remove
            </button>
          )}
        </div>
      ))}
      <button type="button" onClick={addSubject}>+ Add Subject</button>
    </div>
  );
}
