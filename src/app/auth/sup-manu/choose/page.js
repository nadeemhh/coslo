
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

<div className="chooseparent">
    <div>
    <p className="sellertype77">Choose what you want to sell</p>
    <p style={{fontSize:'18px'}}>Our team is here to help - contact us anytime. <i className="fas fa-phone-alt" style={{color:'#007bff'}}></i> +91 9429693768 </p>
</div>
<div className="choosebuttons">

<Link href="/auth/sup-manu/createaccountsupself?sellertype=Property">
<button className="active8465">Property <img src="\icons\right.svg" alt="icon" width={20}/></button>
</Link>

<Link href="/auth/sup-manu/createaccountsupself?sellertype=Product">
<button className="active8465">Product <img src="\icons\right.svg" alt="icon"  width={20}/></button>
</Link>

<Link href="/auth/sup-manu/createaccountsupself?sellertype=Service">
<button className="active8465">Service <img src="\icons\right.svg" alt="icon"  width={20}/></button>
</Link>


</div>
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


