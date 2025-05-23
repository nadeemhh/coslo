'use client'
import './page.css'
import  { useState,useEffect } from "react";
import Link from 'next/link';
import sendlead from '../../component/sendlead.js'
import usePreventNumberInputScroll from '../../component/usePreventNumberInputScroll.js';


const Page = () => {
  const [animate, setAnimate] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    category: '',
    subcategory: '',
    message: ''
  });

  // State for form submission and validation
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});


  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }

    // Reset subcategory when category changes
    if (name === 'category') {
      setFormData({
        ...formData,
        category: value,
        subcategory: ''
      });
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }
    
    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }
    
    if (formData.category && !formData.subcategory) {
      newErrors.subcategory = 'Please select a subcategory';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    const formErrors = validateForm();
    
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    
    // Form is valid, submit it
    setIsSubmitted(true);
    
    // Reset form after submission (in real app, you'd send data to server here)
    setTimeout(() => {
      setFormData({
        name: '',
        phone: '',
        email: '',
        category: '',
        subcategory: '',
        message: ''
      });
      setIsSubmitted(false);
    }, 3000);
  };


    
      // stop scrool when active input
  usePreventNumberInputScroll()

useEffect(() => {
    setAnimate(true);
  }, []);
      
  return (
    <>
    <div className="enquiry-form-container676">
      <div className="form-wrapper676">
        <div className="form-header676">
          <h2>Product Enquiry</h2>
          <p className={`cool-link ${animate ? 'animate' : ''}`} >Please fill out the form, check our <span style={{color:'#006fd0'}}>products</span>, and submit your enquiry. We will get back to you soon.</p>
        </div>
        
        {isSubmitted ? (
          <div className="success-message676">
            <div className="success-icon676">✓</div>
            <h3>Thank You!</h3>
            <p>Your enquiry has been submitted successfully. Our team will contact you shortly.</p>
          </div>
        ) : (
          <div className="enquiry-form676">
          
            
            <div className="form-row676">
              {/* <div className="form-group676">
                <label htmlFor="email">Email Address <span className="required676">*</span></label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? 'input-error676' : ''}
                />
                {errors.email && <span className="error-message676">{errors.email}</span>}
              </div> */}

<div className="form-group676">
              <label htmlFor="name">Full Name <span className="required676">*</span></label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? 'input-error676' : ''}
              />
              {errors.name && <span className="error-message676">{errors.name}</span>}
            </div>
              
              <div className="form-group676">
                <label htmlFor="phone">Phone Number <span className="required676">*</span></label>
                <input
                  type="number"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={errors.phone ? 'input-error676' : ''}
                />
                {errors.phone && <span className="error-message676">{errors.phone}</span>}
              </div>
            </div>
            
            <div className="form-group676">
              <label htmlFor="message">Your Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                className={errors.message ? 'input-error676' : ''}
              ></textarea>
              {errors.message && <span className="error-message676">{errors.message}</span>}
            </div>

            <NestedCategoryDropdown formData={formData}/>

          </div>
        )}
      </div>
      
     
    </div>
    </>
  );
};

export default Page;




const NestedCategoryDropdown = ({formData}) => {
  
  const [tags,settags] = useState([]);
const [qtyMap, setQtyMap] = useState({});


  /// get tags

    const gettag = () => {

      document.querySelector('.loaderoverlay').style.display='flex';
    
     const token = localStorage.getItem('token');
  
  
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/tag/`, {
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
              console.log(data)
              settags([...data])
             document.querySelector('.loaderoverlay').style.display='none';

         
        })
        .catch((err) => {
          document.querySelector('.loaderoverlay').style.display='none';
          console.log(err)
        });
    };

  //////
  
    useEffect(() => {
  
      gettag();
    }, []);

    
    return (
     <div className="nested-dropdown-container676">
  <div className="category-dropdown676">
    <div className="dropdown-header676">
      <h3>Select Product</h3>
    </div>

     {tags.map((data, index) => (

    <ul className="category-list676" key={index}>
      <li className="category-item676">
        <div className="category-header676">
          <div className="category-image-container676">
            <img 
              src={data.tagImage}
              alt={data.tagName}
              className="category-image676"
            />
          </div>


 <span className="category-name676">{data.tagName}</span>

<div>
  <p style={{fontSize:'12px',marginBottom:'2px'}}>Quantity</p>
  <input type="number" style={{width:'60px',height:'16px'}} className='taginput'   value={qtyMap[data._id] || ''}
   onChange={(e) =>
    setQtyMap((prev) => ({
      ...prev,
      [data._id]: e.target.value,
    }))
  }/>
</div>

          <button className="catpro66" onClick={()=>{

if(!formData.name || !formData.phone){
              alert('Please enter your phone number and your name to submit your enquiry.')
              return;
            }
sendlead(formData,data._id,qtyMap[data._id] || '')
  setQtyMap((prev) => ({ ...prev, [data._id]: '' })); // reset this input

          }}>
            Submit
          </button>
         
        </div>
      </li>
    </ul>
     ))}

  </div>
</div>
    );
  };


  
