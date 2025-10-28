'use client'
import React, { useState } from 'react';
import './page.css'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RealEstateForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    tags: []
  });
  

  console.log(formData)
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      tags: checked 
        ? [...prev.tags, value]
        : prev.tags.filter(item => item !== value)
    }));
  };

  const handleSubmit = async () => {

   
    
    if (!formData.name || !formData.phone) {
      alert('Please fill in all required fields');
      return;
    }
    
    const payload = {
      name: formData.name,
      phone: formData.phone,
      tags: formData.tags
    };
    
    console.log('Form Data:', payload);
    
    // Simulate API call
    try {
      // Replace with your actual API endpoint
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/quotation/leadQuotation/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
       showSuccess("Thank you! Our property consultant will contact you soon.")

      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', phone: '', tags: [] });
      }, 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };


   const showSuccess = (message = "Action completed successfully!") => {
    toast.success(message);
  };

  return (
    <div className="c818-container">
   
      <div className="c818-image-container">
        <div className="c818-image-overlay">
          <h1 className="c818-image-title">Find Your Dream Home</h1>
          <p className="c818-image-subtitle">Luxury Properties at Your Fingertips</p>
        </div>
      </div>

      <div className="c818-form-container">
        <div className="c818-form-wrapper">
          <div className="c818-header">
            <h1 className="c818-title">Property Inquiry</h1>
            <p className="c818-subtitle">Tell us what you're looking for</p>
          </div>

          {submitted && (
            <div className="c818-success-message">
              ✓ Thank you! Your inquiry has been submitted successfully.
            </div>
          )}

          <div>
            <div className="c818-form-group">
              <label className="c818-label">Full Name</label>
              <div className="c818-input-wrapper">
                <i className="fa fa-user c818-icon"></i>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className="c818-input"
                />
              </div>
            </div>

            <div className="c818-form-group">
              <label className="c818-label">Phone Number</label>
              <div className="c818-input-wrapper">
                <i className="fa fa-phone c818-icon"></i>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                  className="c818-input"
                />
              </div>
            </div>

            <div className="c818-form-group">
              <label className="c818-label" style={{textTransform:'unset'}}>I am interested in <i className="fas fa-arrow-down"></i></label>
              <div className="c818-checkbox-group">
                <div className={`c818-checkbox-wrapper ${formData.tags.includes('6876642cf2a9732e3582191e') ? 'c818-checked' : ''}`}>
                  <input
                    type="checkbox"
                    id="plots"
                    value="6876642cf2a9732e3582191e"
                    checked={formData.tags.includes('6876642cf2a9732e3582191e')}
                    onChange={handleCheckboxChange}
                    className="c818-checkbox"
                  />
                  <label htmlFor="plots" className="c818-checkbox-label">
                    <i className="fa fa-map-marker c818-checkbox-icon"></i>
                    Plots
                  </label>
                </div>

                <div className={`c818-checkbox-wrapper ${formData.tags.includes('68930da6e7b8fca340446c82') ? 'c818-checked' : ''}`}>
                  <input
                    type="checkbox"
                    id="villas"
                    value="68930da6e7b8fca340446c82"
                    checked={formData.tags.includes('68930da6e7b8fca340446c82')}
                    onChange={handleCheckboxChange}
                    className="c818-checkbox"
                  />
                  <label htmlFor="villas" className="c818-checkbox-label">
                    <i className="fa fa-home c818-checkbox-icon"></i>
                    Villas
                  </label>
                </div>

                <div className={`c818-checkbox-wrapper ${formData.tags.includes('68766454f2a9732e35821922') ? 'c818-checked' : ''}`}>
                  <input
                    type="checkbox"
                    id="apartments"
                    value="68766454f2a9732e35821922"
                    checked={formData.tags.includes('68766454f2a9732e35821922')}
                    onChange={handleCheckboxChange}
                    className="c818-checkbox"
                  />
                  <label htmlFor="apartments" className="c818-checkbox-label">
                    <i className="fa fa-building c818-checkbox-icon"></i>
                    Apartments
                  </label>
                </div>
              </div>
            </div>

            <button onClick={handleSubmit} className="c818-submit-btn">
              Submit Inquiry
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default RealEstateForm;