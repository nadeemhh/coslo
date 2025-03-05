'use client'
import './page.css'
import Link from 'next/link';
import  { useState,useEffect } from "react";

export default function page() {

    const [policydata,setpolicydata] = useState(null);
  
  
      
      const handlepolicydata = () => {
        
     
       document.querySelector('.loaderoverlay').style.display='flex';
   
    
   
       fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/platform`, {
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
               setpolicydata(data)
              document.querySelector('.loaderoverlay').style.display='none';
  
         })
         .catch((err) => {
           document.querySelector('.loaderoverlay').style.display='none';
           console.log(err)
         });
     };
   
     useEffect(() => {
       handlepolicydata();
     },[]);


  return (
    <> <div className="header">
       
    <h3 style={{margin:'30px 0px'}}>Customer Support</h3>
 
  </div>
  {policydata &&
  <div className="details-page">
      <div className="logo-container">
        <img
          src="\icons\supporticon.png" // Replace with the actual logo URL
          alt="Logo"
          className="logo"
        />
      </div>
      <p className="description">
        For manufacturer/seller related query resolution we are providing free support
        with our technical team
      </p>
      <div className="contact-container">
        <p className="call-us">
          Call Us <span className="phone-number">{policydata.supportPhone}</span>
        </p>
        <p className="timing">Between 09:00 AM - 6:00 PM</p>
      </div>
      <p className="email">
        Email : <span className="email-address">{policydata.supportEmail}</span>
      </p>
    </div>
    }
    </>
  );
}

