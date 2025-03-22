'use client'
import './page.css'
import Link from 'next/link';
import PlansTable from '../../component/planstables.js';
import { useState,useEffect } from "react";


export default function page() {

  const [confirmationOpen, setconfirmationOpen] = useState(false);
  const [data,setdata] = useState({});
  const [subscriptionHistory,setsubscriptionHistory] = useState([]);
  const [showdata,setshowdata] = useState(false);
  const [cplan, setcplan] = useState(''); 
  
    const handledata = () => {
     
      document.querySelector('.loaderoverlay').style.display='flex';
  
     const token = localStorage.getItem('token');
   
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/subscription/current`, {
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
              throw new Error(errorData.error || 'Failed. Please try again.');
            });
          }
        })
        .then((data) => {
              console.log(data)
              if(data.plan==='FREE'){
                setshowdata(false)
                document.querySelector('.loaderoverlay').style.display='none';
              }else{
              setdata(data)
              setcplan(data.plan);
              setshowdata(true)
              getsubscriptionHistory()}
         
        })
        .catch((err) => {
          document.querySelector('.loaderoverlay').style.display='none';
          console.log(err)
          window.location.href='/#cosloplans';
        });
    };
  


    const getsubscriptionHistory = () => {
  
  
     const token = localStorage.getItem('token');
   
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/subscription/history/seller/`, {
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
              setsubscriptionHistory(data.subscriptionHistory)
             document.querySelector('.loaderoverlay').style.display='none';
          // Successfully logged in
         // window.location.href = '/Employee/Onboarding';
         
        })
        .catch((err) => {
          document.querySelector('.loaderoverlay').style.display='none';
          console.log(err)
        });
    };



    useEffect(() => {
      handledata();
     
    },[]);
  

  const toggleconfirmation = () => {
  
    setconfirmationOpen(!confirmationOpen);
  };


  const handleChange = (e) => {
    console.log(e.target.value)
    setcplan(e.target.value);
    handlebuy(e.target.value)
  };


  function extractDate(isoString) {
    if (!isoString) return null;
    
    try {
        return isoString.split("T")[0]; // Extracts the date portion before 'T'
    } catch (error) {
        console.error("Invalid ISO string format", error);
        return null;
    }
}

function PayCurrentPlan(plan) {
  console.log(plan)
  handlebuy(plan)
}


async function handlebuy(plan) {
  console.log(plan)

  // Check if token exists in localStorage
  const token = localStorage.getItem('token');
    
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/subscription/start`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ plan: plan })
    });

    if (!response.ok) {
      const data = await response.json();
      console.log(data);
      alert(data.error)
      return;
    }

    // Assuming the response returns a JSON with the payment URL
    const data = await response.json();

    const paymentUrl = data.paymentUrl;
    if (paymentUrl) {
      // Redirect to the payment URL
      window.location.href = paymentUrl;
    }
  } catch (error) {
    console.error('Error starting subscription:', error);
  }

}
  
  return (
    <div className="orders-container">
      {  showdata ? <>
         <div className="header">
       
        <h2 style={{margin:'30px 0px'}}>Subscription</h2>
     
      </div>


      <div className="subscription-container">
      <div className="subscription-box">
        <div className={data.validityLeft?"plan-details":"plan-detailsex"}>

          <div style={{display:'flex',justifyContent:'space-between'}}>
          <div className="plan-title">{data.plan}</div>

          <div style={{textAlign:'right'}}>
          <div className={data.validityLeft?"plan-price":"plan-priceex"}>₹ {data.pricing.total}</div>
          {/* <div className="plan-description">Subscription charge include 5% GST</div> */}
          <div className="plan-description"> ₹{data.pricing.gst/2} CGST + ₹{data.pricing.gst/2} SGST</div>
          </div>

          </div>
          <div style={{display:'flex',flexDirection:'column'}}>
          <div className="details">
        <span className="general-subscription">General Subscription </span>
        {data.validityLeft ?<span className="validity"> Validity : {data.validityLeft} Days Left</span>:<span className="validityex"> Validity : Expired</span>}
      </div>
          <button className={data.validityLeft?"pay-button":"pay-buttonex"} onClick={()=>{PayCurrentPlan(data.plan)}}> Pay Current Plan <i className="fas fa-arrow-right"></i></button>
        </div>
        </div>
        {/* <button className="cancel-button"  onClick={toggleconfirmation}>Cancel Subscription</button> */}
      </div>
      <div className="change-plan-section">
        <label className="change-plan-label" htmlFor="plan-select">
          Change Plan:
        </label>
        <select id="plan-select" className="plan-select" value={cplan} onChange={handleChange}>
          <option value="MONTHLY">Monthly</option>
          <option value="YEARLY">Yearly</option>
        </select>
      </div>
      <div className="current-plan">
        <span className="current-plan-label">Current Plan :</span>{" "}
        <span className="current-plan-dates">{extractDate(data.currentPeriod.startDate)} <span style={{color:'black'}}> &nbsp; / &nbsp; </span> {extractDate(data.currentPeriod.endDate)}</span>
      </div>

      {data.nextPeriod && <div className="next-plan">
        <span className="current-plan-label">Next Plan Starts From :</span>{" "}
        <span className="current-plan-dates">{extractDate(data.nextPeriod.startDate)} <span style={{color:'black'}}> &nbsp; / &nbsp; </span> {extractDate(data.nextPeriod.endDate)}</span>
      </div>
      }

    </div>
      
   <p style={{fontSize:'22px',textAlign:'left',margin:'30px 0px'}}>Payment History</p>
      
      <div className="table-wrapper">
        <table className="orders-table">
          <thead>
            <tr>
              <th>##</th>
              <th>Plan</th>
              <th>Payment Date</th>
              <th>Email</th>
              <th>Payment Method</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {subscriptionHistory.map((subscriptionHistoryin, index) => (
              <tr key={index}>
                <td>{index+1}</td>
                <td>{subscriptionHistoryin.plan}</td>
                <td>{extractDate(subscriptionHistoryin.paymentDate)}</td>
                <td>{subscriptionHistoryin.seller.email}</td>
                <td>{subscriptionHistoryin.paymentInfo.paymentMethod}</td>               
                <td>{subscriptionHistoryin.paymentInfo.amount}</td>
               
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* <div className="pagination">
        <span className='pre'> <i className="fas fa-arrow-left"></i>Previous</span>
        <button className='activepage'>1</button>
        <button>2</button>
        <button>3</button>
        <button>4</button>
        <button>5</button>
        
        <span className='next'>Next <i className="fas fa-arrow-right"></i></span>
      </div> */}

      {confirmationOpen && (
        <div className="modal-overlay">
 
           <div className="confirmation-box">
      <div className="icon">
        {/* Replace the src below with the actual path to your image */}
        <img
          src="\icons\confar.png"
          alt="Icon"
          className="icon-image"
        />
      </div>
      <p className="message">Are you sure ?</p>
      <div className="button-group">
        <button className="button no-button" onClick={toggleconfirmation}>No</button>
        <button className="button yes-button">Yes</button>
      </div>
    </div>
             </div>
      )}

       </> :    <div>
       
           <div style={{marginBottom:'3rem',marginTop:'3rem'}}>
             <h1 style={{fontSize:'2rem'}}>Subscription Plans</h1>
       <p style={{fontSize:'1.2rem',color:'#1389F0',marginTop:'20px'}}>100% refund if no leads or sales </p>
       </div>
       
       <PlansTable/>
             
           </div> }
    </div>
  );
}

