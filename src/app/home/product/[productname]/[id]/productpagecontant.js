'use client'

import './page.css'
import Reviews from '../../../../component/Detail-tab/Detail.jsx'
import icon from '../../../../../../public/icons/locationmark.svg'
import Link from 'next/link';
import getDiscountedPrice from '../../../../component/discountpricecalc.js'
import scrollToElement from '../../../../component/scrollToElement.js'
import cartcountget from '../../../../component/cartcountget.js';
import usePreventNumberInputScroll from '../../../../component/usePreventNumberInputScroll.js';
import ProductVariations from '../../../../component/ProductVariations.js'
import formatNumberIndian from '../../../../component/formatNumberIndian.js'
import Viewerproductpage from '../../../../component/viewerproductpage.js'
import { useParams } from "next/navigation";
import { useRef, useState, useEffect, Suspense } from 'react';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Productpagecontant() {
  const searchParams = useParams();
  const id = searchParams.id; // Get the 'id' from the URL
  const [isuser, setisuser] = useState(false);
  const productsContainerRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [zoomScale, setZoomScale] = useState(1);
  const [quantity, setQuantity] = useState(0);
  const [ModalOpen, setModalOpen] = useState(false);
  const [returnmodal, setreturnmodal] = useState(false);
  const [pageUrl, setPageUrl] = useState('');
  const [data, setdata] = useState(null);
  const [isdata, setisdata] = useState(false);
  const [showslab, setshowslab] = useState(0);
  const [saved, setsaved] = useState(0);
  const [amazonproduct, setamazonproduct] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);


  console.log(data);

  const showSuccess = (message = "Action completed successfully!") => {
    toast.success(message);
  };

  const handleChange = (event) => {
    setQuantity(event.target.value);

    let quantity = event.target.value;
    let price = data.variations[showslab].mrp;

    console.log(quantity, price)

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

      setsaved(savings * quantity)
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
    const images = data?.images || [];
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

        if (!data?.data?.productType) {
          data.data.productType = "product";
        }


        setdata(data.data)
        setisdata(true)
        setproductType(data.data.productType)

        document.querySelector('.loaderoverlay').style.display = 'none';
      })
      .catch((err) => {
        document.querySelector('.loaderoverlay').style.display = 'none';
        console.log(err)


      });


  }



  function getamazonprice(url) {
    console.log(url)
    if (!url.startsWith('http')) {
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

    let pquantity = Number(quantity);

    if (!pquantity) {
      alert('Add Quantity')
      return;
    }

    console.log(variationId, pquantity);

    document.querySelector('.loaderoverlay').style.display = 'flex';

    const userData = {

      variationId,
      quantity: pquantity
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


    getproductdetails(id)



  }, []);



  function setproductType(productType) {
    localStorage.setItem("productType", productType)
  }

  const sendquotation = () => {


    // Accessing input fields using querySelector
    const name = document.querySelector('.modalform input[name="name"]').value;
    const phone = document.querySelector('.modalform input[name="phone"]').value;

    if (phone.length < 10) {
      alert("Enter valid phone number")
      return;
    }

    console.log(name, phone, data._id);



    document.querySelector('.loaderoverlay').style.display = 'flex';


    const userData = {
      productId: data._id,
      name,
      phone,
      tags: [data?.tag],
      category: data?.category,
    };

    console.log('send quotation', userData)



    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/quotation/product-quotation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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

        showSuccess(data.message)
        document.querySelector('.loaderoverlay').style.display = 'none';
        toggleModal()

      })
      .catch((err) => {

        alert(err.message);
        document.querySelector('.loaderoverlay').style.display = 'none';
      });
  };


  function formatPhoneNumber(number) {
    number = number.toString(); // Ensure it's a string
    number.replace('+', '')

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
            <div className="imgparent">
              <div className="zoom-btn" onClick={handleZoomClick}>
                <img src="\icons\zoom.svg" alt="Zoom" />
              </div>

              <img
                src={data?.images[0] || '/images/noimgavl.jpg'}
                alt="Product Image"
                className="main-image"
              />
            </div>

            <div className="wideslp">
              <div className="nav-arrow" onClick={scrollLeft}>
                <img src="\icons\smallleft.svg" alt="Scroll Left" />
              </div>

              <div className="thumbnail-container" ref={productsContainerRef} onClick={handleThumbnailClick}>
                {data?.images.map((url, index) => (
                  <img
                    src={url}
                    alt={`Thumbnail ${index + 1}`}
                    id={index === activeIndex ? 'active' : ''}
                    key={index}
                  />
                ))}
              </div>

              <div className="nav-arrow" onClick={scrollRight}>
                <img src="\icons\smallright.svg" alt="Scroll Right" />
              </div>
            </div>
          </div>

          {/* Right Section - Product Details */}
          <div className="product-details89" style={{ padding: '0px' }}>
            <h1 className='productname'>{data.productName}</h1>
            <div className="seller">
              {isuser && <div className='mylocationp' style={{ cursor: 'pointer' }} onClick={() => (addtowishlist(data._id))}>
                <span className="location">
                  ❤️
                  add to wishlist
                </span>

              </div>}


              {data.sellerDetails.subscription.plan !== 'FREE' && data.sellerDetails.subscription.status === "ACTIVE" && (data.sellerDetails?.complianceCertificateFile && <a
                href={data.sellerDetails.complianceCertificateFile}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className='mylocationp'>
                  <span className="location">
                    <img src="\icons\Compliance.svg" width={'15px'} alt="" />
                    {data.productType === "product" ? <>Quality Certificate</> : <>Legally Verified</>}
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


              {data.sellerDetails.subscription.plan !== 'FREE' && data.sellerDetails.subscription.status === "ACTIVE" && <a href={`https://wa.me/+91${data.sellerDetails.phone}`}>
                <div className='mylocationp'>
                  <span className="location">
                    <img src="\icons\whatsappi.svg" width={'18px'} alt="" />
                    Contact
                  </span>

                </div>
              </a>}

            </div>



            {/* Pricing Section */}
            <div className="pricing-card">
              <div className="price-header">
                <i className="fas fa-tag"></i>
                <span>Estimated Price Range</span>
              </div>
              <div className="price-amount">
                <span className="price-value">₹{formatNumberIndian(data.priceRange.minPrice)}</span>
                <span className="price-range-label">to</span>
                <span className="price-value">₹{formatNumberIndian(data.priceRange.maxPrice)}</span>
              </div>
              {data.moq && (
                <div className="moq-info">
                  <i className="fas fa-truck"></i>
                  <span className="moq-label">MOQ:</span>
                  <span className="moq-value">{data.moq}</span>
                </div>
              )}
            </div>


            <div className="priceTableContainer565">
              <table className="priceTable565">
                <tbody className="tableBody565" style={{ background: 'white' }}>
                  <tr className="spec-title-row">
                    <td colSpan="2" className="spec-title-cell">
                      Product Specification
                    </td>
                  </tr>

                  {data?.commonAttributes.map((commonAttributes, index) => (
                    <tr className="tableRow565" key={index}>
                      <td className="tableCell565 spec-key">{commonAttributes.key}</td>
                      <td className="tableCell565 spec-value">{commonAttributes.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>




            {/* Buttons */}

            <div className="button-group" style={{ marginTop: '20px' }}>

              <button className="contact-supplier pb" onClick={toggleModal} >
                Request Quotation <i className="fas fa-arrow-right"></i>
              </button>
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
                  fontSize: '25px'
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

              <div style={{ marginTop: '10px', display: 'flex', gap: '10px', zIndex: 210 }}>
                <button onClick={handleZoomIn} style={{ padding: '2px 10px', fontSize: '16px', cursor: 'pointer', border: '2px solid black', backgroundColor: 'white' }}>+</button>
                <button onClick={handleZoomOut} style={{ padding: '2px 10px', fontSize: '16px', cursor: 'pointer', border: '2px solid black', backgroundColor: 'white' }}>-</button>
              </div>
            </div>
          </div>
        )}

        <Viewerproductpage productType={data.productType} productVideo={data?.productVideo} pdfFile={data?.pdfFile} propertyData={data?.location ? { location: data?.location } : false} />

        <Reviews pid={data._id} description={data.description} />


        {ModalOpen && (
          <div className="modal-overlay">
            <div className="mymodal-container">
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button onClick={toggleModal} className="modal-close-btn">
                  <i className="fa fa-times"></i>
                </button>
              </div>
              <h2>Please fill in your details.</h2>
              <form className='modalform' onSubmit={(e) => {

                e.preventDefault();
                sendquotation()
              }}>
                <input type="text" name="name" placeholder="Enter your name *" required />
                <input type="number" name="phone" placeholder="Enter your phone no*" required />
                <button type="submit" style={{ marginTop: '10px' }}>Submit</button>
              </form>
            </div>
          </div>
        )}



      </>
    } </>
  );
}





export default function ProductpagecontantPage() {
  return (
    <Suspense fallback={<div></div>}>
      <Productpagecontant />
    </Suspense>
  );
}
