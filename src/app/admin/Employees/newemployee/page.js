'use client'
import './page.css'
import '../../../component/component-css/cartcard.css'
// import "../../../component/component-css/ui.css";
import Link from 'next/link';
import  { useState } from "react";
import Goback from '../../../back.js'

export default function Page() {

  return (
    <div className="order-details">
      <div className="header">
        <button className="back-button">
          <Goback/>
        </button>
        <h2>New Employee Registration</h2>
     
      </div>

      <div className="add-product-container">
        <img src="\icons\iii.png" alt="" width={'400px'}/>
      <div className="basic-info">
        <h2>Employee Information</h2>
        <div className="input-group">
          <label htmlFor="product-name">Enter Name *</label>
          <input id="product-name" type="text" placeholder="John Doe" />
        </div>
        <div className="input-group">
          <label htmlFor="brand-name">Enter Mobile No *</label>
          <input id="brand-name" type="text" placeholder="00000" />
        </div>
        <div className="input-group">
          <label htmlFor="product-video">Enter Email *</label>
          <input id="product-video" type="text" placeholder="john@mail.com" />
        </div>
        <div className="input-group">
          <label htmlFor="product-video">Enter Password *</label>
          <input id="product-video" type="text" placeholder="*******************" />
        </div>

        <button className="create-new" >
        Send Email Link
             <i className="fas fa-arrow-right"></i>
            </button>
      </div>
      
    </div>


    </div>
  );
}

