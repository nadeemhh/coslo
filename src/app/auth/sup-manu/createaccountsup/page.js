'use client'
import "../../CreateAccount.css";
import Link from 'next/link';
import  { useState } from "react";


function Page() {
    const [confirmationOpen, setconfirmationOpen] = useState(false);

    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [phone, setphone] = useState('');
    const [GSTNum, setGSTNum] = useState('');
    const [companyName, setcompanyName] = useState('');
    const [error, setError] = useState('');
       

  const handledata = (e) => {
            e.preventDefault();

            toggleconfirmation();
        
            document.querySelector('.loaderoverlay').style.display='flex';

            const userData = {
              name,
              email,
              phone:phone,
              businessName:companyName,
              gstNumber:GSTNum,
            };
        
            console.log(userData)
            
            fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/seller/request-registration`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(userData),
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
                    // Save token to localStorage
                    console.log(data)
                    document.querySelector('.loaderoverlay').style.display='none';
            //alert(data.message)
                // Successfully logged in
                alert(data.message)
                window.location.href = '/home';
               
              })
              .catch((err) => {
                document.querySelector('.loaderoverlay').style.display='none';
                
                setError(err.message);
              });
          };


    const toggleconfirmation = () => {
    
      setconfirmationOpen(!confirmationOpen);
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
                        <label>Enter Name*</label>
                        <input type="text" placeholder="Enter Your Name" required className="" value={name}
              onChange={(e) => setname(e.target.value)} 
/>
                    </div>
                    <div className="form-tab">
                        <label>Enter Phone No*</label>
                        <input type="number" placeholder="+91" required className="" value={phone}
              onChange={(e) => setphone(e.target.value)} />
                    </div>
                    <div className="form-tab">
                        <label>Enter Email*</label>
                        <input type="email" placeholder="@gmail.com" required className="" value={email}
              onChange={(e) => setemail(e.target.value)} />
                    </div>

                    <div className="form-tab">
                        <label>Enter GST No *</label>
                        <input type="text" placeholder="" className="" required  value={GSTNum}
              onChange={(e) => setGSTNum(e.target.value)} />
                    </div>

                    {/* <div className="form-tab">
                        <label>Enter GST No *</label>
                        <div style={{display:'flex',gap:'10px',justifyContent:'center',alignItems:'center'}}>
                        <input type="email" placeholder="" className="" />
                        <button className="form-tab" style={{marginTop:'10px'}}>Verify</button>
                        </div>
                    </div> */}

                    <div className='form-tab'>
                        <label>Enter Company Name*</label>
                        <input type="text" placeholder="" className="" required  value={companyName}
              onChange={(e) => setcompanyName(e.target.value)} />
                    </div>
                   
                    <button className="form-tab" type="submit">Submit</button>
                </form>

                {confirmationOpen && (
                <TermsCard toggleconfirmation={toggleconfirmation} handledata={handledata}/>
              )}
            </div>
        </div>
    );
}

export default Page;




const TermsCard = ({toggleconfirmation,handledata}) => {
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
            <button className="accept-btn065" onClick={handledata}>Accept</button>
            <button className="decline-btn065" style={{background:'#EC5959'}}  onClick={toggleconfirmation}>Decline</button>
          </div>
        </div>
        </div>
     
    );
  };

  