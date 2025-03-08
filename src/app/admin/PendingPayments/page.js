'use client'
import './page.css'
import Link from 'next/link'
import { useState,useEffect } from "react";
import extractDate from '../../component/extdate.js';

export default function page() {
  const [data,setdata] = useState([]);
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [sellersPaymentId, setSellersPaymentId] = useState([]);
 
  console.log( sellersPaymentId)

   const handledata = () => {
      
   
     document.querySelector('.loaderoverlay').style.display='flex';
 
    const token = localStorage.getItem('token');

     fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/seller-payment/admin/pending`, {
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
          setdata(data.data);
      

            document.querySelector('.loaderoverlay').style.display='none';
        
       })
       .catch((err) => {
         document.querySelector('.loaderoverlay').style.display='none';
         console.log(err)
       });
   };
 

   useEffect(() => {
    handledata();
  }, []);



  const submitData = () => {
    const paymentMethodSelect = document.querySelector('.peymentmethod');
  
    if (paymentMethodSelect.selectedIndex === 0) {
      alert("Please select a valid payment method.");
      return;
    }
  

     // Get the selected option's text
  const selectedPaymentMethod = paymentMethodSelect.options[paymentMethodSelect.selectedIndex].text;


    if (sellersPaymentId.length === 0) {
      alert("Please select at least one payment.");
      return;
    }

    document.querySelector('.loaderoverlay').style.display='flex';

    const token = localStorage.getItem('token');

    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/seller-payment/admin/process`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify({paymentIds: sellersPaymentId,paymentMethod:selectedPaymentMethod }),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
       alert(data.message);
        setSellersPaymentId([]); // Clear selection after submission
      location.reload();
      })
      .catch(error => {
        console.error("Error submitting payments:", error);
        document.querySelector('.loaderoverlay').style.display='none';
      });
  };

 

const handleCheckboxChange = (sellerPaymentId) => {
  setSellersPaymentId((prev) => {
    if (prev.includes(sellerPaymentId)) {
      return prev.filter(id => id !== sellerPaymentId);
    } else {
      return [...prev, sellerPaymentId];
    }
  });
};


const handleSelectAll = () => {
  if (isAllSelected) {
    setSellersPaymentId([]); // Clear all selected IDs
  } else {
    const allIds = data.map(detail => detail.sellerPaymentId);
    setSellersPaymentId(allIds); // Add all IDs
  }
  setIsAllSelected(!isAllSelected);
};

  return (
    <div className="orders-container">
         <div className="header">
       
        <h3>Pending Payments</h3>
     
      </div>
      
      <div style={{display:'flex',justifyContent:'space-between',margin:'20px'}}>
      <div style={{textAlign:'left'}}>
        <button style={{textAlign:'left',border:'1px solid black',backgroundColor:'white',padding:'5px 10px'}}>
          
      <select name="" id="" style={{border:'none'}} className='peymentmethod'>
        <option value="">payment method used</option>
        <option value="">UPI</option>
        <option value="">BANK TRANSFER</option>
        <option value="">OTHERS</option>
      </select>
      </button>

      <button style={{textAlign:'left',margin:'20px',border:'1px solid black',backgroundColor:'green',padding:'5px 10px',color:'white',border:'none',borderRadius:'5px'}} onClick={()=>{submitData()}}>Send Email</button>
      </div>
      
      </div>
      
      <div className="table-wrapper">
        <table className="orders-table">
          <thead>
            <tr>
              <th>##</th>
              <th>Select <input type="checkbox"  
                  style={{width:'15px',height:'15px'}}
                  onChange={handleSelectAll} 
                  checked={isAllSelected} 
                  /></th>
              <th>Seller Name</th>
              <th>Email</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Coslo Margin</th>
              <th>Seller Details</th>
            </tr>
          </thead>
          <tbody>
            {data.map((detail, index) => (
              
              <tr key={index}>
                  <td>#{index + 1}</td>
                  <td><input type="checkbox"  
                  style={{width:'15px',height:'15px'}}
                  onChange={() => handleCheckboxChange(detail.sellerPaymentId)}
                  checked={sellersPaymentId.includes(detail.sellerPaymentId)}
                  
                  />
                  </td>
                <td>{detail.seller.name}</td>
                <td>{detail.seller.email}</td>
                <td>{extractDate(detail.createdAt)}</td>
                <td>
                ₹ {detail.amount}
                </td>
                <td>{detail.status}</td>
                <td>{detail.cosloMargin}</td>
                <td>
                    <Link href={`/admin/manufacturerssuppliers/manufacturerssuppliersdetails/?id=${detail.seller.id}`}>
                      <i className="fas fa-external-link-alt" style={{ color: 'black' }}></i>
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


