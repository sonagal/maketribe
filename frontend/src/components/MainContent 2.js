import React from 'react';
import './MainContent.css';

function MainContent() {
  return (
    <main className="main-content">
      <section className="summary">
        <div className="summary-card">
          <h3>Revenue</h3>
          <p>$45,678.90</p>
          <p>+20% month over month</p>
        </div>
        <div className="summary-card">
          <h3>Items sold</h3>
          <p>2,405</p>
          <p>+33% month over month</p>
        </div>
        <div className="summary-card">
          <h3>Profit</h3>
          <p>10,353</p>
          <p>-4% month over month</p>
        </div>
      </section>
      <section className="orders">
        <h2>Orders</h2>
        <table>
          <thead>
            <tr>
              <th>Code</th>
              <th>Item</th>
              <th>Shop</th>
              <th>Status</th>
              <th>Date</th>
              <th>Process</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>FIG-123</td>
              <td>Handbag AA26541</td>
              <td>ABC Shop</td>
              <td>New</td>
              <td>Dec 5</td>
              <td>...</td>
            </tr>
            {/* Add more rows as needed */}
          </tbody>
        </table>
      </section>
      <section className="revenue-trend">
        <h2>Revenue trend</h2>
        <div className="trend-chart">
          {/* Placeholder for the chart */}
        </div>
      </section>
    </main>
  );
};

export default MainContent;
