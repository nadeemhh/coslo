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
   const [invoiceUrl,setinvoiceUrl] = useState(false);
   const [pickupdate,setpickupdate] = useState(null);
   const paymentstatusChange = (e) => {
    setpaymentstatus(e.target.value);
  };


  const shippingstatusChange = (e) => {
    setshippingstatus(e.target.value);
  };

  console.log(paymentstatus,shippingstatus)


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
      }
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

  
  const getinvoice = (shipmentid) => {
console.log(shipmentid)
    
 

    const token = localStorage.getItem('token');

    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/order/label/${shipmentid}`, {
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
      .then((data) => {
        setinvoiceUrl(data.labelUrl)
        
      
        document.querySelector('.loaderoverlay').style.display = 'none';
       
      })
      .catch((err) => {
        document.querySelector('.loaderoverlay').style.display = 'none';
        console.log(err)
      
       
      });
  };


  function ShiprocketPickup() {
    
    document.querySelector('.loaderoverlay').style.display='flex';

    const oid = new URLSearchParams(window.location.search).get("oid");

    const token = localStorage.getItem('token');

    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/order/schedule-pickup/${oid}`, {
      method: 'POST',
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
      .then((data) => {

      alert(`${data.message} - ${data.pickupDate}`)
      setpickupdate(data.pickupDate)
      
        document.querySelector('.loaderoverlay').style.display = 'none';
       
      })
      .catch((err) => {
        document.querySelector('.loaderoverlay').style.display = 'none';
        console.log(err)
      
       
      });
  }


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
   <button className="cancel-button" style={{backgroundColor:'red',color:'white'}} onClick={CancelBooking}>Cancel Booking</button> 
      
      </div>
      </div>
    </div>}
    </>
  );
}


