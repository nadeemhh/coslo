'use client'
import '../mylayout.css'
import './page.css'
import Link from 'next/link';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer ,Legend } from "recharts";


export default function page() {

  const orders = [
    { id: "1.", BuyerId: "#6545", BuyerName: "Jane Cooper", City: "Sydney", OrderDate: "01 Oct | 11:29 am",status: "Paid",Amount:'₹ 64' },
    { id: "2.", BuyerId: "#6545", BuyerName: "Jane Cooper", City: "Sydney", OrderDate: "01 Oct | 11:29 am",status: "Pending",Amount:'₹ 64' },
    { id: "3.", BuyerId: "#6545", BuyerName: "Jane Cooper", City: "Sydney", OrderDate: "01 Oct | 11:29 am",status: "Paid",Amount:'₹ 64' },
    { id: "4.", BuyerId: "#6545", BuyerName: "Jane Cooper", City: "Sydney", OrderDate: "01 Oct | 11:29 am",status: "Paid",Amount:'₹ 64' },
    { id: "5.", BuyerId: "#6545", BuyerName: "Jane Cooper", City: "Sydney", OrderDate: "01 Oct | 11:29 am",status: "Paid",Amount:'₹ 64' },
    { id: "6.", BuyerId: "#6545", BuyerName: "Jane Cooper", City: "Sydney", OrderDate: "01 Oct | 11:29 am",status: "Pending",Amount:'₹ 64' },
  ];

  return (
    <>
<h3>Dashboard</h3>
<div className="cards-container" style={{marginTop:'50px'}}>
      {/* Card 1 */}
      <div className="card">
        <div className="card-header">Summary</div>
        <div className="card-content">
          <div className="card-item">
            <img src="\icons\i1.svg" alt="" />
            <span>
              <strong>130</strong> Vendors
            </span>
          </div>
          <div className="card-item">
          <img src="\icons\i2.svg" alt="" />
            <span>
              <strong>1031</strong> Products
            </span>
          </div>
          <div className="card-item">
          <img src="\icons\i3.svg" alt="" />
            <span>
              <strong>89</strong> Categories
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
          <strong className="big-value">128</strong>
          <div className="badgee green">20%</div>
        </div>
      </div>

      {/* Card 3 */}
      <div className="card">
        <div className="card-header">
         <span> Pending to Pay</span>  <img src="\icons\i5.svg" alt="" />
        </div>
        <div className="card-content">
          <strong className="big-value">56</strong>
          <span>People this month</span>
        </div>
      </div>

      {/* Card 4 */}
      <div className="card">
        <div className="card-header">
         <span>Leads Sent</span>  <img src="\icons\i6.svg" alt="" />
        </div>
        <div className="card-content">
          <strong className="big-value">20</strong>
          <span>to subscribed suppliers</span>
        </div>
      </div>
    </div>

    
    {/* <div style={{display:'flex',justifyContent:'space-evenly',flexWrap:'wrap' }}>
      <WeeklyRevenueChart />
      <CustomerReturn />
    </div> */}
    
      {/* <RevenueOrderChart /> */}
      <WeeklyRevenueChart />

      <div className="orders-container">
         <div className="header">
       
        <h3>Recent Invoice</h3>
     
      </div>
      
     
      
      <div className="table-wrapper">
        <table className="orders-table">
          <thead>
            <tr>
              <th>No</th>
              <th>Buyer Id</th>
              <th>Buyer Name</th>
              <th>City</th>
              <th>Order Date</th>
              <th>Status</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              
              <tr key={index}>
                <td>{order.id}</td>
                <td>{order.BuyerId}</td>
                <td>{order.BuyerName}</td>
                <td>
                    {order.City}
                </td>
                <td>
                    {order.OrderDate}
                </td>
                <td className={order.status}>{order.status}</td>
                <td>
                    {order.Amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
      </>
  );
}

const data = [
  { day: "M", revenue: 3500 },
  { day: "T", revenue: 4200 },
  { day: "W", revenue: 3000 },
  { day: "T", revenue: 5000 },
  { day: "F", revenue: 4000 },
  { day: "S", revenue: 3600 },
  { day: "S", revenue: 3265 },
];

const WeeklyRevenueChart = () => {
  const totalRevenue = data.reduce((sum, item) => sum + item.revenue, 0);
  const averageRevenue = (totalRevenue / data.length).toFixed(2);

  return (
    <div style={{ display:'flex',border:'1px solid #a2a2a2',padding:'15px',textAlign:'left',gap:'10px', boxShadow: '0px 2px 4px rgb(0 0 0 / 28%)',justifyContent:'center'}}>
      <div>
      <p style={{fontSize:'25px',marginBottom:'20px'}}>Subscription Revenue</p>

      <p style={{fontSize:'29px'}}>₹{averageRevenue}</p>
      <label className='badgee green'>20%</label>
      <label style={{ color: "#787878" ,marginLeft:'5px'}}>₹{totalRevenue}</label>
      </div>
      <ResponsiveContainer width={'70%'} height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="revenue" stroke="#1389F0" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};



const data2 = [
  { month: "Jan", revenue: 25000, orders: 200 },
  { month: "Feb", revenue: 30000, orders: 300 },
  { month: "Mar", revenue: 40000, orders: 400 },
  { month: "Apr", revenue: 35000, orders: 350 },
  { month: "May", revenue: 45000, orders: 500 },
  { month: "Jun", revenue: 60000, orders: 700 },
  { month: "Jul", revenue: 25565, orders: 456 },
  { month: "Aug", revenue: 50000, orders: 600 },
  { month: "Sep", revenue: 30000, orders: 400 },
  { month: "Oct", revenue: 65000, orders: 800 },
  { month: "Nov", revenue: 70000, orders: 900 },
  { month: "Dec", revenue: 50000, orders: 650 },
];

const RevenueOrderChart = () => {
  return (
    <div style={{ border:'1px solid #a2a2a2',padding:'15px',textAlign:'left',marginTop:'50px',boxShadow: '0px 2px 4px rgb(0 0 0 / 28%)'}}>
      <p style={{fontSize:'25px',marginBottom:'30px'}}>Revenue vs Order</p>
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data2} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="revenue" stroke="#8884d8" name="Revenue" />
        <Line type="monotone" dataKey="orders" stroke="#ff7300" name="Order" />
      </LineChart>
    </ResponsiveContainer>
       </div>
  );
};



const data3 = [
  { day: "M", Return: 500 },
  { day: "T", Return: 600 },
  { day: "W", Return: 30 },
  { day: "T", Return: 10 },
  { day: "F", Return: 200 },
  { day: "S", Return:160 },
  { day: "S", Return: 100 },
];

const CustomerReturn = () => {
  const totalRevenue = data3.reduce((sum, item) => sum + item.Return, 0);
  const averageRevenue = (totalRevenue / data3.length).toFixed(0);

  return (
    <div style={{ display:'flex',border:'1px solid #a2a2a2',padding:'15px',textAlign:'left',gap:'10px',boxShadow: '0px 2px 4px rgb(0 0 0 / 28%)'}}>
      <div>
      <p style={{fontSize:'25px',marginBottom:'110px'}}>Customer Return</p>

      <p style={{fontSize:'29px'}}>{averageRevenue}</p>
      <label className='badgee green'>12%</label>
      <label style={{ color: "#787878" ,marginLeft:'5px'}}>{totalRevenue}</label>
      </div>
      <ResponsiveContainer width={300} height={200}>
        <LineChart data={data3}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="Return" stroke="#1389F0" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};


