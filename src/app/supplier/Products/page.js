'use client'
import '../mylayout.css'
import './page.css'
import Link from 'next/link';
import  { useState,useEffect } from "react";
  import AttributeForm from '../../component/AttributeForm.js';

export default function page() {
  const [data,setdata] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchquery, setsearchquery] = useState([]);

  const [confirmationOpen, setconfirmationOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const toggleconfirmation = (id = null) => {
      setSelectedId(id);
    setconfirmationOpen(!confirmationOpen);
   console.log(id)
  };

  
     const handledata = () => {
      console.log(hasMore)
      // if (hasMore===false) return; // Stop extra calls
      
    
        document.querySelector('.loaderoverlay').style.display='flex';
    
       const token = localStorage.getItem('token');
    
       console.log('called')
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/product/foradmin?page=${page}&limit=25${searchquery.length ? `&${encodeURIComponent(searchquery[0])}=${encodeURIComponent(searchquery[1])}` : ''}`, {
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
              console.log(data.data)
              setdata(data.data);
            }

               document.querySelector('.loaderoverlay').style.display='none';
           
           
          })
          .catch((err) => {
            document.querySelector('.loaderoverlay').style.display='none';
            console.log(err)
          })
      };
    
      const deleteFunc = (id) => {
        console.log(id)
        if (!id) return;
        
        const token = localStorage.getItem('token');
  
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/product/delete/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }), // Add token if it exists
          },
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Failed to delete the product.');
            }
            return response.json();
          })
          .then((data) => {
            console.log(data)
            //alert(data.message)
            setdata((prevData) => prevData.filter((item) => item._id !== id));
            toggleconfirmation();
          })
          .catch((err) => {
            console.log(err);
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


      const handleActive = async (id) => {

        console.log(id);
        const token = localStorage.getItem('token');
    
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/product/togglevisibility/${id}`,
            {
              method: "PUT",
              headers: {
                ...(token && { Authorization: `Bearer ${token}` }),
              },
            }
          );
    
          const result = await response.json();
    
          if (response.ok) {
            alert("Product visibility toggled successfully!");
            setdata((prevData) =>
              prevData.map((item) =>
                item._id === id ? { ...item, isActive: !item.isActive } : item
              )
            );
          } else {
            alert(`Error: ${result.message}`);
          }
        } catch (error) {
          console.error("Error toggling visibility:", error);
          alert("Failed to update visibility. Please try again.");
        }
      };


      const handleFilterChange = (event) => {
        setPage(1)
        const selectedOption = event.target.options[event.target.selectedIndex]; // Get selected <option>
        const selectedName = selectedOption.getAttribute("name"); // Get 'name' attribute
        const selectedValue = event.target.value;
        
        // setsearchquery((prev) => [...prev, [selectedName, selectedValue]]);
        setsearchquery([selectedName, selectedValue]);
      
      };

      console.log(searchquery)
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

              <AttributeForm/>

        <button style={{textAlign:'left',margin:'20px',border:'1px solid black',backgroundColor:'white',padding:'5px 10px'}}>
      
        <i className="fas fa-filter" style={{marginRight:'10px'}}></i>
        
          
      <select name="" id="" style={{border:'none'}} onChange={handleFilterChange}>
        <option value="">Filters</option>
        <option value="low_stock" name="stockStatus">Low Stock</option>
        <option value="asc" name="sortOrder">Old First</option>
        <option value="active" name="visibility">Visible</option>
        <option value="desc" name="sortOrder">Most Recent</option>

      </select>
      </button>

      {/* <button style={{textAlign:'left',margin:'20px',border:'1px solid black',backgroundColor:'white',padding:'5px 10px'}}>
      
      <i className="fas fa-sort" style={{marginRight:'10px'}}></i>
      
        
    <select name="" id="" style={{border:'none'}}>
      <option value="" >Sort</option>
    </select>
    </button> */}


   {searchquery.length > 0 && <button style={{textAlign:'left',margin:'20px',border:'1px solid black',backgroundColor:'red',padding:'5px 10px',color:'white',border:'none',borderRadius:'5px'}} onClick={()=>{location.reload();}}>Remove Filters</button>}

      </div>
      
      <div className="table-wrapper">
        <table className="orders-table">
          <thead>
            <tr>
            <th>##</th>
              <th>Thumbnail</th>
              <th>Product Name</th>
              <th>Category Name</th>
              <th>Price/Stock</th>
              <th>Actions</th>
              <th>Visibility</th>
            </tr>
          </thead>
          <tbody>
            {data.map((data, index) => (
              <tr key={index}>
                <td>#{index + 1}</td>
                <td><img src={data.productImage} width={'80px'} height={'80px'} style={{borderRadius: '50%',objectFit:'cover'}}  alt="" /></td>
                <td>{data.productName}</td>
                <td>{data.categoryName}</td>
                <td>
                  {data.variations.map((vdata,i)=>{
                    
                    return(
                  <div key={i}>

                  <p style={{backgroundColor:vdata.stock !== 0 ?'#D9F0FF':'rgb(255 158 158)',padding:'5px',borderRadius:'5px',marginBottom:'5px'}}>{i+1}. Net Price :   <strong>{vdata.mrp}/-</strong>   |  Stock : <strong> {vdata.stock} Units</strong></p>

                  </div>
                  )
                })}

                </td>
                <td>
                <a href={`/supplier/Products/add-update-product?pid=${data._id}`}>
                  <img src="\icons\editp.svg" alt=""  style={{cursor:'pointer'}}/>
             </a>
                  &nbsp;
                  &nbsp;
                  <img src="\icons\deletep.svg" alt="" style={{cursor:'pointer'}}  onClick={() => toggleconfirmation(data._id)}/>
                </td>
                <td>

                <label className="switch">
  <input type="checkbox"   checked={data.isActive}
                      onChange={() => handleActive(data._id)}/>
  <span className="slider round"></span>
</label>

                  
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
        <button className="button yes-button" onClick={() => deleteFunc(selectedId)}>Yes</button>
      </div>
    </div>
             </div>
      )}
    </div>
  );
}

