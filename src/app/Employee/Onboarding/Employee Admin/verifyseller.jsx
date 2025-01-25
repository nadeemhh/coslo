'use client'
import Link from 'next/link';
import { useParams } from 'next/navigation';
import './Employee.css'
import { useState,useEffect } from 'react'
import { useSearchParams } from "next/navigation";


export default function Verifyseller() {
  const params = useParams();
  const requestid = params.requestId;
  
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
    gsturl:"#",
    Complianceurl:"#"
  });
console.log(user)
 

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

 
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
                Complianceurl: data.complianceCertificateFile || "",
                gsturl: data.gstCertificateFile || "",
                password: "", // Keeping password empty for security
                panNumber: data.panNumber || "", // Assuming panNumber is not available in API
                ComplianceNo: data.qualityCert || "",
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
  

   
    const handleSubmit = async () => {

        document.querySelector('.loaderoverlay').style.display='flex';
    
      
       
    
       const token = localStorage.getItem('token');
    
       console.log(`${process.env.NEXT_PUBLIC_BASE_URL}/seller/onboard/${requestid}`)
    
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/seller/onboard/${requestid}`, {
      method: "POST",
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }), // Add token if it exists
      },
    
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return response.json().then((errorData) => {
            throw new Error(errorData.message || 'Failed to submit the form.');
          });
        }
      }) .then((data) => {
    
      console.log(data)
    alert(data.message)
    
    window.location.href = '/Employee/Onboarding/success';
    
    })
      .catch((error) => {
        console.error("Error submitting form:", error.message);
        alert(error.message)
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

          {/* GST Certificate view */}

      
          <a href={user.gsturl} target="_blank" rel="noopener noreferrer">
    <div className="image-uploader-container-767">
        <div className="add-image" style={{ background: '#e8fff3', padding: '5px' }}>
            <label className="add-image-label">
                <i className="fas fa-file-alt" style={{ fontSize: '40px' }}></i>
                <p>View GST Certificate</p>
            </label>
        </div>
    </div>
</a>

          <div className="form-tab">
            <label htmlFor="ComplianceNo">Enter Quality Certificate Number</label>
            <input type="text" name="ComplianceNo" value={user.ComplianceNo} onChange={handleOnChange} />
          </div>

          {/* Compliance Certificate Uploader */}
          <a href={user.Complianceurl} target="_blank" rel="noopener noreferrer">
    <div className="image-uploader-container-767">
        <div className="add-image" style={{ background: '#e8fff3', padding: '5px' }}>
            <label className="add-image-label">
                <i className="fas fa-file-alt" style={{ fontSize: '40px' }}></i>
                <p>View Quality Certificate</p>
            </label>
        </div>
    </div>
</a>

      <div className="radio-tab">
    <p htmlFor='SubscriptionType' style={{textAlign:'left',fontSize:'19px',fontWeight:'600',margin:'30px 10px'}}>Select Subscription Type</p>
    <div className='fo2'>
        <input 
            type='radio' 
            className='btn' 
            name='SubscriptionType' 
            value="MONTHLY" 
            onChange={handleOnChange} 
            checked={user.SubscriptionType === "MONTHLY"} 
        />
        <label>Monthly Subscription</label>
    </div>
    <div className='fo2'>
        <input 
            type='radio' 
            className='btn' 
            name='SubscriptionType' 
            value="YEARLY" 
            onChange={handleOnChange} 
            checked={user.SubscriptionType === "YEARLY"} 
        />
        <label>Yearly Subscription</label>
    </div>
    <div className='fo2'>
        <input 
            type='radio' 
            className='btn' 
            name='SubscriptionType' 
            value="FREE" 
            onChange={handleOnChange} 
            checked={user.SubscriptionType === "FREE"} 
        />
        <label>Free Model</label>
    </div>
</div>

<div className="radio-tab">
    <p htmlFor='role' style={{textAlign:'left',fontSize:'19px',fontWeight:'600',margin:'30px 10px'}}>Role</p>
    <div className='fo2'>
        <input 
            type='radio' 
            className='btn' 
            name='role' 
            value="SUPPLIER" 
            onChange={handleOnChange} 
            checked={user.role === "SUPPLIER"} 
        />
        <label>Supplier</label>
    </div>
    <div className='fo2'>
        <input 
            type='radio' 
            className='btn' 
            name='role' 
            value="MANUFACTURER" 
            onChange={handleOnChange} 
            checked={user.role === "MANUFACTURER"} 
        />
        <label>Manufacturer</label>
    </div>
    {/* <div className='fo2'>
        <input 
            type='radio' 
            className='btn' 
            name='role' 
            value="SELLER" 
            onChange={handleOnChange} 
            checked={user.role === "SELLER"} 
        />
        <label>Seller</label>
    </div> */}
    
</div>

<div className="radio-tab">
    <p htmlFor='DeliveryType' style={{textAlign:'left',fontSize:'19px',fontWeight:'600',margin:'30px 10px'}}>Select Delivery Type</p>
    <div className='fo2'>
        <input 
            type='radio' 
            className='btn' 
            name='DeliveryType' 
            value="COSLO" 
            onChange={handleOnChange} 
            checked={user.DeliveryType === "COSLO"} 
        />
        <label>Coslo Provided Delivery</label>
    </div>
    <div className='fo2'>
        <input 
            type='radio' 
            className='btn' 
            name='DeliveryType' 
            value="SELF" 
            onChange={handleOnChange} 
            checked={user.DeliveryType === "SELF"} 
        />
        <label>Self Delivery Model</label>
    </div>
</div>


                       
        
                        <button className="fo2"onClick={handleSubmit}>Verify ➜</button>
                        

        
        
        
    {/* Pricing Section */}
  
    <section className="pricing-table-101">

<h1 className="title101">Subscription Plans</h1>

<table className="table-101">
  <thead className="thead-101">
    <tr>
      <th className="feature-header-101">Features</th>
      <th className="plan-header-101">Free</th>
      <th className="plan-header-101">Monthly</th>
      <th className="plan-header-101">Yearly</th>
    </tr>
  </thead>
  <tbody className="tbody-101">
    <tr>
      <td>Leads</td>
      <td>0 /Month</td>
      <td>70 /Month</td>
      <td>80 /Month</td>
    </tr>
    <tr>
      <td>Customer Support</td>
      <td><i className="fas fa-times not-available"></i></td>
      <td>
      <i className="fas fa-check available"></i>
      </td>
      <td>
      <i className="fas fa-check available"></i>
      </td>
    </tr>
    <tr>
      <td>Order Analytics</td>
      <td><i className="fas fa-times not-available"></i></td>
      <td>
      <i className="fas fa-check available"></i>
      </td>
      <td>
      <i className="fas fa-check available"></i>
      </td>
    </tr>
    <tr>
      <td>Inventory Management</td>
      <td><i className="fas fa-check available"></i></td>
      <td>
      <i className="fas fa-check available"></i>
      </td>
      <td>
      <i className="fas fa-check available"></i>
      </td>
    </tr>
   
    <tr>
      <td>Purchase Plan</td>
      <td>
        
      </td>
      <td>
          <button style={{backgroundColor:'#1389F0',padding:'2px 5px',border:'none',color:'white',borderRadius:'2px'}}>buy</button>
      </td>
      <td>
          <button style={{backgroundColor:'#1389F0',padding:'2px 5px',border:'none',color:'white',borderRadius:'2px'}}>buy</button>
      </td>
    </tr>

  </tbody>
</table>
</section>
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

