'use client'
 import './page.css'
 import '../../component/component-css/productcard.css'
import Link from 'next/link';
import {useState,useEffect} from 'react';

export default function Page() {
 
  const [data,setdata] = useState();
   const [isdata,setisdata] = useState(false);
  
  function getproductdetails() {

    
    const token = localStorage.getItem('buyertoken');

        document.querySelector('.loaderoverlay').style.display = 'flex';

        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/buyer/wishlist`, {
          method: 'GET',
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
          console.log(data.data.products)
         
          setdata(data.data.products)
          setisdata(true)
          document.querySelector('.loaderoverlay').style.display = 'none';
          })
          .catch((err) => {
            document.querySelector('.loaderoverlay').style.display = 'none';
            console.log(err)
           
           
          });
    
      
    }

   
useEffect(() => {
  getproductdetails()
}, []);


const deletewishlist = (id) => {
 

  const token = localStorage.getItem('buyertoken');

  fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/buyer/wishlist?productId=${id}`, {
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
      getproductdetails()
    
    })
    .catch((err) => {
      console.log(err);
    });
};



  return (
    <>
    <h2 className='wishlisttitle'>Wishlist</h2>

  { isdata && <div className="products-container77">

    {data.map((wishlist, index) => (
 
    <div className="product-card" key={index}>
      {/* Product Image */}
      <Link href={`/home/products/${encodeURIComponent(encodeURIComponent(wishlist.product.productName))}/${wishlist.product._id}`}>
      <div className="product-image">
        <img
          src={wishlist.product.variations[0].productImages[0]} // Replace with actual image URL
          alt={wishlist.product.productName}
          style={{width:'auto',height:'200px'}}
        />
        {/* <button className="cart-icon">
          <i className="fa fa-shopping-cart" style={{color:'#1389F0'}}></i>
        </button> */}

         {/* Location */}
 {/* <div className='mylocation'>
 <span className="location">
<img src="\icons\locationmark.svg" alt="" />

          Lucknow
        </span>
        </div> */}
      </div>

      </Link>

      {/* Product Details */}
      <div className="product-details">
       

        {/* Title and Supplier */}
        <Link href={`/home/products/${encodeURIComponent(encodeURIComponent(wishlist.product.productName))}/${wishlist.product._id}`}>
        <p className="product-title">{wishlist.product.productName}</p>
        <p className="product-supplier">{wishlist.product.sellerId.businessName}</p>
        </Link>
        {/* Price */}
        <div className="product-actions">

        <h4 className="price">₹ 2560/-</h4>
        {/* <CounterComponent/> */}

        </div>
        {/* Actions */}
        <div className="product-actions">

          {/* <button className="contact-btn">Contact Supplier</button> */}
          {/* <button className="Add-to-Cart">Add to Cart</button>  */}
           <button className="Remove-btn" onClick={()=>(deletewishlist(wishlist.product._id))}>Remove</button>

           <Link href={`/home/products/${encodeURIComponent(encodeURIComponent(wishlist.product.productName))}/${wishlist.product._id}`}>
          <button className="contact-btn">Check Details</button>
          </Link>
        </div>
      </div>
    </div>
      ))}
</div>}
  </>
  )
}
