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

    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/order/seller/${oid}`, {
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
        setpaymentstatus(mydata.data.orderSummary.paymentStatus);
        setshippingstatus(mydata.data.orderSummary.deliveryStatus);
        setpickupdate(mydata.data?.deliveryTracking?.pickupDate)

        if(mydata.data.orderSummary.deliveryProvider !== "SELF"){
          getinvoice(mydata.data.deliveryTracking.shipmentId)
        }
  

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


  const updatestatus = (e) => {
    e.preventDefault();
  
  document.querySelector('.loaderoverlay').style.display='flex';
  
  
    const userData = {
      
      ...( data.orderSummary.deliveryProvider !== "COSLO" && {
        shipping: {
          status: shippingstatus,
          comment: ""
        }
      }),
      ...(data.orderSummary.paymentMethod !== "ONLINE" &&  data.orderSummary.deliveryProvider !== "COSLO"  && { payment: paymentstatus })

    };
  
    console.log(userData)


    const token = localStorage.getItem('token');
   
    const oid = new URLSearchParams(window.location.search).get("oid");

  
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/order/manual-delivery/${oid}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }), // Add token if it exists
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
        <div className="order-box">
          <h3>Order Summary</h3>
          <p><strong>Order Id :</strong> {data.orderSummary.orderId}</p>
          <p><strong>Total :</strong> ₹ {data.amountSummary.grandTotal}/-</p>
          <p><strong>Order Date :</strong> {extractDate(data.orderSummary.orderDate)}</p>
          <p><strong>Payment Method :</strong> {data.orderSummary.paymentMethod}</p>
          <p><strong>pickup Date :</strong> {pickupdate || 'null'}</p>
        </div>
        <div className="order-box">
          <h3>Shipping Address</h3>
        <p><strong>Name:</strong> {data.shippingAddress.customerName}</p>
        <p><strong>Address:</strong> {data.shippingAddress.addressLine}</p>
        <p><strong>Phone:</strong> {data.shippingAddress.phone}</p>
        <p><strong>Pincode:</strong> {data.shippingAddress.pincode}</p>
        <p><strong>City:</strong> {data.shippingAddress.city}</p>
        <p><strong>State:</strong> {data.shippingAddress.state}</p>
        </div>
        {/* <div className="order-box">
          <h3>Return / Refund</h3>
          <p><strong>Available :</strong> No</p>
          <p><strong>Availed :</strong> N.A</p>
          <p><strong>Date :</strong> N.A</p>
          <p><strong>Status :</strong> N.A</p>
        </div> */}
      </div>
      <div className="status-buttons">
      
       {data.orderSummary.deliveryProvider !== "COSLO" && data.orderSummary.paymentMethod !== "ONLINE" && data.orderSummary.paymentStatus !== 'RECEIVED'? 
       <>
       <label htmlFor="">Select Payment Status</label>
       <select value={paymentstatus} onChange={paymentstatusChange}>
        <option value="RECEIVED">RECEIVED</option>
        <option value="PENDING">PENDING</option>
        <option value="FAILED">FAILED</option>
        </select>
        </>
        :
<div>
<label htmlFor="">Payment Status : </label><label className={data.orderSummary.paymentStatus==='RECEIVED'?`Completed`:'allstatus'}>● {data.orderSummary.paymentStatus}</label>
</div>
}
      
{   data.orderSummary.deliveryProvider !== "COSLO"  && data.orderSummary.deliveryStatus !=="DELIVERED"? 
<>
  <label htmlFor="">Select Shipping Status</label>    
  <select value={shippingstatus} onChange={shippingstatusChange}>
        <option value="PENDING">PENDING</option>
        <option value="PROCESSING">PROCESSING</option>
        <option value="READY_TO_SHIP">READY_TO_SHIP</option>
        <option value="SHIPPED">SHIPPED</option>
        <option value="OUT_FOR_DELIVERY">OUT_FOR_DELIVERY</option>
        <option value="DELIVERED">DELIVERED</option>
        <option value="FAILED">FAILED</option>
        <option value="CANCELLED">CANCELLED</option>
    
        </select>
        </>
:
        <div>
<label htmlFor="">Shipping Status : </label><label className={data.orderSummary.deliveryStatus==="DELIVERED"?`Completed`:'allstatus'}>● {data.orderSummary.deliveryStatus}</label>
</div>
}

       
      </div>

      <div style={{display:'flex',gap:'20px'}}>
{ 
 
data.orderSummary.deliveryProvider === "COSLO" && 
<>
<div style={{display:'flex',justifyContent:'flex-start',margin:'30px 0px'}}>
{invoiceUrl && <a href={invoiceUrl} target='_blank' className="shipdownload-btn"  download="Label.pdf">
        Download Label
        </a>      }
</div>

{pickupdate === null && <div style={{display:'flex',justifyContent:'flex-start',margin:'30px 0px'}}>
 
 <button className="shipdownload-btn" style={{backgroundColor:'rgb(48 181 26)',color:"white"}}
 onClick={()=>(ShiprocketPickup())}>Request Shiprocket Pickup</button>  
</div>}
</>

}

</div>     

      <div className="product-details">
      
      {data.orderSummary.items.map((order, index) => (

      <div className="card87" key={index}>
    <div className="prodictimg">
      <img src={order.image} alt="" />
    </div>
    <div className="card-details">
      <p className="card-title">
      {order.name}
      </p>
      <p className="card-price">₹ {order.price}/-</p>
      {/* <p className="card-date">24th August '24</p> */}
    </div>
    <div className="card-status">
   
     <p>Qty : {order.quantity}</p>
     
    </div>
  </div>

))}
      </div>
   
      <div style={{display:'flex',alignItems:'flex-end',justifyContent:'space-between'}}>
      <div className="price-summary">
        <p>Sub Total : <strong style={{color:'#097CE1'}}> ₹ {(data.amountSummary.grandTotal-data.amountSummary.cgst-data.amountSummary.sgst-data.amountSummary.shippingCharges+data.amountSummary.discount).toFixed(0)}/-</strong> </p>
        <p>Total Discount : <strong style={{color:'#097CE1'}}> ₹ {data.amountSummary.discount}</strong></p>
        <p>Total CGST : <strong style={{color:'#097CE1'}}> ₹ {data.amountSummary.cgst}</strong></p>
        <p>Total SGST : <strong style={{color:'#097CE1'}}> ₹ {data.amountSummary.sgst}</strong></p>
        <p>Shipping Charges : <strong style={{color:'#097CE1'}}> ₹ {data.amountSummary.shippingCharges}/-</strong></p>
        <p className='totalp'>Total : <strong style={{color:'#097CE1'}}> ₹ {data.amountSummary.grandTotal}/-</strong></p>
      </div>
      <div className="action-buttons">
        {/* <button className="cancel-button">Cancel</button> */}
       {data.orderSummary.deliveryProvider !== "COSLO" && <button className="update-button" onClick={updatestatus}>Update Order</button>}
      </div>
      </div>
    </div>}
    </>
  );
}


