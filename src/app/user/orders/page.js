
import './page.css'
import '../../component/component-css/cartcard.css'
import "../../component/component-css/ui.css";
import Link from 'next/link';

export default function Page() {
  return (
    <div className="ordersp">
      <div style={{display:'flex',justifyContent:'space-between'}}>
        <p style={{fontSize:'20px',fontWeight:'500'}}>My Orders</p>
        <select name="" id="" style={{backgroundColor:'#0000ff00',padding:'5px',borderRadius:'5px'}}>
            <option value="">last 30 days</option>
        </select>
      </div>

      <div className='card-container' style={{marginTop:"20px"}}>

      <Link href="orders/order-details" className="card" style={{maxWidth:'600px'}}>
      
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
      <button className="cancel-btn">Cancel</button>
    </div>
  
  </Link>

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
      <button className="cancel-btn">Return</button>
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
  )
}
