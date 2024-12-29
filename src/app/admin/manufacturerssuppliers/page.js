'use client'
import './page.css'
import Link from 'next/link'
import { useState } from "react";


export default function page() {
  const orders = [
    { id: "#1", Name: "Faiz Iqbal", Email: "faiziqbal@gmail.com", Mobile: "0000000000", GST: "783737131222",Company: "FarmFresh Supplies..", Subscription: "Active" },
    { id: "#1", Name: "Faiz Iqbal", Email: "faiziqbal@gmail.com", Mobile: "0000000000", GST: "783737131222",Company: "FarmFresh Supplies..", Subscription: "Active" },
    { id: "#1", Name: "Faiz Iqbal", Email: "faiziqbal@gmail.com", Mobile: "0000000000", GST: "783737131222",Company: "FarmFresh Supplies..", Subscription: "Inactive" },
    { id: "#1", Name: "Faiz Iqbal", Email: "faiziqbal@gmail.com", Mobile: "0000000000", GST: "783737131222",Company: "FarmFresh Supplies..", Subscription: "Inactive" },
    { id: "#1", Name: "Faiz Iqbal", Email: "faiziqbal@gmail.com", Mobile: "0000000000", GST: "783737131222",Company: "FarmFresh Supplies..", Subscription: "Active" },
    { id: "#1", Name: "Faiz Iqbal", Email: "faiziqbal@gmail.com", Mobile: "0000000000", GST: "783737131222",Company: "FarmFresh Supplies..", Subscription: "Active" },
    { id: "#1", Name: "Faiz Iqbal", Email: "faiziqbal@gmail.com", Mobile: "0000000000", GST: "783737131222",Company: "FarmFresh Supplies..", Subscription: "Inactive" },
  ];

  return (
    <div className="orders-container">
         <div className="header">
       
        <h3>Manufacturer/Supplier</h3>
     
      </div>
      
      <div style={{display:'flex',justifyContent:'space-between',margin:'20px'}}>

      {/* <div style={{textAlign:'left'}}>
        <button style={{textAlign:'left',border:'1px solid black',backgroundColor:'white',padding:'5px 10px'}}>
      
        <i className="fas fa-filter" style={{marginRight:'10px'}}></i>
        
          
      <select name="" id="" style={{border:'none'}}>
        <option value="">Filters</option>
      </select>
      </button>
      </div> */}
      
     <div  style={{backgroundColor:'#F4F7FB',display:'flex',gap:'10px',padding:'10px',borderRadius:'10px'}}>
     <i className="fas fa-search" style={{cursor:'pointer'}}></i>
      <input type="text" placeholder='Search by Name, Email' style={{border:'none',outline:'none',backgroundColor:'#F4F7FB'}}/>
     </div>
      </div>
      
      <div className="table-wrapper">
        <table className="orders-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>GST</th>
              <th>Company</th>
              <th>Subscription</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {/* {orders.map((order, index) => ( */}
              
              {/* <tr key={index}> */}
              <tr >
                <td>#1</td>
                <td>Faiz Iqbal</td>
                <td>faiziqbal@gmail.com</td>
                <td>
                0000000000
                </td>
                <td>783737131222</td>
                <td>
                FarmFresh Supplies..	
                </td>
                <td className='Active'>Active <span style={{color:'#7A7D7E'}}>Monthly</span></td>
                <td>
                  <Link href="/admin/manufacturerssuppliers/manufacturerssuppliersdetails">
                  <i className="fas fa-external-link-alt" style={{color:'black'}}></i>
                </Link>
                </td>
              </tr>

              <tr >
                <td>#1</td>
                <td>Faiz Iqbal</td>
                <td>faiziqbal@gmail.com</td>
                <td>
                0000000000
                </td>
                <td>783737131222</td>
                <td>
                FarmFresh Supplies..	
                </td>
                <td className='Active'>Active <span style={{color:'#7A7D7E'}}>Yearly</span></td>
               
                <td>
                  <Link href="/admin/manufacturerssuppliers/manufacturerssuppliersdetails">
                  <i className="fas fa-external-link-alt" style={{color:'black'}}></i>
                </Link>
                </td>
              </tr>

              <tr >
                <td>#1</td>
                <td>Faiz Iqbal</td>
                <td>faiziqbal@gmail.com</td>
                <td>
                0000000000
                </td>
                <td>783737131222</td>
                <td>
                FarmFresh Supplies..	
                </td>
                <td className='Inactive'>Inactive <span style={{color:'#7A7D7E'}}></span></td>
                <td>
                  <Link href="/admin/manufacturerssuppliers/manufacturerssuppliersdetails">
                  <i className="fas fa-external-link-alt" style={{color:'black'}}></i>
                </Link>
                </td>
              </tr>

              <tr >
                <td>#1</td>
                <td>Faiz Iqbal</td>
                <td>faiziqbal@gmail.com</td>
                <td>
                0000000000
                </td>
                <td>783737131222</td>
                <td>
                FarmFresh Supplies..	
                </td>
                <td className='Inactive'>Inactive <span style={{color:'#7A7D7E'}}></span></td>
                <td>
                  <Link href="/admin/manufacturerssuppliers/manufacturerssuppliersdetails">
                  <i className="fas fa-external-link-alt" style={{color:'black'}}></i>
                </Link>
                </td>
              </tr>

              <tr >
                <td>#1</td>
                <td>Faiz Iqbal</td>
                <td>faiziqbal@gmail.com</td>
                <td>
                0000000000
                </td>
                <td>783737131222</td>
                <td>
                FarmFresh Supplies..	
                </td>
                <td className='Active'>Active <span style={{color:'#7A7D7E'}}>Monthly</span></td>
                <td>
                  <Link href="/admin/manufacturerssuppliers/manufacturerssuppliersdetails">
                  <i className="fas fa-external-link-alt" style={{color:'black'}}></i>
                </Link>
                </td>
              </tr>

              <tr >
                <td>#1</td>
                <td>Faiz Iqbal</td>
                <td>faiziqbal@gmail.com</td>
                <td>
                0000000000
                </td>
                <td>783737131222</td>
                <td>
                FarmFresh Supplies..	
                </td>
                <td className='Active'>Active <span style={{color:'#7A7D7E'}}>Monthly</span></td>
                <td>
                  <Link href="/admin/manufacturerssuppliers/manufacturerssuppliersdetails">
                  <i className="fas fa-external-link-alt" style={{color:'black'}}></i>
                </Link>
                </td>
              </tr>

              <tr >
                <td>#1</td>
                <td>Faiz Iqbal</td>
                <td>faiziqbal@gmail.com</td>
                <td>
                0000000000
                </td>
                <td>783737131222</td>
                <td>
                FarmFresh Supplies..	
                </td>
                <td className='Active'>Active <span style={{color:'#7A7D7E'}}>Yearly</span></td>
                <td>
                  <Link href="/admin/manufacturerssuppliers/manufacturerssuppliersdetails">
                  <i className="fas fa-external-link-alt" style={{color:'black'}}></i>
                </Link>
                </td>
              </tr>
             {/* ))} */}
          </tbody>
        </table>
      </div>
    </div>
  );
}


