'use client'
import  { useState,useEffect } from "react";
import Link from 'next/link';

export default function Category() {
    const [data,setdata] = useState([]);

    

   const handledata = () => {
     
  
    document.querySelector('.loaderoverlay').style.display='flex';

 

    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/category/all`, {
      method: 'GET',
     
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return response.json().then((errorData) => {
            throw new Error(errorData.message || 'Failed. Please try again.');
          });
        }
      })
      .then((data) => {
            console.log(data)
            setdata([...data])
           document.querySelector('.loaderoverlay').style.display='none';
        // Successfully logged in
       // window.location.href = '/Employee/Onboarding';
       
      })
      .catch((err) => {
        document.querySelector('.loaderoverlay').style.display='none';
        console.log(err)
      });
  };

  useEffect(() => {
    handledata();
  },[]);
  
  
    return (
      <div>
  <div>
  <h3 style={{color:'#1389F0',marginTop:'0px',marginBottom:'40px'}}>Our Categories</h3>
  </div>
  
  <div style={{display:'flex',flexWrap:'wrap',justifyContent:'center',gap:'20px'}}>
  
  {data.map((data, i) => (
  
  <Link href={`/home/Categories/subCategories?id=${data.id}`} key={i}>

   <div className="product-category-h" >
  
  <div className="category-name-image-h">
  <img src={data.image} alt=""/>
  </div>
  
  <div className="category-name-product-h">
  <p>{data.name}</p>
  </div>
  
  </div>
              </Link>
                   ))}
  
           
  </div>
  
  
      </div>
    );
    }
  