'use client'
import './page.css'
import Link from 'next/link';
import Goback from '../../../back.js'
import { useState,useEffect } from "react";

export default function page() {

    const [data,setdata] = useState({});
    const [isdata,setisdata] = useState(false);

    const [status, setStatus] = useState('PENDING'); 
    const [responcestatus, setresponcestatus] = useState('PENDING'); 
    const [responcestatus2, setresponcestatus2] = useState('PENDING'); 

console.log(responcestatus,responcestatus2)
     const handledata = (id) => {
        
     
       document.querySelector('.loaderoverlay').style.display='flex';
   
      const token = localStorage.getItem('token');
   
   
       fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/return/seller/${id}`, {
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
               console.log(data.returnRequest)
               setisdata(true)
               setdata(data.returnRequest)
               setresponcestatus(data.returnRequest.sellerResponse)
               setresponcestatus2(data.returnRequest.sellerResponse)
               setStatus(data.returnRequest.refundStatus);
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
        setresponcestatus(e.target.value);
      };
    
    
      const updatestatus = (e) => {
        e.preventDefault();
      
      document.querySelector('.loaderoverlay').style.display='flex';
      
      let sellerComment=document.querySelector('.sellerComment').value;

        const userData = {
          sellerResponse: responcestatus,
          sellerComment
        };
       
        console.log(userData)
      
        //return;
      
        const token = localStorage.getItem('token');
        const id = new URLSearchParams(window.location.search).get("id");
      
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/return/seller-response/${id}`, {
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
                throw new Error(errorData.message || errorData.error || 'Failed. Please try again.');
              });
            }
          })
          .then((data) => {
                
                alert(data.message)
                document.querySelector('.loaderoverlay').style.display='none';
                setresponcestatus(responcestatus)
                setresponcestatus2(responcestatus2)
                location.reload()
          })
          .catch((err) => {
          
            alert(err.message || err.error || 'Failed. Please try again.');
            document.querySelector('.loaderoverlay').style.display='none';
          });



          // if(status==="APPROVED"){

          // }
      };


      function processrefund() {
        
        document.querySelector('.loaderoverlay').style.display='flex';

        const id = new URLSearchParams(window.location.search).get("id");
        let refundamount=document.querySelector('.RefundAmount').value;

        if(!refundamount){
        alert('Add Refund Amount')
        return;
        }
        
        console.log(refundamount)
        
        const token = localStorage.getItem('token');

                    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/return/process-refund/${id}`, {
                      method: 'PUT',
                      headers: {
                        'Content-Type': 'application/json',
                        ...(token && { Authorization: `Bearer ${token}` }), // Add token if it exists
                      },
                      body: JSON.stringify({refundAmount:Number(refundamount)}),
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
                            location.reload()
                            document.querySelector('.loaderoverlay').style.display='none';
                       
                      })
                      .catch((err) => {
                      
                        alert(err.message || err.error || 'Failed. Please try again.');
                        document.querySelector('.loaderoverlay').style.display='none';
                      });

      }
  return (
    <>
    <div className="header">
    <Goback/>
    
    <h3>Details</h3>
 
  </div>

   { isdata && <div className="enquiry-container">
      <p style={{textAlign:'left',color:'#007bff',marginBottom:'40px',fontSize:'22px',fontWeight:'500'}}>Return Details</p>
      <div className="enquiry-card">
        
        <div className="enquiry-row">
          <span className="label">Buyer Name :</span>
          <span className="value">{data.buyerInfo.name}</span>
        </div>
        <div className="enquiry-row">
          <span className="label">Buyer Phone :</span>
          <span className="value">{data.buyerInfo.phone || 'null'}</span>
        </div>
        <div className="enquiry-row">
          <span className="label">Reason For Return :</span>
          <span className="value">
          {data.returnReason}
          </span>
        </div>
        <div className="enquiry-row">
          <span className="label">Original Amount :</span>
          <span className="value">₹ {data.originalAmount}</span>
        </div>

        <div className="enquiry-row">
          <span className="label">account Holder Name :</span>
          <span className="value">{data.bankDetails.accountHolderName}</span>
        </div>

        <div className="enquiry-row">
          <span className="label">account Number :</span>
          <span className="value">{data.bankDetails.accountNumber}</span>
        </div>

        <div className="enquiry-row">
          <span className="label">bank Name :</span>
          <span className="value">{data.bankDetails.bankName}</span>
        </div>

        <div className="enquiry-row">
          <span className="label">ifsc Code :</span>
          <span className="value">{data.bankDetails.ifscCode}</span>
        </div>
        
        <div className="enquiry-row">
          <span className="label">refund Status :</span>
          <span className="value">{data.refundStatus}</span>
        </div>

        <div className="enquiry-row">
          <span className="label">Seller Response Status :</span>
          <span className="value">{data.sellerResponse}</span>
        </div>

<div className="enquiry-row">
<span className="label">Check Images :</span>
<span className="value">
{data.returnImages.map((image, index) => (
<a href={image} target="_blank" style={{color:'blue',marginRight:'10px'}} key={index} >see image {index+1}, </a>
))}
</span>
</div>
 
{responcestatus2 === 'PENDING' &&    <><div className="enquiry-row">
          <span className="EnquiryStatus">Select Seller Response :</span>
          <select className="dropdown" value={responcestatus} onChange={handleChange}>
            <option value="PENDING">PENDING</option>
            <option value="APPROVED">APPROVED</option>
            <option value="REJECTED">REJECTED</option>
          </select>
        </div>
  

        <div className="enquiry-row">
          <span className="label">Enter Message For Buyer :</span>
          <input type="text" className='sellerComment' />
        </div>
        </> }

      {responcestatus2 === 'APPROVED' && 
    ( status !== 'COMPLETED' &&  <div className="enquiry-row">
          <span className="label">Enter Refund Amount :</span>
          <input type="number" className='RefundAmount' />
        </div>)
        }
       

        <div className="button-row">
          {responcestatus2 === 'APPROVED' ?(status !== 'COMPLETED' && <button className="update-button" onClick={processrefund}>Update Refund amount</button>):<button className="update-button" onClick={updatestatus}>Update Response</button>}
        </div>
      </div>
    </div>}
    </>
  );
}

