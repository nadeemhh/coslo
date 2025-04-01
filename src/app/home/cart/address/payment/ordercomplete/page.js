'use client'
import './ordercomp.css'
import Link from 'next/link';
import {useState,useEffect} from 'react';

const Orderfullfill = () => {

  const [OrderDETAILS, setOrderDETAILS]=useState(null);


  useEffect(() => {

const orderDate = new URLSearchParams(window.location.search).get("orderDate").split('GMT')[0];
const totalAmount = new URLSearchParams(window.location.search).get("totalAmount");
setOrderDETAILS({ orderDate, totalAmount })


}, []);

console.log(OrderDETAILS);

  return (
    <div className="order-complete-container">
      {/* <nav className="breadcrumb">
       
        <span>Home</span> <span>&gt;</span>
        <span className="breadcrumb-current">Cart</span>
      </nav> */}

      <div className="order-complete-content">
        <div className="order-icon">
          <img
            src="\images\coslomartlogo.png" // Replace with your image URL
            alt="Order Complete Icon"
          />
        </div>

        <h2>Congrats! Your order is made</h2>

        {OrderDETAILS && <div className="order-details" style={{width:'auto'}}>
      
          <p>Total Amount: <strong>₹ {OrderDETAILS.totalAmount}/-</strong></p>
          <p>Order Date: <strong>{OrderDETAILS.orderDate}</strong></p>
        </div>
        
        }

        <Link href="/user/orders">
        <button className="track-order-btn">
          Track Order <i className="fa fa-arrow-right"></i>
        </button>
        </Link>

      </div>
    </div>

  );
};

export default Orderfullfill;
