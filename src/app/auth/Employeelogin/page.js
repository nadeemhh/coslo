'use client'
import "../CreateAccount.css";
import { useState,useEffect } from 'react';


function Login() {

        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [error, setError] = useState('');
       
      
        const handledata = (e) => {
            e.preventDefault();
        
            document.querySelector('.loaderoverlay').style.display='flex';

            const userData = {
              email,
              password,
            };
        
            fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/employee/login`, {
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
                    // Save token to localStorage
                    document.querySelector('.loaderoverlay').style.display='none';

                    function setCookie(name, value, days) {
                      let expires = new Date();
                      expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
                      document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
                  }
                  
                  
                  //setCookie("employeetoken", data.token, 365);

            localStorage.setItem('employeetoken', data.token);
            
                // Successfully logged in
                window.location.href = '/Employee/Sellers';
               
              })
              .catch((err) => {
                document.querySelector('.loaderoverlay').style.display='none';
                setError(err.message);
              });
          };


              useEffect(() => {
                            
                               
                            if (localStorage.getItem('employeetoken')) {
                              window.location.href = '/Employee/Sellers';
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
            <div className='right-container'>
                <div className="form">
                    <h1 className="">Employee Login</h1>
                    <p> Streamline your business operations with our marketplace</p>
                    {error && <p style={{color:'red'}}>{error}</p>}
                    <div className="form-tab">
                        <label>Enter Email</label>
                        <input type="email" placeholder="@gmail.com" className="" value={email}
              onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className='form-tab'>
                        <label>Enter Password</label>
                        <input type="password" placeholder="********" className="" value={password}
              onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button className="form-tab"  onClick={handledata}>Employee Login ➜</button>
                </div>
            </div>
        </div>
    );
}

export default Login