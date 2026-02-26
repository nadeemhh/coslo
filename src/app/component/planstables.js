'use client'

import { useState } from "react";


export default function PlansTable({ showbuybuttons = true, hidetry = false }) {

  const handleBuy = async (selectedPlan) => {

    // Check if token exists in localStorage
    const token = localStorage.getItem('token');

    // If token does not exist, redirect to login with the revert query parameter
    if (!token) {
      window.location.href = '/auth/sup-manu/login?revert=planspage';
      return;
    }

    // If token exists, send POST request to start subscription with the selected plan
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/subscription/start`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ plan: selectedPlan })
      });

      if (!response.ok) {
        const data = await response.json();
        console.log(data);
        alert(data.error)
        return;
      }

      // Assuming the response returns a JSON with the payment URL
      const data = await response.json();

      const paymentUrl = data.paymentUrl;
      if (paymentUrl) {
        // Redirect to the payment URL
        window.location.href = paymentUrl;
      }
    } catch (error) {
      console.error('Error starting subscription:', error);
    }
  };



  return (
    <table className="table-101" id="cosloplans">
      <thead className="thead-101">
        <tr>
          <th className="feature-header-101">Features</th>
          <th className="plan-header-101">Free</th>
          <th className="plan-header-101">Monthly</th>
          <th className="plan-header-101">Yearly</th>
        </tr>
      </thead>
      <tbody className="tbody-101">

        <tr>
          <td>Price</td>
          <td>₹0</td>
          <td>₹3000</td>
          <td>₹30000</td>
        </tr>

        <tr>
          <td>Buyers Leads</td>
          <td><i className="fas fa-times not-available"></i></td>
          <td>15 to 20 leads /month</td>
          <td>25 to 30 leads /month</td>
        </tr>

        <tr>
          <td>Registration & Validation</td>
          <td><i className="fas fa-check available"></i></td>
          <td><i className="fas fa-check available"></i></td>
          <td><i className="fas fa-check available"></i></td>
        </tr>
        <tr>
          <td>Integrated Trusted Payment Gateway</td>
          <td><i className="fas fa-check available"></i></td>
          <td><i className="fas fa-check available"></i></td>
          <td><i className="fas fa-check available"></i></td>
        </tr>
        <tr>
          <td>Integrated Delivery Partner</td>
          <td><i className="fas fa-check available"></i></td>
          <td><i className="fas fa-check available"></i></td>
          <td><i className="fas fa-check available"></i></td>
        </tr>
        <tr>
          <td>Unlimited Product Listing</td>
          <td><i className="fas fa-check available"></i></td>
          <td><i className="fas fa-check available"></i></td>
          <td><i className="fas fa-check available"></i></td>
        </tr>
        <tr>
          <td>Chat with Buyers in WhatsApp</td>
          <td><i className="fas fa-check available"></i></td>
          <td><i className="fas fa-check available"></i></td>
          <td><i className="fas fa-check available"></i></td>
        </tr>
        <tr>
          <td>Recommended Supplier Badge Display</td>
          <td><i className="fas fa-check available"></i></td>
          <td><i className="fas fa-check available"></i></td>
          <td><i className="fas fa-check available"></i></td>
        </tr>
        <tr>
          <td>Compliance/Quality Certificate Display</td>
          <td><i className="fas fa-check available"></i></td>
          <td><i className="fas fa-check available"></i></td>
          <td><i className="fas fa-check available"></i></td>
        </tr>
        <tr>
          <td>Dedicated Customer Support Team</td>
          <td><i className="fas fa-check available"></i></td>
          <td><i className="fas fa-check available"></i></td>
          <td><i className="fas fa-check available"></i></td>
        </tr>
        <tr>
          <td>Social Media Integration</td>
          <td><i className="fas fa-check available"></i></td>
          <td><i className="fas fa-check available"></i></td>
          <td><i className="fas fa-check available"></i></td>
        </tr>
        <tr>
          <td>Coslomart Minimum Order Support</td>
          <td><i className="fas fa-times not-available"></i></td>
          <td><i className="fas fa-check available"></i></td>
          <td><i className="fas fa-check available"></i></td>
        </tr>
        <tr>
          <td>Unlimited AI support for image editing</td>
          <td><i className="fas fa-times not-available"></i></td>
          <td><i className="fas fa-times not-available"></i></td>
          <td><i className="fas fa-check available"></i></td>
        </tr>
        <tr>
          <td>100% Refund if no leads or sales</td>
          <td><i className="fas fa-times not-available"></i></td>
          <td><i className="fas fa-times not-available"></i></td>
          <td><i className="fas fa-check available"></i></td>
        </tr>
        <tr>
          <td>Per Day Cost</td>
          <td>₹0</td>
          <td>₹100</td>
          <td>₹82</td>
        </tr>


        {showbuybuttons && <tr>
          <td>Purchase Plan</td>
          <td>

            {hidetry === false && <a href="/auth/sup-manu/choose"><button style={{ backgroundColor: '#1389F0', padding: '2px 8px', border: 'none', color: 'white', borderRadius: '2px', fontSize: '16px' }}>Try</button></a>}
          </td>
          <td>

            <button style={{ backgroundColor: '#1389F0', padding: '2px 8px', border: 'none', color: 'white', borderRadius: '2px', fontSize: '16px' }} onClick={() => handleBuy('MONTHLY')}>Buy</button>

          </td>
          <td>

            <button style={{ backgroundColor: '#1389F0', padding: '2px 8px', border: 'none', color: 'white', borderRadius: '2px', fontSize: '16px' }} onClick={() => handleBuy('YEARLY')}>Buy</button>

          </td>
        </tr>
        }

      </tbody>
    </table>
  )
}
