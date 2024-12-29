
import './page.css'
import '../../../component/component-css/cartcard.css'
// import "../../../component/component-css/ui.css";
import Link from 'next/link';
import Goback from '../../../back.js'


export default function Page() {
  return (
    <div className="order-details">
      <div className="header">
        <button className="back-button">
        <Goback/>
        </button>
        <h2>Order #233928JK</h2>
     
      </div>
      <div className="order-summary-container">
        <div className="order-box">
          <h3>Order Summary</h3>
          <p><strong>Order Id :</strong> 408-8653092-2885903</p>
          <p><strong>Total :</strong> ₹ 478734/-</p>
          <p><strong>Order Date :</strong> 16th August 2024</p>
          <p><strong>Payment Method :</strong> PhonePe</p>
        </div>
        <div className="order-box">
          <h3>Shipping Address</h3>
          <p>Faiz Iqbal</p>
          <p>A 25/4 Batla House</p>
          <p>New Delhi, Delhi, 110025</p>
          <p>+91 9876543210</p>
        </div>
        <div className="order-box">
          <h3>Return / Refund</h3>
          <p><strong>Available :</strong> No</p>
          <p><strong>Availed :</strong> N.A</p>
          <p><strong>Date :</strong> N.A</p>
          <p><strong>Status :</strong> N.A</p>
        </div>
      </div>
      <div className="status-buttons">
      
        {/* <select>
          <option value="" >Select Payment Status</option>
        <option value="">Completed</option>
        <option value="">Failed</option>
        </select> */}
<div>
<label htmlFor="">Payment Status : </label><label className={`Completed`}>● Completed</label>
</div>
        <select>
          <option value="" >Select Shipping Status</option>
        <option value="">pending</option>
        <option value="">processing</option>
        <option value="">in transit</option>
        <option value="">delivered</option>
        </select>
      </div>
      <div className="product-details">
      
      <div className="card">
    <div className="prodictimg">
      <img src="\images\Image.jpg" alt="" />
    </div>
    <div className="card-details">
      <p className="card-title">
        Samsung Galaxy Smartwatch Z-Series with Ult...
      </p>
      <p className="card-price">₹ 200/-</p>
      {/* <p className="card-date">24th August '24</p> */}
    </div>
    <div className="card-status">
   
     <p>Qty : 20</p>
     
    </div>
  </div>

      </div>
      <div style={{display:'flex',alignItems:'flex-end',justifyContent:'space-between'}}>
      <div className="price-summary">
        <p>Total Price : <strong style={{color:'#097CE1'}}> ₹ 24542/-</strong> </p>
        <p>Total CGST : <strong style={{color:'#097CE1'}}> 5%</strong></p>
        <p>Total SGST : <strong style={{color:'#097CE1'}}> 5%</strong></p>
        <p>Shipping Charges : <strong style={{color:'#097CE1'}}> ₹ 128/-</strong></p>
        <p className='totalp'>Total : <strong style={{color:'#097CE1'}}> ₹ 27392/-</strong></p>
      </div>
      <div className="action-buttons">
        <button className="cancel-button">Cancel</button>
        <button className="update-button">Update Order</button>
      </div>
      </div>
    </div>
  );
}
