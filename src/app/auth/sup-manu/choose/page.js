
import "../../CreateAccount.css";
import Link from 'next/link';

function Page() {
  

    return (
        <div className='main' >
            <div className="left-container">
                <img
                    src="\images\img1.jpg"
                    alt="Profile"
                    className="profile-pic"
                />
            </div>
           
            <div className='right-container'>
                <form className="form">
                    <h1 className="">We will get back to you soon!</h1>
                    <p> I want to Sell directly to Buyers With ZERO Commission</p>

<div className="choosebuttons">
                    <Link href="/auth/sup-manu/createaccountsupself">
<button className="active8465">Self Registration ➜</button>
</Link>

<Link href="/auth/sup-manu/createaccountsup">
<button className="active8465">Help For Registration ➜</button>
</Link>
</div>

<div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:'20px'}}>
                    <a href="/auth/sup-manu/login" style={{color:'#1389F0',textDecoration:'none'}}>Already have a seller account? Log in.</a>

                    </div>
              
                </form>

            </div>
        </div>
    );
}

export default Page;


