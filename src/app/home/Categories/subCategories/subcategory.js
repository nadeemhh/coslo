"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function Subcategory() {
    const [data, setData] = useState([]);
    const searchParams = useSearchParams();
    const id = searchParams.get("id"); // Get the 'id' from the URL
console.log(id)
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
            <h3 style={{ color: "#1389F0", marginTop: "0px", marginBottom: "40px" }}>Our Categories</h3>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px" }}>
                {data.map((category) => (
                    <Link href={`/home/Categories/subCategories?id=${category.id}`} key={category.id}>
                        <div className="product-category-h">
                            <div className="category-name-image-h">
                                <img src={category.image} alt={category.name} />
                            </div>
                            <div className="category-name-product-h">
                                <p>{category.name}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
