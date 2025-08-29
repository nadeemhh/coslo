"use client";

import { useState, useEffect,Suspense } from "react";
import './page.css'
import { useParams } from "next/navigation";
import slugifyurl from "../../../component/slugifyurl.js"

 function Subcategory() {
    
     const searchParams = useParams();

    const [data, setData] = useState([]);
    const [name, setname] = useState(decodeURIComponent(searchParams.name));  


    useEffect(() => {


        if (!name) return; // Prevent fetch if id is null

        const fetchData = async () => {
            console.log(name)
            document.querySelector(".loaderoverlay").style.display = "flex";

            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/category/landing/${name}`);
                if (!response.ok) throw new Error("Failed to fetch categories");

                const result = await response.json();
                console.log(result)
                setData(result?.data ? result.data : []);
            } catch (error) {
                console.error(error);
            } finally {
                document.querySelector(".loaderoverlay").style.display = "none";
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
    
      if(name==="property"){
        localStorage.setItem("productType","property")
     }else if(name==="service"){
    localStorage.setItem("productType","service")
 }else{
       localStorage.setItem("productType","product")
     }
      }, []);

    return (
        <div>
            <h3 style={{ color: "#1389F0", marginTop: "0px", marginBottom: "40px" }}>{name!=='property'?(name!=='product'?'Service':'Product'):'Real Estate'}</h3>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px" }}>
                {data.map((data,index) => (
                  <div   key={index} style={{boxShadow:'rgb(0 0 0 / 21%) 0px 4px 6px',borderRadius:'10px' }}>
           
                  <div className="product-category-h" >
                 
                  <div className="category-name-image-h">
                 <a href={name!=='product'? `/home/all/${slugifyurl(name!=='property'?name:'Real Estate')}/${slugifyurl(data.name)}/${data._id}`:`/home/${slugifyurl(data.name)}/${data._id}`}>
                 <img src={data.image} alt={data.name}/>
                 </a>
                 </div>
                 
                 <div className="category-name-product-h">
                 <a href={name!=='product'? `/home/all/${slugifyurl(name!=='property'?name:'Real Estate')}/${slugifyurl(data.name)}/${data._id}`:`/home/${slugifyurl(data.name)}/${data._id}`}>
                 <p>{data.name}</p>
                 </a>
                 </div>
                 
                 </div>
                 
                  </div>
                ))}
            </div>

            { data.length === 0 && <h3>There are no sub category in this category.</h3> }
        </div>
    );
}


export default function SubCategoriesPage() {
    return (
      <Suspense fallback={<div></div>}>
        <Subcategory />
      </Suspense>
    );
  }
