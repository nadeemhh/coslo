'use client'
import "../../auth/CreateAccount.css";
import "./page.css";
import Link from 'next/link';
import  { useState,useEffect } from "react";
import usePreventNumberInputScroll from '../../component/usePreventNumberInputScroll.js';

function Page() {
  const [waitconfirmationOpen, setwaitconfirmationOpen] = useState(false);
  const [referenceId, setreferenceId] = useState(false);
      const [gstverified, setgstverified] = useState(false);

      const [user, setUser] = useState({
AccountNumber:"",
IFSCCode:"",
BankName:"",
AccountHolderName:""
      });


    const waittoggleconfirmation = () => {
    
      setwaitconfirmationOpen(!waitconfirmationOpen);
    };

      const handleOnChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
      };
    

      const handleSubmit = async (AccountHolderName) => {
        
        document.querySelector('.loaderoverlay').style.display='flex';
        

        let bankDetails = {
    bankDetails: {
        accountHolderName: AccountHolderName,
        accountNumber: user.AccountNumber,
        ifscCode: user.IFSCCode,
        bankName: user.BankName
    }
};

console.log(bankDetails)



      const token = localStorage.getItem('token');
    
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/seller/update`, {
      method: "PATCH",
       headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(bankDetails)
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
alert('You have been verified successfully.')
    
    
    })
      .catch((error) => {
        console.error("Error submitting form:", error);
        alert(error.message || error.error || 'Failed to submit the form.')
        document.querySelector('.loaderoverlay').style.display='none';
       
      });
    
      };
      

      function verifygst() {

    if(user.AccountNumber==='' || user.IFSCCode==='' || user.BankName===''){
alert('Fill All Details')
          return;
        }

        let gstnum = JSON.parse(localStorage.getItem('sellerdata')).gstNumber;
        console.log(gstnum)
   document.querySelector('.loaderoverlay').style.display='flex';

  fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/seller/kyc/gstin/${gstnum}`)
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
   
InitiateBankVerification(data.data.businessName,data.data.tradeName)
   setgstverified(true)

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



handleSubmit(data.accountHolderName)
console.log('verified successfully')
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
         
           
            <div className='right-container'>
                <form className="form"
                >
                    <h3>Verify your bank details</h3>

          <div className="form-tab">
            <label htmlFor="BankName">Your Bank Name</label>
            <input type="text" name="BankName" id="boldinput66"  value={user.BankName} onChange={handleOnChange} />
          </div>


          <div className="form-tab">
            <label htmlFor="AccountNumber">Bank Account Number</label>
            <input type="text" id="boldinput66" name="AccountNumber" value={user.AccountNumber} onChange={handleOnChange}   />
          </div>

          <div className="form-tab">
            <label htmlFor="IFSCCode">IFSC Code</label>
            <input type="text" id="boldinput66" name="IFSCCode" value={user.IFSCCode} onChange={handleOnChange}   />
          </div>



        <div className="form-tab">

          <div style={{ display:'flex',gap:'10px',alignItems:'center',marginBottom:'20px'}}> 

          <button style={{textAlign:'left',marginTop:'10px',border:'1px solid black',backgroundColor:'#007bff',padding:'5px 10px',color:'white',border:'none',borderRadius:'5px'}} onClick={(e)=>{
              e.preventDefault();
              verifygst()}}>Verify Details</button>
 </div>
          </div>
         
                </form>

               

{waitconfirmationOpen && (
                <Waitwindow checkbankstatus={checkbankstatus} referenceId={referenceId} companyname={user.company}/>
              )}
            </div>
        </div>
    );
}

export default Page;




  
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
         
<h3 style={{fontSize:'18px'}}>Please wait... Within 40 seconds, ₹1 will be credited to your account.</h3>
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