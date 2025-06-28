'use client'
import './page.css'
import Link from 'next/link';
import { useState,useEffect } from "react";


export default function Page() {

  const [data,setdata] = useState(null);
  const [productimages, setproductimages] = useState([]);
  const [images, setImages] = useState([]);



  
  console.log(data,images,productimages)

  
  const handleImageUpload = (event) => {

    const myfiles = Array.from(event.target.files);
    setproductimages((prevImages) => [...prevImages, ...myfiles])
 
    const files = Array.from(event.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setImages((prevImages) => [...prevImages, ...imageUrls]);

    
  };

  const removeImage = (index) => { 

    setproductimages(productimages.filter((_, i) => i !== index));
    setImages(images.filter((_, i) => i !== index));

  };


  const removepreImage = (id,index) => {

    console.log(id)
    deletebanner(id)
    setdata(data.filter((_, i) => i !== index))

  };



  const getbanners = () => {
 
  
  document.querySelector('.loaderoverlay').style.display='flex';
 
    const token = localStorage.getItem('admintoken');
  
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/banner/`, {
        method: 'GET',
        headers: {
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
   setdata(data.data)
   
   document.querySelector('.loaderoverlay').style.display='none';
       
      })
      .catch((err) => {
      
        alert(err.message);
        document.querySelector('.loaderoverlay').style.display='none';
      });
  };
  

   useEffect(() => {
    getbanners();
        
       },[]);



  const send = async () => {

    async function convertImagesToBase64(imagesArray) {
        const convertToBase64 = (file) => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = (error) => reject(error);
            });
        };
    
        const base64Images = [];
    
        for (const imageObj of imagesArray) {
            try {
                // Convert image-like object to an actual File object
                
    
                // Convert to Base64
                const base64String = await convertToBase64(imageObj);
                base64Images.push(base64String);
            } catch (error) {
                console.error("Error converting image to Base64:", error);
            }
        }
    
        return base64Images;
    }
    
    // Example usage
    // Assuming 'uploadedProductData' is your JSON object with actual File objects in productImages
    convertImagesToBase64(productimages).then((result) => {
        console.log('Converted Product Data:', result);
    postdata(result)
    });
    
  document.querySelector('.loaderoverlay').style.display='flex';
  
  console.log(data)
   

    
    async function postdata(data) {
console.log(data)

 const token = localStorage.getItem('admintoken');
  

    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/banner/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }), // Add token if it exists
      },
      body: JSON.stringify({images:data}),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return response.json().then((errorData) => {
            throw new Error(errorData.message ||errorData.error || 'Failed. Please try again.');
          });
        }
      })
      .then((data) => {
            alert(data.message)
            document.querySelector('.loaderoverlay').style.display='none';
       
      })
      .catch((err) => {
      alert(err.message || err.error)
        console.log(err)
        document.querySelector('.loaderoverlay').style.display='none';
      });

    }
  };


  async function deletebanner(id) {

     const token = localStorage.getItem('admintoken');
     

        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/banner?bannerId=${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }), // Add token if it exists
          }
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
                alert(data.message)
                document.querySelector('.loaderoverlay').style.display='none';
           
          })
          .catch((err) => {
          
            console.log(err)
            document.querySelector('.loaderoverlay').style.display='none';
          });
    
        }

  

  return (
    <div className="order-details">
    

   { data &&  <div className="add-product-container">
        {/* <img src="\icons\iiii.svg" alt="" width={'400px'}/> */}
      <div className="basic-info" style={{width:'600px'}}>
        <h2>Upload Home Page Banners</h2>
        

        <div className="image-uploader" style={{marginBottom:'50px'}}>
 
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
         onClick={(e) => {
           e.preventDefault();
           removeImage(index)}}
       >
         <i className="fas fa-times"></i>
       </button>
     </div>
   ))}

{data.map((image, index) => (
          <div className="image-container" key={index}>
            <img src={image.url} alt={`preview-${index}`} />
            <button
              className="remove-button"
              onClick={(e) => {
                e.preventDefault();
                removepreImage(image._id,index)}}
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
        ))}


 </div>
 
 </div>
        <button className="create-new" onClick={()=>send()}>
        Update
             <i className="fas fa-arrow-right"></i>
            </button>
      </div>
      
    </div>}


    </div>
  );
}

