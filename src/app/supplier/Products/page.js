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
    { id: "#2983928JH", date: "27th Oct 2024", buyer: "Faiz Iqbal", status: "● Shipped", total: "₹ 87380/-" },
    { id: "#2983928JH", date: "27th Oct 2024", buyer: "Faiz Iqbal", status: "● Shipped", total: "₹ 87380/-" },
    { id: "#2983928JH", date: "27th Oct 2024", buyer: "Faiz Iqbal", status: "● Shipped", total: "₹ 87380/-" },
    { id: "#2983928JH", date: "27th Oct 2024", buyer: "Faiz Iqbal", status: "● Shipped", total: "₹ 87380/-" },
    { id: "#2983928JH", date: "27th Oct 2024", buyer: "Faiz Iqbal", status: "● Shipped", total: "₹ 87380/-" },
    { id: "#2983928JH", date: "27th Oct 2024", buyer: "Faiz Iqbal", status: "● Shipped", total: "₹ 87380/-" },
  ];

  return (
    <div className="orders-container">
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
      <h3>Products</h3>

      
      <Link href="/supplier/Products/add-update-product">
      <button className="AddProduct">
        Add Product &nbsp; <i className="fas fa-plus" style={{marginRight:'10px'}}></i>
      </button>
      </Link>

      </div>

      <div style={{textAlign:'left',marginBottom:'20px'}}>
        <button style={{textAlign:'left',margin:'20px',border:'1px solid black',backgroundColor:'white',padding:'5px 10px'}}>
      
        <i className="fas fa-filter" style={{marginRight:'10px'}}></i>
        
          
      <select name="" id="" style={{border:'none'}}>
        <option value="">Filters</option>
        <option value="">Low Stock</option>
        <option value="">Old First</option>
        <option value="">Not Visible</option>
        <option value="">Most Recent</option>
      </select>
      </button>

      <button style={{textAlign:'left',margin:'20px',border:'1px solid black',backgroundColor:'white',padding:'5px 10px'}}>
      
      <i className="fas fa-sort" style={{marginRight:'10px'}}></i>
      
        
    <select name="" id="" style={{border:'none'}}>
      <option value="" >Sort</option>
    </select>
    </button>
      </div>
      
      <div className="table-wrapper">
        <table className="orders-table">
          <thead>
            <tr>
              <th>Thumbnail</th>
              <th>Name</th>
              <th>Price/Stock</th>
              <th>Actions</th>
              <th>Visibility</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index}>
                <td><img src="\images\thumbnail.png" alt="" /></td>
                <td>#1527732
Ultra pro max headphones
with ultra sound..</td>

                <td>
                  
                  <p style={{backgroundColor:'#D9F0FF',padding:'5px',borderRadius:'5px',marginBottom:'5px'}}>1. Net Price :   <span style={{color:'#1389F0'}}>₹1290/-</span>   |  Stock : <span style={{color:'#1389F0'}}> 250 Units</span></p>
                
                  <p style={{backgroundColor:'#D9F0FF',padding:'5px',borderRadius:'5px',marginBottom:'5px'}}>2. Net Price :   <span style={{color:'#1389F0'}}>₹1290/-</span>   |  Stock : <span style={{color:'#1389F0'}}> 250 Units</span></p>

                  <p style={{backgroundColor:'#F8EAEA',padding:'5px',borderRadius:'5px',marginBottom:'5px'}}>3. Net Price :   <span style={{color:'#EC5959'}}>₹1290/-</span>   |  Stock : <span style={{color:'#EC5959'}}> 250 Units</span></p>
                </td>
                <td>
                <Link href="/supplier/Products/add-update-product">
                  <img src="\icons\editp.svg" alt=""  style={{cursor:'pointer'}}/>
             </Link>
                  &nbsp;
                  &nbsp;
                  <img src="\icons\deletep.svg" alt="" style={{cursor:'pointer'}}   onClick={toggleconfirmation}/>
                </td>
                <td>

                <label className="switch">
  <input type="checkbox" />
  <span className="slider round"></span>
</label>

                  
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

