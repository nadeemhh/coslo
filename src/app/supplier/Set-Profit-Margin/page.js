'use client'
import './page.css'
import Link from 'next/link'
import { useState } from "react";


export default function page() {
  const orders = [
    { id: "#872", date: "27th Oct 2024", buyer: "Faiz Iqbal", email: "faiziqbal@gmail.com", status: "Pending" },
    { id: "#872", date: "27th Oct 2024", buyer: "Faiz Iqbal", email: "faiziqbal@gmail.com", status:"Completed" },
    { id: "#872", date: "27th Oct 2024", buyer: "Faiz Iqbal", email: "faiziqbal@gmail.com", status: "Pending" },
    { id: "#872", date: "27th Oct 2024", buyer: "Faiz Iqbal", email: "faiziqbal@gmail.com", status: "Pending" },
    { id: "#872", date: "27th Oct 2024", buyer: "Faiz Iqbal", email: "faiziqbal@gmail.com", status: "Pending" },
    { id: "#872", date: "27th Oct 2024", buyer: "Faiz Iqbal", email: "faiziqbal@gmail.com", status: "Pending" },
    { id: "#872", date: "27th Oct 2024", buyer: "Faiz Iqbal", email: "faiziqbal@gmail.com", status: "Pending" },
    { id: "#872", date: "27th Oct 2024", buyer: "Faiz Iqbal", email: "faiziqbal@gmail.com", status: "Pending" },
    { id: "#872", date: "27th Oct 2024", buyer: "Faiz Iqbal", email: "faiziqbal@gmail.com", status: "Pending" },
    { id: "#872", date: "27th Oct 2024", buyer: "Faiz Iqbal", email: "faiziqbal@gmail.com", status: "Pending" },
  ];

  return (
    <div className="orders-container">
         <div className="header">
       
        <h3>Set Profit Margin</h3>
     
      </div>
      
      <div
  style={{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f0f8ff',
    borderRadius: '10px',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '600px',
    margin: '20px',
    padding:'5px',
  }}
>

 <div className="product-category">

 <div className="category-name-image">
      <img src="\images\elc.jpg" alt=""/>
    </div>

    <div className="category-name-product">
      <p>Mobile, Electronics & Supplies</p>
    </div>

    </div>


  <div
    style={{
      textAlign: 'left',
      flex: 1,
      marginLeft: '20px',
      backgroundColor: 'white',
      padding: '18px',
      borderRadius: '10px',
    }}
  >
    <p>
      Current Margin <strong>15%</strong>
    </p>
    <input
      style={{
        padding: '10px',
        fontSize: '16px',
        borderRadius: '5px',
        border: '1px solid #878787',
        margin: '10px 0',
        width: '100%',
      }}
      type="text"
      placeholder="15%"
    />
    <button
      style={{
        padding: '7px 14px',
        fontSize: '16px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
      }}
    >
      Update Margin <i className="fa fa-arrow-right" style={{ fontSize: '16px' }}></i>
    </button>
  </div>
</div>

<div
  style={{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f0f8ff',
    borderRadius: '10px',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '600px',
    margin: '20px',
    padding:'5px',
  }}
>

 <div className="product-category">

 <div className="category-name-image">
      <img src="\images\elc.jpg" alt=""/>
    </div>

    <div className="category-name-product">
      <p>Mobile, Electronics & Supplies</p>
    </div>

    </div>


  <div
    style={{
      textAlign: 'left',
      flex: 1,
      marginLeft: '20px',
      backgroundColor: 'white',
      padding: '18px',
      borderRadius: '10px',
    }}
  >
    <p>
      Current Margin <strong>15%</strong>
    </p>
    <input
      style={{
        padding: '10px',
        fontSize: '16px',
        borderRadius: '5px',
        border: '1px solid #878787',
        margin: '10px 0',
        width: '100%',
      }}
      type="text"
      placeholder="15%"
    />
    <button
      style={{
        padding: '7px 14px',
        fontSize: '16px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
      }}
    >
      Update Margin <i className="fa fa-arrow-right" style={{ fontSize: '16px' }}></i>
    </button>
  </div>
</div>
<div
  style={{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f0f8ff',
    borderRadius: '10px',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '600px',
    margin: '20px',
    padding:'5px',
  }}
>

 <div className="product-category">

 <div className="category-name-image">
      <img src="\images\elc.jpg" alt=""/>
    </div>

    <div className="category-name-product">
      <p>Mobile, Electronics & Supplies</p>
    </div>

    </div>


  <div
    style={{
      textAlign: 'left',
      flex: 1,
      marginLeft: '20px',
      backgroundColor: 'white',
      padding: '18px',
      borderRadius: '10px',
    }}
  >
    <p>
      Current Margin <strong>15%</strong>
    </p>
    <input
      style={{
        padding: '10px',
        fontSize: '16px',
        borderRadius: '5px',
        border: '1px solid #878787',
        margin: '10px 0',
        width: '100%',
      }}
      type="text"
      placeholder="15%"
    />
    <button
      style={{
        padding: '7px 14px',
        fontSize: '16px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
      }}
    >
      Update Margin <i className="fa fa-arrow-right" style={{ fontSize: '16px' }}></i>
    </button>
  </div>
</div>
<div
  style={{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f0f8ff',
    borderRadius: '10px',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '600px',
    margin: '20px',
    padding:'5px',
  }}
>

 <div className="product-category">

 <div className="category-name-image">
      <img src="\images\elc.jpg" alt=""/>
    </div>

    <div className="category-name-product">
      <p>Mobile, Electronics & Supplies</p>
    </div>

    </div>


  <div
    style={{
      textAlign: 'left',
      flex: 1,
      marginLeft: '20px',
      backgroundColor: 'white',
      padding: '18px',
      borderRadius: '10px',
    }}
  >
    <p>
      Current Margin <strong>15%</strong>
    </p>
    <input
      style={{
        padding: '10px',
        fontSize: '16px',
        borderRadius: '5px',
        border: '1px solid #878787',
        margin: '10px 0',
        width: '100%',
      }}
      type="text"
      placeholder="15%"
    />
    <button
      style={{
        padding: '7px 14px',
        fontSize: '16px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
      }}
    >
      Update Margin <i className="fa fa-arrow-right" style={{ fontSize: '16px' }}></i>
    </button>
  </div>
</div>
    </div>
  );
}


