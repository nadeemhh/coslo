'use client'
import './page.css'
import '../../../component/component-css/cartcard.css'
import "../../../component/component-css/ui.css";
import Link from 'next/link';
import Goback from '../../../back.js'
import {useState,useEffect} from 'react';

import extractDate from '../../../component/extdate.js'


export default function Page() {
  const [subOrderId, setsubOrderId] = useState(false);
  const [itemVariationId, setitemVariationId] = useState(false);

  const [ModalOpen, setModalOpen] = useState(false);
  const [ModalOpen2, setModalOpen2] = useState(false);
  const [productimages, setproductimages] = useState([]);
  const [images, setImages] = useState([]);
  const [data,setdata] = useState(false);
  const [invoiceUrl,setinvoiceUrl] = useState(false);
  
console.log(productimages)
    const handleImageUpload = (event) => {

      const myfiles = Array.from(event.target.files);
      setproductimages((prevImages) =>{
        return [...prevImages, ...myfiles];
        });
  
      const files = Array.from(event.target.files);
      const imageUrls = files.map((file) => URL.createObjectURL(file));
      setImages((prevImages) => [...prevImages, ...imageUrls]);
  
      
    };
  
    const removeImage = (index) => {
  
      setproductimages(productimages.filter((_, i) => i !== index));
      setImages(images.filter((_, i) => i !== index));
  
    };

    
    const toggleModal = () => {
  
      setModalOpen(!ModalOpen);
    };

    const toggleModal2 = () => {
  
      setModalOpen2(!ModalOpen2);
    };


      const getdata = () => {
        document.querySelector('.loaderoverlay').style.display = 'flex';
        const oid = new URLSearchParams(window.location.search).get("oid");

        const token = localStorage.getItem('buyertoken');
    
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/order/buyer/${oid}`, {
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
            console.log(data.data)
         
       setdata(data.data)
       getinvoice();
          
            document.querySelector('.loaderoverlay').style.display = 'none';
           
          })
          .catch((err) => {
            document.querySelector('.loaderoverlay').style.display = 'none';
            console.log(err)
            alert(err);
           
          });
      };
  

      const getinvoice = () => {

        const suborderid = new URLSearchParams(window.location.search).get("oid");

        const token = localStorage.getItem('buyertoken');
    
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/order/invoice/${suborderid}`, {
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
            setinvoiceUrl(data.invoiceUrl)
            
          
            document.querySelector('.loaderoverlay').style.display = 'none';
           
          })
          .catch((err) => {
            document.querySelector('.loaderoverlay').style.display = 'none';
            console.log(err)
          
           
          });
      };
  
  
      useEffect(() => {
        getdata()
      }, []);


    const steps = [
        { date: "27th August 2024", time: "02:30 PM", status: "Delivered", location: "Varanasi" },
        { date: "27th August 2024", time: "10:30 AM", status: "Out for Delivery", location: "Varanasi" },
        { date: "20th August 2024", time: "10:30 AM", status: "Order Shipped", location: "Varanasi" },
        { date: "16th August 2024", time: "10:30 AM", status: "Order Placed", location: "Varanasi" },
      ];


      const requestreturn = () => {
    

      
        const formData = new FormData();
        
        const AccountHolderName = document.querySelector('.modalform input[name="AccountHolderName"]').value;
        const AccountNumber = document.querySelector('.modalform input[name="AccountNumber"]').value;
        const IFSCCode = document.querySelector('.modalform input[name="IFSCCode"]').value;
        const BankName = document.querySelector('.modalform input[name="BankName"]').value;
        const reason = document.querySelector('.modalform textarea[name="reason"]').value;

console.log({AccountHolderName,AccountNumber,IFSCCode,BankName,reason,itemVariationId,subOrderId})
       
formData.append("subOrderId", subOrderId);
formData.append("itemVariationId", itemVariationId);
        formData.append("bankDetails[accountHolderName]", AccountHolderName);
        formData.append("bankDetails[accountNumber]", AccountNumber);
        formData.append("bankDetails[ifscCode]", IFSCCode);
        formData.append("bankDetails[bankName]", BankName);
        formData.append("reason", reason);

        
        if (productimages.length > 0) {
          for (let i = 0; i < productimages.length; i++) {
          formData.append("proofOfReturn", productimages[i]); 
          }
        }else{
          alert('upload product image')
          return;
        }
        
        
        document.querySelector('.loaderoverlay').style.display='flex';

        const token = localStorage.getItem('buyertoken');

    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/return/create`, {
      method: "POST",
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }), // Add token if it exists
      },
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return response.json().then((errorData) => {
            throw new Error(errorData.message || errorData.error || 'Failed to submit the form.');
          });
        }
      }) .then((data) => {
    
      console.log(data)
    alert(data.message)
    toggleModal2();
    document.querySelector('.loaderoverlay').style.display='none';
    
    })
      .catch((error) => {
        console.error("Error submitting form:", error);
        toggleModal2();
        alert(error.message || error.error || 'Failed to submit the form.')
        document.querySelector('.loaderoverlay').style.display='none';
       
      });
    
      };
      

function cancelorder(suborderid) {
  
  let canceldata;

  if(data.orderSummary.paymentMethod === 'ONLINE'){

    const AccountHolderName = document.querySelector('.modalform input[name="AccountHolderName"]').value;
    const AccountNumber = document.querySelector('.modalform input[name="AccountNumber"]').value;
    const IFSCCode = document.querySelector('.modalform input[name="IFSCCode"]').value;
    const BankName = document.querySelector('.modalform input[name="BankName"]').value;
    const reason = document.querySelector('.modalform textarea[name="reason"]').value;
  
     canceldata = {bankDetails:{accountHolderName:AccountHolderName,accountNumber:AccountNumber,ifscCode:IFSCCode,bankName:BankName,},reason}

  }else{
    const reason = document.querySelector('.modalform textarea[name="reason"]').value;
  
    canceldata = {reason}
  }


  console.log(canceldata);

        document.querySelector('.loaderoverlay').style.display='flex';
  
  const token = localStorage.getItem('buyertoken');

  fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/order/cancel/${suborderid}`, {
    method: "POST",
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }), // Add token if it exists
    },
    body: JSON.stringify(canceldata),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return response.json().then((errorData) => {
          throw new Error(errorData.message || errorData.error || 'Failed to submit the form.');
        });
      }
    }) .then((data) => {
  
    console.log(data)
  alert(data.message)
 
  toggleModal2();
  document.querySelector('.loaderoverlay').style.display='none';
  
  })
    .catch((error) => {
      console.error("Error submitting form:", error);
   
      alert(error.message || error.error || 'Failed to submit the form.')
      document.querySelector('.loaderoverlay').style.display='none';
      toggleModal2();
    });

}


      function extendDate(dateString, daysToAdd) {
        const date = new Date(dateString); // Convert the date string to a Date object
        date.setDate(date.getDate() + daysToAdd); // Add the specified number of days
        return date.toISOString().split('T')[0]; // Return the extended date in 'YYYY-MM-DD' format
      }


      function getFormattedDate() {
        const today = new Date();
        return today.toISOString().split('T')[0];
    }

    function isSecondDateGreater(date1, date2) {
      return new Date(date2) > new Date(date1);
  }

  return (
    <>
    {data && <div className="order-details-container">
    <h2 className="myorder-details-title">
      <Goback/> Order Details
    </h2>
    <div className="order-details-content order-box">
      <div className="order-summary44">
        <p className='heading69'>Order Summary</p>
        {/* <p><strong>Order Id:</strong> {data.orderSummary.orderId}</p> */}
        <p><strong>Total:</strong> ₹ {data.amountSummary.grandTotal}/-</p>
        <p><strong>Order Date:</strong> {extractDate(data.orderSummary.orderDate)}</p>
        <p><strong>Payment Method:</strong> {data.orderSummary.paymentMethod}</p>
        <p><strong>Delivery Status:</strong> {data.orderSummary.deliveryStatus}</p>
       
       <div style={{display:'flex',gap:'10px',justifyContent:"center",flexWrap:'wrap'}}>

       {invoiceUrl && <a href={invoiceUrl} target='_blank' className="download-btn">
        Download Invoice
        </a>}

      {data.orderSummary.deliveryStatus === 'PENDING' &&  <button className="ordercancel-btn" style={{backgroundColor:'#ff000000',border:'1px solid black',color:'black'}}onClick={()=>{

  toggleModal2()
 
  
  }}>Cancel Order</button>}

    </div>

      </div>
      <div className="shipping-address44 order-box">
        <p className='heading69'>Shipping Address</p>
        <p><strong>Name:</strong> {data.shippingAddress.customerName}</p>
        <p><strong>Address:</strong> {data.shippingAddress.addressLine}</p>
        <p><strong>Phone:</strong> {data.shippingAddress.phone}</p>
        <p><strong>Pincode:</strong> {data.shippingAddress.pincode}</p>
      </div>
    </div>


    <div className='card-container' style={{marginTop:"20px"}}>

{    
data.orderSummary.items.map((order, index) => (

<div className="card" style={{maxWidth:'600px'}} key={index}>
<div className="prodictimg">
<img src={order.image} alt="" />
</div>
<div className="card-details">
<p className="card-title">
  {order.name}
</p>
{data.orderSummary.deliveryStatus === 'DELIVERED' && (order.isReturnable && <p className="card-date">Return is available till {extendDate(data.orderSummary.orderDate,order.returnDays||0)}</p>)}
<p className="card-date">Quantity - {order.quantity}</p>
<div style={{display:'flex',gap:'15px'}} className='hgfhg'>
<p className="card-price">₹ {order.price}/-</p>
{/* <button className="delivered">● Delivered @ 27th August</button> */}

</div>

</div>
<div className="card-status">
{/* <CounterComponent/>
<img src="\icons\dustbin.svg" alt="" style={{width:'40px',cursor:'pointer'}}/> */}

{data.orderSummary.deliveryStatus === 'DELIVERED' && (order.isReturnable &&  (isSecondDateGreater(extendDate(data.orderSummary.orderDate,order.returnDays||0),getFormattedDate()) === false && <button className="cancel-btn" onClick={()=>{
  toggleModal2()
  const suborderid = new URLSearchParams(window.location.search).get("oid");
  setsubOrderId(suborderid)
setitemVariationId(order.variationId)
  }}>Return</button>))
  }



</div>
</div>

))
}

</div>


{ModalOpen2 && (
        <div className="modal-overlay" style={{zIndex:'2'}}>
          <div className="mymodal-container" style={{height: '80vh',overflowY: 'auto'}}>
          <div style={{display:'flex',justifyContent:'flex-end'}}>
          <button onClick={toggleModal2} className="modal-close-btn">
            <i className="fa fa-times"></i>
          </button>
          </div>
            <h2>Fill Details</h2>
            <form className='modalform' onSubmit={(e)=>{
              e.preventDefault();

            if(data.orderSummary.deliveryStatus === 'DELIVERED'){
              requestreturn()
            }else{
                const suborderid = new URLSearchParams(window.location.search).get("oid");
  cancelorder(suborderid)

            }
             

              }}>

       { data.orderSummary.deliveryStatus === 'DELIVERED' ? <>  <input type="text" name="BankName" placeholder="Enter Bank Name" required />
            <input type="text" name="AccountHolderName" placeholder="Enter Bank Account Holder Name" required />
        <input type="text" name="AccountNumber" placeholder="Enter Account Number" required />
        <input type="text" name="IFSCCode" placeholder="Enter IFSC Code" required />
        <textarea name="reason" placeholder={data.orderSummary.deliveryStatus === 'DELIVERED'?"write reason for return":"write reason for order cancellation"} required></textarea>
        </> 
        :
        (data.orderSummary.paymentMethod === 'ONLINE' ? <>  <input type="text" name="BankName" placeholder="Enter Bank Name" required />
          <input type="text" name="AccountHolderName" placeholder="Enter Bank Account Holder Name" required />
      <input type="text" name="AccountNumber" placeholder="Enter Account Number" required />
      <input type="text" name="IFSCCode" placeholder="Enter IFSC Code" required />
      <textarea name="reason" placeholder={data.orderSummary.deliveryStatus === 'DELIVERED'?"write reason for return":"write reason for order cancellation"} required></textarea>
      </>: <textarea name="reason" placeholder={data.orderSummary.deliveryStatus === 'DELIVERED'?"write reason for return":"write reason for order cancellation"} required></textarea>)
        }

       {data.orderSummary.deliveryStatus === 'DELIVERED' && <> 

       <p style={{margin:'40px 0px',textAlign:'left'}}>Upload Product Image</p>
    <div className="image-uploader" style={{marginBottom:'50px'}}>
 
      <div className="add-image">
        <input
          type="file"
          id="imageInput"
          multiple
          onChange={handleImageUpload}
          accept="image/*"
        />
        <label htmlFor="imageInput" className="add-image-label">
        <img src="\icons\upcross.svg" alt=""  width={'30px'}/>
          <p>Add Image</p>
        </label>
      </div>
      <div className="image-preview">
        {images.map((image, index) => (
          <div className="image-container" key={index}>
            <img src={image} alt={`preview-${index}`} />
            <button
              className="remove-button"
              onClick={(e) => {
                e.preventDefault();
                removeImage(index)}}
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
        ))}

      </div>
    </div>
    </>
}
              <button type="submit" className='submitreturn'>Submit</button>
            </form>
          </div>
        </div>
      )}


 
    {data.trackingHistory.length > 0 && <div className="tracking-container">
      <h2 className="tracking-title">Tracking History</h2>
      <div className="tracking-timeline">
        {data.trackingHistory.map((step, index) => (

          <div className="tracking-row" key={index}>
            <div className="tracking-date-time">
              <p className="tracking-date">{extractDate(step.updatedAt || step.date)}</p>
              {/* <p className="tracking-time">@ {step.time}</p> */}
            </div>
            <div className="tracking-circle">
              <div className="tracking-dot"></div>
              {index < data.trackingHistory.length - 1   && <div className="tracking-line"></div>}
            </div>
            <div className="tracking-status-info">
              <p className="tracking-status">{step.status}</p>
              {/* <p className="tracking-location">{step.comment}</p> */}
            </div>
          </div>
          
        ))}
      </div>
    </div>}

      

  </div>
}

  </>
  )
}
