'use client'
import './page.css'
import Link from 'next/link'
import { useEffect, useState } from "react";


export default function page() {
  const [orders,setorders] = useState([]);


  const handledata = () => {
   

    document.querySelector('.loaderoverlay').style.display='flex';

   const token = localStorage.getItem('employeetoken');


    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/employee/pending-requests`, {
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
            setorders([...data])
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

  return (
    <div className="orders-container">
         <div className="header">
       
        <h3>My Requests</h3>
     
      </div>
      
      <div style={{display:'flex',justifyContent:'space-between',margin:'20px'}}>

      <div style={{textAlign:'left'}}>
        <button style={{textAlign:'left',border:'1px solid black',backgroundColor:'white',padding:'5px 10px'}}>
      
        <i className="fas fa-filter" style={{marginRight:'10px'}}></i>
        
          
      <select name="" id="" style={{border:'none'}}>
        <option value="">Filters</option>
        <option value="">COMPLETED</option>
        <option value="">PENDING</option>
        <option value="">SELF-PENDING</option>
        <option value="">REJECTED</option>
      </select>

      </button>
      </div>
      
     <div  style={{backgroundColor:'#F4F7FB',display:'flex',gap:'10px',padding:'10px',borderRadius:'10px'}}>
     <i className="fas fa-search" style={{cursor:'pointer'}}></i>
      <input type="text" placeholder='Search by Name, Email' style={{border:'none',outline:'none',backgroundColor:'#F4F7FB'}}/>
     </div>
      </div>
      
      <div className="table-wrapper">
        <table className="orders-table">
          <thead>
            <tr>
              <th>Request Date</th>
              <th>Name</th>
              <th>Status</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>GST</th>
              <th>Company Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              
              <tr key={index}>
                
                <td>{order.requestDate}</td>
                <td>{order.name}</td>
                <td>
                    {order.status}
                </td>
                <td>
                    {order.email}
                </td>
                <td>{order.phone}</td>
                <td>
                    {order.gstNumber}
                </td>
                <td>{order.businessName}</td>
                <td>
                <Link href={order.status !== 'SELF-PENDING' ? `/Employee/Onboarding/${order._id}` : `/Employee/verifyseller/${order._id}`}>
                  <img src="\icons\editp.svg" alt=""  style={{cursor:'pointer'}}/>
             </Link>
                </td>
               
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


