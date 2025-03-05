'use client'
import './page.css'
import Link from 'next/link'
import { useState ,useEffect} from "react";


export default function page() {
  const [data,setdata] = useState([]);

  const [cmargin,setcmargin] = useState('');
  const [catid,setcatid] = useState('');

  const handledata = () => {
       
    
    document.querySelector('.loaderoverlay').style.display='flex';

   const token = localStorage.getItem('token');


    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/coslo-margin/`, {
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
           document.querySelector('.loaderoverlay').style.display='none';
   
       
      })
      .catch((err) => {
        document.querySelector('.loaderoverlay').style.display='none';
        console.log(err)
      });
  };



      useEffect(() => {
          handledata();
        },[]);
    

        const updatemargin = (marginPercentage,categoryId) => {

         if(cmargin ===''){return;}
        
        document.querySelector('.loaderoverlay').style.display='flex';
        
        
          const userData = {
            categoryId,
            marginPercentage
          };
          console.log(userData);
          

          const token = localStorage.getItem('token');
        
          fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/coslo-margin/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              ...(token && { Authorization: `Bearer ${token}` }), // Add token if it exists
            },
            body: JSON.stringify(userData),
          })
            .then((response) => {
              if (response.ok) {
                return response.json();
              } else {
                return response.json().then((errorData) => {
                  throw new Error(errorData.error || 'Failed. Please try again.');
                });
              }
            })
            .then((data) => {

              setcmargin('')
              setcatid('')
              handledata();
                  console.log(data)
                  document.querySelector('.loaderoverlay').style.display='none';
             
            })
            .catch((err) => {
            
              alert(err.error);
              document.querySelector('.loaderoverlay').style.display='none';
            });
        };


  return (
    <div className="orders-container">
         <div className="header">
       
        <h3>Set Profit Margin</h3>
     
      </div>
      

      {data.map((data, index) => (

      <div
  style={{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f0f8ff',
    borderRadius: '10px',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '600px',
    margin: '20px',
    padding:'5px',
  }}
  key={index}
>

 <div className="product-category">

 <div className="category-name-image">
      <img src={data.category.image} alt=""/>
    </div>

    <div className="category-name-product">
      <p style={{fontSize:'19px'}}>{data.category.name}</p>
    </div>

    </div>


  <form
    style={{
      textAlign: 'left',
      flex: 1,
      marginLeft: '20px',
      backgroundColor: 'white',
      padding: '18px',
      borderRadius: '10px',
    }}

    onSubmit={(e)=>{
      e.preventDefault();
      updatemargin(cmargin,catid)}}
  >
    <p>
      Current Margin <strong>{data.marginPercentage}%</strong>
    </p>
    <input
      style={{
        padding: '10px',
        fontSize: '16px',
        borderRadius: '5px',
        border: '1px solid #878787',
        margin: '10px 0',
        width: '100%',
      }}
      type="number"
      categoryid={data.category._id}
      placeholder={data.marginPercentage}
      onChange={(e)=>{
        setcmargin(e.target.value)
        setcatid(e.target.getAttribute('categoryid'))
      }}

      required
    />
    <button
      style={{
        padding: '7px 14px',
        fontSize: '16px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
      }}

      type='submit'
     
    >
      Update Margin <i className="fa fa-arrow-right" style={{ fontSize: '16px' }}></i>
    </button>
  </form>
</div>

  ))}


    </div>
  );
}


