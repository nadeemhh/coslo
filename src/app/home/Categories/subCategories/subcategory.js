"use client";

import { useState, useEffect,Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

 function Subcategory() {
    const [data, setData] = useState([]);
    const searchParams = useSearchParams();
    const id = searchParams.get("id"); // Get the 'id' from the URL
    const categoryname = searchParams.get("category");

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

    return (
        <div>
            <h3 style={{ color: "#1389F0", marginTop: "0px", marginBottom: "40px" }}>{categoryname}</h3>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px" }}>
                {data.map((data) => (
                  <div   key={data.id} style={{boxShadow:'rgb(0 0 0 / 21%) 0px 4px 6px',borderRadius:'10px' }}>
           
                  <div className="product-category-h" >
                 
                  <div className="category-name-image-h">
                 <Link href={`/home/Categories/subCategories/allproducts/?id=${data.id}&category=${encodeURIComponent(data.name)}`}>
                 <img src={data.image} alt={data.name}/>
                 </Link>
                 </div>
                 
                 <div className="category-name-product-h">
                 <Link href={`/home/Categories/subCategories/allproducts/?id=${data.id}&category=${encodeURIComponent(data.name)}`}>
                 <p>{data.name}</p>
                 </Link>
                 </div>
                 
                 {/* <Link href={`/home/Categories/subCategories/allproducts/?id=${data.id}&category=${data.name}`} className="seeproducts33">See Products</Link> */}
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
