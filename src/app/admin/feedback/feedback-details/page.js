
import './page.css'
import Link from 'next/link';
import Goback from '../../../back.js'

export default function page() {
  return (
    <>
    <div className="header">
    <Goback/>
    
    <h3>Feedback #4783</h3>
 
  </div>

    <div className="enquiry-container">
      <p style={{textAlign:'left',color:'#007bff',marginBottom:'40px',fontSize:'22px',fontWeight:'500'}}>Feedback Details</p>
      <div className="enquiry-card">
        <div className="enquiry-row">
          <span className="label">Feedback Id :</span>
          <span className="value">7372</span>
        </div>
        <div className="enquiry-row">
          <span className="label">Name :</span>
          <span className="value">Faiz Iqbal</span>
        </div>
        <div className="enquiry-row">
          <span className="label">Date :</span>
          <span className="value">16th August 2024</span>
        </div>
        <div className="enquiry-row">
          <span className="label">Email :</span>
          <span className="value">faiziqbal@gmail.com</span>
        </div>
        <div className="enquiry-row">
          <span className="label">Rating :</span>
          <span className="value">4/5</span>
        </div>
        <div className="enquiry-description">
          <span className="Description">Message</span>
          <p className="value">
          The e-commerce platform is user-friendly with an easy checkout process and a good overall shopping experience.
          </p>
        </div>

        <div className="enquiry-row">
          <span className="EnquiryStatus">Status :</span>
          <select className="dropdown">
            <option value="Pending">Pending</option>
            <option value="Approved">Completed</option>
          </select>
        </div>
        <div className="button-row">
          <button className="update-button">Update</button>
          <button className="cancel-button">Cancel</button>
        </div>
      </div>
    </div>
    </>
  );
}

