'use client'
import './ordercomp.css'
import Link from 'next/link';
import {useState,useEffect} from 'react';

const Orderfullfill = () => {

  const [OrderDETAILS, setOrderDETAILS]=useState(null);


  useEffect(() => {
  const url = new URL("http://localhost:3001/home/cart/address/payment/ordercomplete?orderId=67babe6ea63a8ff4bbec3dca&orderDate=Sun%20Feb%2023%202025%2011:51:34%20GMT+0530%20(India%20Standard%20Time)&totalAmount=200300");

const orderId = url.searchParams.get("orderId");
const orderDate = url.searchParams.get("orderDate").split('GMT')[0];
const totalAmount = url.searchParams.get("totalAmount");
setOrderDETAILS({ orderId, orderDate, totalAmount })


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
            src="\icons\Congrats.png" // Replace with your image URL
            alt="Order Complete Icon"
          />
        </div>

        <h2>Congrats! Your order is made</h2>

        {OrderDETAILS && <div className="order-details" style={{width:'auto',whiteSpace:'nowrap'}}>
          <p>Order Id: <strong>{OrderDETAILS.orderId}</strong></p>
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
