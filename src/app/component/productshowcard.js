"use client"

import './component-css/productcard.css'

// import CounterComponent from '../component/global_component'

import {useState} from 'react';
import getDiscountedPrice from './discountpricecalc.js'

// import Link from 'next/link';


export default function Productcard({veri=false , pname,productType,seller,pimage,variation,pid}) {

if(!productType){
productType= "product";
}

  function formatPhoneNumber(number) {
    number = number.toString(); // Ensure it's a string
    number.replace('+','')
    return number.startsWith("91") ? number : "91" + number;
}



  return (
   
<div className="product-card">
      {/* Product Image */}
      <div className="product-image">
      <a href={`/home/products?id=${pid}`}>
        <img
          src={pimage || '/images/noimgavl.jpg'} // Replace with actual image URL
          alt={pname}
          className='showimg'
        />
        </a>
        {/* <button className="cart-icon">
          <i className="fa fa-shopping-cart" style={{color:'#1389F0'}}></i>
        </button> */}
        {seller.subscriptionDetails.plan !== 'FREE' &&  seller.subscriptionDetails.status === "ACTIVE" && <button className="aboluteveri verified">
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
        <a href={`/home/products?id=${pid}`}>
        <p className="product-title product-title-height" >{pname.length > 40 ? pname.substring(0, 40) + '...' : pname}
        </p>
        <p className="product-supplier">{seller.businessName}</p>
        </a>
        {/* Price */}
        <div className="product-actions">
        {productType === "product" ?<p className="price">MRP ₹{variation?.mrp}</p>:<p className="price"  style={{fontSize:'18px',fontWeight:'600',color:'#097CE1'}}> ₹{variation?.mrp*variation.priceSlabs[0].min}</p>}
        </div>

<div className="priceTableContainer56" style={{marginTop:'10px'}}>
          {productType === "product" ? <table className="priceTable56">
      <thead className="tableHeader56">
        <tr className="headerRow56">
          <th className="tableCell56">Quantity</th>
          <th className="tableCell56">Discount</th>
          <th className="tableCell56">Net Price</th>
        </tr>
      </thead>
      <tbody className="tableBody56">

        {variation?.priceSlabs.map((sdata, index) => (
        
        <tr className="tableRow56" key={index}>
          <td className="tableCell56">{sdata.min}-{sdata.max} items</td>
          <td className="tableCell56">{sdata.discount}%</td>
          <td className="tableCell56"  style={{fontSize:'17px',fontWeight:'600',color:'#097CE1'}}>₹{(getDiscountedPrice(sdata.discount,variation.mrp).toFixed(0))}</td>
        </tr>
       
       
      ))}
      
      </tbody>
    </table>:
    <table className="priceTable56">
      <thead className="tableHeader56">
        <tr className="headerRow56">
           <th className="tableCell56">Per sq ft cost</th>
          <th className="tableCell56">Total sq ft</th>
          <th className="tableCell56">Total cost</th>
        </tr>
      </thead>
      <tbody className="tableBody56">

        {variation?.priceSlabs.map((sdata, index) => (
        
        <tr className="tableRow56" key={index}>
          <td className="tableCell56">₹ {variation.mrp}</td>
          <td className="tableCell56">{sdata.min}</td>
          <td className="tableCell56">₹ {variation.mrp * sdata.min} </td>
        </tr>
       
       
      ))}
      
      </tbody>
    </table>
    }
    </div>
      

        {/* Actions */}
        <div className="product-actions">

        <a href={`https://wa.me/+91${seller.phone}`}>
<img src="\icons\whatsappi.svg" alt=""  width={'30px'}/>
</a>

         
<a href={`/home/products?id=${pid}`}>
          <button className="contact-btn">Check Details</button>
          </a>
          {/* <button className="Add-to-Cart">Add to Cart</button> */}
          {/* <button className="Remove-btn">Remove</button> */}
        </div>
      </div>
    </div>
  )
}
