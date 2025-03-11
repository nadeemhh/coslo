'use client'
import { useState ,useEffect} from 'react';
import Productcard from '../../component/productshowcard'
import scrollToElement from '../../component/scrollToElement.js'
import { useInView } from "react-intersection-observer";
import '../component-css/tab.css'

const Productbyusertype = () => {
    const [products, setProducts] = useState([]);  
    const [activeTab, setActiveTab] = useState("Individual");
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [canscrool, setcanscrool] = useState(false);
    const { ref, inView } = useInView({ threshold: 1, rootMargin: "50px" });

    const fetchProducts = async () => {
      
    
        document.querySelector('.loaderoverlay').style.display = 'flex';
    
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/product/${activeTab==='Individual'?'individual':'wholeseller'}?page=${page}&limit=10`, {
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



    const renderContent = () => {
        switch (activeTab) {
            case "Individual":
                return (
                    <div style={{width:'100%',display:'flex',flexWrap:'wrap',justifyContent:'center',gap:'20px'}}>

                {  products.map((data, index) => (
                  
                  <Productcard pname={data.productName} seller={data.sellerDetails} pimage={data.variations[0].productImages[0]} variation={data.variations[0]} pid={data._id} key={index}/>
                  
                   ))}

                   </div>
                )
                ;
            
            case "Retailer/Wholesaler":
                return (
                    <div style={{width:'100%',display:'flex',flexWrap:'wrap',justifyContent:'center',gap:'20px'}}>

                {  products.map((data, index) => (
                  
                  <Productcard pname={data.productName} seller={data.sellerDetails} pimage={data.variations[0].productImages[0]} variation={data.variations[0]} pid={data._id} key={index}/>
                  
                   ))}

                   </div>
                )
                ;
            default:
                return null;
        }
    };

    return (
        <div className="container2">
            <div className="tabs">
                <button
                    className={activeTab === "Individual" ? "active" : ""}
                    onClick={() => {
                      setProducts([])
                      setHasMore(true);
                      setPage(1)
                      setActiveTab("Individual")}}
                >
                    Individual
                </button>
               
                <button
                    className={activeTab === "Retailer/Wholesaler" ? "active" : ""}
                    onClick={() => {
                      setProducts([])
                      setHasMore(true);
                      setPage(1)
                      setActiveTab("Retailer/Wholesaler")}}
                >
                    Retailer/Wholesaler
                </button>
            </div>
            <div className="myproductcontent">
              {renderContent()}

              <div ref={ref} style={{ height: "10px",  }}></div>
              
            
              </div>
        </div>
    );
}

export default Productbyusertype;