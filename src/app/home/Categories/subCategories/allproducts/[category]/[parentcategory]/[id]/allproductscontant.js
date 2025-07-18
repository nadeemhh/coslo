'use client'
import './page.css'
import Link from 'next/link';
import Productcard from '../../../../../../../component/productshowcard.js'
import scrollToElement from '../../../../../../../component/scrollToElement.js'
import Productbyusertype from '../../../../../../../component/Detail-tab/productbyusertype.jsx'
import RealEstateproducts from '../../../../../../../component/RealEstateproducts.js'
import { useInView } from "react-intersection-observer";
import { useState ,useEffect,Suspense } from 'react';
import { useParams } from "next/navigation";


 function Allproducts() {
 const searchParams = useParams();
    const [category, setcategory] = useState(decodeURIComponent(searchParams.category)); 
      const [parentcategory, setparentcategory] = useState(decodeURIComponent(searchParams.parentcategory)); 
     const [category_id, setcategory_id] = useState(searchParams.id); 

  
  



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


  export default function AllproductsPage() {
      return (
        <Suspense fallback={<div></div>}>
          <Allproducts />
        </Suspense>
      );
    }
  