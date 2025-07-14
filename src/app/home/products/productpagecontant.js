'use client'

import './page.css'
import Reviews from '../../component/Detail-tab/Detail.jsx'
import icon from '../../../../public/icons/locationmark.svg'
import Link from 'next/link';
import getDiscountedPrice from '../../component/discountpricecalc.js'
import scrollToElement from '../../component/scrollToElement.js'
import cartcountget from '../../component/cartcountget.js';
import usePreventNumberInputScroll from '../../component/usePreventNumberInputScroll.js';
import ProductVariations from '../../component/ProductVariations.js'
import Viewerproductpage from '../../component/viewerproductpage.js'

import { useRef ,useState,useEffect} from 'react';

export default function Productpagecontant() {
  
  const [isuser, setisuser] = useState(false);
  const productsContainerRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [zoomScale, setZoomScale] = useState(1);
  const [quantity, setQuantity] = useState(0);
  const [ModalOpen, setModalOpen] = useState(false);
  const [returnmodal, setreturnmodal] = useState(false);
  const [pageUrl, setPageUrl] = useState('');
  const [data,setdata] = useState(null);
  const [isdata,setisdata] = useState(false);
  const [showslab,setshowslab] = useState(0);
  const [saved,setsaved] = useState(0);
  const [amazonproduct,setamazonproduct] = useState(null);
const [activeIndex, setActiveIndex] = useState(0);


console.log(data);

  const handleChange = (event) => {
    setQuantity(event.target.value);

    let quantity= event.target.value;
let price=data.variations[showslab].mrp;

    console.log(quantity,price)

    const discountData = data.variations[showslab].priceSlabs;

    function calculatePrice(quantity, price) {
      quantity = parseInt(quantity, 10); // Ensure quantity is a number
  
    
  
      let selectedCategory = discountData.find(item => quantity >= item.min && quantity <= item.max);
  
      // If quantity is greater than max range, apply the highest discount
      if (!selectedCategory && quantity > Math.max(...discountData.map(item => item.max))) {
          selectedCategory = discountData.reduce((prev, curr) => (curr.discount > prev.discount ? curr : prev), { discount: 0, deliveryFee: 0 });
      }
  
      // If quantity does not match any range, set discount to 0
      if (!selectedCategory) {
          selectedCategory = { type: "none", discount: 0, deliveryFee: 0 };
          
      }
  
      let discountAmount = (price * selectedCategory.discount) / 100;
      let finalPrice = price - discountAmount;
      let savings = discountAmount.toFixed(2); // Amount saved
  
      setsaved(savings*quantity)
      return {
          category: selectedCategory.type,
          originalPrice: price,
          discount: selectedCategory.discount,
          discountedPrice: finalPrice,
          savings: savings,
          deliveryFee: selectedCategory.deliveryFee
      };
  }
  
  // Example Usage
  console.log(calculatePrice(quantity, price));
  };

  const toggleModal = () => {
  
    setModalOpen(!ModalOpen);
  };




const scrollBy = 50; // moderate scroll amount

const scrollLeft = () => {
  if (activeIndex > 0) {
    const newIndex = activeIndex - 1;
    setActiveIndex(newIndex);
    updateActiveImage(newIndex);

    if (productsContainerRef.current) {
      productsContainerRef.current.scrollBy({
        left: -scrollBy,
        behavior: 'smooth',
      });
    }
  }
};

const scrollRight = () => {
  const images = data?.variations[showslab]?.productImages || [];
  if (activeIndex < images.length - 1) {
    const newIndex = activeIndex + 1;
    setActiveIndex(newIndex);
    updateActiveImage(newIndex);

    if (productsContainerRef.current) {
      productsContainerRef.current.scrollBy({
        left: scrollBy,
        behavior: 'smooth',
      });
    }
  }
};

const handleThumbnailClick = (event) => {
  const thumbnails = document.querySelectorAll('.thumbnail-container img');
  thumbnails.forEach((img) => img.removeAttribute('id'));

  const clickedImage = event.target;

  if (!clickedImage.classList.contains("thumbnail-container")) {
    clickedImage.id = 'active';
    const index = [...thumbnails].indexOf(clickedImage);
    setActiveIndex(index);

    const mainImage = document.querySelector('.main-image');
    if (mainImage) {
      mainImage.src = clickedImage.src;
    }
  }
};

const updateActiveImage = (index) => {
  const thumbnails = document.querySelectorAll('.thumbnail-container img');
  thumbnails.forEach((img) => img.removeAttribute('id'));

  if (thumbnails[index]) {
    thumbnails[index].id = 'active';
    const mainImage = document.querySelector('.main-image');
    if (mainImage) {
      mainImage.src = thumbnails[index].src;
    }
  }
};


  const handleZoomClick = () => {
    setIsModalOpen(true);
    setZoomScale(1);
  };

  const handleZoomIn = () => {
    setZoomScale((prevScale) => Math.min(prevScale + 0.1, 3));
  };

  const handleZoomOut = () => {
    setZoomScale((prevScale) => Math.max(prevScale - 0.1, 0.5));
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


  function getproductdetails(productId) {

    
    console.log(productId);
    
        document.querySelector('.loaderoverlay').style.display = 'flex';

        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/product/${productId}`)
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              return response.json().then((errorData) => {
               
                throw new Error(errorData.error || 'Failed');
              });
            }
          })
          .then((data) => {
          console.log(data.data)
         
          setdata(data.data)
          setisdata(true)
        
          document.querySelector('.loaderoverlay').style.display = 'none';
          })
          .catch((err) => {
            document.querySelector('.loaderoverlay').style.display = 'none';
            console.log(err)
           
           
          });
    
      
    }

   
 
    function getamazonprice(url) {
console.log(url)
    if(!url.startsWith('http')){
return;
    }
      
         
  
          fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/product/compare?url=${url}`)
            .then((response) => {
              if (response.ok) {
                return response.json();
              } else {
                return response.json().then((errorData) => {
                 
                  throw new Error(errorData.error || 'Failed');
                });
              }
            })
            .then((data) => {
            console.log(data.data)
           
            //setamazonproduct(data.data)
          
          
            })
            .catch((err) => {
           
              console.log(err)
             
             
            });
      
        
      }

      
 // if(isdata === true && amazonproduct === null){  getamazonprice(data.amazoneProductUrl)}

function addtocart(variationId) {
  
let pquantity=Number(quantity);

if(!pquantity){
  alert('Add Quantity')
return;}

console.log(variationId,pquantity);

    document.querySelector('.loaderoverlay').style.display = 'flex';
  
    const userData = {
      
      variationId,
      quantity:pquantity
    };
  
    const token = localStorage.getItem('buyertoken');

    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/cart/add`, {
      method: 'POST',
       headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }), // Add token if it exists
    },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return response.json().then((errorData) => {
           
            throw new Error(errorData.error || 'Failed');
          });
        }
      })
      .then((data) => {
        document.querySelector('.loaderoverlay').style.display = 'none';
        alert(data.message)
        cartcountget()
      })
      .catch((err) => {
        document.querySelector('.loaderoverlay').style.display = 'none';
        console.log(err)
        alert(err);
       
      });

  
}


function addtowishlist(productId) {
  

      document.querySelector('.loaderoverlay').style.display = 'flex';
    
    
      const token = localStorage.getItem('buyertoken');
  
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/buyer/wishlist?productId=${productId}`, {
        method: 'POST',
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
             
              throw new Error(errorData.error || 'Failed');
            });
          }
        })
        .then((data) => {
          document.querySelector('.loaderoverlay').style.display = 'none';
          alert(data.message)
        })
        .catch((err) => {
          document.querySelector('.loaderoverlay').style.display = 'none';
          console.log(err)
          alert(err);
         
        });
  
    
  }


  
 


