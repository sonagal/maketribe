import React from 'react';
import './Header.css';
import profilePic from './profile-pic.png'; // Ensure this path is correct
import logo from './Logo_maketribe.png'; // Import the logo image

function Header() {
  return (
    <div className="header">
      <div className="nav-links">
        <span className="nav-item">Dashboard</span>
        <span className="nav-item">Products</span>
        <span className="nav-item">Promotions</span>
        <span className="nav-item">Community</span>
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

export default Header;
