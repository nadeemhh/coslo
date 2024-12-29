'use client'
import '../component/component-css/cartcard.css'
import "./component-css/ui.css";
import CounterComponent from '../component/global_component.js'
import { useState } from "react";


export default function Cartcar({show}) {



  return (
    <div className="card">
    <div className="prodictimg">
      <img src="\images\Image.jpg" alt="" />
    </div>
    <div className="card-details">
      <p className="card-title">
        Samsung Galaxy Smartwatch Z-Series with Ult...
      </p>
      <p className="card-price">₹ 200/-</p>
      <p className="card-date">24th August '24</p>
    </div>
    <div className="card-status">
   {
      show ?<>
    <CounterComponent/>
    <img src="\icons\dustbin.svg" alt="" style={{width:'40px',cursor:'pointer'}}/>
    </>
    :
    <>
      <button className="shipped">● Shipped</button>
      <button className="cancel-btn">Cancel</button>
      </>}
    </div>
  </div>
  )
}
