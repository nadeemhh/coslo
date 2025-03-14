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
  const [waitconfirmationOpen, setwaitconfirmationOpen] = useState(false);
  const [referenceId, setreferenceId] = useState(false);
  const [gstverified, setgstverified] = useState(false);
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
    SubscriptionType: "FREE",
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
 

const waittoggleconfirmation = () => {
    
  setwaitconfirmationOpen(!waitconfirmationOpen);
};



    const handledata = () => {
     
  
      document.querySelector('.loaderoverlay').style.display='flex';
  
     const token = localStorage.getItem('employeetoken');
  
  
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
                DeliveryType: "",
                SubscriptionType:"FREE",
                role:"",
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
    }else{
      alert('Upload GST Certificate File')
      document.querySelector('.loaderoverlay').style.display='none';
      return;
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
    

   const token = localStorage.getItem('employeetoken');

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
document.querySelector('.loaderoverlay').style.display='none';
window.location.href = '/Employee/Onboarding/success';

})
  .catch((error) => {
    console.error("Error submitting form:", error.message);
    alert(error.message || error.error || 'Failed to submit the form.')
    document.querySelector('.loaderoverlay').style.display='none';
  });

  };
  



  
  function verifygst() {
    console.log('verifygst',user.gstNo)

    if(user.gstNo==='' || user.AccountNumber==='' || user.IFSCCode===''){
alert('Fill in all details: GST Number, Account Number, IFSC Code, and PAN Number.')
      return;
    }

    document.querySelector('.loaderoverlay').style.display='flex';

fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/seller/kyc/gstin/${user.gstNo}`)
.then((response) => {
if (response.ok) {
  return response.json();
} else {
  return response.json().then((errorData) => {
    throw new Error(errorData.message || errorData.error || 'Failed to submit the form.');
  });
}
})
.then((data) => {

 console.log(data)

if(data?.error){
alert(data.error)
document.querySelector('.loaderoverlay').style.display='none';
}else{
alert('Your GST have been Verified Successfully') 

let address = data.data.address;
setUser({ ...user, location: address.addressLine, city: address.city, pincode: address.pincode, state: address.state,company:data.data.businessName});
InitiateBankVerification(data.data.businessName)

}



})
.catch((err) => {
document.querySelector('.loaderoverlay').style.display='none';
console.log(err)
alert(err.message || err.error || 'Failed to submit the form.')
});

  }



// function verifypan() {

//   console.log('verifypan',user.panNumber)

//   if(user.panNumber===''){
//     alert('enter pan number')
//               return;
//             }
        
//   fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/seller/kyc/pan/${user.panNumber}`)
//     .then((response) => {
//       if (response.ok) {
//         return response.json();
//       } else {
//         return response.json().then((errorData) => {
//           throw new Error(errorData.message || errorData.error || 'Failed to submit the form.');
//         });
//       }
//     })
//     .then((data) => {
 
//        console.log(data)

//     })
//     .catch((err) => {
//       document.querySelector('.loaderoverlay').style.display='none';
//       console.log(err)
//       alert(err.message || err.error || 'Failed to submit the form.')
//     });

// }

