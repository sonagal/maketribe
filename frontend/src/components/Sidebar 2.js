// Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FaClipboardList, FaBoxOpen, FaStar, FaGavel, FaMoneyCheckAlt, FaEdit } from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <nav>
        <ul>
          <li>
            <Link to="/pre-orders">
              <FaClipboardList /> Pre-orders
            </Link>
          </li>
          <li>
            <Link to="/">
              <FaBoxOpen /> Orders
            </Link>
          </li>
          <li>
            <Link to="/">
              <FaStar /> Design ratings
            </Link>
          </li>
          <li>
            <Link to="/bids">
              <FaGavel /> Bids
            </Link>
          </li>
        </ul>
      </nav>
      <nav>
        <ul>
          <li>
            <Link to="/">
              <FaMoneyCheckAlt /> Costs Summary
            </Link>
          </li>
          <li>
            <Link to="/">
              <FaEdit /> Manage Costs
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
