'use client'
import './page.css'
import Link from 'next/link';

export default function page() {

  return (
    <>

        <div className="onboarding-container" style={{marginTop:'50px'}}>
        
        <div className="onboarding-icon">
          <img src="\icons\Congrats.png" alt="" />
        </div>
        <p className="onboarding-message">Mail Sent Successfully</p>
        <Link href="/admin/Employees/newemployee">
        <button className="onboarding-button">Add New Employees →</button>
        </Link>
      </div>
      </>
  );
}
