"use client";
import { useState, useEffect } from "react";

import Link from "next/link";

export default function Subcategory() {
 
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
       <h1>h</h1>
        </div>
    );
}
