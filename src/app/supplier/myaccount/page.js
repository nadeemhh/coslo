'use client'
import "../../auth/CreateAccount.css";
import "./page.css";
import Link from 'next/link';
import  { useState,useEffect } from "react";
import usePreventNumberInputScroll from '../../component/usePreventNumberInputScroll.js';

function Page() {

      const [user, setUser] = useState({
AccountNumber:"",
IFSCCode:"",
BankName:"",
AccountHolderName:""
      });



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
      document.querySelector('.loaderoverlay').style.display='none';
    
    })
      .catch((error) => {
        console.error("Error submitting form:", error);
        alert(error.message || error.error || 'Failed to submit the form.')
        document.querySelector('.loaderoverlay').style.display='none';
       
      });
    
      };
      

    
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

               

            </div>
        </div>
    );
}

export default Page;



