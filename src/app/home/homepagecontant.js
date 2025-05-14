"use client"
import './mylayout.css'
import Imageslider from '../component/slider.js'
import Productbyusertype from '../component/Detail-tab/productbyusertype.jsx'
import Categorylist from '../component/categorylist.js'

export default function Homepagecontant() {


  return (
    <>
      <Imageslider />

<Categorylist/>


<div className="category-name" style={{marginTop:'50px'}}>
            <img src="icons/Rectangle 2.svg" alt="Our Products" />
            <p className='OurProducts55'>Our Products</p>
          </div>

<Productbyusertype/>

     
    </>
  );
}

