'use client'
import { useParams } from 'next/navigation';
import { useState } from 'react';
import "../../CreateAccount.css";

function ResetPassword() {
    const params = useParams();
    const token = params.token;
     const [password, setpassword] = useState('');
     const [error, setError] = useState('');

  console.log(token)

  const handleLogin = (e) => {
    e.preventDefault();

    document.querySelector('.loaderoverlay').style.display='flex';

    const userData = {
        password,
        token:token
    };

     // Retrieve the token from localStorage, if it exists


    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/employee/forgot-password`, {
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
         window.location.href = '/auth/Employeelogin';

        
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
                    <h1 className="">Reset Your Password</h1>
                    {error && <p style={{color:'red',padding:'10px'}}>{error}</p>}
                    <div className='form-tab'>
                        <label>Enter New Password</label>
                        <input type="password" placeholder="********" className=""  value={password}
              onChange={(e) => setpassword(e.target.value)}/>
                    </div>
                    <button className="form-tab"   onClick={handleLogin}>Create Password ➜</button>
                </div>
            </div>
        </div>
    );
}

export default ResetPassword