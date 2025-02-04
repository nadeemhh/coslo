'use client'
import './page.css'
import Link from 'next/link';
import Productcard from '../../component/productshowcard'
import { useSearchParams } from 'next/navigation';
import { useState ,useEffect} from 'react';

export default function Page() {

  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('query');
  const [products, setProducts] = useState([]);   // Store fetched products

  console.log(searchQuery)

  const fetchProducts = async () => {
    if (!searchQuery) return;

    document.querySelector('.loaderoverlay').style.display = 'flex';

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/product/search?query=${encodeURIComponent(searchQuery)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }

      const data = await response.json();
      setProducts(data.data); // Adjust based on your API response
      document.querySelector('.loaderoverlay').style.display = 'none';
      console.log(data.data)
    } catch (err) {
      document.querySelector('.loaderoverlay').style.display = 'none';
    } finally {
      
    }
  };


  useEffect(() => {

    fetchProducts();
  }, [searchQuery]);
  
  return (
    <div>
<div>
<div style={{display:'flex',whiteSpace:'nowrap',marginBottom:'20px'}}>
        <button style={{textAlign:'left',margin:'20px',border:'1px solid black',backgroundColor:'white',padding:'5px 10px'}}>
      
        <i className="fas fa-filter" style={{marginRight:'10px'}}></i>
        
          
      <select name="" id="" style={{border:'none'}}>
        <option value="">Filters</option>
        <option value="">By Location</option>
        <option value="">By Category</option>
      </select>
      </button>

      <button style={{textAlign:'left',margin:'20px',border:'1px solid black',backgroundColor:'white',padding:'5px 10px'}}>
      
      <i className="fas fa-sort" style={{marginRight:'10px'}}></i>
      
        
    <select name="" id="" style={{border:'none'}}>
      <option value="" >Sort</option>
    </select>
    </button>
      </div>
</div>

<div style={{display:'flex',flexWrap:'wrap',justifyContent:'center',gap:'10px'}}>

{products.map((data, index) => (

<Productcard pname={data.productName} pimage={data.productImages[0]} variation={data.variations[0]} key={index}/>

 ))}

</div>


    </div>
  );
  }


  