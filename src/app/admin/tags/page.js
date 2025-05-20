'use client'
import '../mylayout.css'
import './page.css'
import Link from 'next/link';
import  { useState,useEffect } from "react";

export default function page() {

  const [data,setdata] = useState([]);
  const [showtag,setshowtag] = useState(false);
  const [updatetag,setupdatetag] = useState(false);
  const [confirmationOpen, setconfirmationOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const toggleconfirmation = (id = null) => {
    setSelectedId(id);
    setconfirmationOpen(!confirmationOpen);
  };
 


   const handledata = () => {
     
  
      document.querySelector('.loaderoverlay').style.display='flex';
  
     const token = localStorage.getItem('admintoken');
  
  
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
              setdata([...data])
             document.querySelector('.loaderoverlay').style.display='none';

         
        })
        .catch((err) => {
          document.querySelector('.loaderoverlay').style.display='none';
          console.log(err)
        });
    };
  
    const deleteFunc = (id) => {
      console.log(id)
      if (!id) return;
  
      const token = localStorage.getItem('admintoken');

      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/tag/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }), // Add token if it exists
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to delete the employee.');
          }
          return response.json();
        })
        .then((data) => {
          console.log(data)
          setdata((prevData) => prevData.filter((item) => item._id !== id));
          toggleconfirmation();
        })
        .catch((err) => {
          console.log(err);
        });
    };
    
  
    useEffect(() => {
      handledata();
    },[]);


     
  return (
    <div className="orders-container">
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
      <h3>Tags</h3>

      
      <button className="AddProduct" onClick={() => {
        setshowtag(true)
        }}>
      Create Tag &nbsp; <i className="fas fa-plus" style={{marginRight:'10px'}}></i>
      </button>

      </div>

     
      
      <div className="table-wrapper">
        <table className="orders-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((data, index) => (
              <tr key={index}>
                <td>#{index + 1}</td>
                <td>{data.tagName}</td>
                <td>
                  <img src={data.tagImage} width={'80px'} height={'80px'} style={{borderRadius: '50%',objectFit:'cover'}}  alt="" />
                </td>
                <td>

                 <img src="\icons\editp.svg" alt=""  style={{cursor:'pointer',marginRight:'5px'}}
                  onClick={() => {
                    setupdatetag({name:data.tagName,image:data.tagImage,id:data._id})
                    setshowtag(true)}}/>

                  <img src="\icons\deletep.svg" alt="" style={{cursor:'pointer'}}  onClick={() => toggleconfirmation(data._id)}/>
         
                </td>
             
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {confirmationOpen && (
        <div className="modal-overlay">
 
           <div className="confirmation-box">
      <div className="icon">
        {/* Replace the src below with the actual path to your image */}
        <img
          src="\icons\confar.png"
          alt="Icon"
          className="icon-image"
        />
      </div>
      <p className="message">Are you sure ?</p>
      <div className="button-group">
        <button className="button no-button" onClick={toggleconfirmation}>No</button>
        <button className="button yes-button" onClick={() => deleteFunc(selectedId)}>Yes</button>
      </div>
    </div>
             </div>
      )}

      {showtag && <Addtag refreashtag={handledata} setshowtag={setshowtag} updatetag={updatetag} setupdatetag={setupdatetag}/>}

    </div>
  );
}




function Addtag({refreashtag,setshowtag,updatetag=false,setupdatetag}) {
  
  const [tagName, settagName] = useState('');

  const [tagimage, settagimage] = useState([]);
  
  const [tagimageurl, settagimageurl] = useState([]);

  console.log(tagimageurl,tagimage)

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    settagimage(files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    settagimageurl((prevImages) => [...imageUrls]);

  };

  const removeImagec = (index) => {
    settagimage(tagimage.filter((_, i) => i !== index));
    settagimageurl(tagimageurl.filter((_, i) => i !== index));
  };


  const handleSubmit = async () => {
    if (!tagName || tagimage.length === 0) {
      alert("Please fill all fields and upload an image.");

      return;
    
    }

        document.querySelector('.loaderoverlay').style.display='flex';
  
    const formData = new FormData();

    formData.append("tagName", tagName);
    // formData.append("description", categoryDescription);
    formData.append("tagImage", tagimage[0]); // Only sending one file

  
    try {
      const token = localStorage.getItem('admintoken');

      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/tag`, {
        method: "POST",
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }), // Add token if it exists
        },
        body: formData,
      });
  
      if (response.ok) {
        alert("tag added successfully!");
        setshowtag(false);
        refreashtag(); // Reload category list
         document.querySelector('.loaderoverlay').style.display='none';
      } else {
        const errorData = await response.json();
        alert("Failed to add tag: " + errorData.message);
         document.querySelector('.loaderoverlay').style.display='none';
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong!");
       document.querySelector('.loaderoverlay').style.display='none';
    }
  };


 const handleupdate  = async () => {


    if (!tagName || tagimageurl.length === 0) {
      alert("Please fill all fields and upload an image.");

      return;
    
    }
  
       document.querySelector('.loaderoverlay').style.display='flex';

    const formData = new FormData();

    formData.append("tagName", tagName);
    // formData.append("description", categoryDescription);
    formData.append("tagImage", tagimage[0]); // Only sending one file


  
    try {
      const token = localStorage.getItem('admintoken');

      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/tag/${updatetag.id}`, {
        method: "PUT",
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }), // Add token if it exists
        },
        body: formData,
      });
  
      if (response.ok) {
        alert("tag updated successfully!");
        setshowtag(false);
        refreashtag(); // Reload category list
         document.querySelector('.loaderoverlay').style.display='none';
      } else {
        const errorData = await response.json();
        alert("Failed to update tag: " + errorData.message);
         document.querySelector('.loaderoverlay').style.display='none';
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong!");
       document.querySelector('.loaderoverlay').style.display='none';
    }
  };

  

   useEffect(() => {

if(updatetag !== false){
    settagimageurl([updatetag.image]);
    settagName(updatetag.name)
}

  }, []);

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
              value={tagName}
              onChange={(e) => settagName(e.target.value)}
            />
          </div>
          
          {/* <div className="input-group">
          <label htmlFor="description">Enter Description</label>
          <textarea className='form-input' placeholder="Explain the category" value={categoryDescription} onChange={(e) => setCategoryDescription(e.target.value)}></textarea>
        </div> */}

          <div className="image-uploader">

{tagimage.length < 1 && <div className="add-image">
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
 {tagimageurl.map((image, index) => (
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
            <button className="cancel-button" onClick={()=>{
              setshowtag(false)
              setupdatetag(false)
            }}>
              Cancel
            </button>
            <button className="save-button" onClick={()=>{
              updatetag === false ? handleSubmit():handleupdate()
              setupdatetag(false)
              }}>
            { updatetag === false ? <>Add Tag</> : <>Update Tag</>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

