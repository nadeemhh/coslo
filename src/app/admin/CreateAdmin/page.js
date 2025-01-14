'use client'

import "../CreateAccount.css";
import { useState } from 'react';

function CreateSuperAdminAccount() {
            const [email, setEmail] = useState('');
            const [password, setPassword] = useState('');
            const [name, setname] = useState('');
            const [error, setError] = useState('');
           
          
            const handledata = (e) => {
                e.preventDefault();
            
                
document.querySelector('.loaderoverlay').style.display='flex';


                const userData = {
                    name,
                  email,
                  password,
                };
            console.log(userData)
                const token = localStorage.getItem('token');

                fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/register`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    ...(token && { Authorization: `Bearer ${token}` }), // Add token if it exists
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
                        // Save token to localStorage
                        document.querySelector('.loaderoverlay').style.display='none';
                        console.log(data)
                        alert('Admin Created')
          location.reload()
                   
                  })
                  .catch((err) => {
                    document.querySelector('.loaderoverlay').style.display='none';
                    setError(err.message);
                  });
              };
    
              
    return (
        <div className='main' >
           
            <div className='right-container'>
                <div className="form">
                    <h1 className="">Create Admin Account</h1>
                    <p> Streamline your business operations with our marketplace</p>
                    {error && <p style={{color:'red'}}>{error}</p>}
                    <div className="form-tab">
                        <label>Enter Name</label>
                        <input type="email" placeholder="name" className="" value={name}
              onChange={(e) => setname(e.target.value)} />
                    </div>
                    <div className="form-tab">
                        <label>Enter Email</label>
                        <input type="email" placeholder="@gmail.com" className="" value={email}
              onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className='form-tab'>
                        <label>Create Password</label>
                        <input type="password" placeholder="********" className="" value={password}
              onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button className="form-tab"   onClick={handledata}>Create Account ➜</button>
                </div>
            </div>
        </div>
    );
}

export default CreateSuperAdminAccount