useEffect(() => {
  
  scrollToElement('navbar')
  // Get the current page URL when the component mounts
  setPageUrl(window.location.href);
  console.log(window.location.href)
  
//   function getCookie(name) {
//     let cookies = document.cookie.split("; ");
//     for (let cookie of cookies) {
//         let [key, value] = cookie.split("=");
//         if (key === name) return value;
//     }
//     return null;
// }

// Check if "token" exists
if (localStorage.getItem("buyertoken")) {
   setisuser(true)
}

  const id = new URLSearchParams(window.location.search).get("id");
  getproductdetails(id)

 
}, []);


const sendquotation = () => {
 

      // Accessing input fields using querySelector
      const name = document.querySelector('.modalform input[name="name"]').value;
      const phone = document.querySelector('.modalform input[name="phone"]').value;
      const email = document.querySelector('.modalform input[name="email"]').value;
      const details = document.querySelector('.modalform textarea[name="details"]').value;
  
      console.log( name, phone, email, details ,data._id );

    

document.querySelector('.loaderoverlay').style.display='flex';


  const userData = {
    message:details,
    productId:data._id,
    phone,

  };

console.log('send quotation',userData)


  const token = localStorage.getItem('buyertoken');

  fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/quotation/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }), // Add token if it exists
    },
    body: JSON.stringify(userData),
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
          toggleModal()
     
    })
    .catch((err) => {
    
      alert(err.message);
      document.querySelector('.loaderoverlay').style.display='none';
    });
};


