'use client'
import './page.css'
import Link from 'next/link';
import  { useState } from "react";


export default function page() {

  const [confirmationOpen, setconfirmationOpen] = useState(false);

  const toggleconfirmation = () => {
  
    setconfirmationOpen(!confirmationOpen);
  };


  const orders = [
    { id: "#872", date: "24 Aug 2024, 09:00 AM", email: "faiziqbal@gmail.com", PaymentMethod: "Paytm", Amount: "₹ 1000/-" },
    { id: "#872", date: "24 Aug 2024, 09:00 AM", email: "faiziqbal@gmail.com", PaymentMethod: "Paytm", Amount: "₹ 1000/-" },
    { id: "#872", date: "24 Aug 2024, 09:00 AM", email: "faiziqbal@gmail.com", PaymentMethod: "Paytm", Amount: "₹ 1000/-" },
    { id: "#872", date: "24 Aug 2024, 09:00 AM", email: "faiziqbal@gmail.com", PaymentMethod: "Paytm", Amount: "₹ 1000/-" },
    { id: "#872", date: "24 Aug 2024, 09:00 AM", email: "faiziqbal@gmail.com", PaymentMethod: "Paytm", Amount: "₹ 1000/-" },
    { id: "#872", date: "24 Aug 2024, 09:00 AM", email: "faiziqbal@gmail.com", PaymentMethod: "Paytm", Amount: "₹ 1000/-" },
  ];

  return (
    <div className="orders-container">
         <div className="header">
       
        <h2 style={{margin:'30px 0px'}}>Subscription</h2>
     
      </div>


      <div className="subscription-container">
      <div className="subscription-box">
        <div className="plan-details">

          <div style={{display:'flex',justifyContent:'space-between'}}>
          <div className="plan-title">Monthly</div>

          <div style={{textAlign:'right'}}>
          <div className="plan-price">₹ 24542</div>
          <span style={{color:"#7A7D7E",fontWeight:'500',fontSize:'24px'}}>monthly</span>
          <div className="plan-description">Subscription charge include 5% GST</div>
          </div>

          </div>
          <div style={{display:'flex',flexDirection:'column'}}>
          <div className="details">
        <span className="general-subscription">General Subscription </span>
        <span className="validity"> Validity : 14 Days Left</span>
      </div>
          <button className="pay-button"> Pay Current Plan <i className="fas fa-arrow-right"></i></button>
        </div>
        </div>
        <button className="cancel-button"  onClick={toggleconfirmation}>Cancel Subscription</button>
      </div>
      <div className="change-plan-section">
        <label className="change-plan-label" htmlFor="plan-select">
          Change Plan:
        </label>
        <select id="plan-select" className="plan-select">
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>
      <div className="current-plan">
        <span className="current-plan-label">Current Plan :</span>{" "}
        <span className="current-plan-dates">24 July 2024 - 24 Aug 2024</span>
      </div>
    </div>
      
   <p style={{fontSize:'22px',textAlign:'left',margin:'30px 0px'}}>Payment History</p>
      
      <div className="table-wrapper">
        <table className="orders-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Payment Date</th>
              <th>Email</th>
              <th>Payment Method</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index}>
                <td>{order.id}</td>
                <td>{order.date}</td>
                <td>{order.email}</td>
                <td>{order.PaymentMethod}</td>               
                <td>{order.Amount}</td>
               
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <span className='pre'> <i className="fas fa-arrow-left"></i>Previous</span>
        <button className='activepage'>1</button>
        <button>2</button>
        <button>3</button>
        <button>4</button>
        <button>5</button>
        
        <span className='next'>Next <i className="fas fa-arrow-right"></i></span>
      </div>

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
    </div>
  );
}

