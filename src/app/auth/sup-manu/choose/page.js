
import "../../CreateAccount.css";
import Link from 'next/link';

function Page() {
  

    return (
        <div className='main' >
            <div className="left-container">
                <img
                    src="\images\img1.png"
                    alt="Profile"
                    className="profile-pic"
                />
            </div>
           
            <div className='right-container'>
                <form className="form">
                    <h1 className="">We will get back to you soon!</h1>
                    <p> I want add Sell directly to Buyers With ZERO Commission</p>

<div style={{display:'flex',gap:'50px'}}>
                    <Link href="/auth/sup-manu/createaccountsupself">
<button className="active8465">Self Registration ➜</button>
</Link>

<Link href="/auth/sup-manu/createaccountsup">
<button className="active8465">Help For Registration ➜</button>
</Link>
</div>
              
                </form>

            </div>
        </div>
    );
}

export default Page;




const TermsCard = ({toggleconfirmation,handledata}) => {
    return (
     
        <div className="modal-overlay">
 
        <div className="terms-card065">
          <div className="terms-header065">
            <h2 className="terms-title065">Terms & Conditions</h2>
            <i className="fa fa-times close-icon065" aria-hidden="true"  onClick={toggleconfirmation}></i>
          </div>
          <div className="terms-content065">
            <p>
              Welcome to Coslo! By using our website, you agree to the following terms and conditions. Please read them carefully.
            </p>
            <h3>1. Acceptance of Terms</h3>
            <p>
              By accessing or using coslo.com you acknowledge that you have read, understood, and agree to be bound by these Terms & Conditions.
            </p>
            <h3>2. Use of the Website</h3>
            <p>
              You must be at least 18 years old to use our services. You agree to use the website only for lawful purposes and in compliance with all applicable laws. Unauthorized use of the website may result in termination of your access.
            </p>
            <h3>3. Intellectual Property</h3>
            <p>
              All content, logos, designs, and graphics on [Website Name] are the property of [Company Name]. Unauthorized use or reproduction is strictly prohibited.
            </p>
            <h3>4. Privacy Policy</h3>
            <p>Your use of the website is also governed by our Privacy Policy.</p>
            <h3>5. Limitation of Liability</h3>
            <p>
              Coslo is not responsible for any direct, indirect, or consequential damages arising from your use of the website.
            </p>
            <h3>6. Changes to Terms</h3>
          </div>
          <div className="terms-footer065">
            <button className="accept-btn065" onClick={handledata}>Accept</button>
            <button className="decline-btn065" style={{background:'#EC5959'}}  onClick={toggleconfirmation}>Decline</button>
          </div>
        </div>
        </div>
     
    );
  };

  