'use client'
import './page.css'
import Link from 'next/link'
import { useState } from "react";


export default function page() {
  const orders = [
    { id: "#872", date: "27th Oct 2024", buyer: "Faiz Iqbal", email: "faiziqbal@gmail.com", status: "Pending" },
    { id: "#872", date: "27th Oct 2024", buyer: "Faiz Iqbal", email: "faiziqbal@gmail.com", status:"Completed" },
    { id: "#872", date: "27th Oct 2024", buyer: "Faiz Iqbal", email: "faiziqbal@gmail.com", status: "Pending" },
    { id: "#872", date: "27th Oct 2024", buyer: "Faiz Iqbal", email: "faiziqbal@gmail.com", status: "Pending" },
    { id: "#872", date: "27th Oct 2024", buyer: "Faiz Iqbal", email: "faiziqbal@gmail.com", status: "Pending" },
    { id: "#872", date: "27th Oct 2024", buyer: "Faiz Iqbal", email: "faiziqbal@gmail.com", status: "Pending" },
    { id: "#872", date: "27th Oct 2024", buyer: "Faiz Iqbal", email: "faiziqbal@gmail.com", status: "Pending" },
    { id: "#872", date: "27th Oct 2024", buyer: "Faiz Iqbal", email: "faiziqbal@gmail.com", status: "Pending" },
    { id: "#872", date: "27th Oct 2024", buyer: "Faiz Iqbal", email: "faiziqbal@gmail.com", status: "Pending" },
    { id: "#872", date: "27th Oct 2024", buyer: "Faiz Iqbal", email: "faiziqbal@gmail.com", status: "Pending" },
  ];

  return (
    <div className="orders-container">
         <div className="header">
       
        <h3>Quotations</h3>
     
      </div>
      
      <div style={{display:'flex',justifyContent:'space-between',margin:'20px'}}>
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
      </div>
      
      <div className="table-wrapper">
        <table className="orders-table">
          <thead>
            <tr>
              <th>Sr No.</th>
              <th>Name</th>
              <th>Date</th>
              <th>Email</th>
              <th>Status</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              
              <tr key={index}>
                <td>{order.id}</td>
                <td>{order.buyer}</td>
                <td>{order.date}</td>
                <td>
                    {order.email}
                </td>
                <td className={order.status}>{order.status}</td>
                <td>
                  <Link href="/supplier/Quotations/Quotations-details">
                  <i className="fas fa-external-link-alt" style={{color:'black'}}></i>
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
