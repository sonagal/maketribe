import React from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import './LoginPage.css';

function LoginPage() {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate('/');
  };

  return (
    <div className="login-page">
      <main className="main-content">
        <img src="/women_nature.png" alt="Empower Women" className="header-image" />
        <h1 className="mission-statement">
          Login to continue supporting our global cause of empowering women
        </h1>
        <form className="login-form">
          <label>
            Email
            <input type="email" name="email" />
          </label>
          <label>
            Password
            <input type="password" name="password" />
          </label>
          <a href="/forgot-password" className="forgot-password-link">forgot your password?</a>
          <button type="submit">Login</button>
        </form>
        <button className="register-button" onClick={handleRegisterClick}>
          Register here
        </button>
      </main>
      <Footer />
    </div>
  );
}

export default LoginPage;
