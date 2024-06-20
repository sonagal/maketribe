import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import SellerRegistration from './components/SellerRegistration';
import PreOrdersPage from './components/PreOrdersPage';
import BidsPage from './components/BidsPage';
import MainContent from './components/MainContent';
import ConsumerPage from './components/ConsumerPage';
import ConsumerLandingPage from './components/ConsumerLandingPage';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();

  const isLandingPage = location.pathname === '/';
  const isSellerRegistration = location.pathname === '/seller-registration';

  return (
    <div className="app-container">
      {!isLandingPage && !isSellerRegistration && <Header />}
      <div className={`main-wrapper ${location.pathname === '/consumer' || location.pathname === '/consumer-landing' ? 'no-sidebar' : ''}`}>
        {!isLandingPage && !isSellerRegistration && location.pathname !== '/consumer' && location.pathname !== '/consumer-landing' && <Sidebar />}
        <div className={`main-content ${isLandingPage || isSellerRegistration || location.pathname === '/consumer' || location.pathname === '/consumer-landing' ? 'full-width' : ''}`}>
          <Routes>
            <Route exact path="/" element={<LandingPage />} />
            <Route path="/seller-registration" element={<SellerRegistration />} />
            <Route path="/seller-dashboard" element={<MainContent />} />
            <Route path="/pre-orders" element={<PreOrdersPage />} />
            <Route path="/bids" element={<BidsPage />} />
            <Route path="/consumer" element={<ConsumerPage />} />
            <Route path="/consumer-landing" element={<ConsumerLandingPage />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
