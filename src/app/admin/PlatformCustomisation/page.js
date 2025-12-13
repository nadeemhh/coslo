'use client';  // Ensure it's only here

import './page.css';
import Link from 'next/link';
import { useState, useEffect } from "react";
import dynamic from 'next/dynamic';
//import QuillEditor from '../../component/QuillEditor.js'
 const QuillEditor = dynamic(() => import('../../component/QuillEditor.js'), { ssr: false });

export default function Page() {
  const [data, setData] = useState(null);
console.log(data)
  useEffect(() => {
    getcust();
  }, []);

  const getcust = () => {
 
  
    document.querySelector('.loaderoverlay').style.display='flex';
   
      const token = localStorage.getItem('admintoken');
    
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
     setData(data)
     
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
      const token = localStorage.getItem('admintoken');
    
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
      {data && (
        <div className="add-product-container">
          <div className="basic-info">
            <h2>Platform Customisation</h2>

            <div className="input-group">
              <h3>Terms of Use</h3>
              <QuillEditor value={data.termsOfService||''} onChange={(value) => setData({ ...data, termsOfService: value })} />
            </div>

            <div className="input-group">
              <h3>Privacy Policy</h3>
              <QuillEditor value={data.privacyPolicy||''} onChange={(value) => setData({ ...data, privacyPolicy: value })} />
            </div>
            
            <div className="input-group">
              <h3>Return Policy</h3>
              <QuillEditor value={data.returnPolicy||''} onChange={(value) => setData({ ...data, returnPolicy: value })} />
            </div>

            <div className="input-group">
              <h3>Shipping Policy</h3>
              <QuillEditor value={data.shippingPolicy||''} onChange={(value) => setData({ ...data, shippingPolicy: value })} />
            </div>

            <div className="input-group">
              <h3>Cookie Policy</h3>
              <QuillEditor value={data.cookiesPolicy||''} onChange={(value) => setData({ ...data, cookiesPolicy: value })} />
            </div>

            <div className="input-group">
              <h3>Support Contact No.</h3>
              <input type="text" value={data.supportPhone||''} onChange={(e) => setData({ ...data, supportPhone: e.target.value })} />
            </div>
            <div className="input-group">
              <h3>Support Email</h3>
              <input type="text" value={data.supportEmail||''} onChange={(e) => setData({ ...data, supportEmail: e.target.value })} />
            </div>
            <button className="create-new" onClick={()=>send()}>
        Add/Update
             <i className="fas fa-arrow-right"></i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
