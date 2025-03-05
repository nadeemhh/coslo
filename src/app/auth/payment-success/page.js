import Link from 'next/link';
import './page.css'

function Page() {
  

    return (
        <div style={{height:'100vh', display:'flex',justifyContent:'center',alignItems:'center'}}>
        <div className="success-box">
        <p className="message2">You have successfully purchased the plan.</p>
        <Link href="/auth/sup-manu/login">
        <button className="login-button2">Login To Your Account</button>
        </Link>
      </div>
      </div>
    );
}

export default Page