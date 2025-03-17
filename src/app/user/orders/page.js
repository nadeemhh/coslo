'use client'
import './page.css'
import '../../component/component-css/cartcard.css'
import "../../component/component-css/ui.css";
import Link from 'next/link';
import {useState,useEffect} from 'react';
import extractDate from '../../component/extdate.js'
import { useInView } from "react-intersection-observer";
import scrollToElement from '../../component/scrollToElement.js'

export default function Page() {
  const [isdata,setisdata] = useState(false);
    const [data,setdata] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [searchquery, setsearchquery] = useState([]);
    const { ref, inView } = useInView({ threshold: 1, rootMargin: "50px" });

    const getdata = () => {

      document.querySelector('.loaderoverlay').style.display = 'flex';

      const token = localStorage.getItem('buyertoken');
  
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/order/buyer?page=${page}&limit=30`, {
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
             
              throw new Error(errorData.error || 'Failed');
            });
          }
        })
        .then((data) => {

              if (data.data.orders.length === 0) {
                              setHasMore(false);
                  
                              console.log( hasMore,page)
                            } else {
                              console.log(data)
                              setdata((pre)=>([...pre,...data.data.orders]));
                              setPage((prevPage) => prevPage + 1);
                            }

          console.log(data.data.orders)
       
          setisdata(true)
          document.querySelector('.loaderoverlay').style.display = 'none';
         
        })
        .catch((err) => {
          document.querySelector('.loaderoverlay').style.display = 'none';
          console.log(err)
          alert(err);
         
        });
    };

console.log(data)

 


const handleFilterChange = (event) => {
  setPage(1)
  const selectedOption = event.target.options[event.target.selectedIndex]; // Get selected <option>
  const selectedName = selectedOption.getAttribute("name"); // Get 'name' attribute
  const selectedValue = event.target.value;
  
  // setsearchquery((prev) => [...prev, [selectedName, selectedValue]]);
  setsearchquery([selectedName, selectedValue]);
 
};

    useEffect(() => {

      if(hasMore && inView && searchquery.length===0){getdata()}

   
    }, [inView]);

    console.log(searchquery)




    const getfilterdata = () => {

      document.querySelector('.loaderoverlay').style.display = 'flex';

      const token = localStorage.getItem('buyertoken');
  
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/order/buyer?${searchquery.length ? `${encodeURIComponent(searchquery[0])}=${encodeURIComponent(searchquery[1])}` : ''}`, {
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
             
              throw new Error(errorData.error || 'Failed');
            });
          }
        })
        .then((data) => {

          setdata(data.data.orders);

          console.log(data.data.orders)
       
          document.querySelector('.loaderoverlay').style.display = 'none';
         
        })
        .catch((err) => {
          document.querySelector('.loaderoverlay').style.display = 'none';
          console.log(err)
          alert(err);
         
        });
    };



    useEffect(() => {

    if(searchquery.length > 0){
      getfilterdata();
    }
    
  }, [searchquery]);

  return (
    <div className="ordersp">
      <div style={{display:'flex',justifyContent:'space-between'}}>
        <h2 className='ordertitle'>My Orders</h2>

        <div style={{display:'flex',flexDirection:'column-reverse',justifyContent:'flex-end'}}> 
            {searchquery.length > 0 && <button style={{textAlign:'left',margin:'20px',border:'1px solid black',backgroundColor:'red',padding:'5px 10px',color:'white',border:'none',borderRadius:'5px'}} onClick={()=>{location.reload();}}>Remove Filters</button>}
        
    
        <select name="" id="" style={{backgroundColor:'#0000ff00',padding:'5px',borderRadius:'5px'}} onChange={handleFilterChange}>
            <option value="">filter orders by days</option>
            <option value="30days" name="timeFilter">last 30 days</option>
            <option value="1year" name="timeFilter">last 1 year</option>
        </select>

        </div>
      </div>

      <div className='card-container22' style={{marginTop:"25px"}}>
      {data.map((order, i) => (   

<div style={{display:'flex',flexDirection:'column'}} className='ordp' key={i}> 

  <div style={{width:'100%',marginBottom:'20px',textAlign:'left'}}>
<p><strong>Final Amount:</strong> ₹{order.totalAmount}</p>
  <p><strong>Date:</strong> {extractDate(order.orderDate)}</p>
  </div>
  {order.subOrders.map((suborder, index) => {  
   
return (<div key={index} className='suborder'>

{suborder.items.map((subitems, index2) => (  
<div className="order-card22" key={index2}>

<img src={subitems.productImage} alt="Product" className="order-image22" />
<div className="order-details22">
  {/* <p><strong>Status:</strong> {order.status}</p> */}
  <p><strong>Product Name:</strong> {subitems.productName}</p>
  <p><strong>Amount:</strong> ₹{subitems.price}</p>
  <p><strong>Quantity:</strong> {subitems.quantity}</p>

</div>

</div>

))}

<Link href={`orders/order-details?oid=${suborder.subOrderId}`} className="cdt" style={{marginTop:'20px'}}>
Check Details
</Link>
</div>);
})}
  
</div>
       ))}

      </div>

    <div style={{width:'100%',display:'flex',justifyContent:'center',marginTop:'40px'}}>

    <div ref={ref} style={{ height: "10px",  }}></div>
</div>

    </div>
  )
}
