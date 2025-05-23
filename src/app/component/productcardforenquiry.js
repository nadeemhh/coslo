"use client"

import './component-css/productcard.css'
import sendlead from '../component/sendlead.js'
import {useState} from 'react';
import getDiscountedPrice from './discountpricecalc.js'
import Link from 'next/link';


export default function Productcard({veri=false , pname,seller,pimage,variation,pid,userdata}) {

  function formatPhoneNumber(number) {
    number = number.toString(); // Ensure it's a string
    number.replace('+','')
    return number.startsWith("91") ? number : "91" + number;
}


  return (
   
<div className="product-card">
      {/* Product Image */}
      <div className="product-image">
      <Link href={`/home/products?id=${pid}`}>
        <img
          src={pimage || '/images/noimgavl.jpg'} // Replace with actual image URL
          alt={pname}
          className='showimg'
        />
        </Link>
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
        <Link href={`/home/products?id=${pid}`}>
        <p className="product-title product-title-height" >{pname.length > 40 ? pname.substring(0, 40) + '...' : pname}
        </p>
        <p className="product-supplier">{seller.businessName}</p>
        </Link>
        {/* Price */}
        <div className="product-actions">
              <p className="price">MRP ₹{variation.mrp}</p>
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

        {variation.priceSlabs.map((sdata, index) => (
        
        <tr className="tableRow56" key={index}>
          <td className="tableCell56">{sdata.min}-{sdata.max} items</td>
          <td className="tableCell56">{sdata.discount}%</td>
          <td className="tableCell56"  style={{fontSize:'17px',fontWeight:'600',color:'#097CE1'}}>₹{(getDiscountedPrice(sdata.discount,variation.mrp).toFixed(0))}</td>
        </tr>
       
       
      ))}
      
      </tbody>
    </table>
    </div>
      

        {/* Actions */}
        <div className="product-actions">

        <button className="contact-btn" style={{backgroundColor:'#029915'}} onClick={()=>{sendlead(userdata,pid)}}>Submit Enquiry</button>

         
<Link href={`/home/products?id=${pid}`}>
          <button className="contact-btn">Details</button>
          </Link>
          {/* <button className="Add-to-Cart">Add to Cart</button> */}
          {/* <button className="Remove-btn">Remove</button> */}
        </div>
      </div>
    </div>
  )
}
