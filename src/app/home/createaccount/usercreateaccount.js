'use client'
import { useState } from "react";

function Createaccount() {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        password: "",
        confirmPassword: "",
        userType: "Retailer"
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if passwords match
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        document.querySelector('.loaderoverlay').style.display='flex';
        
        try {

            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/buyer/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: formData.name,
                    phone: formData.phone,
                    email: formData.email,
                    password: formData.password,
                    userType: formData.userType
                })
            });

            const data = await response.json();

            if (response.ok) {
                document.querySelector('.loaderoverlay').style.display='none';
                alert("Account created successfully!");
                window.location.href = '/home/login';
            } else {
                document.querySelector('.loaderoverlay').style.display='none';
                alert(data.message || "Registration failed");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <div className='main mymain'>
            <div className="left-container">
                <img src="/images/img1.jpg" alt="Profile" className="profile-pic" />
            </div>
            <div className='right-container'>
                <form className="form" onSubmit={handleSubmit}>
                    <h1>Create Account</h1>
                    <p>Streamline your business operations with our marketplace</p>

                    <div className="form-tab">
                        <label>Enter Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter Your Name" required />
                    </div>

                    <div className="form-tab">
                        <label>Enter Phone No</label>
                        <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="+91" required />
                    </div>

                    <div className="form-tab">
                        <label>Enter Email</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="@gmail.com" required />
                    </div>

                    <div className='form-tab'>
                        <label>Enter Password</label>
                        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="********" required />
                    </div>

                    <div className="form-tab">
                        <label>Confirm Password</label>
                        <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="********" required />
                    </div>

                    <div className='radio-btn form-tab'>
                        <div className='radio-ret'>
                            <input type='radio' name='userType' value="Retailer" checked={formData.userType === "Retailer"} onChange={handleChange} />
                            <label>Retailer</label>
                        </div>
                        <div className='radio-self'>
                            <input type='radio' name='userType' value="Self Use" checked={formData.userType === "Self Use"} onChange={handleChange} />
                            <label>Self Use</label>
                        </div>
                    </div>

                    <button type="submit" className="form-tab">Create Account ➜</button>
                </form>
            </div>
        </div>
    );
}

export default Createaccount;
