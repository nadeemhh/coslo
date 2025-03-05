'use client'
import Link from 'next/link';
import { useParams } from 'next/navigation';
import './Employee.css'
import { useState,useEffect } from 'react'
import { useSearchParams } from "next/navigation";
import Planstable from "../../../component/planstables.js";

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

export default function OnboardingForm() {
  const params = useParams();
  const requestid = params.requestId;
  console.log(requestid)
  const [gstImages, setGstImages] = useState([]);
  const [complianceImages, setComplianceImages] = useState([]);
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
 


    const handledata = () => {
     
  
      document.querySelector('.loaderoverlay').style.display='flex';
  
     const token = localStorage.getItem('token');
  
  
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/employee/pending-requests/${requestid}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }), // Add token if it exists
        },
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
              console.log(data)
             
             document.querySelector('.loaderoverlay').style.display='none';
      
             setUser({
                name: data.name || "",
                email: data.email || "",
                phoneNo: data.phone || "",
                company: data.businessName || "",
                location: data.address?.addressLine || "",  // Mapping addressLine to location
                city: data.address?.city || "",
                state: data.address?.state || "",
                pincode: data.address?.pincode || "",
                gstNo: data.gstNumber || "",
                DeliveryType: data.deliveryType || "",
                SubscriptionType: data.subscriptionPlan || "",
                role: data.businessType || "",
                password: "", // Keeping password empty for security
                panNumber: data.panNumber || "", // Assuming panNumber is not available in API
                ComplianceNo: data.ComplianceNo || "",
                AccountHolderName:data.bankDetails?.accountHolderName || "",
    AccountNumber:data.bankDetails?.accountNumber || "",
    IFSCCode:data.bankDetails?.ifscCode || "",
    BankName:data.bankDetails?.bankName || "",
                
            });
        
         
        })
        .catch((err) => {
          document.querySelector('.loaderoverlay').style.display='none';
          console.log(err)
        });
    };
  
  
    useEffect(() => {
      handledata();
    },[]);
  



  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async () => {

    document.querySelector('.loaderoverlay').style.display='flex';

  
    const formData = new FormData();
    
    // Append text fields as shown in the image
    formData.append("gstNumber", user.gstNo);
    formData.append("businessType", user.role);
    formData.append("deliveryType", user.DeliveryType);
    formData.append("subscriptionPlan", user.SubscriptionType);
    formData.append("address[addressLine]", user.location);
    formData.append("address[city]", user.city);
    formData.append("address[state]", user.state);
    formData.append("address[pincode]", user.pincode);
    formData.append("address[phone]", user.phoneNo);  // Keep as string
    formData.append("panNumber", user.panNumber);
    formData.append("qualityCert", user.ComplianceNo);
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
    

   const token = localStorage.getItem('token');

   console.log(`${process.env.NEXT_PUBLIC_BASE_URL}/seller/onboard/${requestid}`)

fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/seller/onboard/${requestid}`, {
  method: "POST",
  headers: {
    ...(token && { Authorization: `Bearer ${token}` }), // Add token if it exists
  },
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

window.location.href = '/Employee/Onboarding/success';

})
  .catch((error) => {
    console.error("Error submitting form:", error.message);
    alert(error.message || error.error || 'Failed to submit the form.')
    document.querySelector('.loaderoverlay').style.display='none';
  });

  };
  

  return (
    <div className="mymain">
      <h1>Manufacturer/Supplier Onboarding Form</h1>
      <div>
        <div className="form">
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
          {/* <div className="form-tab">
            <label htmlFor="password">Enter Password</label>
            <input type="text" name="password" value={user.password} onChange={handleOnChange} />
          </div> */}
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

                       
        
                        <button className="fo2"onClick={handleSubmit}>Send Account Creation Mail ➜</button>
                        

          
    {/* Pricing Section */}
  
  <Planstable showbuybuttons={false}/>

        </div>
      </div>
    </div>
  );
}



// export  function ImageUploader({ title, images, setImages, id }) {
//     const handleImageUpload = (event) => {
//       const files = Array.from(event.target.files);
//       const imageUrls = files.map((file) => URL.createObjectURL(file));
//       setImages((prevImages) => [...prevImages, ...imageUrls]);
//     };
  
//     const removeImage = (index) => {
//       setImages(images.filter((_, i) => i !== index));
//     };
  
//     return (
//       <div className="image-uploader">
//         <div className="add-image">
//           <input
//             type="file"
//             id={id}
//             multiple
//             onChange={handleImageUpload}
//             accept="image/*,application/pdf"
//           />
//           <label htmlFor={id} className="add-image-label">
//             <img src="/icons/upcross.svg" alt="" width={'30px'} />
//             <p>{title}</p>
//           </label>
//         </div>
//         <div className="image-preview">
//           {images.map((image, index) => (
//             <div className="image-container" key={index}>
//               <img src={image} alt={`preview-${index}`} />
//               <button
//                 className="remove-button"
//                 onClick={() => removeImage(index)}
//               >
//                 <i className="fas fa-times"></i>
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   }


// const businessDetails = {
//   businessType: user.businessType,
//   gstCertificate: gstImages[0]
//     ? {
//         certificateNumber: user.gstNo,
//         validFrom: "2023-01-01", // Replace with actual date fields if needed
//         validTo: "2024-01-01", // Replace with actual date fields if needed
//         certificateFile: gstImages[0].file.name,
//       }
//     : null,
//   complianceCertificate: complianceImages[0]
//     ? {
//         certificateNumber: user.ComplianceNo,
//         validFrom: "2023-03-15", // Replace with actual date fields if needed
//         validTo: "2024-03-15", // Replace with actual date fields if needed
//         certificateFile: complianceImages[0].file.name,
//       }
//     : null,
//   address: {
//     addressLine: user.location,
//     city: user.city,
//     state: user.state,
//     pincode: user.pincode,
//     phone: Number(user.phoneNo),
//   },

// };