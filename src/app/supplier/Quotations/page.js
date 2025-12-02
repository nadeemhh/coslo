'use client'
import './page.css'
import Link from 'next/link'
import { useState,useEffect } from "react";
import DateRangePicker from '../../component/DateRangePicker.js';
import extractDate from '../../component/extdate.js';

export default function page() {
  const [data,setdata] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
    const [productType, setproductType] = useState('');
  const [searchquery, setsearchquery] = useState([]);
 
   const handledata = () => {
   
     document.querySelector('.loaderoverlay').style.display='flex';
 
    const token = localStorage.getItem('token');

    let filter = `${searchquery.length ? `&${searchquery[0]}${searchquery[1]}` : ''}`;

 
     fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/quotation/?page=${page}&limit=25${filter}`, {
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
         alert(err.message)
         console.log(err)
       });
   };
 
   useEffect(() => {
    handledata();

let str = localStorage.getItem('productType');
str=str.charAt(0).toUpperCase() + str.slice(1)
    setproductType(str)


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
       
        <h3>Quotations</h3>
     
      </div>
      
      <div style={{display:'flex',justifyContent:'space-between',flexWrap:'wrap',gap:'20px'}}>
      <div style={{textAlign:'left'}}>
        <button style={{textAlign:'left',border:'1px solid black',backgroundColor:'white',padding:'5px 10px'}}>
      
        <i className="fas fa-filter" style={{marginRight:'10px'}}></i>
        
          
      <select name="" id="" style={{border:'none'}}  onChange={(e)=>{
    
          handleFilterChange(e)
          }}>
        <option value="">Filter by Status</option>
        <option value="completed" name="status">completed</option>
        <option value="pending" name="status">pending</option>
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
              <th>Name</th>
              <th>Date</th>
              <th>Email</th>
              <th>Phone</th>
              <th>{productType}</th>
              <th>Status</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {data.map((order, index) => (
              
              <tr key={index}>
                  <td>#{index + 1}</td>
                <td>{order.buyer}</td>
                <td>{extractDate(order.date)}</td>
                <td>
                    {order.email || 'Email not provided'}
                </td>
                <td>
                    {order.phone || 'phone not provided'}
                </td>
                <td>
                    {order.product}
                </td>
                <td className={order.status}>{order.status}</td>
                <td>
                  <Link href={`/supplier/Quotations/Quotations-details?id=${order.id}`}>
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

