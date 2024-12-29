
import './page.css'
import Link from 'next/link';


export default function page() {


  return (
    <> <div className="header">
       
    <h3 style={{margin:'30px 0px'}}>Customer Support</h3>
 
  </div>
  
  <div className="details-page">
      <div className="logo-container">
        <img
          src="\icons\supporticon.png" // Replace with the actual logo URL
          alt="Logo"
          className="logo"
        />
      </div>
      <p className="description">
        For manufacturer related query resolution we are providing free support
        with our technical team
      </p>
      <div className="contact-container">
        <p className="call-us">
          Call Us <span className="phone-number">+91 9876543210</span>
        </p>
        <p className="timing">Between 09:00 AM - 10:00 PM</p>
      </div>
      <p className="email">
        Email : <span className="email-address">faiziqbal@mail.com</span>
      </p>
    </div>
    </>
  );
}