function formatPhoneNumber(number) {
  number = number.toString(); // Ensure it's a string
  number.replace('+','')

  return number.startsWith("91") ? number : "91" + number;
}

 // stop scrool when active input
  usePreventNumberInputScroll()


  function isScreenWidthLessOrEqual(maxWidth) {
  return window.innerWidth <= maxWidth;
}


   
  return (
    <> {isdata &&
    <>
      {/* <p className='breadcumb'>Electronics / Gadgets / Nanocharge Batt..</p> */}

      <div className="product-container">
        {/* Left Section - Product Image */}
        <div className="product-image-section">
          <div className='imgparent'>
            <img
              src="\icons\zoom.svg"
              alt="Zoom Icon"
              style={{
                position: 'absolute',
                bottom: '0',
                right: '0',
                padding: '3px',
                background: 'white',
                cursor: 'pointer',
                borderRadius: '2px',
              }}
              onClick={handleZoomClick}
            />

            <img
              src={data?.variations[showslab]?.productImages[0] || '/images/noimgavl.jpg'}
              alt="Product Image"
              className="main-image"
            />
          </div>

          <div className="wideslp">
            <img src="\icons\smallleft.svg" alt="Scroll Left" onClick={scrollLeft} />

            <div className="thumbnail-container" ref={productsContainerRef} onClick={handleThumbnailClick}>
  {data?.variations[showslab]?.productImages.map((url, index) => (
    <img
      src={url}
      alt={`Thumbnail ${index + 1}`}
      id={index === activeIndex ? 'active' : ''}
      key={index}
    />
  ))}
</div>

            <img src="\icons\smallright.svg" alt="Scroll Right" onClick={scrollRight} />
          </div>


{isScreenWidthLessOrEqual(768) === false && <Viewerproductpage productType={data.productType} productVideo={data.productVideo} pdfFile={data.pdfFile} propertyData={{location:data?.location}} />}
    
        </div>

 {/* Right Section - Product Details */}
 <div className="product-details89" style={{padding:'0px'}}>
          <p className='productname'>{data.productName}</p>
          <div className="seller">
            <p>{data.BrandName}</p>
            
            {/* <div className='mylocationp'>
   <span className="location">
  <img src="\icons\locationmark.svg" alt="" />
  
            Lucknow
          </span> 
  
          </div>  */}
          
          {data.productType === "product" && <> {data.variations[showslab].isReturnable && <div className='mylocationp'>
   <span className="location">
  <img src="\icons\rightgreen.svg" alt="" />
  
  Return Available
          </span> 
  
          </div>}

          {data.variations[showslab].isReturnable && <div className='mylocationp' style={{cursor:'pointer'}}onClick={()=>(setreturnmodal(true))}>
   <span className="location">
   Return Reasons ?
          </span> 
  
          </div>}
          </>
          }

          {data.sellerDetails.subscription.plan !== 'FREE' &&  data.sellerDetails.subscription.status === "ACTIVE" && <button className="verified">
          Recommended
         <img src="\icons\veri.svg" width={'12px'} alt="" />
        </button>}


          {isuser &&   <div className='mylocationp' style={{cursor:'pointer'}} onClick={()=>(addtowishlist(data._id))}>
   <span className="location">
 ❤️
  add to wishlist
          </span> 
  
          </div>}

          
          {data.sellerDetails.subscription.plan !== 'FREE' &&  data.sellerDetails.subscription.status === "ACTIVE" && (data.sellerDetails?.complianceCertificateFile && <a
      href={data.sellerDetails.complianceCertificateFile}
      target="_blank"
      rel="noopener noreferrer"
    >
          <div className='mylocationp'>
   <span className="location">
  <img src="\icons\Compliance.svg" width={'15px'} alt="" />
  {data.productType === "product" ? <>Quality Certificate</> : <>Legally Verified</> }
          </span> 
  
          </div>

          </a>)}

          <a
      href={`https://api.whatsapp.com/send?text=Check%20this%20out%20${encodeURIComponent(pageUrl)}`}
      target="_blank"
      rel="noopener noreferrer"
    >
          <div className='mylocationp'>
   <span className="location">
  <img src="\icons\share.svg" width={'15px'} alt="" />
  Share
          </span> 
  
          </div>

          </a>

         
          {data.sellerDetails.subscription.plan !== 'FREE' &&  data.sellerDetails.subscription.status === "ACTIVE" && <a href={`https://wa.me/+91${data.sellerDetails.phone}`}>
          <div className='mylocationp'>
   <span className="location">
  <img src="\icons\whatsappi.svg" width={'18px'} alt="" />
  Contact
          </span> 
  
          </div>
          </a>}
  
          </div>
          

{/* Pricing Section */}
<div className="pricing">
         {data.productType === "product" ? <>
          <span className="price-mrp">MRP</span>
            <span className="current-price">₹{data.variations[showslab].mrp}</span>
           </>: <span className="current-price" style={{fontSize:'20px'}}>₹ {data.variations[showslab].mrp * data.variations[showslab].priceSlabs[0].min}</span>}
          </div>


          <div className="priceTableContainer565">
         {data.productType === "product"  ? <table className="priceTable565">
      <thead className="tableHeader565" style={{background:'#dee1e4'}}>
      {data.variations[showslab].priceSlabs.length > 0 &&  <tr className="headerRow565">
          <th className="tableCell565">Quantity</th>
          <th className="tableCell565">Discount</th>
          <th className="tableCell565">Net Price</th>
        </tr>
        }
      </thead>
      <tbody className="tableBody565" style={{background:'white'}}>
      {data.variations[showslab].priceSlabs.map((sdata, index) => (
        
        <tr className="tableRow565" key={index}>
          <td className="tableCell565">{sdata.min}-{sdata.max} items</td>
          <td className="tableCell565">{sdata.discount}%</td>
          <td className="tableCell565" style={{fontSize:'18px',fontWeight:'600',color:'#097CE1'}}>₹{(getDiscountedPrice(sdata.discount,data.variations[showslab].mrp).toFixed(0))} </td>
        </tr>
       
       
      ))}
      </tbody>
    </table>
    : 
     (data.variations[showslab]?.priceSlabs.length > 0 && <table className="priceTable565">
      <thead className="tableHeader565" style={{background:'#dee1e4'}}>
      <tr className="headerRow565">
          <th className="tableCell565">Per sq ft cost</th>
          <th className="tableCell565">Total sq ft</th>
          <th className="tableCell565">Total cost</th>
        </tr>

      </thead>
      <tbody className="tableBody565" style={{background:'white'}}>
        <tr className="tableRow565">
          <td className="tableCell565">₹ {data.variations[showslab].mrp}</td>
          <td className="tableCell565">{data.variations[showslab].priceSlabs[0].min}</td>
          <td className="tableCell565" style={{fontSize:'18px',fontWeight:'600',color:'#097CE1'}}>₹ {data.variations[showslab].mrp * data.variations[showslab].priceSlabs[0].min} </td>
        </tr>
      
      </tbody>
    </table>)}
    </div>

<div className="technical-details" style={{textAlign:'left',margin:'20px 0px'}}>
<ProductVariations setshowslab={setshowslab} pdata={data} showslab={showslab} setActiveIndex={setActiveIndex} productType={data.productType}/>
</div>

    {/* <div className="technical-details" style={{textAlign:'left',margin:'20px 0px'}}>

 {data.commonAttributes.length  > 0 || data.variations[showslab].attributes.length > 0 ? <p style={{fontSize:'20px',fontWeight:'600',color:'#007bff'}}>Product Details :-</p> : <></>}

    {data.commonAttributes.map((data, index) => (

<p key={index} style={{fontSize:'17px'}}><strong>{data.key}:</strong> {data.value}</p>

))}

    {data.variations[showslab].attributes.map((data, index) => (

                        <p key={index} style={{fontSize:'17px'}}><strong>{data.key}:</strong> {data.value}</p>

                      ))}

                    </div> */}

                   

          {/* Quantity Section */}
        {data.productType === "product"  &&  <div className="quantity-section">
           <div style={{display:'flex',flexDirection:'column',gap:'5px',marginRight:'20px'}}>
           <label style={{fontSize:'15px',color:'#1389F0'}}>Enter Quantity</label>
           <input type="number" value={quantity}    onChange={handleChange} />
           </div>
           
            <span className="save-info">You Saved Total ₹{(saved).toFixed(0)}!</span>
          </div>}
  
          
  
          {/* Buttons */}
          <div className="button-group">

   

            {isuser &&
           
           <>
           <button className="contact-supplier pb"  onClick={toggleModal} >
            Request Quotation <i className="fas fa-arrow-right"></i>
            </button>

          {data.productType === "product"  ?  (data.variations[showslab].stock !== 0 && <button className="add-to-cart pb" onClick={()=>{addtocart(data.variations[showslab]._id)}}>
              <i className="fas fa-shopping-cart"></i> Add to Cart
            </button>):  <a href={`https://wa.me/+91${data.sellerDetails.phone}`} className="whatsapp-supplier pb">
            Chat With Seller  <img src="\icons\whatsappi.svg" width={'25px'} alt="" />
            </a>
          }

            </>
            }

          </div>

             { !isuser && <div className="button-group">
           <a href="/home/login" style={{color:'blue'}}>
            Log in or create an account to buy this product. <i className="fas fa-arrow-right"></i>
            </a>
            </div>}
  
        </div>

      </div>



      {isModalOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 200,
          }}
          onClick={closeModal}
        >
          <div
            style={{
              position: 'relative',
              width: '80%',
              height: '80%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                background: 'none',
                border: 'none',
                color: 'red',
                fontSize: '24px',
                cursor: 'pointer',
                zIndex: 210,
                fontSize:'25px'
              }}
            >
              <i className="fa fa-times"></i>
            </button>

            <img
              src={document.querySelector('.main-image').src}
              alt="Zoomed Product"
              style={{
                transform: `scale(${zoomScale})`,
                transition: 'transform 0.3s ease',
                maxHeight: '80%',
                maxWidth: '80%',
                objectFit: 'contain',
              }}
            />

            <div style={{ marginTop: '10px', display: 'flex', gap: '10px',zIndex: 210 }}>
              <button onClick={handleZoomIn} style={{ padding: '2px 10px', fontSize: '16px', cursor: 'pointer',border:'2px solid black',backgroundColor:'white' }}>+</button>
              <button onClick={handleZoomOut} style={{ padding: '2px 10px', fontSize: '16px', cursor: 'pointer' ,border:'2px solid black',backgroundColor:'white'}}>-</button>
            </div>
          </div>
        </div>
      )}

