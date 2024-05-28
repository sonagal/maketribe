// Header.js
import React from 'react';
import './Header.css';
import profilePic from './profile-pic.png'; // Ensure this path is correct

function Header() {
  return (
    <div className="header">
      <div className="nav-links">
        <span className="nav-item">Dashboard</span>
        <span className="nav-item">Products</span>
        <span className="nav-item">Promotions</span>
        <span className="nav-item">Community</span>
      </div>
      <div className="logo-invite">
        <div className="logo">
          <span className="logo-dot">•</span>maketribe
        </div>
        <div className="invite">
          <button className="invite-button">Invite</button>
        </div>
      </div>
      <div className="profile">
        <img src={profilePic} alt="Profile" className="profile-pic" />
        <div className="dropdown-icon">▼</div>
      </div>
    </div>
  );
}

export default Header;
