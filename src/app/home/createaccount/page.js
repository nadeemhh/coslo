import React from 'react'
import "../CreateAccount.css";


function Page() {
    return (
        <div className='main' >
            <div className="left-container">
                <img
                    src="\images\img1.png"
                    alt="Profile"
                    className="profile-pic"
                />
            </div>
            <div className='right-container'>
                <div className="form">
                    <h1 className="">Create Account</h1>
                    <p>Streamline your business operations with our marketplace</p>
                    <div className="form-tab">
                        <label>Enter Name</label>
                        <input type="text" placeholder="Enter Your Name" className="" />
                    </div>
                    <div className="form-tab">
                        <label>Enter Phone No</label>
                        <input type="text" placeholder="+91" className="" />
                    </div>
                    <div className="form-tab">
                        <label>Enter Email</label>
                        <input type="email" placeholder="@gmail.com" className="" />
                    </div>
                    <div className='form-tab'>
                        <label>Enter Password</label>
                        <input type="password" placeholder="********" className="" />
                    </div>
                    <div className="form-tab">
                        <label>Confirm Password</label>
                        <input type="password" placeholder="********" className="" />
                    </div>
                    <div className='radio-btn form-tab '>
                        <div className='radio-ret'>
                            <input type='radio' className='btn' name='group1'/>
                            <label>Retailer</label>
                        </div>
                        <div className='radio-self'>
                            <input type='radio' className='btn' name='group1'/>
                            <label>Self Use</label>
                        </div>
                    </div>
                    <button className="form-tab">Create Account ➜</button>
                </div>
            </div>
        </div>
    );
}

export default Page;