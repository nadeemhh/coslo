'use client'
import "../../CreateAccount.css";
import "./page.css";
import Link from 'next/link';
import  { useState } from "react";



function ImageUploader({ title, images, setImages, id }) {
  const [isUploaded, setIsUploaded] = useState(false);
 
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImages([file]);
      setIsUploaded(true);
    }
  };

  return (
    <div className="image-uploader-container-767">
      <div className="add-image">
        <input
          type="file"
          id={id}
          onChange={handleFileUpload}
          accept="image/*,application/pdf"
        />
        <label htmlFor={id} className="add-image-label">
          <img src="/icons/upcross.svg" alt="" width="30px" />
          <p>{title}</p>
        </label>
      </div>
      {isUploaded && (
          <div className="upload-image">
        <div className="add-image-label">
          <img src="/icons/checku.svg" alt="Check" width="50px" />
          <p>Uploaded</p>
        </div>
        </div>
      )}
    </div>
  );
}


function Page() {
  const [confirmationOpen, setconfirmationOpen] = useState(false);
      const [gstImages, setGstImages] = useState([]);
      const [complianceImages, setComplianceImages] = useState([]);
      const [error, setError] = useState('');
      const [user, setUser] = useState({
        name: "",
        email: "",
        phoneNo: "",
        company: "",
        location: "",
        city:"",
        state:"",
        pincode:"",
        gstNo: "",
        DeliveryType: "",
        SubscriptionType: "",
        role: "",
        ComplianceNo: "",
        password:"",
        panNumber:"",
        AccountHolderName:"",
AccountNumber:"",
IFSCCode:"",
BankName:"",
      });
    console.log(user)
     
    
    const toggleconfirmation = () => {
    
      setconfirmationOpen(!confirmationOpen);
    };

      const handleOnChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
      };
    
      const handleSubmit = async () => {
    
        document.querySelector('.loaderoverlay').style.display='flex';

      
        const formData = new FormData();
        
        // Append text fields as shown in the image
        formData.append("name", user.name);
        formData.append("email", user.email);
        formData.append("phone", user.phoneNo);
        formData.append("password", user.password);
        formData.append("businessName", user.company);
        formData.append("gstNumber", user.gstNo);
        formData.append("businessType", user.role);
        formData.append("deliveryType", user.DeliveryType);
        formData.append("subscriptionPlan", user.SubscriptionType);
        formData.append("address[addressLine]", user.location);
        formData.append("address[city]", user.city);
        formData.append("address[state]", user.state);
        formData.append("address[pincode]", user.pincode);
        formData.append("panNumber", user.panNumber);
        formData.append("qualityCert", user.ComplianceNo);
        formData.append("address[phone]", user.phoneNo);
        formData.append("bankDetails[accountHolderName]", user.AccountHolderName);
        formData.append("bankDetails[accountNumber]", user.AccountNumber);
        formData.append("bankDetails[ifscCode]", user.IFSCCode);
        formData.append("bankDetails[bankName]", user.BankName);
       




        if (gstImages.length > 0 && gstImages[0] instanceof File) {
          formData.append("gstCertificateFile", gstImages[0]); 
        } else if (gstImages.length > 0 && gstImages[0].file instanceof File) {
          formData.append("gstCertificateFile", gstImages[0].file); // ✅ Extract actual File
        }
        
        if (complianceImages.length > 0 && complianceImages[0] instanceof File) {
          formData.append("complianceCertificateFile", complianceImages[0]);
        } else if (complianceImages.length > 0 && complianceImages[0].file instanceof File) {
          formData.append("complianceCertificateFile", complianceImages[0].file); // ✅ Extract actual File
        }
      
        console.log("FormData Entries:");
        for (let pair of formData.entries()) {
          console.log(pair[0], pair[1]);
        }
        
    
    
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/seller/self-registration`, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return response.json().then((errorData) => {
            throw new Error(errorData.message || errorData.error || 'Failed to submit the form.');
          });
        }
      }) .then((data) => {
    
      console.log(data)
    alert(data.message)
    
    window.location.href = '/home';
    
    })
      .catch((error) => {
        console.error("Error submitting form:", error);
        toggleconfirmation();
        setError(error.message || error.error || 'Failed to submit the form.');
        alert(error.message || error.error || 'Failed to submit the form.')
        document.querySelector('.loaderoverlay').style.display='none';
       
      });
    
      };
      
    
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
                <form className="form" onSubmit={(e) => {
  e.preventDefault();
  toggleconfirmation();
}}>
                    <h1 className="">We will get back to you soon!</h1>
                    <p> I want add Sell directly to Buyers With ZERO Commission</p>

                  

                    {error && <p style={{color:'red'}}>{error}</p>}

                    <div className="form-tab">
            <label htmlFor="name">Enter Name</label>
            <input type="text" name="name" value={user.name} onChange={handleOnChange} />
          </div>
          <div className="form-tab">
            <label htmlFor="email">Enter Email</label>
            <input type="email" name="email" value={user.email} onChange={handleOnChange} />
          </div>
          <div className="form-tab">
            <label htmlFor="phoneNo">Enter Phone No</label>
            <input type="number" name="phoneNo" value={user.phoneNo} onChange={handleOnChange} />
          </div>

          <div className="form-tab">
            <label htmlFor="password">Enter Password</label>
            <input type="text" name="password" value={user.password} onChange={handleOnChange} />
          </div>

          <div className="form-tab">
            <label htmlFor="company">Enter Company Name</label>
            <input type="text" name="company" value={user.company} onChange={handleOnChange} />
          </div>
          <div className="form-tab">
            <label htmlFor="location">Enter Address</label>
            <input type="text" name="location" value={user.location} onChange={handleOnChange} />
          </div>

          <div className="form-tab">
            <label htmlFor="location">Enter City</label>
            <input type="text" name="city" value={user.city} onChange={handleOnChange} />
          </div>
          <div className="form-tab">
            <label htmlFor="location">Enter State</label>
            <input type="text" name="state" value={user.state} onChange={handleOnChange} />
          </div>
          <div className="form-tab">
            <label htmlFor="location">Enter Pincode</label>
            <input type="text" name="pincode" value={user.pincode} onChange={handleOnChange} />
          </div>
         
          
          <div className="form-tab">
            <label htmlFor="panNumber">Enter Pan Number</label>
            <input type="text" name="panNumber" value={user.panNumber} onChange={handleOnChange} />
          </div>

         

          <div className="form-tab">
            <label htmlFor="gstNo">Enter GST Number</label>
            <input type="text" name="gstNo" value={user.gstNo} onChange={handleOnChange} />
          </div>

          {/* GST Certificate Uploader */}
          <ImageUploader
            title="ADD GST Certificate"
            images={gstImages}
            setImages={setGstImages}
            id="gstUploader"
          />

          <div className="form-tab">
            <label htmlFor="ComplianceNo">Enter Quality Certificate Number</label>
            <input type="text" name="ComplianceNo" value={user.ComplianceNo} onChange={handleOnChange} />
          </div>

          {/* Compliance Certificate Uploader */}
          <ImageUploader
            title="Add Compliance Certificate"
            images={complianceImages}
            setImages={setComplianceImages}
            id="complianceUploader"
          />


                            <p htmlFor='SubscriptionType'  style={{textAlign:'left',fontSize:'19px',fontWeight:'600',margin:'30px 10px'}}>Enter Bank Details</p>

                            <div className="form-tab">
            <label htmlFor="AccountHolderName">Account Holder Name</label>
            <input type="text" name="AccountHolderName" value={user.AccountHolderName} onChange={handleOnChange} />
          </div>

          <div className="form-tab">
            <label htmlFor="AccountNumber">Account Number</label>
            <input type="text" name="AccountNumber" value={user.AccountNumber} onChange={handleOnChange} />
          </div>

          <div className="form-tab">
            <label htmlFor="IFSCCode">IFSC Code</label>
            <input type="text" name="IFSCCode" value={user.IFSCCode} onChange={handleOnChange} />
          </div>

          <div className="form-tab">
            <label htmlFor="BankName">Bank Name</label>
            <input type="text" name="BankName" value={user.BankName} onChange={handleOnChange} />
          </div>

                       


<div className="radio-tab">
                            <p htmlFor='SubscriptionType'  style={{textAlign:'left',fontSize:'19px',fontWeight:'600',margin:'30px 10px'}}>Select Subscription Type</p>
                            <div className='fo2'>
                                <input type='radio' className='btn' name='SubscriptionType' value={"MONTHLY"} onChange={handleOnChange} />
                                <label>Monthly Subscription</label>
                            </div>
                            <div className='fo2'>
                                <input type='radio' className='btn' name='SubscriptionType' value={"YEARLY"} onChange={handleOnChange} />
                                <label>Yearly Subscription</label>
                            </div>
                            <div className='fo2'>
                                <input type='radio' className='btn' name='SubscriptionType' value={"FREE"} onChange={handleOnChange} />
                                <label>Free Model</label>
                            </div>
                        </div>

                        <div className="radio-tab">
                            <p htmlFor='role'  style={{textAlign:'left',fontSize:'19px',fontWeight:'600',margin:'30px 10px'}}>Role</p>
                            <div className='fo2'>
                                <input type='radio' className='btn' name='role' value={"SUPPLIER"} onChange={handleOnChange} />
                                <label>Supplier</label>
                            </div>
                            <div className='fo2'>
                                <input type='radio' className='btn' name='role' value={"MANUFACTURER"} onChange={handleOnChange} />
                                <label>Manufacturer</label>
                            </div>
                        </div>

                        <div className="radio-tab">
                            <p htmlFor='DeliveryType'  style={{textAlign:'left',fontSize:'19px',fontWeight:'600',margin:'30px 10px'}}>Select Delivery Type</p>
                            <div className='fo2'>
                                <input type='radio' className='btn' name='DeliveryType' value={"COSLO"} onChange={handleOnChange} />
                                <label>Coslo Provided Delivery</label>
                            </div>
                            <div className='fo2'>
                                <input type='radio' className='btn' name='DeliveryType' value={"SELF"} onChange={handleOnChange} />
                                <label>Self Delivery Model</label>
                            </div>
                        </div>

                       
        
                        <button className="fo2">Send Account Creation Mail ➜</button>
                        
                    {/* <button className="form-tab" type="submit">Submit</button> */}
                </form>

                {confirmationOpen && (
                <TermsCard toggleconfirmation={toggleconfirmation} handleSubmit={handleSubmit}/>
              )}
            </div>
        </div>
    );
}

export default Page;




const TermsCard = ({toggleconfirmation,handleSubmit}) => {
    return (
     
        <div className="modal-overlay">
 
        <div className="terms-card065">
          <div className="terms-header065">
            <h2 className="terms-title065">Terms & Conditions</h2>
            <i className="fa fa-times close-icon065" aria-hidden="true"  onClick={toggleconfirmation}></i>
          </div>
          <div className="terms-content065">
            <p>
              Welcome to Coslo! By using our website, you agree to the following terms and conditions. Please read them carefully.
            </p>
            <h3>1. Acceptance of Terms</h3>
            <p>
              By accessing or using coslo.com you acknowledge that you have read, understood, and agree to be bound by these Terms & Conditions.
            </p>
            <h3>2. Use of the Website</h3>
            <p>
              You must be at least 18 years old to use our services. You agree to use the website only for lawful purposes and in compliance with all applicable laws. Unauthorized use of the website may result in termination of your access.
            </p>
            <h3>3. Intellectual Property</h3>
            <p>
              All content, logos, designs, and graphics on [Website Name] are the property of [Company Name]. Unauthorized use or reproduction is strictly prohibited.
            </p>
            <h3>4. Privacy Policy</h3>
            <p>Your use of the website is also governed by our Privacy Policy.</p>
            <h3>5. Limitation of Liability</h3>
            <p>
              Coslo is not responsible for any direct, indirect, or consequential damages arising from your use of the website.
            </p>
            <h3>6. Changes to Terms</h3>
          </div>
          <div className="terms-footer065">
            <button className="accept-btn065" onClick={handleSubmit}>Accept</button>
            <button className="decline-btn065" style={{background:'#EC5959'}}  onClick={toggleconfirmation}>Decline</button>
          </div>
        </div>
        </div>
     
    );
  };


  