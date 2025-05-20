'use client'
import './page.css'
import  { useState,useEffect,useRef } from "react";
import Link from 'next/link';
import Productcard from '../../component/productcardforenquiry.js'
 import scrollToElement from '../../component/scrollToElement.js'
 import usePreventNumberInputScroll from '../../component/usePreventNumberInputScroll.js';

import { useInView } from "react-intersection-observer";

let canrun_Inview=true;

const Page = () => {
  // State for form inputs

  const [products, setProducts] = useState([]);   // Store fetched products
  const [category, setcategory] = useState(null); 
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
 

  const { ref, inView } = useInView({ threshold: 1, rootMargin: "50px" });
   // State for tracking the selected category ID
   const [selectedCategoryId, setSelectedCategoryId] = useState(null);

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

  // Get subcategories based on selected category
  const getSubcategories = () => {
    const selectedCategory = categories.find(cat => cat.name === formData.category);
    return selectedCategory ? selectedCategory.subcategories : [];
  };

  // Reset form handler
  const handleReset = () => {
    setFormData({
      name: '',
      phone: '',
      email: '',
      category: '',
      subcategory: '',
      message: ''
    });
    setErrors({});
  };


  /////////// fetch category products
  
      const fetchProducts = async (id,firstpage=null) => {

        document.querySelector('.loaderoverlay').style.display = 'flex';
    
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/product/category/${id}?page=${firstpage?firstpage:page}&limit=10`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
    
          if (!response.ok) {
            throw new Error('Failed to fetch products');
          }
    
          const data = await response.json();
  
          canrun_Inview=true;

          if (data.data.length === 0) {
            setHasMore(false);

            if(firstpage){ scrollToElement('seeproducts55')}
           
            console.log( hasMore,page)
          } else {
            console.log(data)
            setProducts((pre)=>([...pre,...data.data]));
            if(firstpage){scrollToElement('seeproducts55')}
            setPage((prevPage) => prevPage + 1);
            
         
          }
  
         
          document.querySelector('.loaderoverlay').style.display = 'none';
          console.log(data.data)
        } catch (err) {
          document.querySelector('.loaderoverlay').style.display = 'none';
        } finally {
          
        }
      };
    
    
      useEffect(() => {

        console.log('inside',inView)
  if(selectedCategoryId !== null && category !== null){
    console.log('running')
 if(hasMore && inView && canrun_Inview){
  console.log('called',canrun_Inview)
   fetchProducts(selectedCategoryId);}
  }
       
       
      }, [inView]);


     
      // stop scrool when active input
  usePreventNumberInputScroll()

      
  return (
    <>
    <div className="enquiry-form-container676">
      <div className="form-wrapper676">
        <div className="form-header676">
          <h2>Product Enquiry</h2>
          <p>Please fill out the form below, select a <span style={{color:'#006fd0'}}>category</span>, view the <span style={{color:'#006fd0'}}>products</span>, and submit your enquiry. We will get back to you as soon as possible.</p>
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

            <NestedCategoryDropdown selectedCategoryId={selectedCategoryId} setSelectedCategoryId={setSelectedCategoryId} fetchProducts={fetchProducts} setPage={setPage} setProducts={setProducts} setcategory={setcategory} setHasMore={setHasMore} formData={formData}/>

          </div>
        )}
      </div>
      
     
    </div>


<>
{formData.name && formData.phone && <div>
<div>
{category && <h3 style={{color:'#1389F0',marginTop:'0px',marginBottom:'40px'}} className='seeproducts55'>{category}</h3>}
</div>

<div style={{display:'flex',flexWrap:'wrap',justifyContent:'center',gap:'20px'}}>

{products.map((data, index) => (

<Productcard pname={data.productName} seller={data.sellerDetails} pimage={data.variations[0].productImages[0]} variation={data.variations[0]} pid={data._id} key={index} userdata={{...formData,selectedCategoryId}}/>

 ))}

</div>

{hasMore === false && products.length === 0 && <h3>There are no products in this category.</h3> }

<div style={{width:'100%',display:'flex',justifyContent:'center',marginTop:'40px'}}>

<div ref={ref} style={{ height: "10px",  }}></div>
</div>

    </div>}
</>

    </>
  );
};

export default Page;




const NestedCategoryDropdown = ({selectedCategoryId, setSelectedCategoryId,fetchProducts,setPage,setProducts,setcategory,setHasMore,formData}) => {
  
  const [categories, setcategories] = useState([]);  




    const fetchcategory = async () => {
        
      
      document.querySelector('.loaderoverlay').style.display = 'flex';
  
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/category/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch Category');
        }
  
        const data = await response.json();

        //setrootcategories(data); // Adjust based on your API response
        
        setcategories(data)
        document.querySelector('.loaderoverlay').style.display = 'none';
        console.log(categories)
      } catch (err) {
        document.querySelector('.loaderoverlay').style.display = 'none';
      } finally {
        
      }
    };
    console.log(categories)
  
    useEffect(() => {
  
      fetchcategory();
    }, []);

  
    // State for tracking which categories are expanded
    const [expandedCategories, setExpandedCategories] = useState({});
    
 
    
    // State for tracking if the menu is open in mobile view
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    
    
    // State for tracking mobile mode
    const [isMobile, setIsMobile] = useState(false);
    
    // Ref for dropdown container (to detect clicks outside)
    const dropdownRef = useRef(null);
  
    // Function to toggle category expansion
    const toggleCategory = (categoryId, event) => {
      // Stop event propagation to prevent parent categories from toggling
      event.stopPropagation();
      
      setExpandedCategories(prev => ({
        ...prev,
        [categoryId]: !prev[categoryId]
      }));
    };
  
    // Function to handle category selection
    const handleCategorySelect = (categoryId, event) => {
      // Stop event propagation to prevent parent categories from toggling
      event.stopPropagation();
      
      // Set selected category
      setSelectedCategoryId(categoryId);
      console.log(`Selected category ID: ${categoryId}`);
      
      // For categories with no children, you might want to close mobile menu
      if (isMobile) {
        setMobileMenuOpen(false);
      }
    };
  
    // Handle window resize for responsive behavior
    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
      };
      
      // Initial check
      handleResize();
      
      // Set listener
      window.addEventListener('resize', handleResize);
      
      // Cleanup
      return () => window.removeEventListener('resize', handleResize);
    }, []);
  
    // Handle clicks outside the dropdown to close it
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setMobileMenuOpen(false);
        }
      };
  
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);
  
    // Category Item Component (Recursive)
    const CategoryItem = ({ category, level = 0 }) => {
      const hasChildren = category.children && category.children.length > 0;
      const isExpanded = expandedCategories[category.id];
      const isSelected = selectedCategoryId === category.id;
      
      return (
        <li 
          className={`category-item676 ${hasChildren ? 'has-children676' : ''} ${isExpanded ? 'expanded676' : ''} ${isSelected ? 'selected676' : ''}`}
        >
          <div 
            className={`category-header676 level-${level}676 ${isSelected ? 'selected676' : ''}`}
            onClick={(e) => {
              handleCategorySelect(category.id, e);
              if (hasChildren) toggleCategory(category.id, e);
            }}
          >
            {/* {category.image && (
              <div className="category-image-container676">
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="category-image676"
                />
              </div>
            )} */}

           {category.children.length === 0 && <button className='catpro66' 
           onClick={()=>{

            if(!formData.name || !formData.phone){
              alert('Please enter your phone number and your name to see the products.')
              return;
            }else{
              canrun_Inview=false;
            setPage(1)
            setProducts([])
            setHasMore(true);
            setcategory(category.name)
            fetchProducts(category.id,1)
          }
           
           }}>
                see products
            </button>}

            <span className="category-name676">{category.name}</span>
            {hasChildren && (
              <span className="category-arrow676">
                {isExpanded ? '▼' : '▶'}
              </span>
            )}
          </div>
          
          {hasChildren && (
            <ul className={`subcategory-list676 ${isExpanded ? 'visible676' : ''}`}>
              {category.children.map(child => (
                <CategoryItem key={child.id} category={child} level={level + 1} />
              ))}
            </ul>
          )}
        </li>
      );
    };
  
    return (
      <div className="nested-dropdown-container676" ref={dropdownRef}>
        {/* Mobile Toggle Button */}
        {isMobile && (
          <button 
            className="mobile-menu-toggle676"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? 'Close Categories ✕' : 'Browse Categories ☰'}
          </button>
        )}
        
        {/* Category Menu - Visible by default on desktop, toggle on mobile */}
        <div className={`category-dropdown676 ${isMobile && !mobileMenuOpen ? 'hidden676' : ''}`}>
          <div className="dropdown-header676">
            <h3>Select Category</h3>
          </div>
          <ul className="category-list676">
            {categories.map(category => (
              <CategoryItem key={category.id} category={category} />
            ))}
          </ul>
        </div>
  
        {/* Selected Category Display (For demonstration) */}
        {/* {selectedCategoryId && (
          <div className="selected-category-display676">
            <p>Selected Category ID: <strong>{selectedCategoryId}</strong></p>
          </div>
        )} */}
  
     
      </div>
    );
  };


  
