'use client'
import "../CreateAccount.css";
import { useState,useEffect } from 'react';

function Page() {

    
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
        
            fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/buyer/login`, {
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
                  
                  // Set a cookie named "testCookie" that expires in 1 minute
                  setCookie("buyertoken", data.token, 1);

            localStorage.setItem('buyertoken', data.token);
            localStorage.setItem('buyer', JSON.stringify(data.buyer));
                // Successfully logged in
                window.location.href = '/home';
               
              })
              .catch((err) => {
                document.querySelector('.loaderoverlay').style.display='none';
                setError(err.message);
              });
          };
    


          useEffect(() => {

            function getCookie(name) {
                let cookies = document.cookie.split("; ");
                for (let cookie of cookies) {
                    let [key, value] = cookie.split("=");
                    if (key === name) return value;
                }
                return null;
            }
            
               
            if (getCookie('buyertoken')) {
              window.location.href = '/home';
          }
        
          },[]);

    return (
        <div className='main mymain' >
            <div className="left-container">
                <img
                    src="\images\img1.jpg"
                    alt="Profile"
                    className="profile-pic"
                />
            </div>
            <div className='right-container'>
                <div className="form">
                    <h1 className="">Buyer Login</h1>
                    <p>Streamline your business operations with our marketplace</p>
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

                    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                    <button className="form-tab" onClick={handledata}>Login ➜</button>
                    <a href="/home/forgotpassword" style={{color:'#1389F0',textDecoration:'none'}}>Forgot Password ?</a>
                    </div>

                    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:'20px'}}>
                    <a href="/home/createaccount" style={{color:'#1389F0',textDecoration:'none'}}>Don't have an account? Create an account.</a>

                    </div>
                    
                </div>
            </div>
        </div>
    );
}

export default Page