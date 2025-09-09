'use client'
import '../mylayout.css'
import './page.css'
import Link from 'next/link';
import { useState,useEffect } from "react";
import extractDate from '../../component/extdate.js';
import DateRangePicker from '../../component/DateRangePicker.js';

export default function page() {
  
  const [deliveryType, setDeliveryType] = useState("");
  const [filterbydeliveryType, setfilterbydeliveryType] = useState(false);
   const [data,setdata] = useState([]);
   const [page, setPage] = useState(1);
   const [hasMore, setHasMore] = useState(true);
   const [searchquery, setsearchquery] = useState([]);

     const handledata = () => {
        
       document.querySelector('.loaderoverlay').style.display='flex';
   
      const token = localStorage.getItem('token');
   
   
      let filter = filterbydeliveryType ? `${searchquery.length ? `&deliveryType=${deliveryType}&${searchquery[0]}${searchquery[1]}` : ''}` :`${searchquery.length ? `&${searchquery[0]}${searchquery[1]}` : ''}`;

       fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/service/seller/orders?page=${page}&limit=25${filter}`, {
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
    data=data.data;
          if (data.orders.length === 0) {
            setHasMore(false);

            if(page!==1){ setPage((prevPage) => prevPage - 1);}
            setdata(data.orders);

            console.log( hasMore,page)
          } else {
            console.log(data)
            setdata(data.orders);
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

console.log(searchquery)
 


  return (
    <div className="orders-container">
      <h3 style={{textAlign:'left'}}>Orders</h3>


      <div style={{display:'flex',justifyContent:'space-between',margin:'20px'}}>

      <div style={{textAlign:'left'}}>

        <button style={{textAlign:'left',border:'1px solid black',backgroundColor:'white',padding:'5px 10px'}}>
      
        <i className="fas fa-filter" style={{marginRight:'10px'}}></i>
        
          
      
        <select name="status" id="status" style={{ border: "none" }} onChange={(e)=>{
          setfilterbydeliveryType(true)
          handleFilterChange(e)
          }}>
        <option value="">Filter by Delivery Status</option>

        <option value="PENDING" name="status">PENDING</option>
        <option value="PROCESSING" name="status">PROCESSING</option>
        <option value="READY_TO_SHIP" name="status">READY_TO_SHIP</option>
        <option value="SHIPPED" name="status">SHIPPED</option>
        <option value="OUT_FOR_DELIVERY" name="status">OUT_FOR_DELIVERY</option>
        <option value="DELIVERED" name="status">DELIVERED</option>
        <option value="FAILED" name="status">FAILED</option>
        <option value="CANCELLED" name="status">CANCELLED</option>
      </select>

      </button>

  

&nbsp;
      <button style={{textAlign:'left',border:'1px solid black',backgroundColor:'white',padding:'5px 10px'}}>
      
        <i className="fas fa-filter" style={{marginRight:'10px'}}></i>
        
          
      <select name="" id="" style={{border:'none'}} onChange={(e)=>{
          setfilterbydeliveryType(false)
          handleFilterChange(e)
          }}>
        <option value="">Filter by Payment Status</option>
        <option value="RECEIVED" name="paymentStatus">RECEIVED</option>
        <option value="PENDING" name="paymentStatus">PENDING</option>
      </select>
      </button>

      <button style={{textAlign:'left',border:'1px solid black',backgroundColor:'white',padding:'5px 10px',margin:'5px'}}>
      
        <i className="fas fa-filter" style={{marginRight:'10px'}}></i>
        
          
      <select name="" id="" style={{border:'none'}} onChange={(e)=>{
          setfilterbydeliveryType(false)
          handleFilterChange(e)
          }}>
        <option value="">Filter by Payment Type</option>
        <option value="ONLINE" name="paymentType">Online</option>
        <option value="COD" name="paymentType">COD</option>
      </select>
      </button>

      {searchquery.length > 0 && <button style={{textAlign:'left',margin:'20px',border:'1px solid black',backgroundColor:'red',padding:'5px 10px',color:'white',border:'none',borderRadius:'5px'}} onClick={()=>{location.reload();}}>Remove Filters</button>}

      </div>
      
      <DateRangePicker setsearchquery={setsearchquery}/>
      </div>

      <div className="table-wrapper">
        <table className="orders-table">
          <thead>
            <tr>
              <th>##</th>
              <th>Date</th>
              <th>Buyer Name</th>
              <th>Phone Number</th>
              <th>Service Name</th>
              <th>Payment Type</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((order, index) => (
              <tr key={index}>
                <td>#{index + 1}</td>
                <td>{extractDate(order.createdAt||"2025-02-21T17:30:17.072Z")}</td>
                <td>{order.orderId.buyer.name}</td>
                <td>{order.orderId.buyer.phone}</td>
                <td>
                  {order.items[0].productName}
                </td>
                <td>{order.paymentDetails.method}</td>
                <td>₹ {order.finalAmount.toFixed(2)}</td>
                <td>
                <Link href={`/supplier/serviceorders/order-details?oid=${order.orderId._id}`}>
                <img src="\icons\editp.svg" alt="" />
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

