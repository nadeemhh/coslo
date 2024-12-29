'use client'
import './ordercomp.css'
import Link from 'next/link';


const Orderfullfill = () => {
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

        <div className="order-details" style={{width:'auto',whiteSpace:'nowrap'}}>
          <p>Order Id: <strong>45626G2872837D</strong></p>
          <p>Total Amount: <strong>₹ 83783/-</strong></p>
          <p>Order Date: <strong>07/11/2024</strong></p>
        </div>

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
