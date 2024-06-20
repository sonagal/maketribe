import React from 'react';
import { useNavigate } from 'react-router-dom';
import LandingPageHeader from './LandingPageHeader';
import Footer from './Footer';
import './LandingPage.css';

function LandingPage() {
  const navigate = useNavigate();

  const handleSellClick = () => {
    navigate('/seller-registration');
  };

  const handleBuyClick = () => {
    navigate('/buyer-registration');
  };

  return (
    <div className="landing-page">
      <LandingPageHeader />
      <main className="main-content">
        <img src="/women_nature.png" alt="Empower Women" className="header-image" />
        <h1 className="mission-statement">
          Join our tribe’s mission to reduce textile waste and empower women
        </h1>
        <div className="cta-section">
          <div className="cta-box-wrapper">
            <div className="cta-box buy" onClick={handleBuyClick}>
              <h2>I want to buy</h2>
            </div>
            <ul className="cta-text">
              <li>Get early access to unique designs by talented Fashion designer</li>
              <li>Make your own custom designs and order exactly what you want</li>
              <li>Make your own tribe to support our mission and enjoy great benefits</li>
            </ul>
          </div>
          <div className="cta-box-wrapper">
            <div className="cta-box sell" onClick={handleSellClick}>
              <h2>I want to sell</h2>
            </div>
            <ul className="cta-text">
              <li>Get access to our AI-driven design tools to make designing of apparel faster and more fun</li>
              <li>Get pre-orders on your designs before actually making them</li>
              <li>Reduce your unsold inventory by redesigning unsold items and finding the right customer based on our AI-tools</li>
              <li>Save money and save the environment by producing only what is required!</li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default LandingPage;
