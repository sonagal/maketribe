import React from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PreOrdersPage from './components/PreOrdersPage';
import BidsPage from './components/BidsPage';
import MainContent from './components/MainContent';
import ConsumerPage from './components/ConsumerPage'; // Import the ConsumerPage

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <div className="main-content">
          <Sidebar />
          <div className="content">
            <Routes>
              <Route exact path="/" element={<ConsumerPage />} />
              <Route path="/pre-orders" element={<PreOrdersPage />} />
              <Route path="/bids" element={<BidsPage />} />
              <Route path="/consumer" element={<MainContent />} /> {/* Add the new route */}
            </Routes>
          </div>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
