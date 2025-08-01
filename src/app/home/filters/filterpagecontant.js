'use client'
import './page.css'
import Link from 'next/link';
import Productcard from '../../component/productshowcard'
import { useSearchParams } from 'next/navigation';
import scrollToElement from '../../component/scrollToElement.js'
import { useInView } from "react-intersection-observer";
import { useState ,useEffect,Suspense} from 'react';

function Filterpagedata() {

  const searchParams = useSearchParams();
  const searchQuery = decodeURIComponent(searchParams.get('query'));
  const filtertype = searchParams.get('type');
  const [products, setProducts] = useState([]);   // Store fetched products
  const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const { ref, inView } = useInView({ threshold: 1, rootMargin: "50px" });


  console.log(searchQuery)

  const fetchProducts = async () => {
    if (!searchQuery) return;

    document.querySelector('.loaderoverlay').style.display = 'flex';

    let url;

    if(filtertype === 'property'){

          let latitude = new URLSearchParams(window.location.search).get("lat");
    let longitude = new URLSearchParams(window.location.search).get("long");

   url=`${process.env.NEXT_PUBLIC_BASE_URL}/product/properties/search-by-location?maxDistance=20000&minDistance=0&searchText=${searchQuery}&page=${page}&limit=10&`;

    }else{

     let filter = filtertype === 'product' ? `query=${searchQuery}`: `sellerName=${searchQuery}` ;
     url=`${process.env.NEXT_PUBLIC_BASE_URL}/product/search?page=${page}&limit=10&${filter}`;

    }
  
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }

      const data = await response.json();

        console.log(data)

 if(filtertype === 'property'){
  data.data=data.data.properties;
 }

   console.log(data)

     if (data.data.length === 0) {
                    setHasMore(false);
                 
                    console.log( hasMore,page)
                  } else {
                    console.log(data)
                    setProducts((pre)=>([...pre,...data.data]));
                    setPage((prevPage) => prevPage + 1);
                  }

     
      document.querySelector('.loaderoverlay').style.display = 'none';
    

    } catch (err) {
      document.querySelector('.loaderoverlay').style.display = 'none';
    } finally {
      
    }
  };

     
  
 


  useEffect(() => {
    console.log(inView,hasMore)

    if(hasMore && inView){  fetchProducts();}
      
    
      }, [searchQuery,inView]);




  const handleHideSidebar = () => {
    document.getElementById('sidebar').style.transform = 'translateY(0%)';
  };
  
  return (
    <div>
<div>
{/* <div style={{display:'flex',whiteSpace:'nowrap',marginBottom:'40px'}}>
        <button style={{textAlign:'left',margin:'20px',border:'1px solid black',backgroundColor:'white',padding:'5px 10px'}} onClick={handleHideSidebar}>
      
        <i className="fas fa-filter" style={{marginRight:'10px'}}></i>
        Filters
      </button> */}

      {/* <button style={{textAlign:'left',margin:'20px',border:'1px solid black',backgroundColor:'white',padding:'5px 10px'}}>
      
      <i className="fas fa-sort" style={{marginRight:'10px'}}></i>
      Sort
    </button> */}
      {/* </div> */}
</div>

<div style={{display:'flex',flexWrap:'wrap',justifyContent:'center',gap:'20px',marginTop:'50px'}}>

{products.map((data, index) => (

<Productcard pname={data.productName} productType={data?.productType} seller={data.sellerDetails} pimage={data.variations[0].productImages[0]} variation={data.variations[0]} pid={data._id} key={index}/>

 ))}

</div>

{hasMore === false && products.length === 0 && <h3>No Result Found</h3> }

<div style={{width:'100%',display:'flex',justifyContent:'center',marginTop:'20px'}}>

<div ref={ref} style={{ height: "10px",  }}></div>

</div>

    </div>
  );
  }


  export default function Filterpagecontant() {
      return (
        <Suspense fallback={<div>Loading...</div>}>
          <Filterpagedata />
        </Suspense>
      );
    }