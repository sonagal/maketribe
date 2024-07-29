import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import SellerRegistration from './components/SellerRegistration';
import BuyerRegistration from './components/BuyerRegistration';
import LoginPage from './components/LoginPage';
import CreateNewDesignPage from './components/CreateNewDesignPage';
import CreateVariationsPage from './components/CreateVariationsPage'; 
import ModifyExistingDesignPage from './components/ModifyExistingDesignPage';
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
  const isBuyerRegistration = location.pathname === '/buyer-registration';
  const isLoginPage = location.pathname === '/login';
  const isModifyExistingDesign = location.pathname === '/modify-existing-design';
  const isCreateVariationsDesign = location.pathname === '/create-variations';

  return (
    <div className="app-container">
      {!isLandingPage && !isSellerRegistration && !isBuyerRegistration && !isLoginPage && <Header />}
      <div className={`main-wrapper ${location.pathname === '/consumer' || location.pathname === '/consumer-landing' || isModifyExistingDesign || isCreateVariationsDesign ? 'no-sidebar' : ''}`}>
        {!isLandingPage && !isSellerRegistration && !isBuyerRegistration && !isLoginPage && location.pathname !== '/consumer' && location.pathname !== '/consumer-landing' && !isModifyExistingDesign && !isCreateVariationsDesign && <Sidebar />}
        <div className={`main-content ${isLandingPage || isSellerRegistration || isBuyerRegistration || isLoginPage || location.pathname === '/consumer' || location.pathname === '/consumer-landing' || isModifyExistingDesign || isCreateVariationsDesign ? 'full-width' : ''}`}>
          <Routes>
            <Route exact path="/" element={<CreateNewDesignPage />} />
            <Route path="/modify-existing-design" element={<ModifyExistingDesignPage />} />
            <Route path="/create-variations" element={<CreateVariationsPage />} /> 
            <Route path="/seller-registration" element={<SellerRegistration />} />
            <Route path="/buyer-registration" element={<BuyerRegistration />} />
            <Route path="/login" element={<LoginPage />} />
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
