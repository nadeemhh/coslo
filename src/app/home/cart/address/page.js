'use client'
import Link from 'next/link';

import "../CartPage.css";
import AddressSection from '../../../component/AddressSection.js'

const AddressPage = () => {
  
    
  return (
    <div className="cart-container">
      {/* Breadcrumbs */}
      {/* <nav className="breadcrumb">
        <span>Home</span> &gt; <span>Checkout</span>
      </nav> */}

      {/* Steps */}
      <div className="steps">
        <div className="step active">
          <span className="circle">1</span> Cart Items
        </div>

        <div className="step-line">
       
        </div>

        <div className="step active">
          <span className="circle">2</span> Shipping Address
        </div>

        <div className="step-line">
       
        </div>

        <div className="step">
          <span className="circle">3</span> Payment
        </div>
      </div>

      {/* Main Content */}
      <div className="cart-content">
        {/* Cart Items Section */}
        <div className="cart-items">
        <AddressSection/>

        </div>

        {/* Order Summary Section */}
        <div className="order-summary">
          <h3>Order Summary</h3>
          <div className="summary-row">
            <span>Total Price:</span> <span>₹ 24542/-</span>
          </div>
          <div className="summary-row">
            <span>Total CGST:</span> <span>5%</span>
          </div>
          <div className="summary-row">
            <span>Total SGST:</span> <span>5%</span>
          </div>
          <div className="summary-row">
            <span>Shipping Charges:</span> <span>₹ 128/-</span>
          </div>
          <hr />
          <div className="summary-total">
            <span>Total:</span> <span>₹ 27392/-</span>
          </div>
          <Link href="address/payment">
          <button className="checkout-btn">Proceed to Checkout →</button>
          </Link>
        </div>
      </div>
    </div>

  );
};

export default AddressPage;
