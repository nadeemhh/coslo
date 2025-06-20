'use client'
import './page.css'
import Link from 'next/link';
import Productcard from '../../../../component/productshowcard.js'
import scrollToElement from '../../../../component/scrollToElement.js'
import Productbyusertype from '../../../../component/Detail-tab/productbyusertype.jsx'
import { useInView } from "react-intersection-observer";
import { useState ,useEffect } from 'react';

export default function Allproducts() {

    const [category, setcategory] = useState(null); 
     const [category_id, setcategory_id] = useState(null); 

   
  
  
    useEffect(() => {
      const id = new URLSearchParams(window.location.search).get("id");
      const category = new URLSearchParams(window.location.search).get("category");
      setcategory(category)
      setcategory_id(id)

     
    }, []);

  return (
    <div>
<div>
{category && <h3 style={{color:'#1389F0',marginTop:'0px',marginBottom:'40px'}}>{category}</h3>}
</div>

<Productbyusertype category_id={category_id}/>


    </div>
  );
  }


  