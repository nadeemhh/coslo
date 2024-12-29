'use client'
import '../mylayout.css'
import './page.css'
import Link from 'next/link';
import { useState } from "react";


export default function page() {

  const [deliveryType, setDeliveryType] = useState("");
  const [statusOptions, setStatusOptions] = useState([]);

  const handleDeliveryTypeChange = (e) => {
    const selectedType = e.target.value;
    setDeliveryType(selectedType);

    // Define the status options based on the selected delivery type
    if (selectedType === "In House") {
      setStatusOptions([
        "pending",
        "processing",
        "in transit",
        "delivered",
        "canceled",
        "failed",
        "returned",
      ]);
    } else if (selectedType === "Coslo") {
      setStatusOptions([
        "Pending",
        "Ready to ship",
        "Ready for pickup",
        "In transit",
        "Out for delivery",
        "Delivered",
        "Cancelled",
      ]);
    } else {
      setStatusOptions([]);
    }
  };


  const orders = [
    { id: "#2983928JH", date: "27th Oct 2024", buyer: "Faiz Iqbal", status: "● Shipped",paymenttype: "Online",paymentstatus: "Completed",deliverytype: "In House" , total: "₹ 87380/-",link:'/supplier/orders/order-details',HandledBy:'Coslo'},
    { id: "#2983928JH", date: "27th Oct 2024", buyer: "Faiz Iqbal", status: "● Shipped",paymenttype: "COD",paymentstatus: "Failed",deliverytype: "Coslo" , total: "₹ 87380/-",link:'/supplier/orders/order-details-demo',HandledBy:'Self'},
    { id: "#2983928JH", date: "27th Oct 2024", buyer: "Faiz Iqbal", status: "● Shipped",paymenttype: "Online",paymentstatus: "Completed",deliverytype: "In House" , total: "₹ 87380/-",link:'/supplier/orders/order-details',HandledBy:'Coslo'},
    { id: "#2983928JH", date: "27th Oct 2024", buyer: "Faiz Iqbal", status: "● Shipped",paymenttype: "COD",paymentstatus: "Failed",deliverytype: "Coslo" , total: "₹ 87380/-",link:'/supplier/orders/order-details-demo',HandledBy:'Self'},
  ];

  return (
    <div className="orders-container">
      <h3 style={{textAlign:'left'}}>Orders</h3>
      <div style={{display:'flex',justifyContent:'space-between',margin:'20px'}}>

      <div style={{textAlign:'left'}}>

        <button style={{textAlign:'left',border:'1px solid black',backgroundColor:'white',padding:'5px 10px'}}>
      
        <i className="fas fa-filter" style={{marginRight:'10px'}}></i>
        
          
      
        <select name="status" id="status" style={{ border: "none" }}>
        <option value="">Filter by Status</option>
        {statusOptions.map((status, index) => (
          <option key={index} value={status}>
            {status}
          </option>
        ))}
      </select>

      </button>

      <button style={{textAlign:'left',border:'1px solid black',backgroundColor:'white',padding:'5px 10px',margin:'5px'}}>
      
        <i className="fas fa-filter" style={{marginRight:'10px'}}></i>
        
          
        <select
        name="deliveryType"
        id="deliveryType"
        style={{ border: "none" }}
        onChange={handleDeliveryTypeChange}
      >
        <option value="">Filter by Delivery Type</option>
        <option value="In House">In House</option>
        <option value="Coslo">Coslo</option>
      </select>

      </button>
<br />
      <button style={{textAlign:'left',border:'1px solid black',backgroundColor:'white',padding:'5px 10px'}}>
      
        <i className="fas fa-filter" style={{marginRight:'10px'}}></i>
        
          
      <select name="" id="" style={{border:'none'}}>
        <option value="">Filter by Payment Status</option>
        <option value="">Failed</option>
        <option value="">Completed</option>
      </select>
      </button>

      <button style={{textAlign:'left',border:'1px solid black',backgroundColor:'white',padding:'5px 10px',margin:'5px'}}>
      
        <i className="fas fa-filter" style={{marginRight:'10px'}}></i>
        
          
      <select name="" id="" style={{border:'none'}}>
        <option value="">Filter by Payment Type</option>
        <option value="">Online</option>
        <option value="">COD</option>
      </select>
      </button>
      </div>
      
      <DateRangePicker/>
      </div>

      <div className="table-wrapper">
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order Id</th>
              <th>Date</th>
              <th>Buyer</th>
              <th>Delivery Status</th>
              <th>Payment Type</th>
              <th>Payment Status</th>
              <th>Delivery Type</th>
              <th>Total</th>
              <th>Handled By</th>
              <th>Actions</th>
              
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index}>
                <td>{order.id}</td>
                <td>{order.date}</td>
                <td>{order.buyer}</td>
                <td>
                  <button className={`shipped`}>
                    {order.status}
                  </button>
                  
                </td>
                <td>{order.paymenttype}</td>
                <td>{order.paymentstatus}</td>
                <td>{order.deliverytype}</td>
                <td>{order.total}</td>
                <td>{order.HandledBy}</td>
                <td>
                <Link href={order.link}>
                <img src="\icons\editp.svg" alt="" />
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
