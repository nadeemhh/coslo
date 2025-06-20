'use client'
import './page.css'
import Link from 'next/link';
import  { useState,useEffect } from "react";
import Goback from '../../back.js'
 import usePreventNumberInputScroll from '../../component/usePreventNumberInputScroll.js';
    import getCategoryNestingLevel from '../../component/getCategoryNestingLevel.js';


export default function Page() {

  const [activeCategory, setActiveCategory] = useState(null);
  const [updateCategory, setupdateCategory] = useState(null);
  const [changeurl, setchangeurl] = useState(false);
  const [addcategory, setAddCategory] = useState(false);
  const [subcategory, setsubcategory] = useState(false);
  const [categories, setCategories] = useState([]);
console.log(categories)
 
  const refreshCategories = () => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/category/`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setCategories(data)
      })
      .catch((error) => console.error("Error fetching categories:", error));
  };

  useEffect(() => {
    refreshCategories(); // Load categories on mount
 
    
  }, []);
  


  const toggleAddCategory = (data) => {
   
    setsubcategory(data)
    setAddCategory(!addcategory);
  };


   const toggleupdate = () => {
   
    setupdateCategory(!updateCategory);
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
          <h2 style={{fontSize:'25px'}}>Available Categories</h2>
         
          <div className="category-actions" style={{display:'flex',justifyContent:'flex-start',marginBottom:'30px',gap:'30px'}}>
        
        <button className="create-new" onClick={()=>toggleAddCategory(false)}>
         Create Root Category
         <i className="fas fa-plus"></i>
       </button>
       
<button className="create-new"  onClick={()=>{
       changeurl ? toggleAddCategory(true) : alert('Click on a category to create its subcategory')
        }}>
         Create Sub Category
         <i className="fas fa-plus"></i>
       </button>

          </div>


          <div className="category-actions">
           
          <NestedDropdown342 categories={categories} changeurl={setchangeurl} activeCategory={activeCategory} setActiveCategory={setActiveCategory} setupdateCategory={setupdateCategory}/>

       {addcategory && <Addcategory  subcategory={subcategory} toggleaddcategory={toggleAddCategory} refreshCategories={refreshCategories} activeCategory={activeCategory} setActiveCategory={setActiveCategory} setchangeurl={setchangeurl} allcategory={categories}/>}

          </div>

{updateCategory && <Addcategory toggleaddcategory={toggleupdate} refreshCategories={refreshCategories} updateCategory={updateCategory}/>}
        

        </div>
      </div>
    </div>

   
    </div>
  );
}



function Addcategory({ toggleaddcategory, refreshCategories ,subcategory=false,activeCategory=false, setActiveCategory=false ,updateCategory=false,setchangeurl,allcategory=null}) {
  
  const [categoryName, setCategoryName] = useState('');
  const [categoryDescription, setCategoryDescription] = useState('');
  const [categorytitle, setCategorytitle] = useState('');
  const [categorykeywords, setCategorykeywords] = useState('');
  const [categoryImages, setCategoryImages] = useState([]);
  const [categoryimages, setcategoryimages] = useState([]);

  console.log(categoryName,categoryDescription,categorytitle,categorykeywords)
  
  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    setCategoryImages(files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setcategoryimages((prevImages) => [...imageUrls]);

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
    
if(subcategory){
      let catid = document.querySelector('.active342').getAttribute('categoryid');

      
 if(getCategoryNestingLevel(allcategory,catid) >= 1){
     alert('Cannot create a category inside a child category')
    return;
  }
}

        document.querySelector('.loaderoverlay').style.display='flex';
  
       

    const formData = new FormData();

    formData.append("name", categoryName);
    formData.append("title", categorytitle);
    formData.append("keywords", categorykeywords);
    formData.append("description", categoryDescription);
    formData.append("categoryImage", categoryImages[0]);

  if(subcategory){
   let id = document.querySelector('.active342').getAttribute('categoryid');
   console.log(id)
    formData.append("parent", id);
  }

  
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
        setchangeurl(false)
        toggleaddcategory();
        refreshCategories(); // Reload category list
         document.querySelector('.loaderoverlay').style.display='none';
      } else {
        const errorData = await response.json();
        alert("Failed to add category: " + errorData.message);
         document.querySelector('.loaderoverlay').style.display='none';
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong!");
       document.querySelector('.loaderoverlay').style.display='none';
    }
  };


 const handleupdate  = async () => {


    if (!categoryName || categoryimages.length === 0) {
      alert("Please fill all fields and upload an image.");

      return;
    
    }
  
       document.querySelector('.loaderoverlay').style.display='flex';

    const formData = new FormData();

    formData.append("name", categoryName);
      formData.append("title", categorytitle);
    formData.append("keywords", categorykeywords);
    formData.append("description", categoryDescription);
    formData.append("categoryImage", categoryImages[0]); // Only sending one file


  
    try {
      const token = localStorage.getItem('admintoken');

      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/category/update/${updateCategory.id}`, {
        method: "PATCH",
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }), // Add token if it exists
        },
        body: formData,
      });
  
      if (response.ok) {
        alert("Category updated successfully!");
        toggleaddcategory();
        refreshCategories(); // Reload category list
         document.querySelector('.loaderoverlay').style.display='none';
      } else {
        const errorData = await response.json();
        alert("Failed to update category: " + errorData.message);
         document.querySelector('.loaderoverlay').style.display='none';
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong!");
       document.querySelector('.loaderoverlay').style.display='none';
    }
  };

  

   useEffect(() => {

if(updateCategory !== false){
  console.log(updateCategory)
    setcategoryimages([updateCategory.image]);
    setCategoryName(updateCategory.name||'')
    setCategoryDescription(updateCategory.description||'')
    setCategorytitle(updateCategory.title||'')
    setCategorykeywords(updateCategory.keywords||'')
}

  }, []);

  return (
    <div className="modal-overlay">
      <div className="addcategory">
        <div className="form" style={{ width: '600px',height:'90vh',overflowY:'auto' }}>
          <div className="form-group">
            <label className="form-label">Enter Category Name</label>
            <input
              type="text"
              className="form-input"
              placeholder=""
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
          </div>

           <div className="input-group">
          <label htmlFor="Title">Enter Title</label>
          <input
              type="text"
              className="form-input"
              placeholder=""
              value={categorytitle}
              onChange={(e) => setCategorytitle(e.target.value)}
            />
        </div>

         <div className="input-group">
          <label htmlFor="Keywords">Enter Keywords</label>
          <textarea className='form-input' placeholder="" value={categorykeywords} onChange={(e) => setCategorykeywords(e.target.value)}></textarea>
        </div>
          
          <div className="input-group">
          <label htmlFor="description">Enter Description</label>
          <textarea className='form-input' placeholder="" value={categoryDescription} onChange={(e) => setCategoryDescription(e.target.value)}></textarea>
        </div>

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
            <button className="save-button" onClick={()=>{
              updateCategory === false ? handleSubmit():handleupdate()
              }}>
            { updateCategory === false ? <>Add Category</> : <>Update Category</>}
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


const NestedDropdown342 = ({changeurl,categories,activeCategory, setActiveCategory,setupdateCategory}) => {
 
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
                    {isOpen ? <i className="fas fa-minus" style={{fontSize:'17px',color:'black'}}></i> : <i className="fas fa-plus" style={{fontSize:'17px',color:'black'}}></i>}
                  </button>
                ) : (
                  <span className="cross-icon342">
                    <i className="fas fa-plus" style={{ visibility: "hidden" ,fontSize:'17px',color:'black'}}></i>
                  </span>
                )}

                <i className="fas fa-pencil-alt" style={{fontSize:'15px',color:'green'}} onClick={()=>(setupdateCategory({id:category.id,name:category.name,image:category.image,title:category.title,description:category.description,keywords:category.keywords}))}></i>
                
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