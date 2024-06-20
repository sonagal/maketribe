import React from 'react';
import Footer from './Footer';
import './SellerRegistration.css';

function SellerRegistration() {
  return (
    <div className="seller-registration-page">
      <main className="main-content">
        <img src="/women_nature.png" alt="Empower Women" className="header-image" />
        <h1 className="mission-statement">
          Register to save time on designing and to be able to test your design concepts before producing them
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
          <label>
            Shop name
            <input type="text" name="shopName" />
          </label>
          <label>
            Shop country
            <input type="text" name="shopCountry" />
          </label>
          <label>
            Female owned
            <select name="femaleOwned">
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </label>
          <label>
            Product categories
            <input type="text" name="productCategories" />
          </label>
          <label>
            Tax ID
            <input type="text" name="taxId" />
          </label>
          <label className="checkbox-label">
            <input type="checkbox" name="agree" />
            I agree to maketribe’s data privacy policy
          </label>
          <button type="submit">Register</button>
        </form>
      </main>
      <Footer />
    </div>
  );
}

export default SellerRegistration;
