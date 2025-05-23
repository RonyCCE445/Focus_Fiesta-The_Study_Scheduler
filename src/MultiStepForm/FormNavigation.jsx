import React from 'react';

export default function FormNavigation({ currentStep, totalSteps, next, back, submit }) {
  return (
    <div className="form-navigation" style={{ marginTop: '20px' }}>
      {currentStep > 1 && (
        <button type="button" onClick={back}>
          Back
        </button>
      )}
      {currentStep < totalSteps && (
        <button type="button" onClick={next} style={{ marginLeft: '10px' }}>
          Next
        </button>
      )}
      {currentStep === totalSteps && (
        <button type="button" onClick={submit} style={{ marginLeft: '10px' }}>
          Submit
        </button>
      )}
    </div>
  );
}
