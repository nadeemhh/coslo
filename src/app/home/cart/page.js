'use client'
import Link from 'next/link';

import "./CartPage.css";
import Cartcar from '../../component/cartcard.js'
import CounterComponent from '../../component/global_component.js'
import {useState,useEffect} from 'react';

const CartPage = () => {

  const [data,setdata] = useState([]);



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
        console.log(data.cart)
        if(data.cart){
          setdata([...data.cart.items])
        }else{
          setdata([])
        }
      
        document.querySelector('.loaderoverlay').style.display = 'none';
       
      })
      .catch((err) => {
        document.querySelector('.loaderoverlay').style.display = 'none';
        console.log(err)
        alert(err);
       
      });
  };



  const deleteFunc = () => {
  

    const token = localStorage.getItem('token');

    fetch(`http://localhost:3000/cart/delete-all`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }), // Add token if it exists
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to delete the employee.');
        }
        return response.json();
      })
      .then((data) => {
        console.log(data)
        getdata()
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getdata()
  }, []);


  const deleteFuncone = (id) => {
    console.log(id)
    if (!id) return;
  
    const token = localStorage.getItem('token');
  
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/cart/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }), // Add token if it exists
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to delete the employee.');
        }
        return response.json();
      })
      .then((data) => {
        console.log(data)
        getdata()
      })
      .catch((err) => {
        console.log(err);
      });
  };

 
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
          <p style={{fontSize:'19px',fontWeight:'500'}}>Cart ({data.length})</p>
          {data.length ? <button className="clear-cart" onClick={() => deleteFunc()}>Clear Cart</button>:''}
          </div>

          <div className="card-container09">

          

          {data.map((data, index) => (

            <div className="card09" key={index}>
    <div className="prodictimg">
      <img src={data.productImage} alt="" />
    </div>
    <div className="card-details">
      <p className="card-title">
      {data.productName}
      </p>
      <p className="card-price">₹{data.priceBreakdown.basePrice}</p>
      {/* <p className="card-date">24th August '24</p> */}
    </div>
    <div className="card-status">
      
    <CounterComponent quantity={data.quantity} productid={data.product} variationid={data.variation}/>
    <img src="\icons\dustbin.svg" alt="" style={{width:'40px',cursor:'pointer'}}  onClick={() => deleteFuncone(data.variation)}/>

    </div>
  </div>
          ))}
          

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
