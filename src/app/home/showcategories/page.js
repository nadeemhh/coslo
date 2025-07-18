"use client";

import { useState, useEffect,Suspense } from "react";
import './page.css'

 function Subcategory() {
    const [data, setData] = useState([]);
    const [name, setname] = useState(null);  


    useEffect(() => {

            const cname = new URLSearchParams(window.location.search).get("name");
      setname(cname)

        if (!cname) return; // Prevent fetch if id is null

        const fetchData = async () => {
            console.log(cname)
            document.querySelector(".loaderoverlay").style.display = "flex";

            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/category/landing/${cname}`);
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

    return (
        <div>
            <h3 style={{ color: "#1389F0", marginTop: "0px", marginBottom: "40px" }}>{name!=='property'?name:'Real Estate'}</h3>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px" }}>
                {data.map((data,index) => (
                  <div   key={index} style={{boxShadow:'rgb(0 0 0 / 21%) 0px 4px 6px',borderRadius:'10px' }}>
           
                  <div className="product-category-h" >
                 
                  <div className="category-name-image-h">
                 <a href={name!=='product'? `/home/Categories/subCategories/allproducts/?id=${data._id}&category=${encodeURIComponent(data.name)}&parentcategory=${encodeURIComponent(name!=='property'?name:'Real Estate')}`:`/home/Categories/subCategories/${data._id}/${encodeURIComponent(data.name)}`}>
                 <img src={data.image} alt={data.name}/>
                 </a>
                 </div>
                 
                 <div className="category-name-product-h">
                 <a href={name!=='product'? `/home/Categories/subCategories/allproducts/?id=${data._id}&category=${encodeURIComponent(data.name)}&parentcategory=${encodeURIComponent(name!=='property'?name:'Real Estate')}`:`/home/Categories/subCategories/${data._id}/${encodeURIComponent(data.name)}`}>
                 <p>{data.name}</p>
                 </a>
                 </div>
                 
                 {/* <a href={`/home/Categories/subCategories/allproducts/?id=${data.id}&category=${data.name}`} className="seeproducts33">See Products</a> */}
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
