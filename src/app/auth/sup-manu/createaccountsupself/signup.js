'use client'
import "../../CreateAccount.css";
import "./page.css";
import Link from 'next/link';
import  { useState,useEffect } from "react";
import enableshiprocket from '../../../component/enableshiprocket.js';
import IndianStates from '../../../component/indianstate.js'
 import usePreventNumberInputScroll from '../../../component/usePreventNumberInputScroll.js';

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


function Signup() {
  const [confirmationOpen, setconfirmationOpen] = useState(false);
  const [waitconfirmationOpen, setwaitconfirmationOpen] = useState(false);
  const [stopapicall, setstopapicall] = useState(true);
  const [referenceId, setreferenceId] = useState(false);
      const [gstImages, setGstImages] = useState([]);
      const [gstverified, setgstverified] = useState(false);
       const [sellertype, setsellertype] = useState('');
      const [complianceImages, setComplianceImages] = useState([]);
      const [policydata,setpolicydata] = useState(null);
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
        SubscriptionType: "FREE",
        role: "",
        ComplianceNo: "",
        password:"",
        panNumber:"",
        AccountHolderName:"",
AccountNumber:"",
IFSCCode:"",
BankName:"",
serviceChargeAccepted:null
      });
    console.log(user,gstImages,sellertype)
     
    


    
    const handlepolicydata = () => {
         
      
      document.querySelector('.loaderoverlay').style.display='flex';
  
   
  
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/platform`, {
        method: 'GET',
       
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
              setpolicydata(data)
             document.querySelector('.loaderoverlay').style.display='none';

        })
        .catch((err) => {
          document.querySelector('.loaderoverlay').style.display='none';
          console.log(err)
        });
    };
  
    useEffect(() => {
      handlepolicydata();

      setsellertype(new URLSearchParams(window.location.search).get("sellertype"))

    },[]);



    const toggleconfirmation = () => {
    
      setconfirmationOpen(!confirmationOpen);
    };

    const waittoggleconfirmation = () => {
    
      setwaitconfirmationOpen(!waitconfirmationOpen);
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
        formData.append("businessType", user.role);
        formData.append("subscriptionPlan", user.SubscriptionType);
        formData.append("panNumber", user.panNumber);
        formData.append("qualityCert", user.ComplianceNo);
        formData.append("sellertype", sellertype);
        formData.append("businessName", user.company);

         if(sellertype === 'Property'){
           formData.append("serviceChargeAccepted", user.serviceChargeAccepted);
            
         }

         if(sellertype === 'Property' && user.role === 'Organization'){
           formData.append("gstNumber", user.gstNo);
            
         }

        if(sellertype !== 'Property'){
       
        formData.append("gstNumber", user.gstNo);

        if(sellertype !== 'Service'){
        formData.append("deliveryType", user.DeliveryType);
        }

        formData.append("address[addressLine]", user.location);
        formData.append("address[city]", user.city);
        formData.append("address[state]", user.state);
        formData.append("address[pincode]", user.pincode);
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
          toggleconfirmation();
          document.querySelector('.loaderoverlay').style.display='none';
          return;
        }
        
        if (complianceImages.length > 0 && complianceImages[0] instanceof File) {
          formData.append("complianceCertificateFile", complianceImages[0]);
        } else if (complianceImages.length > 0 && complianceImages[0].file instanceof File) {
          formData.append("complianceCertificateFile", complianceImages[0].file); // ✅ Extract actual File
        }

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

      if(user.DeliveryType === 'COSLO'){
        
        enableshiprocket(data.sellerId,'/home','We have sent a link to your WhatsApp to verify your account. Open WhatsApp and click the link to complete verification.')

              }else{
                window.location.href = '/home';
                alert('We have sent a link to your WhatsApp to verify your account. Open WhatsApp and click the link to complete verification.')
              }

 
    
    
    })
      .catch((error) => {
        console.error("Error submitting form:", error);
        toggleconfirmation();
        setError(error.message || error.error || 'Failed to submit the form.');
        alert(error.message || error.error || 'Failed to submit the form.')
        document.querySelector('.loaderoverlay').style.display='none';
       
      });
    
      };
      

      function verifygst() {
        console.log('verifygst',user.gstNo)

        if(user.gstNo===''){
alert('enter GST Number')
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
    setUser({ ...user, company:data.data.tradeName});
   // InitiateBankVerification(data.data.businessName,data.data.tradeName)
   setgstverified(true)
   document.querySelector('.loaderoverlay').style.display='none';
  }

 
  
  })
  .catch((err) => {
    document.querySelector('.loaderoverlay').style.display='none';
    console.log(err)
    alert(err.message || err.error || 'Failed to submit the form.')
  });

      }




function InitiateBankVerification(businessNamefromgst,tradeNamefromgst) {

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
      checkbankstatus(data.referenceId,businessNamefromgst,tradeNamefromgst)
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


}


function checkbankstatus(refId,businessNamefromgst,tradeNamefromgst) {

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

   console.log(data.accountHolderName?.trim().toLowerCase() , businessNamefromgst?.trim().toLowerCase(),tradeNamefromgst?.trim().toLowerCase())

if (data.accountHolderName?.trim().toLowerCase() === businessNamefromgst?.trim().toLowerCase() || data.accountHolderName?.trim().toLowerCase() === tradeNamefromgst?.trim().toLowerCase()){

console.log(data.accountHolderName, businessNamefromgst,tradeNamefromgst)

setUser(prevUser => ({
  ...prevUser,
  AccountHolderName: data.accountHolderName
}));

alert('You have been verified successfully. Please fill in the other details below to create your account.')
setgstverified(true)
setwaitconfirmationOpen(false)


}else{
alert("The name did not match with the bank name and GST name.")
setwaitconfirmationOpen(false)

}

       } else if(data.success === false){

        alert(data.message)
        setwaitconfirmationOpen(false)
       }else{
        alert(data.error)
        setwaitconfirmationOpen(false)
        
        }
    
    })
    .catch((err) => {
      document.querySelector('.loaderoverlay').style.display='none';
      console.log(err)
      alert(err.message || err.error || 'Failed to submit the form.')
    });

  }, 35000);
}

 // stop scrool when active input
  usePreventNumberInputScroll()

    return (
        <div className='main' >
            <div className="left-container">
              { sellertype && <img
                    src={sellertype === 'Property'?"/images/coslomart property.png" : "/images/img1.jpg"}
                    alt="Profile"
                    className="profile-pic"
                />}
            </div>
           
            <div className='right-container'>
                <form className="form" onSubmit={(e) => {
  e.preventDefault();

  if(gstverified || sellertype === 'Property'){

    if(sellertype !== 'Property'){
    if(!document.querySelector('#mystates').selectedIndex){
      alert('Select State/UT')
      return;
        }}

        if(user.phoneNo.length<10 || user.phoneNo.length>10){
          alert('enter 10 digit phone number')
          return;
         }

    if(user.phoneNo.startsWith('0')){
      alert('Remove the 0 at the beginning of the phone number.')
      return;
     }

    
     if(sellertype === 'Product'){
    if(!user.role){
      alert('Select a role: whether you are a supplier or a manufacturer.')
      return;
     }
    }
    
    else if (sellertype === 'Property'){

      if(!user.serviceChargeAccepted){
       alert('Please accept the 2% service charge. Click on the checkbox to accept.')
       return;
      }

        if(!user.role){
      alert('Select a role: Are you an individual or an organization?')
      return;
     }
    }


   if(sellertype === 'Product'){  if(!user.DeliveryType){
       alert('Select a delivery type: whether you will deliver your product to buyers or you want Coslo to deliver it to them.')
         return;
      }}
      
    toggleconfirmation();
  }else{
    alert('Verify your GST and Pan number first, then click on this button.')
  }

}}>
                    <h1 className="">Self Registration</h1>
                    {sellertype == 'Product' && <p style={{fontSize:'1.3rem',color:'#1389F0',marginTop:'10px',fontWeight:'600'}}> I want to Sell directly to Buyers With ZERO Commission</p>}

                  

                    {error && <p style={{color:'red'}}>{error}</p>}

                 

          {(sellertype === 'Property' || gstverified) && <> 


                    <div className="form-tab">
            <label htmlFor="name">Enter Your Name</label>
            <input type="text" name="name" id="boldinput66" value={user.name} onChange={handleOnChange} required/>
          </div>

          <div className="form-tab">
            <label htmlFor="email">Enter Email ID</label>
            <input type="email" name="email"  id="boldinput66"  value={user.email} onChange={handleOnChange} required/>
          </div>
          <div className="form-tab">
            <label htmlFor="phoneNo">Enter Phone Number</label>
            <input type="number" name="phoneNo" id="boldinput66" placeholder="+91"  value={user.phoneNo} onChange={handleOnChange} required/>
          </div>

          <div className="form-tab">
            <label htmlFor="password">Create Account Password</label>
            <input type="text" name="password" id="boldinput66"  value={user.password} onChange={handleOnChange} required/>
          </div>
       
         {sellertype !== 'Property' && <>
         <div className="form-tab">
            <label htmlFor="BankName">Your Bank Name (optional)</label>
            <input type="text" name="BankName" id="boldinput66"  value={user.BankName} onChange={handleOnChange} />
          </div>

          <div className="form-tab">
            <label htmlFor="AccountHolderName">Bank Account Holder Name (optional)</label>
            <input type="text" id="boldinput66" name="AccountHolderName" value={user.AccountHolderName} onChange={handleOnChange} />
          </div>

          <div className="form-tab">
            <label htmlFor="AccountNumber">Bank Account Number (optional)</label>
            <input type="text" id="boldinput66" name="AccountNumber" value={user.AccountNumber} onChange={handleOnChange}   />
          </div>

          <div className="form-tab">
            <label htmlFor="IFSCCode">IFSC Code (optional)</label>
            <input type="text" id="boldinput66" name="IFSCCode" value={user.IFSCCode} onChange={handleOnChange}   />
          </div>
          </>}


          <div className="form-tab">
            <label htmlFor="panNumber">Enter Pan Number</label>
            <input type="text" id="boldinput66" name="panNumber" value={user.panNumber} onChange={handleOnChange}  required />

          </div>
         

         


        
         {sellertype !== 'Property' && <> <div className="form-tab">
            <label htmlFor="location">{sellertype === 'Product'?<>Enter Pickup Address</>:<>Enter Address</>}</label>
            <input type="text" name="location" id="boldinput66" value={user.location} onChange={handleOnChange} required/>
          </div>

          <div className="form-tab">
            <label htmlFor="location">Enter City</label>
            <input type="text" name="city" id="boldinput66" value={user.city} onChange={handleOnChange} required/>
          </div>


          <IndianStates value={user.state} handleOnChange={handleOnChange}/>
          
          <div className="form-tab">
            <label htmlFor="location">Enter Pincode</label>
            <input type="text" name="pincode" id="boldinput66" value={user.pincode} onChange={handleOnChange} required/>
          </div>

          
        

          {/* GST Certificate Uploader */}
          <ImageUploader
            title="Upload GST Certificate"
            images={gstImages}
            setImages={setGstImages}
            id="gstUploader"
          />

          {sellertype === 'Product' && <> <div className="form-tab">
            <label htmlFor="ComplianceNo">Enter Quality Certificate Number</label>
            <input type="text" name="ComplianceNo" id="boldinput66"  value={user.ComplianceNo} onChange={handleOnChange} />
          </div>

          {/* Compliance Certificate Uploader */}
          <ImageUploader
            title="Upload Quality Certificate"
            images={complianceImages}
            setImages={setComplianceImages}
            id="complianceUploader"
          />


                        <div className="radio-tab">
                          <p style={{marginTop:'50px',marginBottom:'10px'}}>
                            <span htmlFor='role'  style={{textAlign:'left',fontSize:'19px',fontWeight:'600',}}>Select Role:</span> <span>whether you are a supplier or a manufacturer.</span>
                            </p>

                            <div className='fo2'>
                                <input type='radio' className='btn' name='role' value={"SUPPLIER"} onChange={handleOnChange} />
                                <label>Supplier</label>
                            </div>
                            <div className='fo2'>
                                <input type='radio' className='btn' name='role' value={"MANUFACTURER"} onChange={handleOnChange} />
                                <label>Manufacturer</label>
                            </div>
                        </div>

                        <div className="radio-tab" style={{marginBottom:'40px'}}>
                             
                             <p style={{marginBottom:'10px'}}>
                            <span htmlFor='DeliveryType'  style={{textAlign:'left',fontSize:'19px',fontWeight:'600',}}>Select Delivery Type:</span> <span> whether you will deliver your product to buyers or you want Coslo to deliver it to them.</span>
                            </p>

                            <div className='fo2'>
                                <input type='radio' className='btn' name='DeliveryType' value={"COSLO"} onChange={handleOnChange} />
                                <label>Coslo Provided Delivery</label>
                            </div>
                            <div className='fo2'>
                                <input type='radio' className='btn' name='DeliveryType' value={"SELF"} onChange={handleOnChange} />
                                <label>Self Delivery Model</label>
                            </div>
                        </div></>}

                        <div className="form-tab">
            <label htmlFor="company">Enter Company Name</label>
            <input type="text" id="boldinput66" name="company" value={user.company} onChange={handleOnChange} readOnly />
          </div>
        
        </>
          }


          {sellertype === 'Property' && <> <div className="radio-tab">
                          <p style={{marginTop:'30px',marginBottom:'10px'}}>
                            <span htmlFor='role'  style={{textAlign:'left',fontSize:'19px',fontWeight:'600',}}>Select Role:</span> <span>Are you an individual or an organization?</span>
                            </p>

                            <div className='fo2'>
                                <input type='radio' className='btn' name='role' value={"Individual"} onChange={handleOnChange} />
                                <label>Individual</label>
                            </div>
                            <div className='fo2'>
                                <input type='radio' className='btn' name='role' value={"Organization"} onChange={handleOnChange} />
                                <label>Organization</label>
                            </div>
                        </div>

                         {user.role ==='Organization' && <> <div className="form-tab">
            <label htmlFor="company">Enter Company Name</label>
            <input type="text" id="boldinput66" name="company" value={user.company} onChange={handleOnChange} required/>
          </div>
          
          <div className="form-tab">
            <label htmlFor="gstNo">Enter GST Number</label>
            
            <input type="text" id="boldinput66" name="gstNo" value={user.gstNo} onChange={handleOnChange}  required/>

          </div>
          </>
          }
          </>}

            {sellertype === 'Property' && <div className="radio-tab">
                          <p style={{marginTop:'30px',marginBottom:'10px'}}>
                            <span htmlFor='role'  style={{textAlign:'left',fontSize:'19px',fontWeight:'600',}}>Select Payment Modal :</span>
                            </p>
             <div className='fo2'>
                                <input type='radio' className='btn' name='Modal' onClick={()=>(setUser({ ...user, serviceChargeAccepted: true }))} />
                                <label>2% commision</label>
                            </div>

                            <div className='fo2'>
                                <input type='radio' className='btn' name='Modal'  onClick={()=>(setUser({ ...user, serviceChargeAccepted: false }))} />
                                <label>subscription</label>
                            </div>
                        </div>}

         {user.serviceChargeAccepted === true && <ul style={{marginBottom:'30px'}}> <li style={{fontSize:'1.2rem',color:'#1389F0',marginTop:'10px',fontWeight:'500'}}>Coslomart will apply a 2% service charge on the total project cost for every successfully closed property deal.</li> <li style={{fontSize:'1.2rem',color:'#1389F0',marginTop:'10px',fontWeight:'500'}}>We provide end-to-end services — from property site visits to final registration.</li></ul>}


                        </> }



                       {sellertype !== 'Property' && <div className="form-tab">
            <label htmlFor="gstNo">Enter GST Number</label>
            
            <input type="text" name="gstNo" value={user.gstNo} onChange={handleOnChange}  {...(gstverified && { readOnly: true })} />

          </div>}

                   

         {(sellertype !== 'Property' && gstverified === false) && <div className="form-tab">

          <div style={{ display:'flex',gap:'10px',alignItems:'center',marginBottom:'20px'}}> 

          <button style={{textAlign:'left',marginTop:'10px',border:'1px solid black',backgroundColor:'#007bff',padding:'5px 10px',color:'white',border:'none',borderRadius:'5px'}} onClick={(e)=>{
              e.preventDefault();
              verifygst()}}>Verify Details</button>
 </div>
          </div>
          }



                        {(sellertype === 'Property' || gstverified) &&
                        <button className="fo2">Send whatsapp verification URL ➜</button>
                         }
                    
                </form>

                {confirmationOpen && (
                <TermsCard toggleconfirmation={toggleconfirmation} handleSubmit={handleSubmit} policydata={policydata}/>
              )}

{waitconfirmationOpen && (
                <Waitwindow checkbankstatus={checkbankstatus} referenceId={referenceId} companyname={user.company}/>
              )}
            </div>
        </div>
    );
}

export default Signup;




const TermsCard = ({toggleconfirmation,handleSubmit,policydata}) => {
    return (
     
        <div className="modal-overlay">
 
        <div className="terms-card065">
          <div className="terms-header065">
            <h2 className="terms-title065">Terms of Use</h2>
            <i className="fa fa-times close-icon065" aria-hidden="true"  onClick={toggleconfirmation}></i>
          </div>
          <div className="terms-content065">
            {/* <p>
              Welcome to Coslo! By using our website, you agree to the following terms and conditions. Please read them carefully.
            </p> */}
            {/* <h3>Terms of Use</h3> */}
          
            <div dangerouslySetInnerHTML={{ __html: policydata.termsOfService }}></div>
            
            {/* <h3>2. Privacy Policy</h3>
            <p>
            {policydata.privacyPolicy}
            </p>

            <h3>3. Return Policy</h3>
            <p>
            {policydata.returnPolicy}
            </p> */}

          </div>
          <div className="terms-footer065">
            <button className="accept-btn065" onClick={handleSubmit}>Accept</button>
            <button className="decline-btn065" style={{background:'#EC5959'}}  onClick={toggleconfirmation}>Decline</button>
          </div>
        </div>
        </div>
     
    );
  };


  
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