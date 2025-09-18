"use client"
import './component-css/categorycard.css'
import {useState ,useEffect,useRef } from 'react';

export default function Categorylist() {

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

 

  return (

      <div className="category-list">
          <div className="category-name">
            <img src="icons/Rectangle 2.svg" alt="" />
            <p>Our Categories</p>
          </div>

          <div className="category-title">
            <p style={{ fontWeight: '500' }}>Browse by Categories</p>

            {/* <a href="/home/Categories">
      <Button rightIcon="\icons\right.svg">see all categories</Button>
          </a> */}

            {/* <div style={{ display: 'flex', gap: '10px', cursor: 'pointer' }}>
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
            </div> */}
          </div>

          <div
            className="products-container"
            ref={(el) => (categoryRefs.current[0] = el)}
            style={{display:'flex',flexDirection:'column',gap:'30px'}}
          >
                 
                 <div style={{display:'flex',gap:'25px',flexWrap:'wrap', marginBottom:'20px'}}>

 
          
    <div style={{boxShadow:'rgb(0 0 0 / 21%) 0px 4px 6px',borderRadius:'10px' }}>
           
 <div className="product-category-h" >

<div className="category-name-image-h">
<a href={`/property`}>
<img src="/images/realestate__.jpeg" alt="real estate"/>
</a>
</div>

<div className="category-name-product-h">
<a href={`/property`}>
<p>Real Estate</p>
</a>
</div>

</div>

 </div>   

  <div style={{boxShadow:'rgb(0 0 0 / 21%) 0px 4px 6px',borderRadius:'10px' }}>
           
 <div className="product-category-h" >

<div className="category-name-image-h">
<a href={`/product`}>
<img src="/images/products.jpeg" alt="real estate"/>
</a>
</div>

<div className="category-name-product-h">
<a href={`/product`}>
<p>Products</p>
</a>
</div>

</div>

 </div>     
           
            <div style={{boxShadow:'rgb(0 0 0 / 21%) 0px 4px 6px',borderRadius:'10px' }}>
           
 <div className="product-category-h" >

<div className="category-name-image-h">
<a href={`/service`}>
<img src="/images/services.jpeg" alt="real estate"/>
</a>
</div>

<div className="category-name-product-h">
<a href={`/service`}>
<p>Services</p>
</a>
</div>

</div>

 </div> 

            </div>

            
          </div>
        </div>

  );
}

