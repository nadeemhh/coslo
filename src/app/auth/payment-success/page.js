import Link from 'next/link';
import './page.css'

function Page() {
  

    return (
        <div style={{height:'100vh', display:'flex',justifyContent:'center',alignItems:'center'}}>
        <div className="success-box">
        <p className="message2">You have successfully purchased the plan.</p>
        <a href="/supplier/subscription">
        <button className="login-button2">Go To Your Account</button>
        </a>
      </div>
      </div>
    );
}

export default Page