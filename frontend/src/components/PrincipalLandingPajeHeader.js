
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ConsumerHeader.css';
import profilePic from './profile-pic.png'; // Ensure this path is correct
import logo from './Logo_maketribe.png'; // Import the logo image

function ConsumerHeader() {
  const navigate = useNavigate();

  const handleMakeATribeClick = () => {
    navigate('/consumer');
  };

  return (
    <div className="consumer-header">
      <div className="nav-links">
        <span className="nav-item">Shop</span>
        <span className="nav-item">Create & Submit</span>
        <span className="nav-item">Rate & Earn</span>
        <span className="nav-item" onClick={handleMakeATribeClick}>Make a Tribe</span> {/* Add onClick handler */}
      </div>
      <div className="right-section">
        <div className="logo">
          <img src={logo} alt="Logo" className="logo-image" />
        </div>
        <div className="invite">
          <button className="invite-button">Invite</button>
        </div>
        <div className="profile">
          <img src={profilePic} alt="Profile" className="profile-pic" />
          <div className="dropdown-icon">▼</div>
        </div>
      </div>
    </div>
  );
}

export default ConsumerHeader;


