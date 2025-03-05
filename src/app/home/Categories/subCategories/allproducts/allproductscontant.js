'use client'
import './page.css'
import Link from 'next/link';
import Productcard from '../../../../component/productshowcard.js'
import scrollToElement from '../../../../component/scrollToElement.js'
import { useState ,useEffect } from 'react';

export default function Allproducts() {

    const [products, setProducts] = useState([]);   // Store fetched products
    const [category, setcategory] = useState(null); 
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

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
        
                    if(page!==1){ setPage((prevPage) => prevPage - 1);}
                    setProducts(data.data);
                    scrollToElement('main-content')
        
                    console.log( hasMore,page)
                  } else {
                    console.log(data)
                    setProducts(data.data);
                    scrollToElement('main-content')
                  }

       
        document.querySelector('.loaderoverlay').style.display = 'none';
        console.log(data.data)
      } catch (err) {
        document.querySelector('.loaderoverlay').style.display = 'none';
      } finally {
        
      }
    };
  

    
    const nextPage = () => {
      setPage((prevPage) => prevPage + 1);
     
    };
  
    const prevPage = () => {
      setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));
      setHasMore(true);
    };


   

  
    useEffect(() => {
      const id = new URLSearchParams(window.location.search).get("id");
      const category = new URLSearchParams(window.location.search).get("category");
      setcategory(category)

      fetchProducts(id);
    }, [page]);

  return (
    <div>
<div>
{category && <h3 style={{color:'#1389F0',marginTop:'0px',marginBottom:'40px'}}>{category}</h3>}
</div>

<div style={{display:'flex',flexWrap:'wrap',justifyContent:'center',gap:'20px',alignItems:'flex-start'}}>

{products.map((data, index) => (

<Productcard pname={data.productName} seller={data.sellerDetails} pimage={data.variations[0].productImages[0]} variation={data.variations[0]} pid={data._id} key={index}/>

 ))}

</div>

<div style={{width:'100%',display:'flex',justifyContent:'center',marginTop:'40px'}}>

<div className="pagination">
<span className="pre" onClick={prevPage} style={{ cursor: "pointer", opacity:  page === 1 ? 0.5 : 1 }}>
<i className="fas fa-arrow-left"></i> Previous
</span>

<span className="page-number">Page {page}</span>

{ hasMore && <span className="next" onClick={nextPage} style={{ cursor: "pointer" }}>
Next <i className="fas fa-arrow-right"></i>
</span>}
</div>
</div>

    </div>
  );
  }


  