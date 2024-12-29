'use client'
import './page.css'
import '../../../component/component-css/cartcard.css'
// import "../../../component/component-css/ui.css";
import Link from 'next/link';
import  { useState } from "react";
import Goback from '../../../back.js'


export default function Page() {
  const [ModalOpen, setModalOpen] = useState(false);
  const [confirmationOpen, setconfirmationOpen] = useState(false);
  const [addcategory, setaddcategory] = useState(false);
  const [showinput,setshowinput]=useState(false);
  const [showinput2,setshowinput2]=useState(false);

  const [images, setImages] = useState([]);

  const [pricings, setPricings] = useState([
    { netPrice: 1290, stock: 250 },
    { netPrice: 1290, stock: 250 },
    { netPrice: 1290, stock: 250 },
  ]);



  const toggleaddcategory = () => {
  
    setaddcategory(!addcategory);
  };


  const toggleconfirmation = () => {
  
    setconfirmationOpen(!confirmationOpen);
  };

  const toggleModal = () => {
  
    setModalOpen(!ModalOpen);
  };



  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setImages((prevImages) => [...prevImages, ...imageUrls]);
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };


  

  const addPricing = () => {
    setPricings([...pricings, { netPrice: 1290, stock: 250 }]);
  };

  const removePricing = (index) => {
    const updatedPricings = pricings.filter((_, i) => i !== index);
    setPricings(updatedPricings);
  };

  return (
    <div className="order-details">
      <div className="header">
        <button className="back-button">
        <Goback/>
        </button>
        <h2>Add/Update Product</h2>
     
      </div>

      <div className="add-product-container">
      <div className="basic-info">
        <h2>Basic Information</h2>
        <div className="input-group">
          <label htmlFor="product-name">Enter Product Name *</label>
          <input id="product-name" type="text" placeholder="John Doe" />
        </div>
        <div className="input-group">
          <label htmlFor="brand-name">Enter Brand Name *</label>
          <input id="brand-name" type="text" placeholder="John Doe" />
        </div>
        <div className="input-group">
          <label htmlFor="description">Enter Description</label>
          <textarea id="description" placeholder="Explain the product"></textarea>
        </div>
        <div className="input-group">
          <label htmlFor="product-video">Enter Product Video (Optional)</label>
          <input id="product-video" type="text" placeholder="John Doe" />
        </div>
      </div>
      <div className="add-category-location">
        <div className="add-category">
          <h2>Add/Create Category</h2>
          <div className="category-path">Electronics &gt; Electrical Equipments &gt; <span style={{color:'#097CE1'}}>Bulbs</span></div>
          <div className="category-actions">
            <select>
              <option>Select Existing</option>
              <option>option 1</option>
              <option>option 2</option>
              <option>option 3</option>
            </select>
            <button className="create-new"  onClick={toggleaddcategory}>
             Create New
             <i className="fas fa-plus"></i>
            </button>
          </div>
        </div>
        <div className="add-location">
          <h2>Add Location/s</h2>
          <div className="input-group">
            <label htmlFor="pincode">Enter PinCode</label>
            <input id="pincode" type="text" placeholder="000000" />
          </div>
          <div className="selected-locations">
            <span>201301 <img src="\icons\smcross.svg" alt="" /></span>
            <span>111011 <img src="\icons\smcross.svg" alt="" /></span>
            <span>301504 <img src="\icons\smcross.svg" alt="" /></span>
          </div>
        </div>
      </div>
    </div>

    <p style={{margin:'40px 0px',textAlign:'left'}}>Add Product Images</p>
    <div className="image-uploader">
 
      <div className="add-image">
        <input
          type="file"
          id="imageInput"
          multiple
          onChange={handleImageUpload}
          accept="image/*"
        />
        <label htmlFor="imageInput" className="add-image-label">
        <img src="\icons\upcross.svg" alt=""  width={'30px'}/>
          <p>Add Image</p>
        </label>
      </div>
      <div className="image-preview">
        {images.map((image, index) => (
          <div className="image-container" key={index}>
            <img src={image} alt={`preview-${index}`} />
            <button
              className="remove-button"
              onClick={() => removeImage(index)}
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
        ))}
      </div>
    </div>


    <div className="container">
      <div className="pricing-section">
        <h2 className="section-title">Pricing</h2>
        {pricings.map((pricing, index) => (
          <div key={index} className="pricing-item">
            <span>
              {index + 1}. Net Price:<><span style={{color:'#1389F0'}}> ₹{pricing.netPrice}</span></> / Stock: <><span style={{color:'#1389F0'}}>{pricing.stock}</span></> Units
            </span>
            <div className="actions">
              <button className="edit-btn">
                <i className="fas fa-edit"></i>
              </button>
              <button className="delete-btn" onClick={() => removePricing(index)}>
                <i className="fas fa-trash-alt"></i>
              </button>
            </div>
          </div>
        ))}
        <button className="add-btn" onClick={toggleModal}>
          Add Pricing <i className="fas fa-plus"></i>
        </button>
      </div>
      <div className="others-section">
        <h2 className="section-title">Others</h2>

        <div className="input-group" style={{width:'350px', display:'flex',justifyContent:'space-between',border:'1px solid black',alignItems:'center',padding:'5px',borderRadius:'5px'}}> 
        <label htmlFor=""> Enable Free Delivery</label> 
        {showinput && <input type='number' placeholder='Enter Amount' className="input-group" style={{width:'110px',marginBottom:'0px'}}/>}
          <label className="switch">
  <input type="checkbox"  onChange={()=>(setshowinput(!showinput))}/>
  <span className="slider round"></span>
</label>

</div>

<div className="input-group" style={{width:'350px', display:'flex',justifyContent:'space-between',border:'1px solid black',alignItems:'center',padding:'5px',borderRadius:'5px'}}> 
        <label htmlFor=""> Enable Return</label> 
        {showinput2 && <input type='number' placeholder='Enter Max Days' className="input-group" style={{width:'130px',marginBottom:'0px'}}/>}
          <label className="switch">
  <input type="checkbox"  onChange={()=>(setshowinput2(!showinput2))}/>
  <span className="slider round"></span>
</label>

</div>

        <div className="input-group">
          <label>Enter additional taxes if available</label>
          <input type="text" placeholder="500" />
        </div>
      </div>
    </div>

    <div className="action-buttons">
        <button className="cancel-button">Cancel</button>
        <button className="update-button">Save Changes</button>
      </div>


     

      {ModalOpen && (
        <div className="modal-overlay">
 
           
      <form className="form">
        <div className="form-group">
          <label className="form-label">Original Net Price</label>
          <input
            type="text"
            className="form-input"
            placeholder="Eg. 500/-"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Stock Keeping Unit</label>
          <input
            type="text"
            className="form-input"
            placeholder="Eg. 1000"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Variant Name</label>
          <input
            type="text"
            className="form-input"
            placeholder="leave empty for single variant"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Repeat Buyer Discount (Optional)</label>
          <input
            type="text"
            className="form-input"
            placeholder="Enter additional discount in (%)"
          />
        </div>

        <div className="quantity-range">
          <div className="form-group">
            <label className="form-label">Enter Quantity Range</label>
            <div className="range-container">
              <input
                type="text"
                className="form-input small-input"
                placeholder="Lower Limit"
                style={{width:'100px'}}
              />
              <span className="range-icon">
                <i className="fas fa-arrow-right"></i>
              </span>
              <input
                type="text"
                className="form-input small-input"
                placeholder="Upper Limit"
                style={{width:'100px'}}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Enter Discount (%)</label>
            <input
              type="text"
              className="form-input"
              placeholder="Enter discount"
            />
          </div>
        </div>

        <div className="button-group">
          <button type="button" className="cancel-button" onClick={toggleModal}>
            Cancel
          </button>
          <button type="submit" className="save-button">
            Save Price
          </button>
        </div>
      </form>

        </div>
      )}


{confirmationOpen && (
        <div className="modal-overlay">
 
           <div className="confirmation-box">
      <div className="icon">
        {/* Replace the src below with the actual path to your image */}
        <img
          src="\icons\svggg.png"
          alt="Icon"
          className="icon-image"
        />
      </div>
      <p className="message">Are you sure ?</p>
      <div className="button-group">
        <button className="button no-button" onClick={toggleconfirmation}>No</button>
        <button className="button yes-button">Yes</button>
      </div>
    </div>
             </div>
      )}

      <>{addcategory && (<Addcategory toggleaddcategory={toggleaddcategory}/>)}</>


    </div>
  );
}

 function Addcategory({toggleaddcategory}) {


  const [categoryimages, setcategoryimages] = useState([]);

 
  
  const handleImageUploadc = (event) => {
    const files = Array.from(event.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setcategoryimages((prevImages) => [...prevImages, ...imageUrls]);
  };

  const removeImagec = (index) => {
    setcategoryimages(categoryimages.filter((_, i) => i !== index));
  };


  return (
      <div className="modal-overlay">

         
<div className="addcategory">
    <div className="form" style={{width:'600px'}}>
      <div className="form-group">
        <label className="form-label">Enter Category Name</label>
        <input
          type="text"
          className="form-input"
          placeholder="Eg. Fashion"
        />
      </div>


      <div className="image-uploader">

<div className="add-image">
 <input
   type="file"
   id="categoryImageInput"
   multiple
   onChange={handleImageUploadc}
   accept="image/*"
 />
 <label htmlFor="categoryImageInput" className="add-image-label">
 <img src="\icons\upcross.svg" alt=""  width={'30px'}/>
   <p>Add Image</p>
 </label>
</div>
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
        <button type="button" className="cancel-button" onClick={toggleaddcategory}>
          Cancel
        </button>
        <button type="submit" className="save-button">
        Add Category
        </button>
      </div>
      </div>
    </div>

           </div>
    
  )
}
