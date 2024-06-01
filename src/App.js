import React from 'react';
import './App.css';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PreOrdersPage from './PreOrdersPage';
import BidsPage from './BidsPage';
import MainContent from './MainContent';
import ConsumerPage from './ConsumerPage'; // Import the ConsumerPage

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <div className="main-content">
          <Sidebar />
          <div className="content">
            <Routes>
              <Route exact path="/" element={<MainContent />} />
              <Route path="/pre-orders" element={<PreOrdersPage />} />
              <Route path="/bids" element={<BidsPage />} />
              <Route path="/consumer" element={<ConsumerPage />} /> {/* Add the new route */}
            </Routes>
          </div>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
