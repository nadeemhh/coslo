
import './page.css'
import Link from 'next/link';
import Goback from '../../../back.js'

export default function page() {
  return (
    <>
    <div className="header">
    <Goback/>
    
    <h3>Quotations #4783</h3>
 
  </div>

    <div className="enquiry-container">
      <p style={{textAlign:'left',color:'#007bff',marginBottom:'40px',fontSize:'22px',fontWeight:'500'}}>Quotations Details</p>
      <div className="enquiry-card">
        <div className="enquiry-row">
          <span className="label">Enquiry Id :</span>
          <span className="value">7372</span>
        </div>
        <div className="enquiry-row">
          <span className="label">Buyer Name :</span>
          <span className="value">Faiz Iqbal</span>
        </div>
        <div className="enquiry-row">
          <span className="label">Enquiry Date :</span>
          <span className="value">16th August 2024</span>
        </div>
        <div className="enquiry-row">
          <span className="label">Buyer Email :</span>
          <span className="value">faiziqbal@gmail.com</span>
        </div>
        <div className="enquiry-description">
          <span className="Description">Description :</span>
          <p className="value">
            I hope this message finds you well. My name is Priya Singh, and I am
            reaching out on behalf of HomeComfort Co., a home decor retailer
            based in New Delhi. We specialize in offering high-quality,
            customizable bedding products to our clients across India. <br />
            <br />
            We came across your company, RuiCraft Supplies, and were impressed
            by your range of custom-sized pillows with organic rui filling. We
            are interested in exploring a potential partnership and would like
            to inquire about your products and services. Specifically, we are
            looking for:
          </p>
          <ul className="value">
            <li>
              A product catalog showcasing available sizes, types of rui, and
              customization options.
            </li>
            <li>
              Bulk pricing details, including minimum order quantities and any
              tiered discount structures.
            </li>
            <li>Average production lead times for orders of 1,000 units or more.</li>
            <li>
              Payment terms, including any upfront requirements or credit
              facilities you may offer.
            </li>
          </ul>
          <p className="value">
            Additionally, we would appreciate if you could send us a sample of
            your product to evaluate its quality before committing to a large
            order.
          </p>
        </div>
        <div className="enquiry-row">
          <span className="EnquiryStatus">Enquiry Status :</span>
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

