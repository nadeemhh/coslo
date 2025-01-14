'use client'
import './page.css'
import '../../../component/component-css/cartcard.css'
// import "../../../component/component-css/ui.css";
import Link from 'next/link';
import  { useState } from "react";
import Goback from '../../../back.js'

export default function Page() {

  const [name, setname] = useState('');
    const [email, setEmail] = useState('');
    const [mobileNo, setmobileNo] = useState('');
    const [error, setError] = useState('');
    
    const handleLogin = (e) => {
        e.preventDefault();
    
        document.querySelector('.loaderoverlay').style.display='flex';

        const loginData = {
          name,
          email,
          phoneNumber:mobileNo
        };
    
         // Retrieve the token from localStorage, if it exists
  const token = localStorage.getItem('token');

        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/employee/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }), // Add token if it exists
          },
          body: JSON.stringify(loginData),
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
             document.querySelector('.loaderoverlay').style.display='none';
             alert(data.message)
            
location.reload()
            
          })
          .catch((err) => {
            document.querySelector('.loaderoverlay').style.display='none';
            setError(err.message);
          });
      };
    


  return (
    <div className="order-details">
      <div className="header">
        <button className="back-button">
          <Goback/>
        </button>
        <h2>New Employee Registration</h2>
     
      </div>

      <div className="add-product-container">
        <img src="\icons\iii.png" alt="" width={'400px'}/>
      <div className="basic-info">
        <h2>Employee Information</h2>
        {error && <p style={{color:'red',padding:'10px'}}>{error}</p>}
        <div className="input-group">
          <label htmlFor="product-name">Enter Name *</label>
          <input id="product-name" type="text" placeholder="John Doe"  value={name}
              onChange={(e) => setname(e.target.value)}/>
        </div>
        <div className="input-group">
          <label htmlFor="brand-name">Enter Mobile No *</label>
          <input id="brand-name" type="number" placeholder="00000"  value={mobileNo}
              onChange={(e) => setmobileNo(e.target.value)}/>
        </div>
        <div className="input-group">
          <label htmlFor="product-video">Enter Email *</label>
          <input id="product-video" type="text" placeholder="john@mail.com"  value={email}
              onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div className="input-group">
          <label htmlFor="product-video">Enter Password *</label>
          <input id="product-video" type="text" placeholder="*******************" />
        </div>

        <button className="create-new"  onClick={handleLogin}>
        Send Email Link
             <i className="fas fa-arrow-right"></i>
            </button>
      </div>
      
    </div>


    </div>
  );
}

