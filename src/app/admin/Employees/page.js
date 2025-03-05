'use client'
import '../mylayout.css'
import './page.css'
import Link from 'next/link';
import  { useState,useEffect } from "react";

export default function page() {

  const [data,setdata] = useState([]);

  const [confirmationOpen, setconfirmationOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const toggleconfirmation = (id = null) => {
    setSelectedId(id);
    setconfirmationOpen(!confirmationOpen);
  };
 


   const handledata = () => {
     
  
      document.querySelector('.loaderoverlay').style.display='flex';
  
     const token = localStorage.getItem('token');
  
  
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/employee/`, {
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
          // Successfully logged in
         // window.location.href = '/Employee/Onboarding';
         
        })
        .catch((err) => {
          document.querySelector('.loaderoverlay').style.display='none';
          console.log(err)
        });
    };
  
    const deleteFunc = (id) => {
      console.log(id)
      if (!id) return;
  
      const token = localStorage.getItem('token');

      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/employee/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }), // Add token if it exists
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to delete the employee.');
          }
          return response.json();
        })
        .then((data) => {
          console.log(data)
          setdata((prevData) => prevData.filter((item) => item._id !== id));
          toggleconfirmation();
        })
        .catch((err) => {
          console.log(err);
        });
    };
  
    useEffect(() => {
      handledata();
    },[]);


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
            {data.map((data, index) => (
              <tr key={index}>
                <td>#{index + 1}</td>
                <td>{data.name}</td>
                <td>{data.email}</td>
                <td>
                {/* <Link href={`/admin/Employees/newemployee/?employeeid=${data._id}`}>
                  <img src="\icons\editp.svg" alt=""  style={{cursor:'pointer'}}/>
                  </Link>
                  &nbsp; */}
                  <img src="\icons\deletep.svg" alt="" style={{cursor:'pointer'}}  onClick={() => toggleconfirmation(data._id)}/>
         
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
        <button className="button yes-button" onClick={() => deleteFunc(selectedId)}>Yes</button>
      </div>
    </div>
             </div>
      )}
    </div>
  );
}

