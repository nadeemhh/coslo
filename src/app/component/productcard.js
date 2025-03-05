"use client"

import './component-css/productcard.css'

// import CounterComponent from '../component/global_component'

import {useState} from 'react';


import Link from 'next/link';


export default function Productcard({veri=false}) {

  

  return (
   
<div className="product-card">
      {/* Product Image */}
      <div className="product-image">
      <Link href="/home/products">
        <img
          src="https://blog.playstation.com/tachyon/2024/09/1d0ae4eca1d42d088bde97428219325f0c6d5a51.jpg?resize=1088%2C612&crop_strategy=smart" // Replace with actual image URL
          alt="Havit HV-G92 Gamepad"
          className='showimg'
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
 {/* <div className='mylocation'>
 <span className="location">
<img src="\icons\locationmark.svg" alt="" />

          Lucknow
        </span>
        </div> */}
      </div>



      {/* Product Details */}
      <div className="product-details">
       

        {/* Title and Supplier */}
        <Link href="/home/products">
        <p className="product-title">HAVIT HV-G92 Gamepad</p>
        <p className="product-supplier">Faiz Corporation LLP</p>
        </Link>
        {/* Price */}
        <div className="product-actions">
        <h4 className="price">₹ 2560/-</h4>
        </div>

<div className="priceTableContainer56" style={{marginTop:'10px'}}>
          <table className="priceTable56">
      <thead className="tableHeader56">
        <tr className="headerRow56">
          <th className="tableCell56">Quantity</th>
          <th className="tableCell56">Discount</th>
          <th className="tableCell56">Net Price</th>
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

         
<Link href="/home/products">
          <button className="contact-btn">Check Details</button>
          </Link>
          {/* <button className="Add-to-Cart">Add to Cart</button> */}
          {/* <button className="Remove-btn">Remove</button> */}
        </div>
      </div>
    </div>
  )
}
