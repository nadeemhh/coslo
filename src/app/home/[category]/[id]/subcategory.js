"use client";

import { useState, useEffect,Suspense } from "react";
import { useParams } from "next/navigation";
import slugifyurl from "../../../component/slugifyurl.js"
import Productcard from '../../../component/productshowcard.js'

 function Subcategory() {
    const [data, setData] = useState([]);
    const searchParams = useParams();
    const id = searchParams.id; // Get the 'id' from the URL
    const categoryname = decodeURIComponent(searchParams.category.replaceAll('-',' '));

    useEffect(() => {
        if (!id) return; // Prevent fetch if id is null

        const fetchData = async () => {
            document.querySelector(".loaderoverlay").style.display = "flex";

            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/category/all/${id}`);
                if (!response.ok) throw new Error("Failed to fetch categories");

                const result = await response.json();
                console.log(result)
                setData(result);
            } catch (error) {
                console.error(error);
            } finally {
                document.querySelector(".loaderoverlay").style.display = "none";
            }
        };

        fetchData();

    }, [id]); // Re-fetch when id changes


     useEffect(() => {

  if(categoryname==="Real Estate"){
    localStorage.setItem("productType","property")
 }else{
   localStorage.setItem("productType","product")
 }
  }, []);

    return (
        <div>
          

            <h3 style={{ color: "#1389F0", marginTop: "0px", marginBottom: "40px" }}>{categoryname}</h3>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px" }}>
                {data.map((data) => (
                  <div   key={data.id} style={{boxShadow:'rgb(0 0 0 / 21%) 0px 4px 6px',borderRadius:'10px' }}>
           
                  <div className="product-category-h" >
                 
                  <div className="category-name-image-h">
                 <a href={`/home/all/${slugifyurl(categoryname)}/${slugifyurl(data.name)}/${data.id}`}>
                 <img src={data.image} alt={data.name}/>
                 </a>
                 </div>
                 
                 <div className="category-name-product-h">
                 <a href={`/home/all/${slugifyurl(categoryname)}/${slugifyurl(data.name)}/${data.id}`}>
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
      <Suspense fallback={<div>Loading...</div>}>
        <Subcategory />
      </Suspense>
    );
  }
