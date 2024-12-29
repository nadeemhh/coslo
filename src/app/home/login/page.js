import React from 'react'
import "../CreateAccount.css";

function Login() {
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
                    <h1 className="">Welcome Back</h1>
                    <p>Streamline your business operations with our marketplace</p>
                    <div className="form-tab">
                        <label>Enter Email</label>
                        <input type="email" placeholder="@gmail.com" className="" />
                    </div>
                    <div className='form-tab'>
                        <label>Enter Password</label>
                        <input type="password" placeholder="********" className="" />
                    </div>
                    <button className="form-tab">Login ➜</button>
                </div>
            </div>
        </div>
    );
}

export default Login