'use client'
import './page.css'
import Link from 'next/link';
import Productcard from '../../component/productshowcard'
import { useSearchParams } from 'next/navigation';
import scrollToElement from '../../component/scrollToElement.js'
import FiltersComponent from '../../component/FiltersComponent.js'
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
  const [sortOrder, setSortOrder] = useState('');

  console.log(searchQuery)

  const fetchProducts = async () => {
    if (!searchQuery) return;

    document.querySelector('.loaderoverlay').style.display = 'flex';

    let url;

    if(filtertype === 'property'){

    //       let latitude = new URLSearchParams(window.location.search).get("lat");
    // let longitude = new URLSearchParams(window.location.search).get("long");


    if(sortOrder){
url=`${process.env.NEXT_PUBLIC_BASE_URL}/product/properties/search-by-location?searchText=${searchQuery}&sortBy=totalMrp&sortOrder=${sortOrder}&page=${page}&limit=10`;
    }else{
      url=`${process.env.NEXT_PUBLIC_BASE_URL}/product/properties/search-by-location?searchText=${searchQuery}&page=${page}&limit=10`;
    }
   console.log('sortOrder',sortOrder,url)

    }else{

    // let filter = filtertype === 'product' ? `query=${searchQuery}`: `sellerName=${searchQuery}` ;
     let filter = `query=${searchQuery}`;
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

//  if(filtertype === 'property'){
//   data.data=data.data.properties;
//  }

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

     
  

   // Reset and fetch when sortOrder changes
  useEffect(() => {
    if (sortOrder !== '') {

      fetchProducts(); // Pass true to indicate new search
    }
  }, [sortOrder]);

  // Handle infinite scroll
  useEffect(() => {
    console.log(inView, hasMore)
    if (hasMore && inView && page > 1) {
      fetchProducts();
    }
  }, [inView]);

  // Initial fetch when component mounts or searchQuery changes
  useEffect(() => {
    if (searchQuery && sortOrder === '') {
      fetchProducts();
    }
  }, [searchQuery]);


 


  const handleHideSidebar = () => {
    document.getElementById('sidebar').style.transform = 'translateY(0%)';
  };
  
  return (
    <div>
<div>
{searchQuery && <h3 style={{color:'#1389f0da',marginTop:'10px',marginBottom:'40px',fontSize:'19px'}}>Showing results for <span style={{color:'#000000ac'}}>{searchQuery}</span></h3>}
</div>
{
filtertype === 'property' && <FiltersComponent sortOrder={sortOrder} setSortOrder={setSortOrder} setPage={setPage} setProducts={setProducts} fetchProducts={fetchProducts} setHasMore={setHasMore}/>}

<div style={{display:'flex',flexWrap:'wrap',justifyContent:'center',gap:'20px',marginTop:'50px'}}>

{products.map((data, index) => (

<Productcard pname={data.productName} productType={data?.productType} seller={data.sellerDetails} pimage={data.variations[0]?.productImages?.[0]||data.images[0]} variation={data.variations[0]} pid={data._id} location={data?.location} khataType={data?.khataType} approvalType={data?.approvalType} key={index}/>

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