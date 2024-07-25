import React from 'react';
import { useNavigate } from 'react-router-dom';
import ConsumerHeader from './ConsumerHeader';
import Footer from './Footer'; // Shared footer
import './ConsumerLandingPage.css';
import landingImage from './ethnic_wardrobe.jpg'; // Use the uploaded image

// Add your actual image paths here
import productImage1 from "./pants.jpg";
import productImage2 from "./camer_dress.jpg";
import productImage3 from "./sari.jpg";
import productImage4 from "./purse.jpg";
import productImage5 from "./necklace.jpg";
import productImage6 from "./medditteranean_skirt.jpg";

function ConsumerLandingPage() {
  const navigate = useNavigate();

  const handleMakeATribeClick = () => {
    navigate('/consumer');
  };

  return (
    <div className="consumer-landing-page">
      <ConsumerHeader />
      <main className="main-content">
        <section className="hero-section">
          <img src={landingImage} alt="maketribe" className="hero-image" />
          <div className="hero-overlay">
            <h1>maketribe</h1>
            <p>
              Discover unique, personalized fashion created just for you. Our marketplace connects you with talented independent designers and small fashion brands to join our mission of reducing the global fashion production waste. Use our innovative AI tools to customize your own pieces or choose from pre-order collections. Earn fashion credits by making your tribes, rating designs and submitting pre-orders. Join us today and redefine your wardrobe with unique, ethical fashion.
            </p>
            <button className="hero-button" onClick={handleMakeATribeClick}>Click to design your clothes</button>
          </div>
        </section>
        <section className="categories-filter">
          <h2>Categories</h2>
          <div className="categories">
            <span>Women</span>
            <span>Men</span>
            <span>Kids</span>
          </div>
        </section>
        <section className="products-section">
          <div className="product-card">
            <img src={productImage1} alt="Armenian Style Pants" />
            <p>Armenian Style Pants by AM Designers</p>
            <span>96 EUR</span>
            <button className="order-button">Pre-order</button>
          </div>
          <div className="product-card">
            <img src={productImage2} alt="Cameroon style dress" />
            <p>Cameroon style dress by CM Shop</p>
            <span>120 EUR</span>
            <button className="order-button">Pre-order</button>
          </div>
          <div className="product-card">
            <img src={productImage3} alt="Modern Sari dress" />
            <p>Modern Sari dress by India Designs Shop</p>
            <span>256 EUR</span>
            <button className="order-button">Pre-order</button>
          </div>
          <div className="product-card">
            <img src={productImage4} alt="Dreamy Clutch" />
            <p>Dreamy Clutch by Ethno Shop</p>
            <span>110 EUR</span>
            <button className="order-button">Order</button>
          </div>
          <div className="product-card">
            <img src={productImage5} alt="Jaunde Necklace" />
            <p>Jaunde Necklace by Ethno Shop</p>
            <span>100 EUR</span>
            <button className="order-button">Order</button>
          </div>
          <div className="product-card">
            <img src={productImage6} alt="Mediterranean skirt" />
            <p>Mediterranean skirt by Meditera Shop</p>
            <span>80 EUR</span>
            <button className="order-button">Order</button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default ConsumerLandingPage;
