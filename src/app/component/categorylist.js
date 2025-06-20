"use client"
import './component-css/categorycard.css'
import {useState ,useEffect,useRef } from 'react';
import Button from './button.js';

export default function Categorylist() {

  const categoryRefs = useRef([]);


   const [firstPart, setfirstPart] = useState([]);  
   const [secondPart, setsecondPart] = useState([]);  
  
      const fetchProducts = async () => {
        
      
          try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/category/all`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            });
      
            if (!response.ok) {
              throw new Error('Failed to fetch Category');
            }
      
            const data = await response.json();
  
            //setrootcategories(data); // Adjust based on your API response
            
            splitCategories(data)
           
            console.log(data)
          } catch (err) {
           
          } finally {
            
          }
        };
      
      
        useEffect(() => {
      
         fetchProducts();
        }, []);

        function splitCategories(categories) {
          const middleIndex = Math.ceil(categories.length / 2); // Divide and round up
          const firstPartcategory = categories.slice(0, middleIndex);
          const secondPartcategory = categories.slice(middleIndex);
          
          setfirstPart(firstPartcategory);
          setsecondPart(secondPartcategory);
          
      }

console.log(firstPart,secondPart);



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
                 
                 <div style={{display:'flex',gap:'25px'}}>


                 {firstPart.map((data, i) => (
 <div key={i} style={{boxShadow:'rgb(0 0 0 / 21%) 0px 4px 6px',borderRadius:'10px' }}>
           
 <div className="product-category-h" >

<div className="category-name-image-h">
<a href={`/home/Categories/subCategories/${data.id}/${encodeURIComponent(data.name)}`}>
<img src={data.image} alt={data.name}/>
</a>
</div>

<div className="category-name-product-h">
<a href={`/home/Categories/subCategories/${data.id}/${encodeURIComponent(data.name)}`}>
<p>{data.name}</p>
</a>
</div>

{/* 
<a href={`/home/Categories/subCategories/allproducts/?id=${data.id}&category=${data.name}`} className="seeproducts33">See Products</a> */}

</div>

 </div>
            ))}
           
           
            </div>

            <div style={{display:'flex',gap:'25px',marginBottom:'50px'}}>
           
            {secondPart.map((data, i) => (
 <div   key={i} style={{boxShadow:'rgb(0 0 0 / 21%) 0px 4px 6px',borderRadius:'10px'  }}>
           
 <div className="product-category-h" >

 <div className="category-name-image-h">
<a href={`/home/Categories/subCategories/${data.id}/${encodeURIComponent(data.name)}`}>
<img src={data.image} alt={data.name}/>
</a>
</div>

<div className="category-name-product-h">
<a href={`/home/Categories/subCategories/${data.id}/${encodeURIComponent(data.name)}`}>
<p>{data.name}</p>
</a>
</div>

{/* <a href={`/home/Categories/subCategories/allproducts/?id=${data.id}&category=${data.name}`} className="seeproducts33">See Products</a> */}

</div>

 </div>
            ))}

            </div>
            
          </div>
        </div>

  );
}

