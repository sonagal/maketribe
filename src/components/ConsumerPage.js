import React from 'react';
import ConsumerHeader from './ConsumerHeader';
import Footer from './Footer'; // Shared footer
import './ConsumerPage.css';
import tribeImage from './make_your_own_tribe.png'; // Use the uploaded image


function ConsumerPage() {
  return (
    <div className="consumer-page">
      <ConsumerHeader />
      <main className="main-content">
        <section className="tribe-section">
          <div className="tribe-image-container">
            <img src={tribeImage} alt="Make your own Tribe" className="tribe-image" />
            <div className="overlay-text">
              <h1>Make your own Tribe</h1>
            </div>
          </div>
          <p className="intro-text">
            Invite your family and friends to join maketribe and enjoy our bonus points and discounts together.
            The bigger your tribe, the more benefits you will all get.
          </p>
        </section>
        <section className="make-tribe">
          <h2>Make a Tribe</h2>
          <form>
            <div className="form-group">
              <label htmlFor="tribe-name">1. Name your Tribe</label>
              <input type="text" id="tribe-name" placeholder="Wonderful Tribe" />
            </div>
            <div className="form-group">
              <label htmlFor="add-friends">2. Add friends</label>
              <input type="email" id="add-friends" placeholder="friend@example.com" />
            </div>
            <div className="form-group">
              <p>3. Enjoy benefits!</p>
              <p>
                Once your friends join maketribe and make their first purchase, you will be able to use all of the below mentioned benefits and more!
              </p>
            </div>
          </form>
          <table>
            <thead>
              <tr>
                <th>Tribe size</th>
                <th>Benefits</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>100 credits for each tribe member which can be used for generating 1 new design with our AI design tools</td>
              </tr>
              <tr>
                <td>5</td>
                <td>500 credits for each tribe member which can be used for generating 5 new designs with our AI design tools</td>
              </tr>
              <tr>
                <td>10</td>
                <td>10% discount on your next purchase and 500 credits to be used for generating 5 new designs with our AI design tools</td>
              </tr>
              <tr>
                <td>20</td>
                <td>20% discount on your next purchase and 500 credits to be used for generating 5 new designs with our AI design tools</td>
              </tr>
              <tr>
                <td>30</td>
                <td>30% discount on your next purchase and 500 credits to be used for generating 5 new designs with our AI design tools</td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default ConsumerPage;
