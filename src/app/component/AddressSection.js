'use client'

import { useState,useEffect } from "react";

function AddressSection({isaddress, setisaddress}) {
  const [ModalOpen, setModalOpen] = useState(false);
  const [showadd,setshowadd]=useState(false);
  const [addresses,setaddresses]=useState([])
  const [selectedAddressData, setSelectedAddressData] = useState(null);

  function showaddres(e) {
    e.preventDefault();
    setshowadd(true)
  }
  

   const refreshCategories = () => {
    const token = localStorage.getItem('token');

      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/buyer/address/all`,{
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }), // Add token if it exists
        }
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data)

          if(data.shippingAddresses.length>0){
            setisaddress(true)
          }

          setaddresses(data.shippingAddresses)
        })
        .catch((error) => console.error("Error fetching categories:", error));
    };
  
    useEffect(() => {
      refreshCategories();
    }, []);

    const toggleModal = (address) => {
      setSelectedAddressData(address);
      setModalOpen(!ModalOpen);
    };

 
  const submitaddress = async (e) => {
    e.preventDefault();
  
    const token = localStorage.getItem('token');
    
    // Collect form data
    const formData = {
      name: document.querySelector("input[name='name']").value,
      addressLine: document.querySelector("input[name='address']").value,
      landmark: document.querySelector("input[name='landmark']").value,
      city: document.querySelector("input[name='city']").value,
      state: document.querySelector("input[name='state']").value,
      pincode: document.querySelector("input[name='pincode']").value,
      phone: document.querySelector("input[name='phone']").value,
    };
  
   
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/buyer/address/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify(formData),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        alert("Address added successfully!");
        setshowadd(false); // Hide form after successful submission
        refreshCategories(); // Refresh the address list
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error("Error submitting address:", error);
      alert("Failed to submit address. Please try again.");
    }
  };
  

  const editaddress = async (e) => {
    e.preventDefault();
  
    if (!selectedAddressData) return;
  
    const token = localStorage.getItem('token');
  
    // Collect updated form data
    const updatedData = {
      name: document.getElementById("edit-name").value,
      addressLine: document.getElementById("edit-address").value,
      landmark: document.getElementById("edit-landmark").value,
      city: document.getElementById("edit-city").value,
      state: document.getElementById("edit-state").value,
      pincode: document.getElementById("edit-pincode").value,
      phone: document.getElementById("edit-phone").value,
    };
  
    
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/buyer/address/${selectedAddressData._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
          body: JSON.stringify(updatedData),
        }
      );
  
      const result = await response.json();
  
      if (response.ok) {
        alert("Address updated successfully!");
        setModalOpen(false);
        refreshCategories(); // Refresh the address list
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error("Error updating address:", error);
      alert("Failed to update address. Please try again.");
    }
  };


const SelectedAddressfun = async (index,id) => {
  console.log(index,id)
 

  const token = localStorage.getItem('token');

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/buyer/address/activate/${id}`,
      {
        method: "GET",
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      }
    );

    const result = await response.json();

    if (response.ok) {
      alert("Address activated successfully!");
   
      refreshCategories(); // Refresh the address list
    } else {
      alert(`Error: ${result.message}`);
    }
  } catch (error) {
    console.error("Error activating address:", error);
    alert("Failed to update address. Please try again.");
  }

  
}

  return (
    <>
    <div className="address-section">
      {/* Select Address */}
      <div className="select-address">
        {addresses.length !== 0 &&  <h3>Select Address</h3>}
        {addresses.map((item, index) => (
          <div
            key={item._id}
            className={`address-card ${
              item.isDefault ? "selected" : ""
            }`}
            onClick={() => SelectedAddressfun(index,item._id)}
          >
            <div style={{display:"flex",gap:'10px'}}>
            <div className="icon">
              <i className="fas fa-map-marker-alt"></i>
            </div>
            <div className="details">
              <p className="address">{item.addressLine}</p>
              <p className="address">{item.landmark}</p>
              <p className="city">city - {item.city}</p>
              <p className="phone">phone number - {item.phone}</p>
              <p className="phone">pincode - {item.pincode}</p>
            </div>
            </div>
            <div className="edit-icon" onClick={(e) => {
                e.stopPropagation(); 
              toggleModal(item)}}>
              <i className="fas fa-edit"></i>
            </div>
          </div>
        ))}
      </div>

      {/* Add New Address */}
      <div className="add-address">
      {showadd && <> <h3>Add new Address</h3></>}
        <form className="addressform" onSubmit={submitaddress}>
          
         {showadd && <>
          <label htmlFor="name">Enter Your Name *</label>
<input type="text" id="name" name="name" placeholder="Enter Your Name"  required/>

<label htmlFor="address">Enter Full Address *</label>
<input type="text" id="address" name="address" placeholder="Enter Full Address" required/>

<label htmlFor="landmark">Enter Landmark *</label>
<input type="text" id="landmark" name="landmark" placeholder="Enter Landmark" required/>

<label htmlFor="city">Enter City *</label>
<input type="text" id="city" name="city" placeholder="Enter City" required/>

<label htmlFor="state">Enter State *</label>
<input type="text" id="state" name="state" placeholder="Enter State" required/>

<label htmlFor="pincode">Enter Pin Code *</label>
<input type="text" id="pincode" name="pincode" placeholder="Enter Pin Code" required/>

<label htmlFor="phone">Enter Contact No.</label>
<input type="text" id="phone" name="phone" placeholder="Enter Contact No." required/>

       
</>}

          <div className="buttons">
          {showadd ? <>
            <button className="cancel" onClick={(e)=>{
               e.preventDefault();
              setshowadd(false)
              }}>Cancel</button>
            <button className="add" type="submit" >Submit</button>
            </>:<button className="add" onClick={showaddres}>Add New Address</button>}
            
          </div>
        </form>
      </div>
    </div>

     {ModalOpen && selectedAddressData && (
      <div className="modal-overlay">
        <div className="modal-container">
          <div style={{display:'flex',justifyContent:'flex-end'}}>
          <button className="modal-close-btn" onClick={() => setModalOpen(false)}>
            <i className="fa fa-times"></i>
          </button>
          </div>
          <h3 style={{marginTop:'10px',marginBottom:'10px'}}>Edit Address</h3>
          <form className="addressform" onSubmit={editaddress}>
        <label htmlFor="edit-name">Enter Your Name *</label>
        <input type="text" id="edit-name" defaultValue={selectedAddressData.name} required />

        <label htmlFor="edit-address">Enter Full Address *</label>
        <input type="text" id="edit-address" defaultValue={selectedAddressData.addressLine} required />

        <label htmlFor="edit-landmark">Enter Landmark *</label>
        <input type="text" id="edit-landmark" defaultValue={selectedAddressData.landmark} required />

        <label htmlFor="edit-city">Enter City *</label>
        <input type="text" id="edit-city" defaultValue={selectedAddressData.city} required />

        <label htmlFor="edit-state">Enter State *</label>
        <input type="text" id="edit-state" defaultValue={selectedAddressData.state} required />

        <label htmlFor="edit-pincode">Enter Pin Code *</label>
        <input type="text" id="edit-pincode" defaultValue={selectedAddressData.pincode} required />

        <label htmlFor="edit-phone">Enter Contact No.</label>
        <input type="text" id="edit-phone" defaultValue={selectedAddressData.phone} required />

        <div className="buttons">
          <button className="add" type="submit">Update Address</button>
        </div>
      </form>
        </div>
      </div>
    )}
    </>
  );
}

export default AddressSection;
