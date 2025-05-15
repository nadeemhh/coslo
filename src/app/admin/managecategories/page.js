'use client'
import './page.css'
import Link from 'next/link';
import  { useState,useEffect } from "react";
import Goback from '../../back.js'
 import usePreventNumberInputScroll from '../../component/usePreventNumberInputScroll.js';


export default function Page() {

  const [activeCategory, setActiveCategory] = useState(null);
  const [changeurl, setchangeurl] = useState(false);
  const [addcategory, setAddCategory] = useState(false);
  const [subcategory, setsubcategory] = useState(false);
  const [categories, setCategories] = useState([]);

 
  const refreshCategories = () => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/category/`)
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching categories:", error));
  };

  useEffect(() => {
    refreshCategories(); // Load categories on mount
 
    
  }, []);
  


  const toggleAddCategory = (data) => {
   
    setsubcategory(data)
    setAddCategory(!addcategory);
  };


 


 // stop scrool when active input
  usePreventNumberInputScroll()


  return (
    <div className="order-details">
      <div className="header">
        <button className="back-button">
        <Goback/>
        </button>
        <h2>Add/Update Product</h2>
     
      </div>

      <div className="add-product-container">
     
 <div className="add-category-location" style={{height:'650px',overflowY:'auto'}}>
        <div className="add-category">
          <h2>Available Categories</h2>
         
          <div className="category-actions" style={{display:'flex',justifyContent:'flex-start',marginBottom:'30px',gap:'30px'}}>
        
        <button className="create-new" onClick={()=>toggleAddCategory(false)}>
         Create Category
         <i className="fas fa-plus"></i>
       </button>
       {changeurl && <button className="create-new"  onClick={()=>toggleAddCategory(true)}>
         Create Sub Category
         <i className="fas fa-plus"></i>
       </button>}
          </div>


          <div className="category-actions">
           
          <NestedDropdown342 categories={categories} changeurl={setchangeurl} activeCategory={activeCategory} setActiveCategory={setActiveCategory} />

       {addcategory && <Addcategory  subcategory={subcategory} toggleaddcategory={toggleAddCategory} refreshCategories={refreshCategories} activeCategory={activeCategory} setActiveCategory={setActiveCategory}/>}

          </div>

        

        </div>
      </div>
    </div>

   
    </div>
  );
}



function Addcategory({ toggleaddcategory, refreshCategories ,subcategory,activeCategory, setActiveCategory}) {
  const [categoryName, setCategoryName] = useState('');
  const [categoryDescription, setCategoryDescription] = useState('');
  const [categoryImages, setCategoryImages] = useState([]);
  const [categoryimages, setcategoryimages] = useState([]);

  console.log(categoryimages,categoryImages)
  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    setCategoryImages(files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setcategoryimages((prevImages) => [...prevImages, ...imageUrls]);

  };

  const removeImagec = (index) => {
    setCategoryImages(categoryImages.filter((_, i) => i !== index));
    setcategoryimages(categoryimages.filter((_, i) => i !== index));
  };


  const handleSubmit = async () => {
    if (!categoryName || categoryImages.length === 0) {
      alert("Please fill all fields and upload an image.");

      return;
    
    }
  
    const formData = new FormData();
    formData.append("name", categoryName);
    // formData.append("description", categoryDescription);
    formData.append("categoryImage", categoryImages[0]); // Only sending one file
  if(subcategory){
   let id = document.querySelector('.active342').getAttribute('categoryid');
   console.log(id)
    formData.append("parent", id);
  }
    // Append multiple images
  // categoryImages.forEach((image, index) => {
  //   formData.append("categoryImage", image); // Ensure your backend supports multiple images
  // });
  
    try {
      const token = localStorage.getItem('admintoken');

      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/category/create`, {
        method: "POST",
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }), // Add token if it exists
        },
        body: formData,
      });
  
      if (response.ok) {
        alert("Category added successfully!");
        setActiveCategory(null)
        toggleaddcategory();
        refreshCategories(); // Reload category list
      } else {
        const errorData = await response.json();
        alert("Failed to add category: " + errorData.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong!");
    }
  };
  

  return (
    <div className="modal-overlay">
      <div className="addcategory">
        <div className="form" style={{ width: '600px' }}>
          <div className="form-group">
            <label className="form-label">Enter Category Name</label>
            <input
              type="text"
              className="form-input"
              placeholder="Eg. Fashion"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
          </div>
          
          {/* <div className="input-group">
          <label htmlFor="description">Enter Description</label>
          <textarea className='form-input' placeholder="Explain the category" value={categoryDescription} onChange={(e) => setCategoryDescription(e.target.value)}></textarea>
        </div> */}

          <div className="image-uploader">

{categoryImages.length < 1 && <div className="add-image">
 <input
   type="file"
   id="categoryImageInput"
   onChange={handleImageUpload}
   accept="image/*"
 />
 <label htmlFor="categoryImageInput" className="add-image-label">
 <img src="\icons\upcross.svg" alt=""  width={'30px'}/>
   <p>Add Image</p>
 </label>
</div>}


<div className="image-preview" style={{width:'auto'}}>
 {categoryimages.map((image, index) => (
   <div className="image-container" key={index}>
     <img src={image} alt={`preview-${index}`} />
     <button
       className="remove-button"
       onClick={() => removeImagec(index)}
     >
       <i className="fas fa-times"></i>
     </button>
   </div>
 ))}
</div>
</div>



          <div className="button-group">
            <button className="cancel-button" onClick={toggleaddcategory}>
              Cancel
            </button>
            <button className="save-button" onClick={handleSubmit}>
              Add Category
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}



