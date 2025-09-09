'use client'
import './page.css'
import Link from 'next/link';
import  { useState,useEffect } from "react";
import Goback from '../../back.js'
 import usePreventNumberInputScroll from '../../component/usePreventNumberInputScroll.js';
    import getCategoryNestingLevel from '../../component/getCategoryNestingLevel.js';


export default function Page() {

  const [activeCategory, setActiveCategory] = useState(null);
    const [activeCategoryforproduct, setactiveCategoryforproduct] = useState(null);
  const [updateCategory, setupdateCategory] = useState(null);
  const [changeurl, setchangeurl] = useState(false);
  const [addcategory, setAddCategory] = useState(false);
  const [subcategory, setsubcategory] = useState(false);
  const [categories, setCategories] = useState([]);
  const [canshowCategoryProducts, setcanshowCategoryProducts] = useState(false);
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
        
      

          </div>


          <div className="category-actions">
           
          <NestedDropdown342 categories={categories} changeurl={setchangeurl} activeCategory={activeCategory} setActiveCategory={setActiveCategory} setupdateCategory={setupdateCategory} setcanshowCategoryProducts={setcanshowCategoryProducts} setactiveCategoryforproduct={setactiveCategoryforproduct}/>

{canshowCategoryProducts &&  <ShowCategoryProducts activeCategoryid={activeCategoryforproduct} />}

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
      const token = localStorage.getItem('seotoken');

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
      const token = localStorage.getItem('seotoken');

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
              placeholder="Enter Title"
              value={categorytitle}
              onChange={(e) => setCategorytitle(e.target.value)}
            />
        </div>

         <div className="input-group">
          <label htmlFor="Keywords">Enter Keywords</label>
          <textarea className='form-input' placeholder="Enter meta keywords (comma separated)" value={categorykeywords} onChange={(e) => setCategorykeywords(e.target.value)}></textarea>
        </div>
          
          <div className="input-group">
          <label htmlFor="description">Enter Description</label>
          <textarea className='form-input' placeholder="Enter Description" value={categoryDescription} onChange={(e) => setCategoryDescription(e.target.value)}></textarea>
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


const NestedDropdown342 = ({changeurl,categories,activeCategory, setActiveCategory,setupdateCategory,setcanshowCategoryProducts,setactiveCategoryforproduct}) => {
 
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

                   <i className="fas fa-boxes" onClick={()=>{
                     setactiveCategoryforproduct(category.id)
                    setcanshowCategoryProducts(true)
                    }} style={{fontSize:'15px',color:'purple'}}></i>

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



// Component to show products of a specific category
function ShowCategoryProducts({ activeCategoryid }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [showEditMeta, setShowEditMeta] = useState(false);
  const [productname, setproductname] = useState('');
  useEffect(() => {
    if (activeCategoryid) {
      fetchCategoryProducts();
    }
  }, [activeCategoryid]);

  const fetchCategoryProducts = async () => {
    setLoading(true);
    setError(null);
    
    try {

          const token = localStorage.getItem('seotoken');

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/seo/products/category/${activeCategoryid}`,
        {
        method: "GET",
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }), // Add token if it exists
        }}
      );

       const result = await response.json();
       
      if (!response.ok) {
        throw new Error(result.message || 'Failed to fetch products');
      }
      
      if (result.success) {
        setProducts(result.data);
      } else {
        setError('Failed to load products');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEditMeta = (productId,productname) => {
    setSelectedProductId(productId);
    setShowEditMeta(true);
    setproductname(productname)
  };

  const handleCloseEditMeta = () => {
    setShowEditMeta(false);
    setSelectedProductId(null);
  };

  if (loading) {
    return (
      <div className="category-products-container" style={{ padding: '20px' }}>
        <p>Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="category-products-container" style={{ padding: '20px' }}>
        <p style={{ color: 'red' }}>{error}</p>
      </div>
    );
  }

  return (
    <div className="category-products-container" style={{ 
      padding: '20px', 
      backgroundColor: '#f9f9f9', 
      borderRadius: '8px',
      marginTop: '10px',
      maxHeight: '400px',
      overflowY: 'auto',
      maxWidth:'600px'
    }}>
      <h4 style={{ marginBottom: '15px', fontSize: '18px' }}>
        Category Products ({products.length})
      </h4>
      
      {products.length === 0 ? (
        <p>No products found in this category.</p>
      ) : (
        <div className="products-list">
          {products.map((product) => (
            <div 
              key={product.productid} 
              className="product-item" 
              style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                padding: '10px 0',
                borderBottom: '1px solid #eee'
              }}
            >
              <span style={{ flex: 1, fontSize: '14px' }}>
                {product.productname}
              </span>
              <button
                onClick={() => handleEditMeta(product.productid,product.productname)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '5px'
                }}
                title="Edit Product Meta"
              >
                <i className="fas fa-pencil-alt" style={{ fontSize: '14px', color: '#007bff' }}></i>
              </button>
            </div>
          ))}
        </div>
      )}

      {showEditMeta && (
        <EditProductMeta 
          productId={selectedProductId} 
          onClose={handleCloseEditMeta}
         productname={productname}
        />
      )}
    </div>
  );
}


// Component to edit product meta details
function EditProductMeta({ productId, onClose,productname }) {
  const [metaData, setMetaData] = useState({
    metatitle: '',
    metadescription: '',
    metakeywords: ''
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

 console.log(metaData)
   const fetchproductmetadetails = () => {

       const token = localStorage.getItem('seotoken');

    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/seo/products/${productId}/meta`, {
        method: 'GET', // or PUT/PATCH depending on your API
        headers: {
          ...(token && { Authorization: `Bearer ${token}` })
        }
      })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.metatitle )

        setMetaData({   
    metatitle: data.data.metatitle || '',
    metadescription: data.data.metadescription || '',
    metakeywords: data.data.metakeywords || ''})
      })

      .catch((error) => console.error("Error fetching meta details:", error));
  };

  useEffect(() => {
   fetchproductmetadetails()
  }, []);

  const handleInputChange = (field, value) => {
    setMetaData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async () => {
    if (!metaData.metatitle.trim()) {
      alert('Meta title is required');
      return;
    }

    setSaving(true);

    try {
      const token = localStorage.getItem('seotoken');
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/seo/products/${productId}/meta`, {
        method: 'PUT', // or PUT/PATCH depending on your API
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` })
        },
        body: JSON.stringify(metaData)
      });

      if (response.ok) {
        alert('Product meta details updated successfully!');
        onClose();
      } else {
        const errorData = await response.json();
        alert('Failed to update meta details: ' + (errorData.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error updating meta details:', error);
      alert('Something went wrong while updating meta details!');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="modal-overlay" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <div className="edit-meta-modal" style={{
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '8px',
        width: '90%',
        maxWidth: '500px',
        maxHeight: '80vh',
        overflowY: 'auto'
      }}>

        <div style={{textAlign:'center'}}>
        <h4 style={{ fontSize: '20px',marginBottom: '5px' }}>
          Edit Product Meta Details
        </h4>
<p style={{marginBottom: '20px',color:'blue'}}>{productname} *</p>
</div>

        <div className="form-group" style={{ marginBottom: '20px' }}>
          <label className="form-label" style={{ 
            display: 'block', 
            marginBottom: '5px', 
            fontWeight: 'bold' 
          }}>
            Meta Title *
          </label>
          <input
            type="text"
            className="form-input"
            placeholder="Enter meta title"
            value={metaData.metatitle}
            onChange={(e) => handleInputChange('metatitle', e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px'
            }}
          />
        </div>

        <div className="form-group" style={{ marginBottom: '20px' }}>
          <label className="form-label" style={{ 
            display: 'block', 
            marginBottom: '5px', 
            fontWeight: 'bold' 
          }}>
            Meta Description
          </label>
          <textarea
            className="form-input"
            placeholder="Enter meta description"
            rows="4"
            value={metaData.metadescription}
            onChange={(e) => handleInputChange('metadescription', e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px',
              resize: 'vertical'
            }}
          />
        </div>

        <div className="form-group" style={{ marginBottom: '30px' }}>
          <label className="form-label" style={{ 
            display: 'block', 
            marginBottom: '5px', 
            fontWeight: 'bold' 
          }}>
            Meta Keywords
          </label>
          <input
            type="text"
            className="form-input"
            placeholder="Enter meta keywords (comma separated)"
            value={metaData.metakeywords}
            onChange={(e) => handleInputChange('metakeywords', e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px'
            }}
          />
        </div>

        <div className="button-group" style={{ 
          display: 'flex', 
          gap: '10px', 
          justifyContent: 'flex-end' 
        }}>
          <button
            className="cancel-button"
            onClick={onClose}
            disabled={saving}
            style={{
              padding: '10px 20px',
              border: '1px solid #ddd',
              backgroundColor: '#f8f9fa',
              color: '#333',
              borderRadius: '4px',
              cursor: saving ? 'not-allowed' : 'pointer',
              opacity: saving ? 0.6 : 1
            }}
          >
            Cancel
          </button>
          <button
            className="save-button"
            onClick={handleSubmit}
            disabled={saving}
            style={{
              padding: '10px 20px',
              border: 'none',
              backgroundColor: '#007bff',
              color: 'white',
              borderRadius: '4px',
              cursor: saving ? 'not-allowed' : 'pointer',
              opacity: saving ? 0.6 : 1
            }}
          >
            {saving ? 'Saving...' : 'Save Meta Details'}
          </button>
        </div>
      </div>
    </div>
  );
}