{isScreenWidthLessOrEqual(768) === true && <Viewerproductpage productType={data.productType} productVideo={data.productVideo} pdfFile={data.pdfFile} propertyData={{location:data?.location}}  />}

      <Reviews pid={data._id} description={data.description}/>

      
      {ModalOpen && (
        <div className="modal-overlay">
          <div className="mymodal-container">
          <div style={{display:'flex',justifyContent:'flex-end'}}>
          <button onClick={toggleModal} className="modal-close-btn">
            <i className="fa fa-times"></i>
          </button>
          </div>
            <h2>Ask your queries here!</h2>
            <p>The Supplier will get back to you soon!</p>
            <form className='modalform' onSubmit={(e)=>{

             e.preventDefault();
              sendquotation()
              }}>
            <input type="text" name="name" placeholder="Type your name *" required />
        <input type="number" name="phone" placeholder="Type your phone no*" required />
        <input type="email" name="email" placeholder="Type your email*" required />
        <textarea name="details" placeholder="Type Your Message" required></textarea>
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}
  
  {returnmodal && (
        <div className="modal-overlay">
          <div className="mymodal-container">
          <div style={{display:'flex',justifyContent:'flex-end'}}>
          <button onClick={()=>(setreturnmodal(false))} className="modal-close-btn">
            <i className="fa fa-times"></i>
          </button>
          </div>
            {data.variations[showslab].isReturnable && data?.reasonForReturn?.length  > 0 && <div className="technical-details" style={{textAlign:'left'}}>

 {data?.reasonForReturn?.length  > 0 ? <p style={{fontSize:'20px',color:'#007bff',fontWeight:'600'}}>Reasons to request a product return :-</p> : <></>}

    {data?.reasonForReturn.map((data, index) => (

<p key={index} style={{fontSize:'17px'}}>{index+1}. {data}</p>

))}
                    </div>}
          </div>
        </div>
      )}

    </>
    } </>
  );
  }


  