// Function to generate unique paths for each category
const generatePaths = (categories, parentPath = '') => {
  return categories.map((category, index) => {
    const path = `${parentPath}/${category.name}-${index}`;
    const updatedCategory = { ...category, path };

    if (category.subcategories) {
      updatedCategory.subcategories = generatePaths(category.subcategories, path);
    }

    return updatedCategory;
  });
};


const NestedDropdown342 = ({changeurl,categories,activeCategory, setActiveCategory}) => {
 
  const [openCategories, setOpenCategories] = useState([]);
//  const [activeCategory, setActiveCategory] = useState(null);



  const toggleCategory = (id) => {
    setOpenCategories((prev) =>
      prev.includes(id) ? prev.filter((cat) => cat !== id) : [...prev, id]
    );
  };

  const setActive = (id) => {
    setActiveCategory(id);
    changeurl(true)
  };

  const renderCategories = (categories, level = 0) => {
    return (
      <ul className={`category-list342 level-${level}`}>
        {categories.map((category) => {
          const hasChildren = category.children && category.children.length > 0;
          const isOpen = openCategories.includes(category.id);
          const isActive = activeCategory === category.id;

          return (
            <li key={category.id}>
              <div className={`category-item342 ${isActive ? "active342" : ""}`}  categoryid={category.id} >
                {hasChildren ? (
                  <button className="toggle-icon342" onClick={() => toggleCategory(category.id)}>
                    {isOpen ? <i className="fas fa-minus" style={{fontSize:'17px',color:'#9b9b9b'}}></i> : <i className="fas fa-plus" style={{fontSize:'17px',color:'#9b9b9b'}}></i>}
                  </button>
                ) : (
                  <span className="cross-icon342">
                    <i className="fas fa-plus" style={{ visibility: "hidden" ,fontSize:'17px',color:'#9b9b9b'}}></i>
                  </span>
                )}
                <span onClick={() => setActive(category.id)} className="category-name342">
                  {category.name}
                </span>
              </div>
              {hasChildren && isOpen && (
                <div className="subcategory-container342">
                  {renderCategories(category.children, level + 1)}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    );
  };

  return <div className="dropdown-container342">{renderCategories(categories)}</div>;
};