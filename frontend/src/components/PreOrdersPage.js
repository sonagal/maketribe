import React from 'react';
import './PreOrdersPage.css';

const PreOrdersPage = () => {
  return (
    <div className="pre-orders-page">
      <h2>Pre-orders</h2>
      <table>
        <thead>
          <tr>
            <th>Design</th>
            <th>Order Code</th>
            <th>Design change suggestions</th>
            <th>Process</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><img src="/path/to/image1.jpg" alt="Design 1" /></td>
            <td>A65448</td>
            <td>Another material is suggested: Leather</td>
            <td><button className="process-button">Process</button></td>
          </tr>
          <tr>
            <td><img src="/path/to/image2.jpg" alt="Design 2" /></td>
            <td>A65449</td>
            <td>None</td>
            <td><button className="process-button">Process</button></td>
          </tr>
          <tr>
            <td><img src="/path/to/image3.jpg" alt="Design 3" /></td>
            <td>A65449</td>
            <td>Another color is suggested: Red</td>
            <td><button className="process-button">Process</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PreOrdersPage;
