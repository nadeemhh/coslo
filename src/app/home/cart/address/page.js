'use client'
import Link from 'next/link';

import "../CartPage.css";
import AddressSection from '../../../component/AddressSection.js'
import {useState,useEffect} from 'react';


const AddressPage = () => {
  
    const [OrderSummary, setOrderSummary]=useState(null);
    const [isaddress, setisaddress]=useState(false);

    useEffect(() => {
      const storedCartData = JSON.parse(sessionStorage.getItem("cartData"));
      console.log(storedCartData);
      setOrderSummary(storedCartData)
    }, []);
  
  return (
    <div className="cart-container">
      {/* Breadcrumbs */}
      {/* <nav className="breadcrumb">
        <span>Home</span> &gt; <span>Checkout</span>
      </nav> */}

      {/* Steps */}
      <div className="steps">
        <Link className="step active" href={`/home/cart`}>
          <span className="circle">1</span> Cart Items
        </Link>

        <div className="step-line">
       
        </div>

        <Link className="step active" href={`/home/cart/address`}>
          <span className="circle">2</span> Shipping Address
        </Link>

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
        <AddressSection isaddress={isaddress} setisaddress={setisaddress} fontsize={'22px'}/>

        </div>

        {/* Order Summary Section */}
        { OrderSummary && isaddress && <div className="order-summary">
          <h3>Order Summary</h3>
          <div className="summary-row">
            <span>Sub Total:</span> <span>₹ {OrderSummary.totalBaseAmount}</span>
          </div>
          <div className="summary-row">
            <span>Total Discount:</span> <span>₹ {OrderSummary.cartTotalDiscountAmount}</span>
          </div>
        
          <div className="summary-row">
            <span>Total CGST:</span> <span>₹ {OrderSummary.cgstAmount}</span>
          </div>
          <div className="summary-row">
            <span>Total SGST:</span> <span>₹ {OrderSummary.sgstAmount}</span>
          </div>
          <div className="summary-row">
            <span>Shipping Charges:</span> <span>₹ {OrderSummary.shippingFee}</span>
          </div>
          <hr />
          <div className="summary-total">
            <span>Total:</span> <span>₹ {OrderSummary.finalAmount}</span>
          </div>
          <Link href="address/payment">
          <button className="checkout-btn">Proceed to Checkout</button>
          </Link>
        </div>}
      </div>
    </div>

  );
};

export default AddressPage;
