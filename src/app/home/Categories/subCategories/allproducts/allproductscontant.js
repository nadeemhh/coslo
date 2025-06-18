'use client'
import './page.css'
import Link from 'next/link';
import Productcard from '../../../../component/productshowcard.js'
import scrollToElement from '../../../../component/scrollToElement.js'
import Productbyusertype from '../../../../component/Detail-tab/productbyusertype.jsx'
import { useInView } from "react-intersection-observer";
import { useState ,useEffect } from 'react';

export default function Allproducts() {

    const [products, setProducts] = useState([]);   // Store fetched products
    const [category, setcategory] = useState(null); 
     const [category_id, setcategory_id] = useState(null); 
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
      setcategory_id(id)

      if(hasMore && inView){ fetchProducts(id);}
     
    }, [inView]);

  return (
    <div>
<div>
{category && <h3 style={{color:'#1389F0',marginTop:'0px',marginBottom:'40px'}}>{category}</h3>}
</div>

<Productbyusertype category_id={category_id}/>


    </div>
  );
  }


  