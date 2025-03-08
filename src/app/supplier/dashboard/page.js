'use client'
import '../mylayout.css'
import './page.css'
import Link from 'next/link';
import  { useState,useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer ,Legend } from "recharts";


export default function page() {

  const [data,setdata] = useState(null);
  const [orderscalc,setorderscalc] = useState(null);
  const [sellertype,setsellertype] = useState(null);

  const handledata = () => {
     
  
    document.querySelector('.loaderoverlay').style.display='flex';

   const token = localStorage.getItem('token');


    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/seller/analytics`, {
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
            console.log(data.data)
            setdata(data.data)
          
           orderscalcdata()
       
      })
      .catch((err) => {
        document.querySelector('.loaderoverlay').style.display='none';
        console.log(err)
      });
  };


  useEffect(() => {
   
    handledata();
  },[]);



  const orderscalcdata = () => {

   const token = localStorage.getItem('token');

let sellertype =JSON.parse(localStorage.getItem('sellerdata')).role;

setsellertype(sellertype)

   let url = sellertype !== 'COSLO_SELLER' ?`${process.env.NEXT_PUBLIC_BASE_URL}/seller/coslo/seller` : `${process.env.NEXT_PUBLIC_BASE_URL}/seller/coslo/coslo-seller`;

   console.log(url,sellertype !== 'COSLO_SELLER',sellertype , 'COSLO_SELLER')
    fetch(url, {
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
            setorderscalc(data)
            document.querySelector('.loaderoverlay').style.display='none';
      })
      .catch((err) => {
        document.querySelector('.loaderoverlay').style.display='none';
        console.log(err)
      });
  };



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
    {
   data &&   <>
   <h3 style={{textAlign:'left'}}>Dashboard</h3>

   <div className="cards-container" style={{marginTop:'50px'}}>
     

   { 
 orderscalc !== null && ( sellertype !== 'COSLO_SELLER' ? <> <div className="card">
        <div className="card-header">
         <span>Handled by Coslo</span>  
        </div>
        <div className="card-content">
          <strong className="big-value">{orderscalc.ordersRedirected}</strong>
          {/* <div className="badgee green">20%</div> */}
        </div>
      </div>

      <div className="card">
        <div className="card-header">
         <span>Money Owed to Coslo</span>  
        </div>
        <div className="card-content">
          <strong className="big-value">₹ {orderscalc.moneyOwed}</strong>
          {/* <div className="badgee green">20%</div> */}
        </div>
      </div>
      </> 
:
<>
      <div className="card">
        <div className="card-header">
         <span>Orders Handled</span>  
        </div>
        <div className="card-content">
          <strong className="big-value">{orderscalc.ordersHandled}</strong>
          {/* <div className="badgee green">20%</div> */}
        </div>
      </div>

      <div className="card">
        <div className="card-header">
         <span>Commission Earned</span>  
        </div>
        <div className="card-content">
          <strong className="big-value">₹ {orderscalc.commissionEarned}</strong>
          {/* <div className="badgee green">20%</div> */}
        </div>
      </div>
      </>)
}
     
    </div>


    {/* <div style={{display:'flex',justifyContent:'space-evenly',flexWrap:'wrap',marginTop:'50px' }}>
      <WeeklyRevenueChart />
      <CustomerReturn />
    </div> */}
    
      {/* <RevenueOrderChart /> */}

      <RevenueChart  data2={data.revenue.monthly}/>
      <OrdersChart  data2={data.orders.monthly}/>
      
      {/* <div className="orders-container">
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
    </div> */}
    </>
      }
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
    <div style={{ display:'flex',border:'1px solid #a2a2a2',padding:'15px',textAlign:'left',gap:'10px',boxShadow: '0px 2px 4px rgb(0 0 0 / 28%)'}}>
      <div>
      <p style={{fontSize:'25px',marginBottom:'110px'}}>Average Revenue</p>

      <p style={{fontSize:'29px'}}>₹{averageRevenue}</p>
      <label className='badgee green'>20%</label>
      <label style={{ color: "#787878" ,marginLeft:'5px'}}>₹{totalRevenue}</label>
      </div>
      <ResponsiveContainer width={300} height={200}>
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




const RevenueChart = ({data2}) => {
  return (
    <div style={{ border:'1px solid #a2a2a2',padding:'15px',textAlign:'left',marginTop:'50px',boxShadow: '0px 2px 4px rgb(0 0 0 / 28%)'}}>
      <p style={{fontSize:'25px',marginBottom:'30px'}}>Total Revenue</p>
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




const OrdersChart = ({data2}) => {
  return (
    <div style={{ border:'1px solid #a2a2a2',padding:'15px',textAlign:'left',marginTop:'50px',boxShadow: '0px 2px 4px rgb(0 0 0 / 28%)'}}>
      <p style={{fontSize:'25px',marginBottom:'30px'}}>Total Orders</p>
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data2} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="count" stroke="#8884d8" name="count" />
      </LineChart>
    </ResponsiveContainer>
       </div>
  );
};

