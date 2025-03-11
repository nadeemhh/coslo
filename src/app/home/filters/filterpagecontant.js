'use client'
import './page.css'
import Link from 'next/link';
import Productcard from '../../component/productshowcard'
import { useSearchParams } from 'next/navigation';
import scrollToElement from '../../component/scrollToElement.js'
import { useState ,useEffect,Suspense} from 'react';

function Filterpagedata() {

  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('query');
  const filtertype = searchParams.get('type');
  const [products, setProducts] = useState([]);   // Store fetched products
  const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const [isfirstvisit, setisfirstvisit] = useState(true);

  console.log(searchQuery)

  const fetchProducts = async () => {
    if (!searchQuery) return;

    document.querySelector('.loaderoverlay').style.display = 'flex';

    let filter = filtertype === 'Products' ? `query=${searchQuery}`: `sellerName=${searchQuery}` ;
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/product/search?page=${page}&limit=1&${filter}`, {
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
                    setisfirstvisit(false)
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

    fetchProducts();
  }, [searchQuery,page]);


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

<div style={{display:'flex',flexWrap:'wrap',justifyContent:'center',gap:'20px',alignItems:'flex-start',marginTop:'50px'}}>

{products.map((data, index) => (

<Productcard pname={data.productName} seller={data.sellerDetails} pimage={data.variations[0].productImages[0]} variation={data.variations[0]} pid={data._id} key={index}/>

 ))}

</div>

<div style={{width:'100%',display:'flex',justifyContent:'center',marginTop:'40px'}}>

{page === 1 && isfirstvisit === true ? <h2></h2> : <div className="pagination">
<span className="pre" onClick={prevPage} style={{ cursor: "pointer", opacity:  page === 1 ? 0.5 : 1 }}>
<i className="fas fa-arrow-left"></i> Previous
</span>

<span className="page-number">Page {page}</span>

{ hasMore && <span className="next" onClick={nextPage} style={{ cursor: "pointer" }}>
Next <i className="fas fa-arrow-right"></i>
</span>}
</div>}

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