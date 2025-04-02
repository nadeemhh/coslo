'use client'
import "../../CreateAccount.css";
import Link from 'next/link';
import  { useState,useEffect } from "react";


function Page() {
    const [confirmationOpen, setconfirmationOpen] = useState(false);
    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [phone, setphone] = useState('');
    const [GSTNum, setGSTNum] = useState('');
    const [companyName, setcompanyName] = useState('');
    const [panNumber, setpanNumber] = useState('');
    const [error, setError] = useState('');
    const [policydata,setpolicydata] = useState(null);


    
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
      },[]);



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
              panNumber
              
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
                    src="\images\img1.jpg"
                    alt="Profile"
                    className="profile-pic"
                />
            </div>
           
            <div className='right-container'>
                <form className="form" onSubmit={(e) => {
  e.preventDefault();
  toggleconfirmation();
}}>
                    <h1 className="">Help For Registration</h1>
                    <p style={{fontSize:'1.3rem',color:'#1389F0',marginTop:'10px',fontWeight:'600'}}> I want to Sell directly to Buyers With ZERO Commission</p>


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

                    <div className="form-tab">
                        <label>Enter Pan Number *</label>
                        <input type="text" placeholder="" className="" required  value={panNumber}
              onChange={(e) => setpanNumber(e.target.value)} />
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
                <TermsCard toggleconfirmation={toggleconfirmation} handledata={handledata} policydata={policydata}/>
              )}
            </div>
        </div>
    );
}

export default Page;




const TermsCard = ({toggleconfirmation,handledata,policydata}) => {
    return (
     
        <div className="modal-overlay">
 
  <div className="terms-card065">
          <div className="terms-header065">
            <h2 className="terms-title065">Terms of Use</h2>
            <i className="fa fa-times close-icon065" aria-hidden="true"  onClick={toggleconfirmation}></i>
          </div>
          <div className="terms-content065">
            <p>
              Welcome to Coslo! By using our website, you agree to the following terms and conditions. Please read them carefully.
            </p>

            {/* <h3>1. Terms Of Service</h3> */}
           
            <div dangerouslySetInnerHTML={{ __html: policydata.termsOfService }}>

            </div>

            
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
            <button className="accept-btn065" onClick={handledata}>Accept</button>
            <button className="decline-btn065" style={{background:'#EC5959'}}  onClick={toggleconfirmation}>Decline</button>
          </div>
        </div>


        </div>
     
    );
  };

  