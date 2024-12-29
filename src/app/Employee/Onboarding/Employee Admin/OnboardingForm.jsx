'use client'
import Link from 'next/link';
import './Employee.css'
import { useState } from 'react'


function OnboardingForm() {
    const [images, setImages] = useState([]);
    const [user, setUser] = useState({
        name: "",
        email: "",
        phoneNo: "",
        company: "",
        location: "",
        businessType: "",
        password: "",
        gstNo: "",
        DeliveryType: "",
        SubscriptionType: "",

    });
   

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });

    }

    const handleImageUpload = (event) => {
        const files = Array.from(event.target.files);
        const imageUrls = files.map((file) => URL.createObjectURL(file));
        setImages((prevImages) => [...prevImages, ...imageUrls]);
      };
    
      const removeImage = (index) => {
        setImages(images.filter((_, i) => i !== index));
      };
    
    


    return (
        <div className='mymain' >
            <h1 className="">Manufacturer/Supplier Onboarding Form</h1>
            <div>
                <div >
                    <div className="form">
                        <div className="form-tab">
                            <label htmlFor='name'>Enter Name</label>
                            <input type="text" name="name" value={user.name} onChange={handleOnChange} />
                        </div>
                        <div className="form-tab">
                            <label htmlFor='email'>Enter Email</label>
                            <input type="email" name="email" value={user.email} onChange={handleOnChange} />
                        </div>
                        <div className="form-tab">
                            <label htmlFor='phoneNo'>Enter Phone No</label>
                            <input type="text" name='phoneNo' value={user.phoneNo} onChange={handleOnChange} />
                        </div>
                        <div className="form-tab">
                            <label htmlFor='company'>Enter Company Name</label>
                            <input type="text" name="company" value={user.company} onChange={handleOnChange} />
                        </div>
                        <div className="form-tab">
                            <label htmlFor='location'>Enter Full Location</label>
                            <input type="text" name='location' value={user.location} onChange={handleOnChange} />
                        </div>
                        <div className="form-tab">
                            <label htmlFor='businessType'>Enter Business Type</label>
                            <input type="text" name="businessType" value={user.businessType} onChange={handleOnChange} />
                        </div>
                        <div className='form-tab'>
                            <label htmlFor='password'>Create Password</label>
                            <input type="password" name='password' value={user.password} onChange={handleOnChange} />
                        </div>
                        <div className="form-tab">
                            <label htmlFor='gstNo'>Enter GST No.</label>
                            <input type="text" name='gstNo' value={user.gstNo} onChange={handleOnChange} />
                        </div>
                      
                      
                        <div className="image-uploader">
 
 <div className="add-image">
   <input
     type="file"
     id="imageInput"
     multiple
     onChange={handleImageUpload}
     accept="image/*"
   />
   <label htmlFor="imageInput" className="add-image-label">
   <img src="\icons\upcross.svg" alt=""  width={'30px'}/>
     <p>Add GST Cert. Image</p>
   </label>
 </div>
 <div className="image-preview">
   {images.map((image, index) => (
     <div className="image-container" key={index}>
       <img src={image} alt={`preview-${index}`} />
       <button
         className="remove-button"
         onClick={() => removeImage(index)}
       >
         <i className="fas fa-times"></i>
       </button>
     </div>
   ))}
 </div>
</div>
                        
                        <div className="radio-tab">
                            <p htmlFor='SubscriptionType'  style={{textAlign:'left',fontSize:'19px',fontWeight:'600',margin:'30px 10px'}}>Select Subscription Type</p>
                            <div className='fo2'>
                                <input type='radio' className='btn' name='SubscriptionType' value={"Monthly Subscription"} onChange={handleOnChange} />
                                <label>Monthly Subscription</label>
                            </div>
                            <div className='fo2'>
                                <input type='radio' className='btn' name='SubscriptionType' value={"Yearly Subscription"} onChange={handleOnChange} />
                                <label>Yearly Subscription</label>
                            </div>
                            <div className='fo2'>
                                <input type='radio' className='btn' name='SubscriptionType' value={"Commission Model"} onChange={handleOnChange} />
                                <label>Commission Model</label>
                            </div>
                        </div>
                        <div className="radio-tab">
                            <p htmlFor='DeliveryType'  style={{textAlign:'left',fontSize:'19px',fontWeight:'600',margin:'30px 10px'}}>Select Delivery Type</p>
                            <div className='fo2'>
                                <input type='radio' className='btn' name='DeliveryType' value={"Coslo Provided Delivery"} onChange={handleOnChange} />
                                <label>Coslo Provided Delivery</label>
                            </div>
                            <div className='fo2'>
                                <input type='radio' className='btn' name='DeliveryType' value={"Self Delivery Model"} onChange={handleOnChange} />
                                <label>Self Delivery Model</label>
                            </div>
                        </div>

                        <Link href="/Employee/Onboarding/success">
        
                        <button className="fo2">Send Account Creation Mail ➜</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default OnboardingForm