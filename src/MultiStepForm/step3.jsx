import React from "react";
import "./form.css";

export default function Step3({ formData, updateFormData }) {
  const subjects = formData.subjects ?? []; // ✅ Ensures subjects isn't undefined

  const handleDifficultyClick = (index, level) => {
    const updatedSubjects = [...subjects];
    updatedSubjects[index].difficulty = level;
    updateFormData({ subjects: updatedSubjects });
  };

  const getButtonClass = (subjectDifficulty, level) => {
    return subjectDifficulty === level ? level : "";
  };

  return (
    <div>
      <h2>Step 3: Select Study Difficulty</h2>
      {subjects.length > 0 ? (
        subjects.map((subject, index) => (
          <div key={index} className="subject-group">
            <span>{subject.name || `Subject ${index + 1}`}</span>
            <div>
              {["easy", "medium", "hard"].map((level) => (
                <button
                  key={level}
                  type="button"
                  className={getButtonClass(subject.difficulty, level)}
                  onClick={() => handleDifficultyClick(index, level)}
                >
                  {level.charAt(0).toUpperCase() + level.slice(1)} {/* ✅ Capitalize first letter */}
                </button>
              ))}
            </div>
          </div>
        ))
      ) : (
        <p>❌ No subjects added. Go back to Step 1 to add subjects.</p>
      )}
   </div>
  );
}
