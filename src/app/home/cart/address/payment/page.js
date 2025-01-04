'use client'
import Link from 'next/link';

import "../../CartPage.css";

export default function page() {
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

        <div className="step active">
          <span className="circle">3</span> Payment
        </div>
      </div>

      {/* Main Content */}
      <div className="cart-content">
        {/* Cart Items Section */}
        <div className="cart-items">
        <div className="payment-container">
      <h2 className="payment-heading">Choose Payment Option</h2>
      <div className="payment-box">
        <label className="payment-option">
          <input type="radio" name="payment" defaultChecked />
          <span className="option-text">Cash on Delivery</span>
        </label>
        <label className="payment-option">
          <input type="radio" name="payment" />
          <span className="option-text">Phonepe Merchant</span>
        </label>
        <label className="payment-option">
          <input type="radio" name="payment" />
          <span className="option-text">Bank / EMI</span>
        </label>
      </div>
    </div>

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

          <Link href="payment/ordercomplete">
          <button className="checkout-btn">Proceed to Checkout</button>
  </Link>
        
        </div>
      </div>
    </div>

  )
}
