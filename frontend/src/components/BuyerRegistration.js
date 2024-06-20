import React from 'react';
import Footer from './Footer';
import './BuyerRegistration.css';

function BuyerRegistration() {
  return (
    <div className="buyer-registration-page">
      <main className="main-content">
        <img src="/women_nature.png" alt="Empower Women" className="header-image" />
        <h1 className="mission-statement">
          Register to join our tribe’s mission to reduce textile waste and empower women
        </h1>
        <form className="registration-form">
          <label>
            Name
            <input type="text" name="name" />
          </label>
          <label>
            Email
            <input type="email" name="email" />
          </label>
          <label>
            Password
            <input type="password" name="password" />
          </label>
          <label className="checkbox-label">
            <input type="checkbox" name="agree" />
            I agree to maketribe’s data privacy policy
          </label>
          <label className="checkbox-label">
            <input type="checkbox" name="newsletter" />
            I want to get 500 credit points by subscribing to the newsletter.
          </label>
          <button type="submit">Register</button>
        </form>
      </main>
      <Footer />
    </div>
  );
}

export default BuyerRegistration;
