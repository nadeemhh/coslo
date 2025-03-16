'use client'
import './page.css'
import Link from 'next/link';
import Goback from '../../../back.js'
import { useState,useEffect } from "react";

export default function page() {

    const [data,setdata] = useState({});
    const [isdata,setisdata] = useState(false);


     const handledata = (id) => {
        
     
       document.querySelector('.loaderoverlay').style.display='flex';
   
      const token = localStorage.getItem('token');
   
   
       fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/order/cancel/requests/${id}`, {
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
               console.log(data.data)
           setisdata(true)
               setdata(data.data)
            
              document.querySelector('.loaderoverlay').style.display='none';
        
          
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



     
    
      const updatestatus = () => {

      
      document.querySelector('.loaderoverlay').style.display='flex';
      
      
        //return;
      
        const token = localStorage.getItem('token');
        const id = new URLSearchParams(window.location.search).get("id");
      
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/order/cancel/refund/${id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }), // Add token if it exists
          }
        })
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              return response.json().then((errorData) => {
                throw new Error(errorData.message || errorData.error || 'Failed. Please try again.');
              });
            }
          })
          .then((data) => {
                
                alert(data.message)
                document.querySelector('.loaderoverlay').style.display='none';
               
                location.reload()
          })
          .catch((err) => {
          
            alert(err.message || err.error || 'Failed. Please try again.');
            document.querySelector('.loaderoverlay').style.display='none';
          });

      };

  return (
    <>
    <div className="header">
    <Goback/>
    
    <h3>Details</h3>
 
  </div>

   { isdata && <div className="enquiry-container">
      <p style={{textAlign:'left',color:'#007bff',marginBottom:'40px',fontSize:'22px',fontWeight:'500'}}>Cancel Details</p>
      <div className="enquiry-card">
        
        <div className="enquiry-row">
          <span className="label">Buyer Name :</span>
          <span className="value">{data.customerInfo.name}</span>
        </div>
        <div className="enquiry-row">
          <span className="label">Buyer Phone :</span>
          <span className="value">{data.customerInfo.phone || 'null'}</span>
        </div>
        <div className="enquiry-row">
          <span className="label">Reason For Return :</span>
          <span className="value">
          {data.cancellationDetails.reason}
          </span>
        </div>
        <div className="enquiry-row">
          <span className="label">Original Amount :</span>
          <span className="value">₹ {data.cancellationDetails.refundDetails.amount}</span>
        </div>

      {data.cancellationDetails.refundDetails.bankDetails.accountNumber &&  <> <div className="enquiry-row">
          <span className="label">account Holder Name :</span>
          <span className="value">{data.cancellationDetails.refundDetails.bankDetails.accountHolderName}</span>
        </div>

        <div className="enquiry-row">
          <span className="label">account Number :</span>
          <span className="value">{data.cancellationDetails.refundDetails.bankDetails.accountNumber}</span>
        </div>

        <div className="enquiry-row">
          <span className="label">bank Name :</span>
          <span className="value">{data.cancellationDetails.refundDetails.bankDetails.bankName}</span>
        </div>

        <div className="enquiry-row">
          <span className="label">ifsc Code :</span>
          <span className="value">{data.cancellationDetails.refundDetails.bankDetails.ifscCode}</span>
        </div>
       </>}
        
        <div className="enquiry-row">
          <span className="label">refund Status :</span>
          <span className="value">{data.cancellationDetails.refundDetails.status}</span>
        </div>

        <div className="enquiry-row">
          <span className="label">Payment Method :</span>
          <span className="value">{data.orderInfo.paymentMethod}</span>
        </div>

        <div className="enquiry-row">
          <span className="label">Product Details :</span>
          <a href={`/supplier/orders/order-details?oid=${data.cancellationDetails.requestId}`} style={{color:'blue'}}>
                         check details
                          </a>
        </div>
 


   
        <div className="button-row">

      <button className="update-button" onClick={()=>{updatestatus()}}>Update</button>

        </div>
      </div>
    </div>}
    </>
  );
}

