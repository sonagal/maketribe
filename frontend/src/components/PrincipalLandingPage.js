import React from 'react';
import { useNavigate } from 'react-router-dom';
import ConsumerHeader from './ConsumerHeader';
import Footer from './Footer'; // Shared footer
import './PrincipalLandingPage.css';
import landingImage from './image.png'; // Use the uploaded image

function PrincipalLandingPage() {
  const navigate = useNavigate();

  const handleBuyClick = () => {
    // Add navigation for the buy section if needed
  };

  const handleSellClick = () => {
    // Add navigation for the sell section if needed
  };

  return (
    <div className="principal-landing-page">
      <ConsumerHeader />
      <main className="main-content">
        <section className="hero-section">
          <img src={landingImage} alt="mission" className="hero-image" />
          <div className="hero-overlay">
            <p className="mission-text">Join our tribe’s mission to reduce textile waste and empower women</p>
          </div>
        </section>
        <section className="actions-section">
          <div className="action buy-action" onClick={handleBuyClick}>
            <h2>I want to buy</h2>
            <ul>
              <li>Get early access to unique designs by talented Fashion designers</li>
              <li>Make your own custom designs and order exactly what you want</li>
              <li>Make your own tribe to support our mission and enjoy great benefits</li>
            </ul>
          </div>
          <div className="action sell-action" onClick={handleSellClick}>
            <h2>I want to sell</h2>
            <ul>
              <li>Get access to our AI-driven design tools to make designing of apparel faster and more fun</li>
              <li>Get pre-orders on your designs before actually making them</li>
              <li>Reduce your unsold inventory by redesigning unsold items and finding the right customer based on our AI-tools</li>
              <li>Save money and save the environment by producing only what is required!</li>
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default PrincipalLandingPage;
