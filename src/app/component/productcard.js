"use client"

import './component-css/productcard.css'

// import CounterComponent from '../component/global_component'

import {useState} from 'react';


import Link from 'next/link';


export default function Productcard({veri=false}) {

  const [ModalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
  
    setModalOpen(!ModalOpen);
  };


  return (
    <>
<div className="product-card">
      {/* Product Image */}
      <div className="product-image">
      <Link href="/home/products">
        <img
          src="\images\gameee.png" // Replace with actual image URL
          alt="Havit HV-G92 Gamepad"
        />
        </Link>
        {/* <button className="cart-icon">
          <i className="fa fa-shopping-cart" style={{color:'#1389F0'}}></i>
        </button> */}
        {veri && <button className="verified">
          Recommended
         <img src="\icons\veri.svg" width={'12px'} alt="" />
        </button>
        }


         {/* Location */}
 <div className='mylocation'>
 <span className="location">
<img src="\icons\locationmark.svg" alt="" />

          Lucknow
        </span>
        </div>
      </div>



      {/* Product Details */}
      <div className="product-details">
       

        {/* Title and Supplier */}
        <Link href="/home/products">
        <p className="product-title">HAVIT HV-G92 Gamepad</p>
        <p className="product-supplier">Faiz Corporation LLP</p>
        </Link>
        {/* Price */}
        {/* <div className="product-actions">
        <h4 className="price">₹ 2560/-</h4>
        </div> */}

<div className="priceTableContainer56" style={{marginTop:'10px'}}>
          <table className="priceTable56">
      <thead className="tableHeader56">
        <tr className="headerRow56">
          <th className="tableCell56">Quantity</th>
          <th className="tableCell56">Discount</th>
          <th className="tableCell56">Price net</th>
        </tr>
      </thead>
      <tbody className="tableBody56">
        <tr className="tableRow56">
          <td className="tableCell56">20-99 items</td>
          <td className="tableCell56">20%</td>
          <td className="tableCell56">₹29.99 net</td>
        </tr>
        <tr className="tableRow56">
          <td className="tableCell56">100-299 items</td>
          <td className="tableCell56">30%</td>
          <td className="tableCell56">₹25.35 net</td>
        </tr>
        <tr className="tableRow56">
          <td className="tableCell56">300-499 items</td>
          <td className="tableCell56">40%</td>
          <td className="tableCell56">₹23.35 net</td>
        </tr>
      </tbody>
    </table>
    </div>
      

        {/* Actions */}
        <div className="product-actions">

        <a href="https://wa.me/+919880866978">
<img src="\icons\whatsappi.svg" alt=""  width={'30px'}/>
</a>

         
          
          <button className="contact-btn" onClick={toggleModal}>Contact Supplier</button>
 
          {/* <button className="Add-to-Cart">Add to Cart</button> */}
          {/* <button className="Remove-btn">Remove</button> */}
        </div>
      </div>
    </div>

{ModalOpen && (
        <div className="modal-overlay" style={{zIndex:'60'}}>
          <div className="mymodal-container">
          <div style={{display:'flex',justifyContent:'flex-end'}}>
          <button onClick={toggleModal} className="modal-close-btn">
            <i className="fa fa-times"></i>
          </button>
          </div>
            <h2>Ask your queries here!</h2>
            <p>The Supplier will get back to you soon!</p>
            <div className='modalform'>
              <input type="text" placeholder="Type your name *" required />
              <input type="text" placeholder="Type your phone no*" required />
              <input type="email" placeholder="Type your email*" required />
              <textarea placeholder="Type details"></textarea>
              <button type="submit">Submit</button>
            </div>
          </div>
        </div>
      )}</>
  )
}
