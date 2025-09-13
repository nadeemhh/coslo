'use client'
import { useState ,useEffect} from 'react';
import Productcard from './productshowcard.js'
import { useInView } from "react-intersection-observer";


const Otherproducts = ({category_id=null}) => {
    const [products, setProducts] = useState([]);  
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const { ref, inView } = useInView({ threshold: 1, rootMargin: "50px" });

    const fetchProducts = async () => {
      
    
        document.querySelector('.loaderoverlay').style.display = 'flex';
    
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/product/category/${category_id}?page=${page}&limit=15`, {
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
    console.log(inView)

    if(hasMore && inView){  fetchProducts();}
      
    
      }, [inView]);


    return (
        <div className="container2">
        
            <div className="myproductcontent">
               <div style={{width:'100%',display:'flex',flexWrap:'wrap',justifyContent:'center',gap:'20px'}}>

                {  products.map((data, index) => (
                  
                  <Productcard pname={data.productName} productType={data.productType} seller={data.sellerDetails} pimage={data.variations[0].productImages[0]} variation={data.variations[0]} pid={data._id} location={data?.location} khataType={data?.khataType} approvalType={data?.approvalType} key={index}/>
                  
                   ))}

                   </div>

              <div ref={ref} style={{ height: "10px",  }}></div>
              
            
              </div>
        </div>
    );
}

export default Otherproducts;