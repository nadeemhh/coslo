'use client'
import './page.css'
import Link from 'next/link'
import { useState,useEffect } from "react";


export default function page() {
  
  const [data,setdata] = useState([]);

  const handledata = () => {
     
  
    document.querySelector('.loaderoverlay').style.display='flex';

   const token = localStorage.getItem('token');


    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/apprating/`, {
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
            console.log(data.appRatings)
            setdata([...data.appRatings])
           document.querySelector('.loaderoverlay').style.display='none';
        // Successfully logged in
       // window.location.href = '/Employee/Onboarding';
       
      })
      .catch((err) => {
        document.querySelector('.loaderoverlay').style.display='none';
        console.log(err)
      });
  };

 useEffect(() => {
      handledata();
    },[]);

    const deleteFunc = (id) => {
      console.log(id)
      if (!id) return;
  
      const token = localStorage.getItem('token');

      fetch(`http://localhost:3000/apprating/${id}`, {
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
          alert(data.message)
        })
        .catch((err) => {
          console.log(err);
        });
    };

    function extractDate(isoString) {
      if (!isoString) return null;
      
      try {
          return isoString.split("T")[0]; // Extracts the date portion before 'T'
      } catch (error) {
          console.error("Invalid ISO string format", error);
          return null;
      }
  }

  return (
    <div className="orders-container">
         <div className="header">
       
        <h3>Feedback</h3>
     
      </div>
      
      <div style={{display:'flex',justifyContent:'space-between',margin:'20px'}}>
      {/* <div style={{textAlign:'left'}}>
        <button style={{textAlign:'left',border:'1px solid black',backgroundColor:'white',padding:'5px 10px'}}>
      
        <i className="fas fa-filter" style={{marginRight:'10px'}}></i>
        
          
      <select name="" id="" style={{border:'none'}}>
        <option value="">Filter by Status</option>
        <option value="">Completed</option>
        <option value="">Pending</option>
      </select>
      </button>
      </div> */}
      
      <DateRangePicker/>
      </div>
      
      <div className="table-wrapper">
        <table className="orders-table">
          <thead>
            <tr>
              <th>##</th>
              <th>Name</th>
              <th>Date</th>
              <th>Email</th>
              <th>Rating</th>
              <th>Feedback</th>
              <th>Actions</th>
              {/* <th>Details</th> */}
            </tr>
          </thead>
          <tbody>
            {data.map((data, index) => (
              
              <tr key={index}>
                 <td>#{index + 1}</td>
                <td>{data.user.name}</td>
                <td>{extractDate(data.createdAt)}</td>
                <td>
                    {data.user.email}
                </td>
                <td>{data.rating}/5</td>
                <td>{data.feedback}</td>
                <td>
                  <img src="\icons\deletep.svg" alt="" style={{cursor:'pointer'}}  onClick={() => deleteFunc(data._id)}/>
                </td>
                {/* <td>
                  <Link href="/admin/feedback/feedback-details">
                  <i className="fas fa-external-link-alt" style={{color:'black'}}></i>
                </Link>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}



const DateRangePicker = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isRangeSelected, setIsRangeSelected] = useState(false);

  const handleApply = () => {
    console.log(`Selected Range: Start Date - ${startDate}, End Date - ${endDate}`);
    setIsRangeSelected(true);
  };

  const handleClear = () => {
    setStartDate("");
    setEndDate("");
    setIsRangeSelected(false);
  };

  const handleDateChange = (type, value) => {
    if (type === "start") setStartDate(value);
    if (type === "end") setEndDate(value);

    if (startDate && endDate) {
      setIsRangeSelected(true);
    }
  };

  return (
    <div className="date-range-picker">
      <label htmlFor="">Start Date</label>
      <div className="date-input">
        
        <input
          type="date"
          placeholder="Start Date"
          value={startDate}
          onChange={(e) => handleDateChange("start", e.target.value)}
        />
      </div>
      <label htmlFor="">End Date</label>
      <div className="date-input">
      
        <input
          type="date"
          placeholder="End Date"
          value={endDate}
          onChange={(e) => handleDateChange("end", e.target.value)}
        />
      </div>
      {!isRangeSelected && (
        <button className="apply-button" onClick={handleApply}>
          Apply
        </button>
      )}
      {isRangeSelected && (
        <button className="clear-button" onClick={handleClear}>
          Clear
        </button>
      )}
    </div>
  );

};
