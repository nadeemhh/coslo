"use client"
import './mylayout.css'
import '../component/component-css/home.css'
import { createContext, useContext, useState ,useEffect } from 'react';
import Imageslider from '../component/slider.js'
import Productcard from '../component/productcard'
import Productcategory from '../component/Productcategory.js'
import { useRef } from 'react';
import Link from 'next/link';
import Productbyusertype from '../component/Detail-tab/productbyusertype.jsx'

export default function Homepagecontant() {

  const categoryRefs = useRef([]);

  // const [rootcategories, setrootcategories] = useState([]);  

   const [firstPart, setfirstPart] = useState([]);  
   const [secondPart, setsecondPart] = useState([]);  
  
      const fetchProducts = async () => {
        
      
          document.querySelector('.loaderoverlay').style.display = 'flex';
      
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
            document.querySelector('.loaderoverlay').style.display = 'none';
            console.log(data)
          } catch (err) {
            document.querySelector('.loaderoverlay').style.display = 'none';
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

  const categories = [
    { name: 'Recommended Sellers', title: 'Best Sellers this Month' },
    // { name: 'Machines', title: 'Papper Cutting Machines' },

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
                 
                 <div style={{display:'flex',gap:'25px'}}>


                 {firstPart.map((data, i) => (
 <div key={i} style={{boxShadow:'rgb(0 0 0 / 21%) 0px 4px 6px',borderRadius:'10px' }}>
           
 <div className="product-category-h" >

<div className="category-name-image-h">
<Link href={`/home/Categories/subCategories?id=${data.id}&category=${data.name}`}>
<img src={data.image} alt={data.name}/>
</Link>
</div>

<div className="category-name-product-h">
<Link href={`/home/Categories/subCategories?id=${data.id}&category=${data.name}`}>
<p>{data.name}</p>
</Link>
</div>


<Link href={`/home/Categories/subCategories/allproducts/?id=${data.id}&category=${data.name}`} className="seeproducts33">See Products</Link>

</div>

 </div>
            ))}
           
           
            </div>

            <div style={{display:'flex',gap:'25px',marginBottom:'50px'}}>
           
            {secondPart.map((data, i) => (
 <div   key={i} style={{boxShadow:'rgb(0 0 0 / 21%) 0px 4px 6px',borderRadius:'10px'  }}>
           
 <div className="product-category-h" >

 <div className="category-name-image-h">
<Link href={`/home/Categories/subCategories?id=${data.id}&category=${data.name}`}>
<img src={data.image} alt={data.name}/>
</Link>
</div>

<div className="category-name-product-h">
<Link href={`/home/Categories/subCategories?id=${data.id}&category=${data.name}`}>
<p>{data.name}</p>
</Link>
</div>

<Link href={`/home/Categories/subCategories/allproducts/?id=${data.id}&category=${data.name}`} className="seeproducts33">See Products</Link>

</div>

 </div>
            ))}

            </div>
            
          </div>
        </div>
{/* 
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
            style={{marginBottom:'100px'}}
          >
           <Productcard veri={true}/>
           <Productcard />
           <Productcard />
           <Productcard />
           <Productcard />
           <Productcard />
          </div>
        </div>
      ))} */}

<div className="category-name" style={{marginTop:'50px'}}>
            <img src="icons/Rectangle 2.svg" alt="" />
            <p>Our Products</p>
          </div>

<Productbyusertype/>

     
    </>
  );
}

