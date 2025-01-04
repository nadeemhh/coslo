'use client'
import './page.css'
import Link from 'next/link'
import { useState } from "react";


export default function page() {
  const orders = [
    { id: "#1", Name: "Faiz Iqbal",Type:'Manufacturer', Email: "faiziqbal@gmail.com",Mobile:'91576984674',GST:'7489435793843',Company:'FarmFresh Supplies..'},
    { id: "#1", Name: "Faiz Iqbal",Type:'Manufacturer', Email: "faiziqbal@gmail.com",Mobile:'91576984674',GST:'7489435793843',Company:'FarmFresh Supplies..'},
    { id: "#1", Name: "Faiz Iqbal",Type:'Manufacturer', Email: "faiziqbal@gmail.com",Mobile:'91576984674',GST:'7489435793843',Company:'FarmFresh Supplies..'},
    { id: "#1", Name: "Faiz Iqbal",Type:'Manufacturer', Email: "faiziqbal@gmail.com",Mobile:'91576984674',GST:'7489435793843',Company:'FarmFresh Supplies..'},
    { id: "#1", Name: "Faiz Iqbal",Type:'Manufacturer', Email: "faiziqbal@gmail.com",Mobile:'91576984674',GST:'7489435793843',Company:'FarmFresh Supplies..'},
    { id: "#1", Name: "Faiz Iqbal",Type:'Manufacturer', Email: "faiziqbal@gmail.com",Mobile:'91576984674',GST:'7489435793843',Company:'FarmFresh Supplies..'},
    
  ];

  return (
    <div className="orders-container">
         <div className="header">
       
        <h3>Manufacturer/Supplier</h3>
     
      </div>
      
      <div style={{display:'flex',justifyContent:'space-between',margin:'20px'}}>

      <div style={{textAlign:'left'}}>
        <button style={{textAlign:'left',border:'1px solid black',backgroundColor:'white',padding:'5px 10px'}}>
      
        <i className="fas fa-filter" style={{marginRight:'10px'}}></i>
        
          
      <select name="" id="" style={{border:'none'}}>
        <option value="">Filters</option>
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
              <th>id</th>
              <th>Name</th>
              <th>Type</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>GST</th>
              <th>Company</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              
              <tr key={index}>
                <td>{order.id}</td>
                <td>{order.Name}</td>
                <td>
                    {order.Type}
                </td>
                <td>
                    {order.Email}
                </td>
                <td>{order.Mobile}</td>
                <td>
                    {order.GST}
                </td>
                <td>{order.Company}</td>
                <td>
                <Link href="/Employee/Onboarding">
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


