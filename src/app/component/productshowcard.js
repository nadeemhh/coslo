"use client"

import './component-css/productcard.css'

// import CounterComponent from '../component/global_component'

import {useState} from 'react';
import getDiscountedPrice from './discountpricecalc.js'
import slugifyurl from "./slugifyurl.js"
import formatNumberIndian from './formatNumberIndian.js'

// import Link from 'next/link';


export default function Productcard({veri=false , pname,productType,seller,pimage,variation,pid,location}) {

if(!productType){
productType= "product";
}

  function formatPhoneNumber(number) {
    number = number.toString(); // Ensure it's a string
    number.replace('+','')
    return number.startsWith("91") ? number : "91" + number;
}

let pageurl;

if(productType === "property"){
pageurl=`/home/property/${slugifyurl(pname)}/${pid}`;
}
else if(productType === "service"){
pageurl=`/home/service/${slugifyurl(pname)}/${pid}`;
}
else{
pageurl=`/home/product/${slugifyurl(pname)}/${pid}`;
}


  return (
   
<div className="product-card">
      {/* Product Image */}
      <div className="product-image">
      <a href={pageurl}>
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
         <img src="\icons\veri.svg" width={'8px'} alt="" />
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
        <a href={pageurl}>
        <p className="product-title product-title-height" >{pname.length > 40 ? (pname.substring(0, 40) + '...').toUpperCase() : pname.toUpperCase()}
        </p>
        <p className="product-supplier">{seller.businessName}</p>
        </a>

        {/* Price */}
        <div className="product-actions">
        {productType === "product" ?<p className="price">MRP ₹{formatNumberIndian(variation?.mrp)}</p>:(productType === "property" ?<p className="price"  style={{fontSize:'18px',fontWeight:'600',color:'#097CE1'}}> ₹{formatNumberIndian(Math.round(variation?.mrp*variation.priceSlabs[0].min))}</p>:<p className="price" style={{fontSize:'18px',fontWeight:'600',color:'#097CE1'}}>₹{formatNumberIndian(variation?.mrp)}</p>)}

        {productType === "service" && variation?.duration?.value && <p style={{ 
  fontSize: "14px", 
 color:'#0088ff',background:'rgb(19 137 240 / 17%)',padding:'5px',borderRadius:'6px',
  margin: "6px 0", 
  display: "flex", 
  alignItems: "center", 
  gap: "6px" 
}}>
  <i className="fas fa-clock" style={{ color: "#097CE1", fontSize: "15px" }}></i>
  {variation?.duration.value} {variation?.duration.unit}
</p>
}
        </div>

{productType !== "service" && <div className="priceTableContainer56" style={{marginTop:'10px'}}>
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
          <td className="tableCell56">₹ {Math.round(variation.mrp)}</td>
          <td className="tableCell56">{sdata.min}</td>
          <td className="tableCell56">₹ {Math.round(variation.mrp * sdata.min)} </td>
        </tr>
       
       
      ))}
      
      </tbody>
    </table>
    }
    </div>}
      
       
      </div>

{productType === "property" && <div className="product-details" style={{height:'100%',textAlign:'left'}}>
<div>
        <a  href={`https://www.google.com/maps?q=${location.coordinates[1]},${location.coordinates[0]}`}
  target="_blank"
  rel="noopener noreferrer" style={{fontSize:'14px',color:"rgba(59, 59, 59, 1)",textAlign:'left'}}>
     <i className="fas fa-map-marker-alt" style={{color:"#097ce1",fontSize:'17px',marginRight:'6px'}}></i>
  {location.address}</a>
</div>
      </div>}

       <div className="product-details">
 {/* Actions */}
        <div className="product-actions">

        <a href={`https://wa.me/+91${seller.phone}`}>
<img src="\icons\whatsappi.svg" alt=""  width={'30px'}/>
</a>

         
<a href={pageurl}>
          <button className="contact-btn">Check Details</button>
          </a>

        </div>
      </div>

    </div>
  )
}
