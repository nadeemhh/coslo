'use client'
import './page.css'
import Link from 'next/link'
import { useState ,useEffect} from "react";
import { PieChart, Pie, Cell } from "recharts";

const data = [
  { name: "Delivered", value: 410, color: "#4A51FC" },
  { name: "Pending", value: 142, color: "#AEA8FF" },
  { name: "In Transit", value: 340, color: "#C6C4FF" },
  { name: "Failed", value: 590, color: "#E3E1FF" },
];

export default function page() {

  const [isClient, setIsClient] = useState(false);

  // Ensure the chart only renders on the client
  useEffect(() => {
    setIsClient(true);
  }, []);

  const total = data.reduce((sum, item) => sum + item.value, 0);


  const orders = [
    { id: "#1", Name: "Faiz Iqbal", Email: "faiziqbal@gmail.com", Mobile: "0000000000", GST: "783737131222",Company: "FarmFresh Supplies..", Subscription: "Active" },
    { id: "#1", Name: "Faiz Iqbal", Email: "faiziqbal@gmail.com", Mobile: "0000000000", GST: "783737131222",Company: "FarmFresh Supplies..", Subscription: "Active" },
    { id: "#1", Name: "Faiz Iqbal", Email: "faiziqbal@gmail.com", Mobile: "0000000000", GST: "783737131222",Company: "FarmFresh Supplies..", Subscription: "Inactive" },
    { id: "#1", Name: "Faiz Iqbal", Email: "faiziqbal@gmail.com", Mobile: "0000000000", GST: "783737131222",Company: "FarmFresh Supplies..", Subscription: "Inactive" },
    { id: "#1", Name: "Faiz Iqbal", Email: "faiziqbal@gmail.com", Mobile: "0000000000", GST: "783737131222",Company: "FarmFresh Supplies..", Subscription: "Active" },
    { id: "#1", Name: "Faiz Iqbal", Email: "faiziqbal@gmail.com", Mobile: "0000000000", GST: "783737131222",Company: "FarmFresh Supplies..", Subscription: "Active" },
    { id: "#1", Name: "Faiz Iqbal", Email: "faiziqbal@gmail.com", Mobile: "0000000000", GST: "783737131222",Company: "FarmFresh Supplies..", Subscription: "Inactive" },
  ];

  return (
    <div className="orders-container">
         <div className="header">
       
        <h3>Platform Deliverables</h3>
     
      </div>
      
      <div style={{display:'flex',justifyContent:'space-evenly',marginTop:'20px',alignItems:'center'}}>

      {isClient && (
        <div className="chart-container">
          <PieChart width={200} height={200}>
            <Pie
              data={data}
              dataKey="value"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
              startAngle={90}
              endAngle={450}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
          <div className="chart-center">
            <h2>{total}</h2>
            <p>Deliveries</p>
          </div>
          <div className="chart-legend">
            {data.map((entry) => (
              <div key={entry.name} className="legend-item">
                <div
                  className="legend-color"
                  style={{ backgroundColor: entry.color }}
                ></div>
                <span>{entry.name}</span>
                <span>{entry.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}


<div className="pldcard">
        <div className="card-header">Summary</div>
        <div className="card-content">
          <div className="card-item">
            <img src="\icons\i1.svg" alt="" />
            <span>
              <strong>2 Days</strong> Average Delivery Time
            </span>
          </div>
          <div className="card-item">
          <img src="\icons\i2.svg" alt="" />
            <span>
              <strong>1031</strong> Prepaid Orders
            </span>
          </div>
          <div className="card-item">
          <img src="\icons\i2.svg" alt="" />
            <span>
              <strong>1031</strong> COD/Postpaid Orders
            </span>
          </div>
        </div>
      </div>
</div>
      
      
      <div className="table-wrapper"  style={{margin:'50px'}}>
        <table className="orders-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th>Seller</th>
              <th>Delivery Status</th>
              <th>Tracking No</th>
              <th>Payment Status</th>
              <th>Shipping Cost</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {/* {orders.map((order, index) => ( */}
              
              {/* <tr key={index}> */}
              <tr >
                <td>#1</td>
                <td>Faiz Iqbal</td>
                <td>FarmFresh Foods</td>
                <td>
                <button className="shipped">● Shipped</button>
                </td>
                <td>783737131222</td>
                <td>
                <button className="shipped">● COD</button>	
                </td>
                <td>
                ₹ 1000/-	
                </td>
                <td>
                  <Link href="/admin/PlatformDeliverables/PlatformDeliverablesdetails">
                  <i className="fas fa-external-link-alt" style={{color:'black'}}></i>
                </Link>
                </td>
              </tr>

              <tr >
                <td>#1</td>
                <td>Faiz Iqbal</td>
                <td>FarmFresh Foods</td>
                <td>
                <button className="shipped">● Shipped</button>
                </td>
                <td>783737131222</td>
                <td>
                <button className="shipped">● COD</button>	
                </td>
                <td>
                ₹ 1000/-	
                </td>
                <td>
                  <Link href="/admin/PlatformDeliverables/PlatformDeliverablesdetails">
                  <i className="fas fa-external-link-alt" style={{color:'black'}}></i>
                </Link>
                </td>
              </tr>

              <tr >
                <td>#1</td>
                <td>Faiz Iqbal</td>
                <td>FarmFresh Foods</td>
                <td>
                <button className="shipped">● Shipped</button>
                </td>
                <td>783737131222</td>
                <td>
                <button className="shipped">● COD</button>	
                </td>
                <td>
                ₹ 1000/-	
                </td>
                <td>
                  <Link href="/admin/PlatformDeliverables/PlatformDeliverablesdetails">
                  <i className="fas fa-external-link-alt" style={{color:'black'}}></i>
                </Link>
                </td>
              </tr>

              <tr >
                <td>#1</td>
                <td>Faiz Iqbal</td>
                <td>FarmFresh Foods</td>
                <td>
                <button className="shipped">● Shipped</button>
                </td>
                <td>783737131222</td>
                <td>
                <button className="shipped">● COD</button>	
                </td>
                <td>
                ₹ 1000/-	
                </td>
                <td>
                  <Link href="/admin/PlatformDeliverables/PlatformDeliverablesdetails">
                  <i className="fas fa-external-link-alt" style={{color:'black'}}></i>
                </Link>
                </td>
              </tr>
              <tr >
                <td>#1</td>
                <td>Faiz Iqbal</td>
                <td>FarmFresh Foods</td>
                <td>
                <button className="shipped">● Shipped</button>
                </td>
                <td>783737131222</td>
                <td>
                <button className="shipped">● COD</button>	
                </td>
                <td>
                ₹ 1000/-	
                </td>
                <td>
                  <Link href="/admin/PlatformDeliverables/PlatformDeliverablesdetails">
                  <i className="fas fa-external-link-alt" style={{color:'black'}}></i>
                </Link>
                </td>
              </tr>

             {/* ))} */}
          </tbody>
        </table>
      </div>
    </div>
  );
}


