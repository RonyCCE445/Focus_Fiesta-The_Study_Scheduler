import React from 'react';
import MultiStepForm from '../MultiStepForm/MultiStepForm';

export default function StudyInputFormPage() {
  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
      <h1>Setup Your Study Routine</h1>
      <MultiStepForm />
    </div>
  );
}
