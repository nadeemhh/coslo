
import './page.css'
import '../../../component/component-css/cartcard.css'
// import "../../../component/component-css/ui.css";
import Link from 'next/link';
import Goback from '../../../back.js'

export default function Page() {


  return (
    <div>
       <div className="header">
        <button className="back-button">
        <Goback/>
        </button>
        <h2>Buyer #923</h2>
     
      </div>

<div style={{display:'flex',justifyContent:'space-between',marginTop:'50px'}}>
    <div className="card-details-container">
    <div style={{display:'flex',gap:'10px',alignItems:'center',textAlign:'left',marginBottom:'10px'}}>
      <div>
      <img
        src="\images\user2.png"
        alt="Profile"
        className="profile-image"
      />
      </div>
      <div>
      <p style={{fontSize:'20px',color:'#097CE1'}}>Faiz Iqbal</p>
      <p>432 Orders</p>
      </div>
      </div>
    <div className="card-details">
      <p className="user-email">Email : faiziqbal@gmail.com</p>
      <p className="user-phone">Phone : +91 9876543210</p>
      <p className="user-company">Address : A23/43 Batla House, Salempura, New Delhi</p>
      <p className="user-company">Payment Method : PhonePe</p>
    </div>
  </div>
  
  <button className="btnn visit-btn">
  Ban Customer Account
          </button>
  </div>

  <div style={{display:'flex',justifyContent:'space-between',margin:'40px 0px'}}>
    <p style={{fontSize:'20px',fontWeight:'500'}}>Buyer Orders (432)</p>

    <select style={{backgroundColor:'#0000ff00',padding:'5px',borderRadius:'5px'}}><option value="">last 30 days</option></select>
    
    </div>

         
      <div className='card-container' style={{marginTop:"20px"}}>

<div className="card" style={{maxWidth:'600px'}}>

<div className="prodictimg">
<img src="\images\Image.jpg" alt="" />
</div>
<div className="card-details">
<p className="card-title">
  Samsung Galaxy Smartwatch Z-Series with Ult...
</p>
<p className="card-price">₹ 200/-</p>
<p className="card-date">24th August '24</p>
</div>
<div className="card-status">
{/* <CounterComponent/>
<img src="\icons\dustbin.svg" alt="" style={{width:'40px',cursor:'pointer'}}/> */}
<button className="shipped">● Shipped</button>

</div>

</div>

<div className="card" style={{maxWidth:'600px'}}>
<div className="prodictimg">
<img src="\images\Image.jpg" alt="" />
</div>
<div className="card-details">
<p className="card-title">
  Samsung Galaxy Smartwatch Z-Series with Ult...
</p>
<p className="card-price">₹ 200/-</p>
<p className="card-date">24th August '24</p>
</div>
<div className="card-status">
{/* <CounterComponent/>
<img src="\icons\dustbin.svg" alt="" style={{width:'40px',cursor:'pointer'}}/> */}
<button className="delivered">● delivered</button>

</div>
</div>


<div className="card" style={{maxWidth:'600px'}}>
<div className="prodictimg">
<img src="\images\Image.jpg" alt="" />
</div>
<div className="card-details">
<p className="card-title">
  Samsung Galaxy Smartwatch Z-Series with Ult...
</p>
<p className="card-price">₹ 200/-</p>
<p className="card-date">24th August '24</p>
</div>
<div className="card-status">
{/* <CounterComponent/>
<img src="\icons\dustbin.svg" alt="" style={{width:'40px',cursor:'pointer'}}/> */}
<button className="returned">● Returned</button>

</div>
</div>

</div> 
</div>

  );
}
