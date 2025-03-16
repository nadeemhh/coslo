'use client'
import './page.css'
import Link from 'next/link'
import { useState,useEffect } from "react";
import extractDate from '../../component/extdate.js';

export default function page() {
  const [data,setdata] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchquery, setsearchquery] = useState([]);
 
   const handledata = () => {
      
   
     document.querySelector('.loaderoverlay').style.display='flex';
 
    const token = localStorage.getItem('token');
    let filter = `${searchquery.length ? `&${searchquery[0]}${searchquery[1]}` : ''}`;

 
     fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/order/cancel/requests?page=${page}&limit=25${filter}`, {
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
        if (data.data.length === 0) {
          setHasMore(false);

          if(page!==1){ setPage((prevPage) => prevPage - 1);}
          setdata(data.data);

          console.log( hasMore,page)
        } else {
          console.log(data)
          setdata(data.data);
        }

            document.querySelector('.loaderoverlay').style.display='none';
        
       })
       .catch((err) => {
         document.querySelector('.loaderoverlay').style.display='none';
         console.log(err)
       });
   };
 

   useEffect(() => {
    handledata();
  }, [page,searchquery]);


  const nextPage = () => {
   setPage((prevPage) => prevPage + 1);
  
 };

 const prevPage = () => {
   setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));
   setHasMore(true);
 };


 const handleFilterChange = (event) => {
   const selectedOption = event.target.options[event.target.selectedIndex]; // Get selected <option>
   const selectedName = selectedOption.getAttribute("name"); // Get 'name' attribute
   const selectedValue = event.target.value;
   
   // setsearchquery((prev) => [...prev, [selectedName, selectedValue]]);
   setsearchquery([`${selectedName}=`, selectedValue]);
 
 };


 

  return (
    <div className="orders-container">
         <div className="header">
       
        <h3>Order Cancel Requests</h3>
     
      </div>
      
      {/* <div style={{display:'flex',justifyContent:'space-between',margin:'20px'}}>
      <div style={{textAlign:'left'}}>
        <button style={{textAlign:'left',border:'1px solid black',backgroundColor:'white',padding:'5px 10px'}}>
      
        <i className="fas fa-filter" style={{marginRight:'10px'}}></i>
        
          
      <select name="" id="" style={{border:'none'}}>
        <option value="">Filter by Status</option>
        <option value="">Completed</option>
        <option value="">Pending</option>
      </select>
      </button>
      </div>
      
      <DateRangePicker/>
      </div> */}
      
      <div className="table-wrapper">
        <table className="orders-table">
          <thead>
            <tr>
              <th>##</th>
              <th>Buyer Name</th>
              <th>Seller Name</th>
              <th>Date</th>
              <th>Payment Method</th>
              <th>Refund Amount</th>
              <th>Refund Status</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {data.map((order, index) => (
              
              <tr key={index}>
                  <td>#{index + 1}</td>
                <td>{order.customerName}</td>
                <td>{order.sellerName}</td>
                <td>{extractDate(order.cancelledAt)}</td>
                <td>
                ₹ {order.paymentMethod}
                </td>
                <td>
                ₹ {order.refundAmount}
                </td>
                <td>
                {order.refundStatus}
                </td>
                <td>
                  <Link href={`/supplier/cancelorders/canceldetails?id=${order.requestId}`}>
                  <i className="fas fa-external-link-alt" style={{color:'black'}}></i>
                </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      
      <div className="pagination">
       <span className="pre" onClick={prevPage} style={{ cursor: "pointer", opacity:  page === 0 ? 0.5 : 1 }}>
        <i className="fas fa-arrow-left"></i> Previous
      </span>

      <span className="page-number">Page {page}</span>

    { hasMore && <span className="next" onClick={nextPage} style={{ cursor: "pointer" }}>
        Next <i className="fas fa-arrow-right"></i>
      </span>}
      </div>

    </div>
  );
}


