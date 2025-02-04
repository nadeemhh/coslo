'use client'
import './page.css'
import Link from 'next/link';
import Goback from '../../../back.js'
import { useState,useEffect } from "react";

export default function page() {

    const [data,setdata] = useState(null);
   
    const [status, setStatus] = useState(''); 



     const handledata = (id) => {
        
     
       document.querySelector('.loaderoverlay').style.display='flex';
   
      const token = localStorage.getItem('token');
   
   
       fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/quotation/${id}`, {
         method: 'GET',
         headers: {
           'Content-Type': 'application/json',
           ...(token && { Authorization: `Bearer ${token}` }), // Add token if it exists
         },
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
               setdata(data)
               setStatus(data.status);
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

      const id = new URLSearchParams(window.location.search).get("id");


         handledata(id);
       },[]);



       const handleChange = (e) => {
        setStatus(e.target.value);
      };
    
    
      const updatestatus = (e) => {
        e.preventDefault();
      
      document.querySelector('.loaderoverlay').style.display='flex';
      
      
        const userData = {
          status
        };
      
      
        const token = localStorage.getItem('token');
        const id = new URLSearchParams(window.location.search).get("id");
      
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/quotation/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }), // Add token if it exists
          },
          body: JSON.stringify(userData),
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
                
                alert(data.message)
                document.querySelector('.loaderoverlay').style.display='none';
           
          })
          .catch((err) => {
          
            alert(err.message);
            document.querySelector('.loaderoverlay').style.display='none';
          });
      };

  return (
    <>
    <div className="header">
    <Goback/>
    
    <h3>Quotations</h3>
 
  </div>

   { data && <div className="enquiry-container">
      <p style={{textAlign:'left',color:'#007bff',marginBottom:'40px',fontSize:'22px',fontWeight:'500'}}>Quotations Details</p>
      <div className="enquiry-card">
        <div className="enquiry-row">
          <span className="label">Enquiry Id :</span>
          <span className="value">{data.id}</span>
        </div>
        <div className="enquiry-row">
          <span className="label">Buyer Name :</span>
          <span className="value">{data.buyer}</span>
        </div>
        <div className="enquiry-row">
          <span className="label">Buyer Email :</span>
          <span className="value">{data.email}</span>
        </div>
        <div className="enquiry-description">
          <span className="Description">Description</span>
          <p className="value">
          {data.desription}
          </p>
          
        </div>
        <div className="enquiry-row">
          <span className="EnquiryStatus">Enquiry Status :</span>
          <select className="dropdown" value={status} onChange={handleChange}>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div className="button-row">
          <button className="update-button" onClick={updatestatus}>Update</button>
        </div>
      </div>
    </div>}
    </>
  );
}

