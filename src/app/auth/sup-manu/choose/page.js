
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
                    <p> I want to Sell directly to Buyers With ZERO Commission</p>

<div className="choosebuttons">
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


