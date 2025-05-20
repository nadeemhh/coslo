'use client'

import "../CreateAccount.css";
import { useState } from 'react';


function Login() {
  

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    

    const handledata = () => {

      const token = localStorage.getItem('admintoken');

       fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/get-admin`, {
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
               console.log('=>',data)
               localStorage.setItem('admindata',JSON.stringify(data));
               window.location.href = '/admin/dashboard';
         })
         .catch((err) => {
           console.log(err)
         });
     };


    const handleLogin = (e) => {
        e.preventDefault();
      
        document.querySelector('.loaderoverlay').style.display='flex';


        const userData = {
          email,
          password,
        };
    
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/login`, {
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
                throw new Error(errorData.message || 'Failed to log in. Please try again.');
              });
            }
          })
          .then((data) => {
            console.log(data)
            document.querySelector('.loaderoverlay').style.display='none';
                // Save token to localStorage
                function setCookie(name, value, days) {
                  let expires = new Date();
                  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
                  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
              }
              
            
              setCookie("admintoken", data.token, 7);

        localStorage.setItem('admintoken', data.token);
        handledata()
            
           
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
            <div className="right-container">
      <div className="form">
        <h1>Super Admin Login</h1>
        <p>Streamline your business operations with our marketplace</p>
        {error && <p style={{color:'red'}}>{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="form-tab">
            <label>Enter Email</label>
            <input
              type="email"
              placeholder="@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-tab">
            <label>Enter Password</label>
            <input
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="form-tab">
            Admin Login ➜
          </button>
        </form>
      </div>
    </div>
    
  
        </div>
    );
}

export default Login


