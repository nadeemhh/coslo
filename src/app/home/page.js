"use client"
import './mylayout.css'
import '../component/component-css/home.css'
import { createContext, useContext, useState } from 'react';
import Imageslider from '../component/slider.js'
import Productcard from '../component/productcard'
import Productcategory from '../component/Productcategory.js'
import { useRef } from 'react';
import Link from 'next/link';

export default function home() {

  const categoryRefs = useRef([]);

  const scrollLeft = (index) => {
    if (categoryRefs.current[index]) {
      categoryRefs.current[index].scrollBy({
        left: -300, // Adjust the value for the desired scroll amount
        behavior: 'smooth',
      });
    }
  };

  const scrollRight = (index) => {
    if (categoryRefs.current[index]) {
      categoryRefs.current[index].scrollBy({
        left: 300, // Adjust the value for the desired scroll amount
        behavior: 'smooth',
      });
    }
  };

  const categories = [
    { name: 'Best Sellers', title: 'Best Sellers this Month' },
    { name: 'Trending Now', title: 'Most Popular this Week' },

  ];

  return (
    <>
      <Imageslider />


      <div className="category-list">
          <div className="category-name">
            <img src="icons/Rectangle 2.svg" alt="" />
            <p>Our Categories</p>
          </div>

          <div className="category-title">
            <p style={{ fontWeight: '500' }}>Browse by Categories</p>

            <div style={{ display: 'flex', gap: '10px', cursor: 'pointer' }}>
              <img
                src="icons/Leftar.svg"
                alt="Left Arrow"
                className="left-arrow lfarsh"
                onClick={() => scrollLeft(0)}
              />
              <img
                src="icons/Rightar.svg"
                alt="Right Arrow"
                className="right-arrow lfarsh"
                onClick={() => scrollRight(0)}
              />
            </div>
          </div>

          <div
            className="products-container"
            ref={(el) => (categoryRefs.current[0] = el)}
            style={{display:'flex',flexDirection:'column',gap:'30px'}}
          >
                 
                 <div style={{display:'flex',gap:'15px'}}>


                 {[...Array(10)].map((_, i) => (
 <Link href="/home/Categories/subCategories"  key={i}>
           
 <div className="product-category-h" >

<div className="category-name-image-h">
<img src="\images\elc.jpg" alt=""/>
</div>

<div className="category-name-product-h">
<p>Mobile, Electronics & Supplies</p>
</div>

</div>

 </Link>
            ))}
           
           
            </div>

            <div style={{display:'flex',gap:'15px'}}>
           
            {[...Array(10)].map((_, i) => (
 <Link href="/home/Categories/subCategories"  key={i}>
           
 <div className="product-category-h" >

<div className="category-name-image-h">
<img src="\images\elc.jpg" alt=""/>
</div>

<div className="category-name-product-h">
<p>Mobile, Electronics & Supplies</p>
</div>

</div>

 </Link>
            ))}

            </div>
            
          </div>
        </div>



      {categories.map((category, index) => (
        <div className="category-list" key={index + 1}>
          <div className="category-name">
            <img src="icons/Rectangle 2.svg" alt="" />
            <p>{category.name}</p>
          </div>

          <div className="category-title">
            <p style={{ fontWeight: '500' }}>{category.title}</p>

            <div style={{ display: 'flex', gap: '10px', cursor: 'pointer' }}>
              <img
                src="icons/Leftar.svg"
                alt="Left Arrow"
                className="left-arrow lfarsh"
                onClick={() => scrollLeft(index + 1)}
              />
              <img
                src="icons/Rightar.svg"
                alt="Right Arrow"
                className="right-arrow lfarsh"
                onClick={() => scrollRight(index + 1)}
              />
            </div>
          </div>

          <div
            className="products-container"
            ref={(el) => (categoryRefs.current[index + 1] = el)}
          >
            <Link href="/home/products">
            <Productcard />
            </Link>
            <Link href="/home/products">
            <Productcard />
            </Link>
            <Link href="/home/products">
            <Productcard />
            </Link>

            <Link href="/home/products">
            <Productcard />
            </Link>

            <Link href="/home/products">
            <Productcard />
            </Link>
          </div>
        </div>
      ))}
    </>
  );
}

