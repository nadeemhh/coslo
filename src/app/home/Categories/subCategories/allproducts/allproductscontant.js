'use client'
import './page.css'
import Link from 'next/link';
import Productcard from '../../../../component/productshowcard.js'
import scrollToElement from '../../../../component/scrollToElement.js'
import Productbyusertype from '../../../../component/Detail-tab/productbyusertype.jsx'
import RealEstateproducts from '../../../../component/RealEstateproducts.js'
import { useInView } from "react-intersection-observer";
import { useState ,useEffect } from 'react';

export default function Allproducts() {

    const [category, setcategory] = useState(null); 
      const [parentcategory, setparentcategory] = useState(null); 
     const [category_id, setcategory_id] = useState(null); 

   
  
  
    useEffect(() => {
      const id = new URLSearchParams(window.location.search).get("id");
      const category = new URLSearchParams(window.location.search).get("category");
      setparentcategory(new URLSearchParams(window.location.search).get("parentcategory"))
      setcategory(category)
      setcategory_id(id)

     
    }, []);


    console.log(parentcategory)

  return (
 <> 
 { parentcategory &&  <div>
<div>
{category && <h3 style={{color:'#1389F0',marginTop:'0px',marginBottom:'40px'}}>{category}</h3>}
</div>

{parentcategory === "Real Estate"?<RealEstateproducts category_id={category_id}/> : <Productbyusertype category_id={category_id}/>}


    </div>}
    </>
  );
  }


  