'use client'

import './page.css'
import Reviews from '../../component/Detail-tab/Detail.jsx'
import icon from '../../../../public/icons/locationmark.svg'
import Link from 'next/link';

import { useRef ,useState} from 'react';

export default function Products() {
  
  const productsContainerRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [zoomScale, setZoomScale] = useState(1);
  const [ModalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
  
    setModalOpen(!ModalOpen);
  };


  const scrollLeft = () => {
    if (productsContainerRef.current) {
      productsContainerRef.current.scrollBy({
        left: -300,
        behavior: 'smooth',
      });
    }
  };

  const scrollRight = () => {
    if (productsContainerRef.current) {
      productsContainerRef.current.scrollBy({
        left: 300,
        behavior: 'smooth',
      });
    }
  };

  const handleThumbnailClick = (event) => {
    const thumbnails = document.querySelectorAll('.thumbnail-container img');
    thumbnails.forEach((img) => img.removeAttribute('id'));

    const clickedImage = event.target;
    clickedImage.id = 'active';

    const mainImage = document.querySelector('.main-image');
    if (mainImage) {
      mainImage.src = clickedImage.src;
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

  return (
    <>
      <p className='breadcumb'>Electronics / Gadgets / Nanocharge Batt..</p>

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
              src="https://blog.playstation.com/tachyon/2024/09/1d0ae4eca1d42d088bde97428219325f0c6d5a51.jpg?resize=1088%2C612&crop_strategy=smart"
              alt="Product"
              className="main-image"
            />
          </div>

          <div className="wideslp">
            <img src="\icons\smallleft.svg" alt="Scroll Left" onClick={scrollLeft} />

            <div className="thumbnail-container" ref={productsContainerRef} onClick={handleThumbnailClick}>
              <img
                src="https://blog.playstation.com/tachyon/2024/09/1d0ae4eca1d42d088bde97428219325f0c6d5a51.jpg?resize=1088%2C612&crop_strategy=smart"
                alt="Thumbnail 1"
                id='active'
              />
              <img
                src="https://blog.playstation.com/tachyon/2024/09/16554ba2a0ada3fc7c2f05187300c4a3fb1966f1.jpg?resize=1088%2C612&crop_strategy=smart"
                alt="Thumbnail 2"
              />
              <img
                src="https://bsmedia.business-standard.com/_media/bs/img/article/2023-10/11/thumb/featurecrop/1200X900/1697008191-1052.jpg"
                alt="Thumbnail 3"
              />
              <img
                src="https://blog.playstation.com/tachyon/2024/09/1d0ae4eca1d42d088bde97428219325f0c6d5a51.jpg?resize=1088%2C612&crop_strategy=smart"
                alt="Thumbnail 4"
              />

<img
                src="https://bsmedia.business-standard.com/_media/bs/img/article/2023-10/11/thumb/featurecrop/1200X900/1697008191-1052.jpg"
                alt="Thumbnail 2"
              />
              <img
                src="https://blog.playstation.com/tachyon/2024/09/1d0ae4eca1d42d088bde97428219325f0c6d5a51.jpg?resize=1088%2C612&crop_strategy=smart"
                alt="Thumbnail 3"
              />

<img
                src="https://blog.playstation.com/tachyon/2024/09/1d0ae4eca1d42d088bde97428219325f0c6d5a51.jpg?resize=1088%2C612&crop_strategy=smart"
                alt="Thumbnail 2"
              />
              <img
                src="https://blog.playstation.com/tachyon/2024/09/1d0ae4eca1d42d088bde97428219325f0c6d5a51.jpg?resize=1088%2C612&crop_strategy=smart"
                alt="Thumbnail 3"
              />
            </div>

            <img src="\icons\smallright.svg" alt="Scroll Right" onClick={scrollRight} />
          </div>
        </div>

 {/* Right Section - Product Details */}
 <div className="product-details" style={{padding:'0px'}}>
          <p className='productname'>NanoCharge 5000mAh Battery Module</p>
          <div className="seller">
            <p>ElectroMart Direct  </p>
            
            <div className='mylocationp'>
   <span className="location">
  <img src="\icons\locationmark.svg" alt="" />
  
            Lucknow
          </span> 
  
          </div> 
          
          <div className='mylocationp'>
   <span className="location">
  <img src="\icons\rightgreen.svg" alt="" />
  
  Return Available
          </span> 
  
          </div>
  
          </div>
          
          {/* Quantity Section */}
          <div className="quantity-section">
           <div style={{display:'flex',flexDirection:'column',gap:'5px',marginRight:'20px'}}>
           <label style={{fontSize:'13px',color:'#1389F0'}}>Enter Quantity</label>
           <input type="number"  min={1} />
           </div>
           
            <span className="save-info">You Saved Total ₹520!</span>
          </div>
  
          {/* Pricing Section */}
          <div className="pricing">
            <span className="current-price">₹ 552.00</span>
            <span className="original-price">₹ 667.00</span>
          </div>
  
          {/* Buttons */}
          <div className="button-group">
          <Link href="/home/cart">
            <button className="add-to-cart pb">
              <i className="fas fa-shopping-cart"></i> Add to Cart
            </button>
            </Link>
            <button className="contact-supplier pb"  onClick={toggleModal} >
              Contact Supplier <i className="fas fa-arrow-right"></i>
            </button>
          </div>
  
          {/* Variations */}
          <div className="variations">
            <button className='variations-selected'>Variation 1</button>
            <button>Variation 2</button>
          </div>
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

      <Reviews />

      
      {ModalOpen && (
        <div className="modal-overlay">
          <div className="modal-container">
            <button onClick={toggleModal} className="modal-close-btn">
              <i className="fa fa-times"></i>
            </button>
            <h2>Ask your queries here!</h2>
            <p>The Supplier will get back to you soon!</p>
            <form className='modalform'>
              <input type="text" placeholder="Type your name *" required />
              <input type="text" placeholder="Type your phone no*" required />
              <input type="email" placeholder="Type your email*" required />
              <textarea placeholder="Type details"></textarea>
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}
  
    </>
  );
  }


  