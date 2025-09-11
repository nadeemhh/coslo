'use client'
import './page.css'
import '../../../component/component-css/cartcard.css'
// import "../../../component/component-css/ui.css";
import Link from 'next/link';
import Goback from '../../../back.js'
import { useState,useEffect } from "react";
import extractDate from '../../../component/extdate.js';


export default function Page() {

   const [data,setdata] = useState(false);
   const [paymentstatus, setpaymentstatus] = useState(''); 
   const [shippingstatus, setshippingstatus] = useState(''); 
   const [showCancelModal, setShowCancelModal] = useState(false);
   const [reasonForCancel, setReasonForCancel] = useState('');

console.log(reasonForCancel)
     const showCancelBookingModal = () => {
    setShowCancelModal(true);
  };

  const hideCancelBookingModal = () => {
    setShowCancelModal(false);
    setReasonForCancel('');
  };

   const getdata = () => {

    const oid = new URLSearchParams(window.location.search).get("oid");

    const token = localStorage.getItem('token');

    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/service/${oid}`, {
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
           
            throw new Error(errorData.error || 'Failed');
          });
        }
      })
      .then((mydata) => {
        console.log(mydata)
       
        setdata(mydata.data)


        document.querySelector('.loaderoverlay').style.display = 'none';
       
      })
      .catch((err) => {
        document.querySelector('.loaderoverlay').style.display = 'none';
        console.log(err)
        alert(err);
       
      });
  };



  useEffect(() => {
    getdata()
  }, []);


  const CancelBooking = (e) => {
    e.preventDefault();
  
  document.querySelector('.loaderoverlay').style.display='flex';

    const token = localStorage.getItem('token');
   
    const oid = new URLSearchParams(window.location.search).get("oid");

  
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/service/${oid}/cancel`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }), // Add token if it exists
      },
      body: JSON.stringify({reason:reasonForCancel}),
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
            
            alert(data.message)
            document.querySelector('.loaderoverlay').style.display='none';
       
      })
      .catch((err) => {
      
        alert(err.message);
        document.querySelector('.loaderoverlay').style.display='none';
      });
  };

 
 

  return (
    <>
    {data && <div className="order-details">
      <div className="header">
        <button className="back-button">
        <Goback/>
        </button>
        <h2>Order Details</h2>
     
      </div>
      <div className="order-summary-container">
        <div className="order-box" style={{textAlign:'left'}}>
          <h3>Order Summary</h3>
          <p><strong>Total :</strong> ₹ {data.finalAmount.toFixed(2)}</p>
          <p><strong>Booking Date :</strong> {extractDate(data.createdAt)}</p>
        <p><strong>Preferred Date :</strong> {data?.serviceBookingDetails?.preferredDate?.split('T')[0]||'N/A'}</p>
            <p><strong>Preferred Time :</strong> {data?.serviceBookingDetails?.preferredTime||'N/A'}</p>
          <p><strong>Note :</strong> {data?.serviceBookingDetails?.specialInstructions||'N/A'}</p>

        </div>
        <div className="order-box" style={{textAlign:'left'}}>
          <h3>Customer Address</h3>
        <p><strong>Name:</strong> {data.shippingAddress.name}</p>
        <p><strong>Address:</strong> {data.shippingAddress.addressLine + ', '+ data.shippingAddress.landmark}</p>
       
        <p><strong>Phone Number:</strong> {data.shippingAddress.phone}</p>
        <p><strong>Pincode:</strong> {data.shippingAddress.pincode}</p>
        <p><strong>City:</strong> {data.shippingAddress.city}</p>
        <p><strong>State:</strong> {data.shippingAddress.state}</p>
        </div>

      </div>


      

      <div className="product-details" style={{marginTop:'50px'}}>
      
      {data.subOrders[0].items.map((order, index) => (

      <div className="card87" key={index}>
    <div className="prodictimg">
      <img src={order.productImage
} alt="" />
    </div>
    <div className="card-details">
      <p className="card-title">
      {order.serviceName}
      </p>

      <div style={{display:'flex',gap:'20px',alignItems:'center',marginTop:'10px'}}>

      <p className="card-price">₹ {order.servicePricing.basePrice}</p>

<span style={{ 
  fontSize: "14px", 
 color:'#0088ff',background:'rgb(19 137 240 / 17%)',padding:'5px',borderRadius:'6px',
  margin: "6px 0", 
  display: "flex", 
  alignItems: "center", 
  gap: "6px" ,
  fontWeight: '500'
}}>
    <i className="fas fa-clock" style={{ color: "#097CE1", fontSize: "15px" }}></i> {order.serviceDuration.value} {order.serviceDuration.unit}</span>
    </div> 
    
    </div>

  </div>

))}
      </div>
   
      <div style={{display:'flex',alignItems:'flex-end',justifyContent:'space-between'}}>
      <div className="price-summary">
         <p>Sub Total : <strong style={{color:'#097CE1'}}> ₹ {(data.finalAmount-data.cgstAmount-data.sgstAmount).toFixed(2)}</strong> </p>
        <p>Total CGST : <strong style={{color:'#097CE1'}}> ₹ {data.cgstAmount.toFixed(2)}</strong></p>
        <p>Total SGST : <strong style={{color:'#097CE1'}}> ₹ {data.sgstAmount.toFixed(2)}</strong></p>
        <p className='totalp'>Total : <strong style={{color:'#097CE1'}}> ₹ {data.finalAmount.toFixed(2)}</strong></p>
      </div>
      <div className="action-buttons">
   <button className="cancel-button" style={{backgroundColor:'red',color:'white'}} onClick={showCancelBookingModal}>Cancel Booking</button> 
 
      
      </div>
      </div>
    </div>}


       {/* Cancel Booking Modal */}
    {showCancelModal && (
      <div className="modal-overlay" style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000
      }}>
        <div className="modal-content" style={{
          backgroundColor: 'white',
          padding: '15px',
          borderRadius: '10px',
          maxWidth: '500px',
          width: '90%',
          maxHeight: '80%',
          overflowY: 'auto',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
        }}>
          <div className="modal-header" style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
            borderBottom: '1px solid #eee',
            paddingBottom: '15px'
          }}>

            <button 
              onClick={hideCancelBookingModal}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '30px',
                cursor: 'pointer',
                color: '#000000ff',
                textAlign:'right'

              }}
            >
              ×
            </button>
          </div>
          
          <div className="modal-body">
            <p style={{ marginBottom: '15px', color: '#000000ff',textAlign:'left' }}>
              Are you sure you want to cancel this booking?
            </p>
            
            <div style={{ marginBottom: '20px' }}>
             
              <textarea
                value={reasonForCancel}
                onChange={(e) => setReasonForCancel(e.target.value)}
                placeholder="Please write a reason for cancellation (optional)"
                style={{
                  width: '100%',
                  minHeight: '100px',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                  resize: 'vertical',
                  fontFamily: 'inherit',
                  fontSize: '14px'
                }}
                rows={4}
              />
            </div>
          </div>
          
          <div className="modal-footer" style={{
            display: 'flex',
            gap: '10px',
            justifyContent: 'flex-end',
            paddingTop: '15px',
            borderTop: '1px solid #eee'
          }}>
            <button
              onClick={hideCancelBookingModal}
              style={{
                padding: '10px 20px',
                border: '1px solid #ddd',
                backgroundColor: 'white',
                color: '#333',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              Keep Booking
            </button>
            <button
              onClick={CancelBooking}
              style={{
                padding: '10px 20px',
                border: 'none',
                backgroundColor: '#dc3545',
                color: 'white',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              Cancel Booking
            </button>
          </div>
        </div>
      </div>
    )}

    </>
  );
}


