'use client'
import './page.css'
import '../../../component/component-css/cartcard.css'
// import "../../../component/component-css/ui.css";
import Link from 'next/link';
import Goback from '../../../back.js'
import { useState,useEffect } from "react";

export default function Page() {

    const [data,setdata] = useState({});
    const [showdata,setshowdata] = useState(false);

  const handledata = () => {

    document.querySelector('.loaderoverlay').style.display='flex';

   const token = localStorage.getItem('token');
   const params = new URLSearchParams(window.location.search);
   const id = params.get('id');
   console.log(id); // Outputs: 678b2610e07656f4cfb728ff

    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/seller/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }), // Add token if it exists
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return response.json().then((errorData) => {
            throw new Error(errorData.message || 'Failed. Please try again.');
          });
        }
      })
      .then((data) => {
            console.log(data)
            setdata(data)
            setshowdata(true)
           document.querySelector('.loaderoverlay').style.display='none';
        // Successfully logged in
       // window.location.href = '/Employee/Onboarding';
       
      })
      .catch((err) => {
        document.querySelector('.loaderoverlay').style.display='none';
        console.log(err)
      });
  };

  useEffect(() => {
    handledata();
   
  },[]);


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
         {  showdata && <>

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
      <p style={{fontSize:'20px',color:'#097CE1'}}>{data.name}</p>
      <p>432 Orders</p>
      </div>
      </div>
    <div className="card-details">
      <p className="user-email">Email : {data.email}</p>
      <p className="user-phone">Phone : {data.phone}</p>
      <p className="user-company">Company : {data.businessName}</p>
      <p className="user-company">Role : {data.role}</p>
    </div>
  </div>
  
  <a href="/supplier/dashboard">
  <button className="btnn visit-btn">
            Visit Manufacturer <i className="fas fa-arrow-right"></i>
          </button>
          </a>
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
            <select value={data.subscriptionPlan || "YEARLY"} onChange={(e) => setdata({ ...data, subscriptionPlan: e.target.value })}>
    <option value="MONTHLY">Monthly</option>
    <option value="YEARLY">Yearly</option>
    <option value="FREE">Free</option>
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
   </>  }
</div>

  );
}
