import React from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PreOrdersPage from './components/PreOrdersPage';
import BidsPage from './components/BidsPage';
import MainContent from './components/MainContent';

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
              {/* Add other routes here */}
            </Routes>
          </div>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
