'use client'
import './page.css'
import Link from 'next/link';
import { useState,useEffect } from "react";


export default function Page() {

  const [data,setdata] = useState(null);

  console.log(data)
  const getcust = () => {
 
  
  document.querySelector('.loaderoverlay').style.display='flex';
 
    const token = localStorage.getItem('token');
  
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/platform/`)
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
   setdata(data)
   
   document.querySelector('.loaderoverlay').style.display='none';
       
      })
      .catch((err) => {
      
        alert(err.message);
        document.querySelector('.loaderoverlay').style.display='none';
      });
  };
  

   useEffect(() => {
    getcust();
        
       },[]);

  const send = () => {
  document.querySelector('.loaderoverlay').style.display='flex';
  
  console.log(data)
    const token = localStorage.getItem('token');
  
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/platform/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }), // Add token if it exists
      },
      body: JSON.stringify(data),
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
            
            document.querySelector('.loaderoverlay').style.display='none';
       
      })
      .catch((err) => {
      
        console.log(err)
        document.querySelector('.loaderoverlay').style.display='none';
      });
  };

  

  return (
    <div className="order-details">
    

   { data &&  <div className="add-product-container">
        {/* <img src="\icons\iiii.svg" alt="" width={'400px'}/> */}
      <div className="basic-info" style={{width:'600px'}}>
        <h2>Platform Customisation</h2>
        <div className="input-group">
          <label htmlFor="product-name">Privacy Policy</label>
          <textarea name="" id="" value={data.privacyPolicy}  onChange={(e) => setdata({ ...data, privacyPolicy: e.target.value })}></textarea>
        </div>
        <div className="input-group">
          <label htmlFor="brand-name">Terms & Conditions</label>
          <textarea name="" id="" value={data.termsOfService}     onChange={(e) => setdata({ ...data, termsOfService: e.target.value })}
          ></textarea>
        </div>

        <div className="input-group">
          <label htmlFor="brand-name">Return Policy</label>
          <textarea name="" id="" value={data.returnPolicy}     onChange={(e) => setdata({ ...data, returnPolicy: e.target.value })}
          ></textarea>
        </div>

        <div className="input-group">
          <label htmlFor="product-video">Support Contact No.</label>
          <input id="product-video" type="text" placeholder="00000000" value={data.supportPhone}     onChange={(e) => setdata({ ...data, supportPhone: e.target.value })}
          />
        </div>
        <div className="input-group">
          <label htmlFor="product-video">Support Email</label>
          <input id="product-video" type="text" placeholder="john@mail.com" value={data.supportEmail}     onChange={(e) => setdata({ ...data, supportEmail: e.target.value })}
          />
        </div>

        <button className="create-new" onClick={()=>send()}>
        Add/Update
             <i className="fas fa-arrow-right"></i>
            </button>
      </div>
      
    </div>}


    </div>
  );
}

