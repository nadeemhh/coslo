'use client'
import Link from 'next/link';
import './Employee.css'
import { useState } from 'react'



function ImageUploader({ title, images, setImages, id }) {
  const [isUploaded, setIsUploaded] = useState(false);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImages([{ name: file.name, file }]);
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
  const [gstImages, setGstImages] = useState([]);
  const [complianceImages, setComplianceImages] = useState([]);
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
    ComplianceNo: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('user', JSON.stringify(user));
    if (gstImages[0]) formData.append('gstCertificate', gstImages[0].file);
    if (complianceImages[0]) formData.append('complianceCertificate', complianceImages[0].file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        alert('Form submitted successfully!');
      } else {
        alert('Failed to submit the form.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
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
            <input type="text" name="phoneNo" value={user.phoneNo} onChange={handleOnChange} />
          </div>
          <div className="form-tab">
            <label htmlFor="company">Enter Company Name</label>
            <input type="text" name="company" value={user.company} onChange={handleOnChange} />
          </div>
          <div className="form-tab">
            <label htmlFor="location">Enter Full Location</label>
            <input type="text" name="location" value={user.location} onChange={handleOnChange} />
          </div>
          <div className="form-tab">
            <label htmlFor="businessType">Enter Business Type</label>
            <input type="text" name="businessType" value={user.businessType} onChange={handleOnChange} />
          </div>
          <div className="form-tab">
            <label htmlFor="password">Create Password</label>
            <input type="password" name="password" value={user.password} onChange={handleOnChange} />
          </div>
          <div className="form-tab">
            <label htmlFor="gstNo">Enter GST No.</label>
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
            <label htmlFor="ComplianceNo">Enter Compliance No.</label>
            <input type="text" name="ComplianceNo" value={user.ComplianceNo} onChange={handleOnChange} />
          </div>

          {/* Compliance Certificate Uploader */}
          <ImageUploader
            title="Add Compliance Certificate"
            images={complianceImages}
            setImages={setComplianceImages}
            id="complianceUploader"
          />

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
                            <p htmlFor='role'  style={{textAlign:'left',fontSize:'19px',fontWeight:'600',margin:'30px 10px'}}>Role</p>
                            <div className='fo2'>
                                <input type='radio' className='btn' name='role' value={"Coslo Provided Delivery"} onChange={handleOnChange} />
                                <label>Supplier</label>
                            </div>
                            <div className='fo2'>
                                <input type='radio' className='btn' name='role' value={"Self Delivery Model"} onChange={handleOnChange} />
                                <label>Manufacturer</label>
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

          {/* <button className="fo2" onClick={handleSubmit}>
            Send Account Creation Mail ➜
          </button> */}
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
