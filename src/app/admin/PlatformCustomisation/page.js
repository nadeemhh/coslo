'use client'
import './page.css'
import Link from 'next/link';
import  { useState } from "react";


export default function Page() {

  return (
    <div className="order-details">
    

      <div className="add-product-container">
        {/* <img src="\icons\iiii.svg" alt="" width={'400px'}/> */}
      <div className="basic-info">
        <h2>Platform Customisation</h2>
        <div className="input-group">
          <label htmlFor="product-name">Privacy Policy</label>
          <textarea name="" id=""></textarea>
        </div>
        <div className="input-group">
          <label htmlFor="brand-name">Terms & Conditions</label>
          <textarea name="" id=""></textarea>
        </div>
        <div className="input-group">
          <label htmlFor="product-video">Support Contact No.</label>
          <input id="product-video" type="text" placeholder="00000000" />
        </div>
        <div className="input-group">
          <label htmlFor="product-video">Support Email</label>
          <input id="product-video" type="text" placeholder="john@mail.com" />
        </div>

        <button className="create-new" >
        Add/Update
             <i className="fas fa-arrow-right"></i>
            </button>
      </div>
      
    </div>


    </div>
  );
}

