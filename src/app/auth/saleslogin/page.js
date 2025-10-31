'use client'

import "../CreateAccount.css";
import { useState,useEffect } from 'react';


function Login() {
  

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
      
        document.querySelector('.loaderoverlay').style.display='flex';


        const userData = {
          email,
          password,
        };
    
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/sales/login`, {
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
               
        localStorage.setItem('salestoken', data.token);
         window.location.href = '/salesadmin/leads';
           
          })
          .catch((err) => {
           
            document.querySelector('.loaderoverlay').style.display='none';

            setError(err.message);
          });
      };
    

                  useEffect(() => {

                            if (localStorage.getItem('salestoken')) {
                              window.location.href = '/salesadmin/leads';
                          }
                        
                          },[]);

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
        <h1>Sales Admin Login</h1>
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
           Sales Admin Login ➜
          </button>
        </form>
      </div>
    </div>
    
  
        </div>
    );
}

export default Login