function InitiateBankVerification(businessNamefromgst) {

// Initiate Bank Verification

console.log('Initiate Bank Verification')

fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/seller/kyc/bank/${user.AccountNumber}/${user.IFSCCode}`)
.then((response) => {
if (response.ok) {
  return response.json();
} else {
  return response.json().then((errorData) => {
    throw new Error(errorData.message || errorData.error || 'Failed to submit the form.');
  });
}
})
.then((data) => {

 console.log(data)

 if(data.success && data.status === "IN_PROCESS"){

  console.log(data.success , data.status)

  setwaitconfirmationOpen(true)
  setreferenceId(data.referenceId)
  checkbankstatus(data.referenceId,businessNamefromgst)

 }else{
  alert(data.error)
  document.querySelector('.loaderoverlay').style.display='none';
 }

})
.catch((err) => {
document.querySelector('.loaderoverlay').style.display='none';
console.log(err)
alert(err.message || err.error || 'Failed to submit the form.')
});


}


function checkbankstatus(refId,businessNamefromgst) {

console.log(refId)

setTimeout(() => {
    
console.log('check bank status')

fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/seller/kyc/bank-status/${refId}`)
.then((response) => {
  if (response.ok) {
    return response.json();
  } else {
    return response.json().then((errorData) => {
      throw new Error(errorData.message || errorData.error || 'Failed to submit the form.');
    });
  }
})
.then((data) => {
 
   console.log(data)

   if(data.success && data.status === "COMPLETED"){

console.log(data.accountHolderName?.trim().toLowerCase() , businessNamefromgst?.trim().toLowerCase())

if (data.accountHolderName?.trim().toLowerCase() === businessNamefromgst?.trim().toLowerCase()){

console.log(data.accountHolderName, businessNamefromgst)

setUser(prevUser => ({
  ...prevUser,
  AccountHolderName: data.accountHolderName
}));

alert('You have been verified successfully.')
setgstverified(true)
setwaitconfirmationOpen(false)
handleSubmit();

}else{
alert('Names did not match.')
setwaitconfirmationOpen(false)
document.querySelector('.loaderoverlay').style.display='none';
}

   } else if(data.success === false){

    alert(data.message)
    document.querySelector('.loaderoverlay').style.display='none';
   }else{
    alert(data.error)
    document.querySelector('.loaderoverlay').style.display='none';
    }

})
.catch((err) => {
  document.querySelector('.loaderoverlay').style.display='none';
  console.log(err)
  alert(err.message || err.error || 'Failed to submit the form.')
});

}, 35000);
}



  return (
    <div className="mymain">
      <h1>Manufacturer/Supplier Onboarding Form</h1>
      <div>
        <form className="form" onSubmit={(e) => {
  e.preventDefault();

console.log(user.role,!user.role)
    if(!user.role){
      alert('Select a role: whether you are a supplier or a manufacturer.')
      return;
     }

     if(!user.DeliveryType){
       alert('Select a delivery type: whether you will deliver your product to buyers or you want Coslo to deliver it to them.')
         return;
      }

      if (gstImages.length === 0) {
        alert('Upload GST Certificate File')
        return;
      }
      
      verifygst()

}}>
          <div className="form-tab">
            <label htmlFor="name">Enter Name</label>
            <input type="text" name="name" value={user.name} onChange={handleOnChange} required/>
          </div>
          <div className="form-tab">
            <label htmlFor="email">Enter Email</label>
            <input type="email" name="email" value={user.email} onChange={handleOnChange} required/>
          </div>
          <div className="form-tab">
            <label htmlFor="phoneNo">Enter Phone No</label>
            <input type="number" name="phoneNo" value={user.phoneNo} onChange={handleOnChange} required/>
          </div>
          {/* <div className="form-tab">
            <label htmlFor="password">Enter Password</label>
            <input type="text" name="password" value={user.password} onChange={handleOnChange} />
          </div> */}
          <div className="form-tab">
            <label htmlFor="company">Enter Company Name</label>
            <input type="text" name="company" value={user.company} onChange={handleOnChange} required/>
          </div>
          <div className="form-tab">
            <label htmlFor="location">Enter Address</label>
            <input type="text" name="location" value={user.location} onChange={handleOnChange} required/>
          </div>

          <div className="form-tab">
            <label htmlFor="location">Enter City</label>
            <input type="text" name="city" value={user.city} onChange={handleOnChange} required/>
          </div>
          <div className="form-tab">
            <label htmlFor="location">Enter State</label>
            <input type="text" name="state" value={user.state} onChange={handleOnChange} required/>
          </div>
          <div className="form-tab">
            <label htmlFor="location">Enter Pincode</label>
            <input type="text" name="pincode" value={user.pincode} onChange={handleOnChange} required/>
          </div>
          
          
          <div className="form-tab">
            <label htmlFor="panNumber">Enter Pan Number</label>
            <input type="text" name="panNumber" value={user.panNumber} onChange={handleOnChange} required/>
          </div>

         

          <div className="form-tab">
            <label htmlFor="gstNo">Enter GST Number</label>
            <input type="text" name="gstNo" value={user.gstNo} onChange={handleOnChange} required/>
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
<input type="text" name="AccountHolderName" value={user.AccountHolderName} onChange={handleOnChange}  required />
</div>

<div className="form-tab">
<label htmlFor="AccountNumber">Account Number</label>
<input type="text" name="AccountNumber" value={user.AccountNumber} onChange={handleOnChange} required/>
</div>

<div className="form-tab">
<label htmlFor="IFSCCode">IFSC Code</label>
<input type="text" name="IFSCCode" value={user.IFSCCode} onChange={handleOnChange} required/>
</div>

<div className="form-tab">
<label htmlFor="BankName">Bank Name</label>
<input type="text" name="BankName" value={user.BankName} onChange={handleOnChange} required/>
</div>



{/* <div className="radio-tab">
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
                        </div> */}

                        <div className="radio-tab">
                            <p htmlFor='role'  style={{textAlign:'left',fontSize:'19px',fontWeight:'600',margin:'30px 10px'}}>Select Role</p>
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

                       
        
                        <button className="fo2" type='submit'>Send Account Creation Email ➜</button>
                        

          
    {/* Pricing Section */}
  
  <Planstable showbuybuttons={false}/>

        </form>

        {waitconfirmationOpen && (
                <Waitwindow checkbankstatus={checkbankstatus} referenceId={referenceId} companyname={user.company}/>
              )}

      </div>
    </div>
  );
}





const Waitwindow = ({checkbankstatus,referenceId,companyname}) => {

  const [timeLeft, setTimeLeft] = useState(40);

  useEffect(() => {
    if (timeLeft <= 0) return;
    
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  return (
   
      <div className="modal-overlay">

      <div className="terms-card065">
      
        <div className="terms-content065">
       
<h3>Please wait... Within 40 seconds, ₹1 will be credited to your account.</h3>
{timeLeft > 0 ? 
  <div className="countdown-container">
    <p className="countdown-text">Time Left: {timeLeft}s</p>
  </div>

  :
  <button style={{textAlign:'left',marginTop:'10px',border:'1px solid black',backgroundColor:'green',padding:'5px 10px',color:'white',border:'none',borderRadius:'5px'}} onClick={(e)=>{
    setTimeLeft(40)
         checkbankstatus(referenceId,companyname)
          }}>Retry</button>
        }
      
        </div>
      </div>
      </div>
   
  );
};