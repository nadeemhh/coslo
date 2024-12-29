'use client'

import { useState } from "react";

function AddressSection() {
  const [selectedAddress, setSelectedAddress] = useState(0);

  
  const [ModalOpen, setModalOpen] = useState(false);
  
  const toggleModal = () => {
  
    setModalOpen(!ModalOpen);
  };

  const addresses = [
    {
      id: 0,
      address: "A 25/4 Batla House, Zakir Nagar",
      city: "110025, New Delhi",
      phone: "+91 9876543210",
    },
    {
      id: 1,
      address: "A 25/4 Batla House, Zakir Nagar",
      city: "110025, New Delhi",
      phone: "+91 9876543210",
    },
  ];

  return (
    <>
    <div className="address-section">
      {/* Select Address */}
      <div className="select-address">
        <h3>Select Address</h3>
        {addresses.map((item, index) => (
          <div
            key={item.id}
            className={`address-card ${
              selectedAddress === index ? "selected" : ""
            }`}
            onClick={() => setSelectedAddress(index)}
          >
            <div style={{display:"flex",gap:'10px'}}>
            <div className="icon">
              <i className="fas fa-map-marker-alt"></i>
            </div>
            <div className="details">
              <p className="address">{item.address}</p>
              <p className="city">{item.city}</p>
              <p className="phone">{item.phone}</p>
            </div>
            </div>
            <div className="edit-icon" onClick={toggleModal}>
              <i className="fas fa-edit"></i>
            </div>
          </div>
        ))}
      </div>

      {/* Add New Address */}
      <div className="add-address">
        <h3>Add new Address</h3>
        <form className="addressform">
          
          <label htmlFor="">Enter Full Address *</label>
          <input type="text" placeholder="" />
          <label htmlFor="">Enter City *</label>
          <input type="text" placeholder="" />
          <label htmlFor="">Enter State **</label>
          <input type="text" placeholder="" />
          <label htmlFor="">Enter Pin Code*</label>
          <input type="text" placeholder="" />
          <label htmlFor="">Enter Contact No.</label>
          <input type="text" placeholder="" />
          <label htmlFor="">Enter Email Address</label>
          <input type="email" placeholder="" />

          <div className="buttons">
            <button type="button" className="cancel">Cancel</button>
            <button type="submit" className="add">Add Address</button>
          </div>
        </form>
      </div>
    </div>

     {ModalOpen && (
      <div className="modal-overlay">
        <div className="modal-container">
          <div style={{display:'flex',justifyContent:'flex-end'}}>
          <button onClick={toggleModal} className="modal-close-btn">
            <i className="fa fa-times"></i>
          </button>
          </div>
          <h3 style={{marginTop:'10px',marginBottom:'10px'}}>Edit Address</h3>
        <form className="addressform">
          
          <label htmlFor="">Enter Full Address *</label>
          <input type="text" placeholder="" value={'A 25/4 Batla House, Zakir Nagar'}/>
          <label htmlFor="">Enter City *</label>
          <input type="text" placeholder="" value={'New Delhi'} />
          <label htmlFor="">Enter State **</label>
          <input type="text" placeholder="" value={'delhi'}/>
          <label htmlFor="">Enter Pin Code*</label>
          <input type="text" placeholder="" value={'110025'}/>
          <label htmlFor="">Enter Contact No.</label>
          <input type="text" placeholder="" value='+91 9876543210'/>
          <label htmlFor="">Enter Email Address</label>
          <input type="email" placeholder="" />

          <div className="buttons">
            <button type="submit" className="add">Edit Address</button>
          </div>
        </form>
        </div>
      </div>
    )}
    </>
  );
}

export default AddressSection;
