'use client'
import { useState,useEffect } from 'react';
import './page.css'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RealEstateForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location:'',
    budget:'',
    tags: []
  });
  
  const [submitted, setSubmitted] = useState(false);
  const [tags,settags] = useState([]);

   // Facebook tracking parameters
  const [fbTrackingParams, setFbTrackingParams] = useState({
    event_id: '',
    fbp: '',
    fbc: ''
  });

  // Initialize Facebook tracking parameters
  useEffect(() => {
    // Generate unique event_id
    const eventId = `${Date.now()}.${Math.random().toString(36).substring(2, 11)}`;
    
    // Get _fbp cookie (Facebook Browser Pixel)
    const fbp = getCookie('_fbp') || '';
    
    // Get _fbc cookie (Facebook Click ID) - from fbclid URL parameter
    let fbc = getCookie('_fbc') || '';
    
    // If _fbc doesn't exist, check for fbclid in URL and create it
    if (!fbc) {
      const urlParams = new URLSearchParams(window.location.search);
      const fbclid = urlParams.get('fbclid');
      if (fbclid) {
        fbc = `fb.1.${Date.now()}.${fbclid}`;
        // Optionally set the cookie for future use
        document.cookie = `_fbc=${fbc}; path=/; max-age=7776000`; // 90 days
      }
    }
    
    setFbTrackingParams({
      event_id: eventId,
      fbp: fbp,
      fbc: fbc
    });

    gettag();
    
  }, []);


  function filterObjectsByProperty(array, propertyName, matchingNames, keep_or_remove) {
  return array.filter(obj => {
    const isMatch = matchingNames.includes(obj[propertyName]);
    return keep_or_remove === 1 ? isMatch : !isMatch;
  });
}


     const gettag = () => {
     
  
      document.querySelector('.loaderoverlay').style.display='flex';
  
  
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/tag/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
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
              data= filterObjectsByProperty(data, "tagName", ["Plots","Villa","Apartments"],1);
              settags([...data])
             document.querySelector('.loaderoverlay').style.display='none';

         
        })
        .catch((err) => {
          document.querySelector('.loaderoverlay').style.display='none';
          console.log(err)
        });
    };

    console.log(tags)

  // Helper function to get cookie value
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return '';
  };

  console.log(formData);
 
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
        ? [value]
        : prev.tags.filter(item => item !== value)
    }));
  };

  const handleSubmit = async () => {
    
     if (!formData.tags.length) {
      alert('Select whether you are looking for plots, apartments, or villas.');
      return;
    }
    

    if (!formData.name || !formData.phone) {
      alert('Please fill in all required fields');
      return;
    }
    

    // Fire Facebook Pixel Lead event with the SAME event_id
    // This allows Facebook to deduplicate between browser and server events
    if (typeof window.fbq === 'function') {
      window.fbq('track', 'Lead', {
        content_name: 'Property Inquiry Form',
        content_category: 'real_estate',
        value: 0,
        currency: 'INR'
      }, {
        eventID: fbTrackingParams.event_id  // ⭐ CRITICAL: Same ID for deduplication
      });
      console.log('Facebook Pixel Lead event fired with event_id:', fbTrackingParams.event_id);
    }
    

    const payload = {
      name: formData.name,
      phone: formData.phone,
      location:formData.location,
      budget:formData.budget,
      tags: formData.tags,
      productType:'property',
      source:new URLSearchParams(window.location.search).get("source")||'our website lead',
      event_id: fbTrackingParams.event_id,
      fbp: fbTrackingParams.fbp,
      fbc: fbTrackingParams.fbc,
     };
    
    console.log('Form Data:', payload);
    
    // Simulate API call
    try {
      document.querySelector('.loaderoverlay').style.display='flex';
      // Replace with your actual API endpoint
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/quotation/leadQuotation/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
       document.querySelector('.loaderoverlay').style.display='none';
       showSuccess("Thank you! Our property consultant will contact you soon.")

      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', phone: '',location:'',budget:'', tags: [] });
      }, 1000);
    } catch (error) {
       document.querySelector('.loaderoverlay').style.display='none';
      console.error('Error submitting form:', error);
    }
  };


   const showSuccess = (message = "Action completed successfully!") => {
    toast.success(message);
  };

  return (
    <div className="c818-container">
   
      <div className="c818-image-container">
        {/* <div className="c818-image-overlay">
          <h1 className="c818-image-title">Find Your Dream Home</h1>
          <p className="c818-image-subtitle">Luxury Properties at Your Fingertips</p>
        </div> */}
      </div>

      <div className="c818-form-container">
        <div className="c818-form-wrapper">
          <div className="c818-header">
            <h1 className="c818-title">Property Inquiry</h1>
            <p className="c818-subtitle">Tell us what you're looking for</p>
          </div>

          <div>

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
              <label className="c818-label">Location</label>
              <div className="c818-input-wrapper">
                <i className="fa fa-map-marker-alt c818-icon"></i>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="Enter your location for the property"
                  className="c818-input"
                />
              </div>
            </div>

           <div className="c818-form-group">
              <label className="c818-label">Budget</label>
              <div className="c818-input-wrapper">
                <i className="fa fa-rupee-sign c818-icon"></i>
                <input
                  type="text"
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  placeholder="Enter your budget for the property"
                  className="c818-input"
                />
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