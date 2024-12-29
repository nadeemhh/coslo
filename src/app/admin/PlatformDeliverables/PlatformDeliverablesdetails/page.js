
import './page.css'
import '../../../component/component-css/cartcard.css'
// import "../../../component/component-css/ui.css";
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
    <div>
       <div className="header">
        <button className="back-button">
          <Goback/>
        </button>
        <h2>Deliverable  #378434H</h2>
     
      </div>


      <div className="mcard">
      <div className="mcard-header">#243423232</div>
      <div className="mcard-body">

        <div style={{display:'flex',justifyContent:'space-between',gap:'30px',marginBottom:'20px'}}> 

        <div className="card-section">
          <h4>Customer</h4>
          <p>Faiz Iqbal</p>
        </div>
        <div className="card-section">
          <h4>Seller</h4>
          <p>FarmFresh Supplies</p>
        </div>

        </div>

        <div style={{display:'flex',justifyContent:'space-between',gap:'30px'}}> 
        <div className="card-section">
          <h4>Order</h4>
          <p>#2289 Samsung Watch</p>
          <p>₹1000/-</p>
          <p>Quantity: 20</p>
        </div>
        <div className="card-section">
          <h4>Breakdown</h4>
          <p>Volume : 4kg Order</p>
          <p>Shipping Cost : ₹297/-</p>
          <p>Distance : 283 KM</p>
        </div>
        </div>
      </div>
    </div>
          

    <div className="tracking-container">
      <h2 className="tracking-title">Delivery Tracking Details</h2>
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

  );
}
