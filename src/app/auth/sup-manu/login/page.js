'use client'
import "../../CreateAccount.css";
import { useState } from 'react';

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
    
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/seller/login`, {
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
        localStorage.setItem('token', data.token);
        
            // Successfully logged in
            window.location.href = '/supplier/dashboard';
           
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
                    src="\images\img2.png"
                    alt="Profile"
                    className="profile-pic"
                />
            </div>
            <div className='right-container'>
                <div className="form">
                    <h1 className="">Seller Admin Login</h1>
                    <p> I want add Sell directly to Buyers With ZERO Commission</p>
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
                    <button className="form-tab" onClick={handledata}>Admin Login ➜</button>
                    <a href="/auth/ForgotPassword" style={{color:'#1389F0',textDecoration:'none'}}>Forgot Password ?</a>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}

export default Login