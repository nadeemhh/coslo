import { useState,useEffect } from "react";
import "./component-css/BookingButton.css"; // Import CSS
import AddressSection from './AddressSection.js'
import "../home/cart/CartPage.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function BookingButton({selectedVariationIds}) {

     const [selectedaddress, setselectedaddress]=useState(null);
   const [isaddress, setisaddress]=useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
    const [note, setnote] = useState("");
console.log(date,time,note,selectedaddress,selectedVariationIds)

  const showSuccess = (message = "Action completed successfully!") => {
    toast.success(message);
  };

function postdata() {
  
      document.querySelector('.loaderoverlay').style.display = 'flex';
    
     const orderData = {
  items: [...selectedVariationIds],
  shippingAddress: selectedaddress,
  serviceBookingDetails: {
    preferredDate: date,
    preferredTime: time,
    specialInstructions: note
  },
  paymentMethod: "PAY_AFTER_SERVICE"
};

    
      const token = localStorage.getItem('buyertoken');
  
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/service/book`, {
        method: 'POST',
         headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }), // Add token if it exists
      },
        body: JSON.stringify(orderData),
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
          document.querySelector('.loaderoverlay').style.display = 'none';
          
        
        showSuccess("Your service has been booked successfully.")
        })
        .catch((err) => {
          document.querySelector('.loaderoverlay').style.display = 'none';
          console.log(err)
          alert(err);
         
        });
  
}

  return (
   <>
      {/* Book Now Button */}
   
      <button className="call-supplier pb" onClick={() => {
 
 if(!selectedVariationIds.length){
  alert('Select your services')
  return;
 }

        setShowPicker(true)

      }}>
           Book Now    <i className="fas fa-calendar-check"></i>

            </button>

      {/* Modal Picker */}
      {showPicker && (
        <div className="overlay565">
          <div className="picker-box565">
            <h3 className="title565">Select Date & Time when you want the service</h3>

            <label className="label565">
              Date:
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="input565"
              />
            </label>

            <label className="label565">
              Time:
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="input565"
              />
            </label>

            <label className="label565">
              Note For Service Provider:
              <input
                type="text"
                value={note}
                onChange={(e) => setnote(e.target.value)}
                className="input565"
              />
            </label>

             <AddressSection isaddress={isaddress} setisaddress={setisaddress} fontsize={'18px'} setselectedaddress={setselectedaddress}/>

            <div className="btn-group565">
              <button
                className="confirm-btn565"
                onClick={() => {
                  if(isaddress){
                  setShowPicker(false)
                  postdata()
                  }else{
                  alert('add your address')
                }
                  
                }}
              >
                Confirm
              </button>
              <button
                className="cancel-btn565"
                onClick={() => setShowPicker(false)}
              >
                Cancel
              </button>
                

            </div>
          </div>
        </div>
      )}

     
      
  </>
  );
}