import React from 'react';
import './BidsPage.css';

function BidsPage() {
  return (
    <div className="bids-page">
      <h2>Bids</h2>
      <table>
        <thead>
          <tr>
            <th>Design</th>
            <th>User</th>
            <th>Description</th>
            <th>Number of Bids received</th>
            <th>Code</th>
            <th>Bid</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><img src="path/to/image1.jpg" alt="Design 1" /></td>
            <td>crazycat12</td>
            <td>White T-shirt with a print</td>
            <td>41</td>
            <td>t4565</td>
            <td><button className="proceed-button">Proceed</button></td>
          </tr>
          <tr>
            <td><img src="path/to/image2.jpg" alt="Design 2" /></td>
            <td>kindhedgehog</td>
            <td>Black short skirt</td>
            <td>512</td>
            <td>s78134</td>
            <td><button className="proceed-button">Proceed</button></td>
          </tr>
          <tr>
            <td><img src="path/to/image3.jpg" alt="Design 3" /></td>
            <td>curiouskoala3</td>
            <td>Neon blue backpack with yellow stripes</td>
            <td>11</td>
            <td>b4577</td>
            <td><button className="proceed-button">Proceed</button></td>
          </tr>
          <tr>
            <td><img src="path/to/image4.jpg" alt="Design 4" /></td>
            <td>pandapenguin</td>
            <td>Yellow strapless dress</td>
            <td>412</td>
            <td>d6654</td>
            <td><button className="proceed-button">Proceed</button></td>
          </tr>
          <tr>
            <td><img src="path/to/image5.jpg" alt="Design 5" /></td>
            <td>birdman11</td>
            <td>Red shopper</td>
            <td>387</td>
            <td>sh4578</td>
            <td><button className="proceed-button">Proceed</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default BidsPage;
