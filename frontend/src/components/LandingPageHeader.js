import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPageHeader.css';
import logo from './Logo_maketribe.png'; // Import the logo image

function LandingPageHeader() {
  const navigate = useNavigate();

  const handleMakeATribeClick = () => {
    navigate('/consumer');
  };

  const handleLoginClick = () => {
    navigate('/login'); // Adjust the path as needed for your login page
  };

  return (
    <div className="landing-page-header">
      <div className="nav-links">
        <span className="nav-item">Shop</span>
        <span className="nav-item">Create & Submit</span>
        <span className="nav-item">Rate & Earn</span>
        <span className="nav-item" onClick={handleMakeATribeClick}>Make a Tribe</span>
      </div>
      <div className="right-section">
        <div className="logo">
          <img src={logo} alt="Logo" className="logo-image" />
        </div>
        <div className="login">
          <button className="login-button" onClick={handleLoginClick}>Login</button>
        </div>
      </div>
    </div>
  );
}

export default LandingPageHeader;
