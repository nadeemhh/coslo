import Link from 'next/link';

function Success() {
  
    return (
        <>
        <h1 className="onboarding-title">Manufacturer/Supplier Onboarding Form</h1>
        <div className="onboarding-container">
        
        <div className="onboarding-icon">
          <img src="\icons\Congrats.png" alt="" />
        </div>
        <p className="onboarding-message">Mail Sent Successfully</p>
        <Link href="/Employee/Onboarding">
        <button className="onboarding-button">Onboard Next →</button>
        </Link>
      </div>
      </>
    )
}

export default Success