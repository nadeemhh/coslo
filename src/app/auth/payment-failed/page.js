import Link from 'next/link';
import './page.css'

function Page() {
  

    return (
        <div style={{height:'100vh', display:'flex',justifyContent:'center',alignItems:'center'}}>
        <div className="failure-box2">
        <p className="message2">Your payment has failed.</p>
        <a href="/#cosloplans">
        <button className="retry-button2">Retry</button>
        </a>
      </div>
      </div>
    );
}

export default Page