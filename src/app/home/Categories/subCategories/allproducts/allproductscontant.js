'use client'
import './page.css'
import Link from 'next/link';
import Productcard from '../../../../component/productshowcard.js'
import scrollToElement from '../../../../component/scrollToElement.js'
import { useInView } from "react-intersection-observer";
import { useState ,useEffect } from 'react';

export default function Allproducts() {

    const [products, setProducts] = useState([]);   // Store fetched products
    const [category, setcategory] = useState(null); 
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const { ref, inView } = useInView({ threshold: 1, rootMargin: "50px" });


    const fetchProducts = async (id) => {
   
  
      document.querySelector('.loaderoverlay').style.display = 'flex';
  
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/product/category/${id}?page=${page}&limit=10`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
  
        const data = await response.json();

        if (data.data.length === 0) {
          setHasMore(false);
       
          console.log( hasMore,page)
        } else {
          console.log(data)
          setProducts((pre)=>([...pre,...data.data]));
          setPage((prevPage) => prevPage + 1);
        }

       
        document.querySelector('.loaderoverlay').style.display = 'none';
        console.log(data.data)
      } catch (err) {
        document.querySelector('.loaderoverlay').style.display = 'none';
      } finally {
        
      }
    };
  
  
    useEffect(() => {
      const id = new URLSearchParams(window.location.search).get("id");
      const category = new URLSearchParams(window.location.search).get("category");
      setcategory(category)

      if(hasMore && inView){ fetchProducts(id);}
     
    }, [inView]);

  return (
    <div>
<div>
{category && <h3 style={{color:'#1389F0',marginTop:'0px',marginBottom:'40px'}}>{category}</h3>}
</div>

<div style={{display:'flex',flexWrap:'wrap',justifyContent:'center',gap:'20px'}}>

{products.map((data, index) => (

<Productcard pname={data.productName} seller={data.sellerDetails} pimage={data.variations[0].productImages[0]} variation={data.variations[0]} pid={data._id} key={index}/>

 ))}

</div>

{hasMore === false && products.length === 0 && <h3>There are no products in this category.</h3> }

<div style={{width:'100%',display:'flex',justifyContent:'center',marginTop:'40px'}}>

<div ref={ref} style={{ height: "10px",  }}></div>
</div>

    </div>
  );
  }


  