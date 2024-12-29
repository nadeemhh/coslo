
import './page.css'
import '../../../component/component-css/cartcard.css'
import "../../../component/component-css/ui.css";
import Link from 'next/link';
import Goback from '../../../back.js'

export default function Page() {
    const steps = [
        { date: "27th August 2024", time: "02:30 PM", status: "Delivered", location: "Varanasi" },
        { date: "27th August 2024", time: "10:30 AM", status: "Out for Delivery", location: "Varanasi" },
        { date: "20th August 2024", time: "10:30 AM", status: "Order Shipped", location: "Varanasi" },
        { date: "16th August 2024", time: "10:30 AM", status: "Order Placed", location: "Varanasi" },
      ];

  return (
    <>
    <div className="order-details-container">
    <p className="order-details-title">
      <Goback/> Order Details
    </p>
    <div className="order-details-content">
      <div className="order-summary">
        <p className='heading69'>Order Summary</p>
        <p><strong>Order Id:</strong> 408-8653092-2885903</p>
        <p><strong>Total:</strong> ₹ 478734/-</p>
        <p><strong>Order Date:</strong> 16th August 2024</p>
        <p><strong>Payment Method:</strong> PhonePe</p>
        <button className="download-btn">
        Download Invoice
        </button>
      </div>
      <div className="shipping-address">
        <p className='heading69'>Shipping Address</p>
        <p>Faiz Iqbal</p>
        <p>A 25/4 Batla House</p>
        <p>New Delhi, Delhi, 110025</p>
        <p>+91 9876543210</p>
      </div>
    </div>


    <div className='card-container' style={{marginTop:"20px"}}>




<div className="card" style={{maxWidth:'600px'}}>
<div className="prodictimg">
<img src="\images\Image.jpg" alt="" />
</div>
<div className="card-details">
<p className="card-title">
  Samsung Galaxy Smartwatch Z-Series with Ult...
</p>
<p className="card-date">Return window available till 31th August 2024</p>

<div style={{display:'flex',gap:'15px'}} className='hgfhg'>
<p className="card-price">₹ 200/-</p>
<button className="delivered">● Delivered @ 27th August</button>

</div>

</div>
<div className="card-status">
{/* <CounterComponent/>
<img src="\icons\dustbin.svg" alt="" style={{width:'40px',cursor:'pointer'}}/> */}
<button className="cancel-btn">Return</button>
<button className="cancel-btn" style={{backgroundColor:'#ff000000',border:'1px solid black',color:'black'}}>cancel</button>

</div>
</div>



</div>

    <div className="tracking-container">
      <h2 className="tracking-title">Tracking History</h2>
      <div className="tracking-timeline">
        {steps.map((step, index) => (
          <div className="tracking-row" key={index}>
            <div className="tracking-date-time">
              <p className="tracking-date">{step.date}</p>
              <p className="tracking-time">@ {step.time}</p>
            </div>
            <div className="tracking-circle">
              <div className="tracking-dot"></div>
              {index < steps.length - 1 && <div className="tracking-line"></div>}
            </div>
            <div className="tracking-status-info">
              <p className="tracking-status">{step.status}</p>
              <p className="tracking-location">at location {step.location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>


  </>
  )
}
