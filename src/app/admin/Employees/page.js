'use client'
import '../mylayout.css'
import './page.css'
import Link from 'next/link';
import  { useState } from "react";

export default function page() {

  const [confirmationOpen, setconfirmationOpen] = useState(false);

  const toggleconfirmation = () => {
  
    setconfirmationOpen(!confirmationOpen);
  };
  const orders = [
    { id: "#1", Name: "Faiz Iqbal", Email: "faiziqbal@gmail.com"},
    { id: "#2", Name: "Faiz Iqbal", Email: "faiziqbal@gmail.com"},
    { id: "#3", Name: "Faiz Iqbal", Email: "faiziqbal@gmail.com"},
    { id: "#4", Name: "Faiz Iqbal", Email: "faiziqbal@gmail.com"},
    { id: "#5", Name: "Faiz Iqbal", Email: "faiziqbal@gmail.com"},
    { id: "#6", Name: "Faiz Iqbal", Email: "faiziqbal@gmail.com"},
  ];

  return (
    <div className="orders-container">
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
      <h3>Employees</h3>

      
      <Link href="/admin/Employees/newemployee">
      <button className="AddProduct">
      Add Employee &nbsp; <i className="fas fa-plus" style={{marginRight:'10px'}}></i>
      </button>
      </Link>

      </div>

     
      
      <div className="table-wrapper">
        <table className="orders-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index}>
                <td>{order.id}</td>
                <td>{order.Name}</td>
                <td>{order.Email}</td>
                <td>
                <Link href="/admin/Employees/newemployee">
                  <img src="\icons\editp.svg" alt=""  style={{cursor:'pointer'}}/>
             </Link>
                </td>
             
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {confirmationOpen && (
        <div className="modal-overlay">
 
           <div className="confirmation-box">
      <div className="icon">
        {/* Replace the src below with the actual path to your image */}
        <img
          src="\icons\confar.png"
          alt="Icon"
          className="icon-image"
        />
      </div>
      <p className="message">Are you sure ?</p>
      <div className="button-group">
        <button className="button no-button" onClick={toggleconfirmation}>No</button>
        <button className="button yes-button">Yes</button>
      </div>
    </div>
             </div>
      )}
    </div>
  );
}

