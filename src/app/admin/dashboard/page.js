'use client'
import '../mylayout.css'
import './page.css'
import Link from 'next/link';
import  { useState,useEffect } from "react";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer ,Legend } from "recharts";


export default function page() {
  const [data,setdata] = useState(null);


  const handledata = () => {
     
  
    document.querySelector('.loaderoverlay').style.display='flex';

   const token = localStorage.getItem('token');


    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/analytics`, {
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
            setdata(data.data)
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
    { id: "1.", BuyerId: "#6545", BuyerName: "Jane Cooper", City: "Sydney", OrderDate: "01 Oct | 11:29 am",status: "Paid",Amount:'₹ 64' },
    { id: "2.", BuyerId: "#6545", BuyerName: "Jane Cooper", City: "Sydney", OrderDate: "01 Oct | 11:29 am",status: "Pending",Amount:'₹ 64' },
    { id: "3.", BuyerId: "#6545", BuyerName: "Jane Cooper", City: "Sydney", OrderDate: "01 Oct | 11:29 am",status: "Paid",Amount:'₹ 64' },
    { id: "4.", BuyerId: "#6545", BuyerName: "Jane Cooper", City: "Sydney", OrderDate: "01 Oct | 11:29 am",status: "Paid",Amount:'₹ 64' },
    { id: "5.", BuyerId: "#6545", BuyerName: "Jane Cooper", City: "Sydney", OrderDate: "01 Oct | 11:29 am",status: "Paid",Amount:'₹ 64' },
    { id: "6.", BuyerId: "#6545", BuyerName: "Jane Cooper", City: "Sydney", OrderDate: "01 Oct | 11:29 am",status: "Pending",Amount:'₹ 64' },
  ];

  return (
    <>{
   data &&   <>
<h3>Dashboard</h3>
<div className="cards-container" style={{marginTop:'50px'}}>
      {/* Card 1 */}
      <div className="card">
        <div className="card-header">Summary</div>
        <div className="card-content">
          <div className="card-item">
            <img src="\icons\i1.svg" alt="" />
            <span>
              <strong>{data.vendorsCount}</strong> Vendors
            </span>
          </div>
          <div className="card-item">
          <img src="\icons\i2.svg" alt="" />
            <span>
              <strong>{data.productsCount}</strong> Products
            </span>
          </div>
          <div className="card-item">
          <img src="\icons\i3.svg" alt="" />
            <span>
              <strong>{data.categoriesCount}</strong> Categories
            </span>
          </div>
        </div>
      </div>

      {/* Card 2 */}
      <div className="card">
        <div className="card-header">
         <span>Subscribers</span>  <img src="\icons\i4.svg" alt="" />
        </div>
        <div className="card-content">
          <strong className="big-value">{data.subscribersCount}</strong>
          {/* <div className="badgee green">20%</div> */}
        </div>
      </div>

      {/* Card 3 */}
      {/* <div className="card">
        <div className="card-header">
         <span> Pending to Pay</span>  <img src="\icons\i5.svg" alt="" />
        </div>
        <div className="card-content">
          <strong className="big-value">56</strong>
          <span>People this month</span>
        </div>
      </div> */}

      {/* Card 4 */}
      <div className="card">
        <div className="card-header">
         <span>Total Leads Sent</span>  <img src="\icons\i6.svg" alt="" />
        </div>
        <div className="card-content">
          <strong className="big-value">{data.leadSentCount}</strong>
          <span>to subscribed sellers</span>
        </div>
      </div>
    </div>
    
      <RevenueChart  data2={data.subscriptionRevenue.monthly}/>
      </>
      }
      </>
  );
}





// const data2 = [
//   { month: "Jan", revenue: 25000 },
//   { month: "Feb", revenue: 10},
//   { month: "Mar", revenue: 40000},
//   { month: "Apr", revenue: 35000},
//   { month: "May", revenue: 45000},
//   { month: "Jun", revenue: 60000},
//   { month: "Jul", revenue: 25565},
//   { month: "Aug", revenue: 50000},
//   { month: "Sep", revenue: 30000},
//   { month: "Oct", revenue: 65000},
//   { month: "Nov", revenue: 70000},
//   { month: "Dec", revenue: 50000},
// ];

const RevenueChart = ({data2}) => {
  return (
    <div style={{ border:'1px solid #a2a2a2',padding:'15px',textAlign:'left',marginTop:'50px',boxShadow: '0px 2px 4px rgb(0 0 0 / 28%)'}}>
      <p style={{fontSize:'25px',marginBottom:'30px'}}>Subscription Revenue</p>
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data2} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="revenue" stroke="#8884d8" name="Revenue" />
      </LineChart>
    </ResponsiveContainer>
       </div>
  );
};

