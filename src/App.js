import React from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import PreOrdersPage from './components/PreOrdersPage';
import BidsPage from './components/BidsPage';
import MainContent from './components/MainContent';
import ConsumerPage from './components/ConsumerPage'; // Import the ConsumerPage
import ConsumerLandingPage from './components/ConsumerLandingPage'; // Import the ConsumerLandingPage


function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();

  return (
    <div className="app-container">
      <Header />
      <div className={`main-wrapper ${location.pathname === '/consumer' || location.pathname === '/consumer-landing' ? 'no-sidebar' : ''}`}>
        {location.pathname !== '/consumer' && location.pathname !== '/consumer-landing' && <Sidebar />}
        <div className={`main-content ${location.pathname === '/consumer' || location.pathname === '/consumer-landing' ? 'full-width' : ''}`}>
          <Routes>
            <Route exact path="/" element={<MainContent />} />
            <Route path="/pre-orders" element={<PreOrdersPage />} />
            <Route path="/bids" element={<BidsPage />} />
            <Route path="/consumer" element={<ConsumerPage />} /> {/* Add the new route */}
            <Route path="/consumer-landing" element={<ConsumerLandingPage />} /> {/* Add the new route */}
          </Routes>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
