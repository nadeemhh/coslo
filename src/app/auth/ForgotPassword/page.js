'use client'
import "../CreateAccount.css";
import { useState } from 'react';

function ResetPassword() {
  const [email, setemail] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    document.querySelector('.loaderoverlay').style.display='flex';

    const userData = {
      email
    };

     // Retrieve the token from localStorage, if it exists


    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/seller/send-reset-password-link`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
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
         console.log(data)
         document.querySelector('.loaderoverlay').style.display='none';
         window.location.reload();
alert(data.message)
        
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
                    <h1 className="">You will receive an email to reset your password.</h1>
                    {error && <p style={{color:'red',padding:'10px'}}>{error}</p>}
                    <div className='form-tab'>
                        <label>Enter Registered Email ID</label>
                        <input type="email" className=""  value={email}
              onChange={(e) => setemail(e.target.value)}/>
                    </div>
                    <button className="form-tab"   onClick={handleLogin}>Send Email ➜</button>
                </div>
            </div>
        </div>
    );
}

export default ResetPassword