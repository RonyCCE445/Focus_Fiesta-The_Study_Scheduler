// src/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

// 👇 Import icons from react-icons
import { FiSun, FiMoon, FiEye } from 'react-icons/fi';

const Navbar = () => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  useEffect(() => {
    document.body.className = '';
    document.body.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    if (theme === 'light') setTheme('dark');
    else if (theme === 'dark') setTheme('eyecomfort');
    else setTheme('light');
  };

  const renderThemeIcon = () => {
    if (theme === 'light') return <FiSun size={20} />;
    if (theme === 'dark') return <FiMoon size={20} />;
    return <FiEye size={20} />;
  };

  return (
    <header>
      <nav className="navbar">
        <div className="nav-brand">Focus Fiesta</div>
        <div className="nav-links">
          <Link to="/">Login/Signup</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/about">About</Link>
          <button onClick={toggleTheme} className="theme-toggle-btn">
      <span title="Toggle Theme">{renderThemeIcon()}</span>
    </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
