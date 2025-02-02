'use client'
import Link from 'next/link';

import "./CartPage.css";
import Cartcar from '../../component/cartcard.js'
import {useState,useEffect} from 'react';

const CartPage = () => {

  const getdata = () => {
    const token = localStorage.getItem('token');

    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/cart`, {
      method: 'GET',
       headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }), // Add token if it exists
    },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return response.json().then((errorData) => {
           
            throw new Error(errorData.error || 'Failed');
          });
        }
      })
      .then((data) => {
        console.log(data)
        document.querySelector('.loaderoverlay').style.display = 'none';
       
      })
      .catch((err) => {
        document.querySelector('.loaderoverlay').style.display = 'none';
        console.log(err)
        alert(err);
       
      });
  };

  useEffect(() => {
    getdata()
  }, []);

 
  return (<>
  
  {/* %%% Cart Items status */}

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

        <div className="step">
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
          <div style={{display:'flex',justifyContent:'space-between'}}>
          <p style={{fontSize:'19px',fontWeight:'500'}}>Cart (8)</p>
          <button className="clear-cart">Clear Cart</button>
          </div>

          <div className="card-container">
     
          <Cartcar show={true}/>
          <Cartcar show={true}/>

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
          <Link href="cart/address">
          <button className="checkout-btn">Proceed to Checkout</button>
          </Link>
          
        </div>
      </div>
    </div>

    </>
  );
};

export default CartPage;
