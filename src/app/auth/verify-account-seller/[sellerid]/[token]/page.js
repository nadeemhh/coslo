'use client'
import { useParams } from 'next/navigation';
import { useState } from 'react';
import "../../../CreateAccount.css";

function ResetPassword() {
    const params = useParams();
    const token = params.token;
     const sellerid = params.sellerid;
    console.log(token,'sellerid',sellerid,params)
     const [error, setError] = useState('');

  console.log(token)

  const handleLVerify = (e) => {
    e.preventDefault();

    document.querySelector('.loaderoverlay').style.display='flex';

    const userData = {
        token:token,
        sellerId:sellerid
    };


    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/seller/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return response.json().then((errorData) => {
            throw new Error(errorData.message || 'Failed.');
          });
        }
      })
      .then((data) => {
         console.log(data)
         document.querySelector('.loaderoverlay').style.display='none';
         window.location.href = '/auth/sup-manu/login';

        
      })
      .catch((err) => {
        document.querySelector('.loaderoverlay').style.display='none';
        setError(err.message);
      });
  };

    return (
        <div className='main' >
            <div className="left-container">
                <img
                    src="\images\img1.jpg"
                    alt="Profile"
                    className="profile-pic"
                />
            </div>
            <div className='right-container'>
                <div className="form">
                    <h1 className="">Verify Your Account</h1>
                    {error && <p style={{color:'red',padding:'10px'}}>{error}</p>}
                    
                    <button className="form-tab"   onClick={handleLVerify}>Verify ➜</button>
                </div>
            </div>
        </div>
    );
}

export default ResetPassword