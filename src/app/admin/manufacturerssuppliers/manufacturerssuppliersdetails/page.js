
import './page.css'
import '../../../component/component-css/cartcard.css'
// import "../../../component/component-css/ui.css";
import Link from 'next/link';
import Goback from '../../../back.js'


export default function Page() {

  const orders = [
    { id: "#1", PaymentDate: "24 Aug 2024, 09:00 AM", Email: "faiziqbal@gmail.com", PaymentMethod: "Paytm", Amount: "₹ 1000/-" },
    { id: "#1", PaymentDate: "24 Aug 2024, 09:00 AM", Email: "faiziqbal@gmail.com", PaymentMethod: "Paytm", Amount: "₹ 1000/-" },
    { id: "#1", PaymentDate: "24 Aug 2024, 09:00 AM", Email: "faiziqbal@gmail.com", PaymentMethod: "Paytm", Amount: "₹ 1000/-" },
    { id: "#1", PaymentDate: "24 Aug 2024, 09:00 AM", Email: "faiziqbal@gmail.com", PaymentMethod: "Paytm", Amount: "₹ 1000/-" },
    { id: "#1", PaymentDate: "24 Aug 2024, 09:00 AM", Email: "faiziqbal@gmail.com", PaymentMethod: "Paytm", Amount: "₹ 1000/-" },
    { id: "#1", PaymentDate: "24 Aug 2024, 09:00 AM", Email: "faiziqbal@gmail.com", PaymentMethod: "Paytm", Amount: "₹ 1000/-" },
    { id: "#1", PaymentDate: "24 Aug 2024, 09:00 AM", Email: "faiziqbal@gmail.com", PaymentMethod: "Paytm", Amount: "₹ 1000/-" },
    { id: "#1", PaymentDate: "24 Aug 2024, 09:00 AM", Email: "faiziqbal@gmail.com", PaymentMethod: "Paytm", Amount: "₹ 1000/-" },
  ];


  return (
    <div>
       <div className="header">
        <button className="back-button">
        <Goback/>
        </button>
        <h2>Manufacturer/Supplier  #378434H</h2>
     
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
      <p style={{fontSize:'20px',color:'#097CE1'}}>Rahul Singh</p>
      <p>432 Orders</p>
      </div>
      </div>
    <div className="card-details">
      <p className="user-email">Email : faiziqbal@gmail.com</p>
      <p className="user-phone">Phone : +91 9876543210</p>
      <p className="user-company">Company : FarmFresh Supplies Inc.</p>
    </div>
  </div>
  
  <Link href="/supplier/dashboard">
  <button className="btnn visit-btn">
            Visit Manufacturer <i className="fas fa-arrow-right"></i>
          </button>
          </Link>
  </div>

  <div style={{display:'flex',justifyContent:'space-between',marginBottom:'50px'}}>
  <div className="dropdowns">
          <div className="dropdown status-buttons">
            <p>Subscription Status</p>
            <select>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
          <div className="dropdown status-buttons">
            <p>Subscription Type</p>
            <select>
              <option>Monthly</option>
              <option>Yearly</option>
            </select>
          </div>
        </div>

        {/* <button className="btnn payment-btn">
            Add Payment <i className="fas fa-plus"></i>
          </button> */}
        </div>


        <div className="table-wrapper">
        <table className="orders-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Payment Date</th>
              <th>Email</th>
              <th>Payment Method</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              
              <tr key={index}>
                <td>{order.id}</td>
                <td>{order.PaymentDate}</td>
                <td>{order.Email}</td>
                <td>
                    {order.PaymentMethod}
                </td>
                <td>{order.Amount}</td>
               
              </tr>
            ))}
          </tbody>
        </table>
      </div>
          
</div>

  );
}
