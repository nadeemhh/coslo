'use client'
import './page.css'
import Link from 'next/link';
import Productcard from '../../component/productshowcard'
import { useState ,useEffect} from 'react';

export default function Page() {



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
<h1>h</h1>


    </div>
  );
  }


  