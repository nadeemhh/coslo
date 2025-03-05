'use client'
import Link from 'next/link';

import "../../CartPage.css";
import {useState,useEffect} from 'react';



export default function page() {

  const [OrderSummary, setOrderSummary]=useState(null);

  const [paymentMethod, setPaymentMethod] = useState("COD");

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
    
  };

  const handleSubmit = () => {
    document.querySelector('.loaderoverlay').style.display='flex';

    const token = localStorage.getItem('token');

    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/order/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }), // Add token if it exists
      },
      body: JSON.stringify({paymentMethod:paymentMethod}),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return response.json().then((errorData) => {
            throw new Error(errorData.message || errorData.error || 'Failed to submit the form.');
          });
        }
      })
      .then((data) => {
      
            console.log(data)
            
            if(paymentMethod==='COD'){
              alert(data.message)
              window.location='/user/orders';
            }else{
              console.log(paymentMethod)
          window.location=data.redirectUrl;
          }
          document.querySelector('.loaderoverlay').style.display='none';
      })
      .catch((err) => {
        alert(err.message || err.error || 'Failed to submit the form.');
        document.querySelector('.loaderoverlay').style.display='none';
      });
  };
  

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
          <input type="radio" name="payment" value="COD" checked={paymentMethod === "COD"}
          onChange={handlePaymentChange}/>
          <span className="option-text">Cash on Delivery</span>
        </label>
        <label className="payment-option">
          <input type="radio" name="payment" value="ONLINE" checked={paymentMethod === "ONLINE"}
          onChange={handlePaymentChange}/>
          <span className="option-text">Online Payment</span>
        </label>
        {/* <label className="payment-option">
          <input type="radio" name="payment" />
          <span className="option-text">Bank / EMI</span>
        </label> */}
      </div>
    </div>

        </div>

        {/* Order Summary Section */}
        { OrderSummary &&   <div className="order-summary">
          <h3>Order Summary</h3>
          <div className="summary-row">
            <span>Sub Total:</span> <span>₹ {OrderSummary.totalBaseAmount}/-</span>
          </div>
          <div className="summary-row">
            <span>Total Discount:</span> <span>₹ {OrderSummary.cartTotalDiscountAmount}/-</span>
          </div>
          
          <div className="summary-row">
            <span>Total CGST:</span> <span>₹ {OrderSummary.cgstAmount}</span>
          </div>
          <div className="summary-row">
            <span>Total SGST:</span> <span>₹ {OrderSummary.sgstAmount}</span>
          </div>
          <div className="summary-row">
            <span>Shipping Charges:</span> <span>₹ {OrderSummary.shippingFee}/-</span>
          </div>
          <hr />
          <div className="summary-total">
            <span>Total:</span> <span>₹ {OrderSummary.finalAmount}/-</span>
          </div>

         
          <button className="checkout-btn" onClick={()=>{handleSubmit()}}>Proceed to Checkout</button>

        
        </div>}
      </div>
    </div>

  )
}
