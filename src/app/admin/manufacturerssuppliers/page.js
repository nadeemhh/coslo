'use client'
import './page.css'
import Link from 'next/link'
import { useState,useEffect } from "react";


export default function page() {
  const [data,setdata] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

   const [confirmationOpen, setconfirmationOpen] = useState(false);
   const [selectedId, setSelectedId] = useState(null);
 
   const toggleconfirmation = (id = null) => {
     setSelectedId(id);
     setconfirmationOpen(!confirmationOpen);
   };
  
 
 
    const handledata = () => {
      
   
       document.querySelector('.loaderoverlay').style.display='flex';
   
      const token = localStorage.getItem('token');
   
   
       fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/seller/?page=${page}&limit=25`, {
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

          if (data.sellers.length === 0) {
            setHasMore(false);
  
            if(page!==1){ setPage((prevPage) => prevPage - 1);}
            setdata(data.sellers);
  
            console.log( hasMore,page)
          } else {
            console.log(data)
            setdata(data.sellers);
          }

               console.log(data)

              document.querySelector('.loaderoverlay').style.display='none';
          
         })
         .catch((err) => {
           document.querySelector('.loaderoverlay').style.display='none';
           console.log(err)
         });
     };
   
    
     const handlesearch = (keyword) => {
      setSearchTerm(keyword);

      if (keyword.trim() === "") {
        handledata(); // Reload all data if search is cleared
        return;
      }

      
  
     const token = localStorage.getItem('token');
  
  
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/seller/search?searchTerm=${keyword}`, {
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
              setdata([...data])
          // Successfully logged in
         // window.location.href = '/Employee/Onboarding';
         
        })
        .catch((err) => {
          console.log(err)
        });
    };
  

       useEffect(() => {
    handledata();
  }, [page]);


  const nextPage = () => {
    setPage((prevPage) => prevPage + 1);
   
  };
 
  const prevPage = () => {
    setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));
    setHasMore(true);
  };

 
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
      <input type="text" placeholder='Search by Name, Email' style={{border:'none',outline:'none',backgroundColor:'#F4F7FB'}} onChange={(e) => handlesearch(e.target.value)}/>
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
            {data.length > 0 ? (
              data.map((seller, index) => (
                <tr  key={seller._id || index}>
                  <td>#{index + 1}</td>
                  <td>{seller.name}</td>
                  <td>{seller.email}</td>
                  <td>{seller.phone}</td>
                  <td>{seller.gstNumber}</td>
                  <td>{seller.businessName}</td>
                  {/* <td className={seller.status === 'APPROVED' ? 'Active' : 'Inactive'}>
                  Active <span style={{ color: '#7A7D7E' }}>{seller.subscriptionPlan}</span>
                  </td> */}
                  <td>
                 {seller.subscriptionPlan}
                  </td>
                  <td>
                    <Link href={`/admin/manufacturerssuppliers/manufacturerssuppliersdetails/?id=${seller._id}`}>
                      <i className="fas fa-external-link-alt" style={{ color: 'black' }}></i>
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" style={{ textAlign: 'center' }}>No data available</td>
              </tr>
            )}
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


