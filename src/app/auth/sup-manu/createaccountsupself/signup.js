'use client'
import "../../CreateAccount.css";
import "./page.css";
import Link from 'next/link';
import { useState, useEffect } from "react";
import enableshiprocket from '../../../component/enableshiprocket.js';
import IndianStates from '../../../component/indianstate.js'
import usePreventNumberInputScroll from '../../../component/usePreventNumberInputScroll.js';
import PropertyPlansTable from '../../../component/PropertyPlansTable.js';
import planstables from '../../../component/planstables.js';

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
  const [stopapicall, setstopapicall] = useState(true);
  const [gstImages, setGstImages] = useState([]);
  const [gstverified, setgstverified] = useState(false);
  const [sellertype, setsellertype] = useState('');
  const [complianceImages, setComplianceImages] = useState([]);
  const [policydata, setpolicydata] = useState(null);
  const [error, setError] = useState('');
  const [user, setUser] = useState({
    name: "",
    phoneNo: "",
    company: "",
    gstNo: "",
    SubscriptionType: "FREE",
    role: "",
    password: "",
    panNumber: "",
    location: "",
    city: "",
    state: "",
    pincode: "",
    // AccountHolderName: "",
    // AccountNumber: "",
    // IFSCCode: "",
    // BankName: "",
    serviceChargeAccepted: null,
    purchasePlan: ''

  });
  console.log(user, gstImages, sellertype)


  const handlepolicydata = () => {


    document.querySelector('.loaderoverlay').style.display = 'flex';



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
        document.querySelector('.loaderoverlay').style.display = 'none';

      })
      .catch((err) => {
        document.querySelector('.loaderoverlay').style.display = 'none';
        console.log(err)
      });
  };

  useEffect(() => {
    handlepolicydata();

    setsellertype(new URLSearchParams(window.location.search).get("sellertype"))

  }, []);



  const toggleconfirmation = () => {

    setconfirmationOpen(!confirmationOpen);
  };




  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };




  const handleSubmit = async () => {



    document.querySelector('.loaderoverlay').style.display = 'flex';


    const formData = new FormData();

    // Append text fields as shown in the image
    formData.append("name", user.name);
    // formData.append("email", user.email);
    formData.append("phone", user.phoneNo);
    // formData.append("password", user.password);
    formData.append("businessType", user.role);
    formData.append("subscriptionPlan", user.SubscriptionType);
    if (sellertype !== 'Product') {
      formData.append("panNumber", user.panNumber);
    }
    formData.append("sellertype", sellertype);
    formData.append("businessName", user.company);
    formData.append("purchasePlan", user.purchasePlan);

    if (sellertype === 'Property') {

      formData.append("serviceChargeAccepted", user.serviceChargeAccepted);

    }

    if (sellertype === 'Property' && user.role === 'Organization') {
      formData.append("gstNumber", user.gstNo);

    }

    if (sellertype !== 'Property') {

      formData.append("gstNumber", user.gstNo);

      if (sellertype === 'Service') {
        formData.append("address[addressLine]", user.location);
        formData.append("address[city]", user.city);
        formData.append("address[state]", user.state);
        formData.append("address[pincode]", user.pincode);
        // formData.append("bankDetails[accountHolderName]", user.AccountHolderName);
        // formData.append("bankDetails[accountNumber]", user.AccountNumber);
        // formData.append("bankDetails[ifscCode]", user.IFSCCode);
        // formData.append("bankDetails[bankName]", user.BankName);
      }

      if (gstImages.length > 0 && gstImages[0] instanceof File) {
        formData.append("gstCertificateFile", gstImages[0]);
      } else if (gstImages.length > 0 && gstImages[0].file instanceof File) {
        formData.append("gstCertificateFile", gstImages[0].file); // ✅ Extract actual File
      } else {
        alert('Upload GST Certificate File')
        toggleconfirmation();
        document.querySelector('.loaderoverlay').style.display = 'none';
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
      }).then((data) => {

        console.log(data)

        if (user.DeliveryType === 'COSLO') {

          enableshiprocket(data.sellerId, '/home', 'We have sent a link to your WhatsApp to verify your account. Open WhatsApp and click the link to complete verification.')

        } else {
          window.location.href = '/home';
          alert('We have sent a link to your WhatsApp to verify your account. Open WhatsApp and click the link to complete verification.')
        }




      })
      .catch((error) => {
        console.error("Error submitting form:", error);
        toggleconfirmation();
        setError(error.message || error.error || 'Failed to submit the form.');
        alert(error.message || error.error || 'Failed to submit the form.')
        document.querySelector('.loaderoverlay').style.display = 'none';

      });

  };


  function verifygst() {
    console.log('verifygst', user.gstNo)

    if (user.gstNo === '') {
      alert('enter GST Number')
      return;
    }

    document.querySelector('.loaderoverlay').style.display = 'flex';

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

        if (data?.error) {
          alert(data.error)
          document.querySelector('.loaderoverlay').style.display = 'none';
        } else {
          alert('Your GST have been Verified Successfully')

          let address = data.data.address;
          setUser({ ...user, company: data.data.tradeName });
          // InitiateBankVerification(data.data.businessName,data.data.tradeName)
          setgstverified(true)
          document.querySelector('.loaderoverlay').style.display = 'none';
        }



      })
      .catch((err) => {
        document.querySelector('.loaderoverlay').style.display = 'none';
        console.log(err)
        alert(err.message || err.error || 'Failed to submit the form.')
      });

  }






  // stop scrool when active input
  usePreventNumberInputScroll()

  return (
    <div className='main' >
      <div className="left-container">
        {sellertype && <img
          src={sellertype === 'Property' ? "/images/coslomart property.png" : "/images/img1.jpg"}
          alt="Profile"
          className="profile-pic"
        />}
      </div>

      <div className='right-container'>
        <form className="form" onSubmit={(e) => {
          e.preventDefault();

          if (gstverified || sellertype === 'Property') {

            if (sellertype === 'Service') {
              if (!document.querySelector('#mystates').selectedIndex) {
                alert('Select State/UT')
                return;
              }
            }

            if (sellertype === 'Property') {

              if (user.serviceChargeAccepted === null) {
                alert('Please Select Payment Modal')
                return;
              }

              if (!user.role) {
                alert('Select a role: Are you an individual or an organization?')
                return;
              }
            }

            toggleconfirmation();
          } else {
            alert('Verify your GST and Pan number first, then click on this button.')
          }

        }}>
          <h1 className="">Self Registration</h1>
          {sellertype == 'Product' && <p style={{ fontSize: '1.3rem', color: '#1389F0', marginTop: '10px', fontWeight: '600' }}> I want to Sell directly to Buyers With ZERO Commission</p>}



          {error && <p style={{ color: 'red' }}>{error}</p>}



          {(sellertype === 'Property' || gstverified) && <>


            <div className="form-tab">
              <label htmlFor="name">Enter Your Name</label>
              <input type="text" name="name" id="boldinput66" value={user.name} onChange={handleOnChange} required />
            </div>

            {/* <div className="form-tab">
              <label htmlFor="email">Enter Email ID</label>
              <input type="email" name="email" id="boldinput66" value={user.email} onChange={handleOnChange} required />
            </div> */}

            <div className="form-tab">
              <label htmlFor="phoneNo">Enter Phone Number</label>
              <input type="number" name="phoneNo" id="boldinput66" placeholder="+91" value={user.phoneNo} onChange={handleOnChange} required />
            </div>

            {/* <div className="form-tab">
              <label htmlFor="password">Create Account Password</label>
              <input type="text" name="password" id="boldinput66" value={user.password} onChange={handleOnChange} required />
            </div> */}

            {/* {sellertype === 'Service' && <>
              <div className="form-tab">
                <label htmlFor="BankName">Your Bank Name (optional)</label>
                <input type="text" name="BankName" id="boldinput66" value={user.BankName} onChange={handleOnChange} />
              </div>

              <div className="form-tab">
                <label htmlFor="AccountHolderName">Bank Account Holder Name (optional)</label>
                <input type="text" id="boldinput66" name="AccountHolderName" value={user.AccountHolderName} onChange={handleOnChange} />
              </div>

              <div className="form-tab">
                <label htmlFor="AccountNumber">Bank Account Number (optional)</label>
                <input type="text" id="boldinput66" name="AccountNumber" value={user.AccountNumber} onChange={handleOnChange} />
              </div>

              <div className="form-tab">
                <label htmlFor="IFSCCode">IFSC Code (optional)</label>
                <input type="text" id="boldinput66" name="IFSCCode" value={user.IFSCCode} onChange={handleOnChange} />
              </div>
            </>} */}

            {sellertype !== 'Product' && sellertype !== 'Property' && <div className="form-tab">
              <label htmlFor="panNumber">Enter Pan Number</label>
              <input type="text" id="boldinput66" name="panNumber" value={user.panNumber} onChange={handleOnChange} required />
            </div>}

            {sellertype === 'Service' && <>
              <div className="form-tab">
                <label htmlFor="location">Enter Address</label>
                <input type="text" name="location" id="boldinput66" value={user.location} onChange={handleOnChange} required />
              </div>

              <div className="form-tab">
                <label htmlFor="location">Enter City</label>
                <input type="text" name="city" id="boldinput66" value={user.city} onChange={handleOnChange} required />
              </div>


              <IndianStates value={user.state} handleOnChange={handleOnChange} />

              <div className="form-tab">
                <label htmlFor="location">Enter Pincode</label>
                <input type="text" name="pincode" id="boldinput66" value={user.pincode} onChange={handleOnChange} required />
              </div>
            </>}

            {sellertype !== 'Property' && <>



              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', flexWrap: 'wrap', marginTop: '20px' }}>

                {/* GST Certificate Uploader */}
                <ImageUploader
                  title="Upload GST Certificate"
                  images={gstImages}
                  setImages={setGstImages}
                  id="gstUploader"
                />
                {sellertype === 'Product' && <>

                  {/* Compliance Certificate Uploader */}
                  <ImageUploader
                    title="Upload Quality Certificate"
                    images={complianceImages}
                    setImages={setComplianceImages}
                    id="complianceUploader"
                  />
                </>}
              </div>


              <div className="form-tab">
                <label htmlFor="company">Enter Company Name</label>
                <input type="text" id="boldinput66" name="company" value={user.company} onChange={handleOnChange} readOnly />
              </div>
            </>
            }





            {sellertype === 'Property' && <> <div className="radio-tab">
              <p style={{ marginTop: '30px', marginBottom: '10px' }}>
                <span htmlFor='role' style={{ textAlign: 'left', fontSize: '19px', fontWeight: '600', }}>Select Role:</span> <span>Are you an individual or an organization?</span>
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


              {user.role === 'Individual' && <>  <div className="form-tab">
                <label htmlFor="panNumber">Enter Pan Number</label>
                <input type="text" id="boldinput66" name="panNumber" value={user.panNumber} onChange={handleOnChange} required />
              </div>
              </>
              }

              {user.role === 'Organization' && <> <div className="form-tab">
                <label htmlFor="company">Enter Company Name</label>
                <input type="text" id="boldinput66" name="company" value={user.company} onChange={handleOnChange} required />
              </div>

                <div className="form-tab">
                  <label htmlFor="gstNo">Enter GST Number</label>

                  <input type="text" id="boldinput66" name="gstNo" value={user.gstNo} onChange={handleOnChange} required />

                </div>
              </>
              }
            </>}

            {sellertype === 'Property' && <div className="radio-tab">
              <p style={{ marginTop: '30px', marginBottom: '10px' }}>
                <span htmlFor='role' style={{ textAlign: 'left', fontSize: '19px', fontWeight: '600', }}>Select Payment Modal :</span>
              </p>
              <div className='fo2'>
                <input type='radio' className='btn' name='Modal' onClick={() => (setUser({ ...user, serviceChargeAccepted: true, purchasePlan: '' }))} />
                <label>2% Service charge</label>
              </div>

              <div className='fo2'>
                <input type='radio' className='btn' name='Modal' onClick={() => (setUser({ ...user, serviceChargeAccepted: false, purchasePlan: 'MONTHLY' }))} />
                <label>Subscription</label>
              </div>

              <div className='fo2'>
                <input type='radio' className='btn' name='Modal' onClick={() => (setUser({ ...user, serviceChargeAccepted: false, purchasePlan: '' }))} />
                <label>Free</label>
              </div>

            </div>}

            {user.serviceChargeAccepted === false && user.purchasePlan !== '' && <div className="radio-tab">
              <p style={{ marginTop: '30px', marginBottom: '10px' }}>
                <span htmlFor='role' style={{ textAlign: 'left', fontSize: '19px', fontWeight: '600', }}>Selected Plan = {user.purchasePlan}</span>
              </p>

              <PropertyPlansTable user={user} setUser={setUser} />
            </div>}


            {user.serviceChargeAccepted === true && <ul style={{ marginBottom: '30px' }} className='slideleftanimate'> <li style={{ fontSize: '1.2rem', color: '#1389F0', marginTop: '10px', fontWeight: '500' }}>Coslomart will apply a 2% service charge on the total project cost for every successfully closed property deal.</li> <li style={{ fontSize: '1.2rem', color: '#1389F0', marginTop: '10px', fontWeight: '500' }}>We provide end-to-end services — from property site visits to final registration.</li></ul>}


          </>}



          {sellertype !== 'Property' && <div className="form-tab">
            <label htmlFor="gstNo">Enter GST Number</label>

            <input type="text" name="gstNo" value={user.gstNo} onChange={handleOnChange}  {...(gstverified && { readOnly: true })} />

          </div>}

          {sellertype === 'Product' && gstverified && <div className="radio-tab">
            <p style={{ marginTop: '30px', marginBottom: '10px' }}>
              <span htmlFor='role' style={{ textAlign: 'left', fontSize: '19px', fontWeight: '600', }}>Select Subscription Plan :</span>
            </p>
            <div className='fo2'>
              <input type='radio' className='btn' name='Modal' onClick={() => (setUser({ ...user, purchasePlan: 'MONTHLY' }))} />
              <label>Monthly</label>
            </div>

            <div className='fo2'>
              <input type='radio' className='btn' name='Modal' onClick={() => (setUser({ ...user, purchasePlan: 'YEARLY' }))} />
              <label>Yearly</label>
            </div>

            <div className='fo2'>
              <input type='radio' className='btn' name='Modal' onClick={() => (setUser({ ...user, purchasePlan: '' }))} />
              <label>Free</label>
            </div>

          </div>}




          {(sellertype !== 'Property' && gstverified === false) && <div className="form-tab">

            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '20px' }}>

              <button style={{ textAlign: 'left', marginTop: '10px', border: '1px solid black', backgroundColor: '#007bff', padding: '5px 10px', color: 'white', border: 'none', borderRadius: '5px' }} onClick={(e) => {
                e.preventDefault();
                verifygst()
              }}>Verify Details</button>
            </div>
          </div>
          }



          {(sellertype === 'Property' || gstverified) &&
            <button className="fo2">Send whatsapp verification URL ➜</button>
          }

        </form>

        {confirmationOpen && (
          <TermsCard toggleconfirmation={toggleconfirmation} handleSubmit={handleSubmit} policydata={policydata} />
        )}
      </div>
    </div>
  );
}

export default Signup;




const TermsCard = ({ toggleconfirmation, handleSubmit, policydata }) => {
  return (

    <div className="modal-overlay">

      <div className="terms-card065">
        <div className="terms-header065">
          <h2 className="terms-title065">Terms of Use</h2>
          <i className="fa fa-times close-icon065" aria-hidden="true" onClick={toggleconfirmation}></i>
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
          <button className="decline-btn065" style={{ background: '#EC5959' }} onClick={toggleconfirmation}>Decline</button>
        </div>
      </div>
    </div>

  );
};



