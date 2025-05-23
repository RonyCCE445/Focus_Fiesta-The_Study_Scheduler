import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import FocusFiesta from './focusfiesta';
import AuthPage from './AuthPage';
import AboutPage from './AboutPage';
import { supabase } from './supabaseClient'; 
import './index.css';
import WelcomePage from './pages/WelcomePage';
import { Navigate } from 'react-router-dom';
import MultiStepForm from './pages/StudyInputFormPage';
import StudyInputFormPage from './pages/StudyInputFormPage';
import UserProfile from './pages/UserProfile';




function App() {
  
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth Event:', event);
      console.log('Auth Session:', session);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <Routes>
          <Route path="/" element={<FocusFiesta />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/about" element={<AboutPage />} />
           <Route path="/welcome" element={<WelcomePage />} />
           <Route path="*" element={<Navigate to="/welcome" replace />} />
            <Route path="/subject-input" element={<StudyInputFormPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
