"use client"
import './mylayout.css'
import '../component/component-css/home.css'
import { createContext, useContext, useState } from 'react';
import Imageslider from '../component/slider.js'
import Productcard from '../component/productcard'
import Productcategory from '../component/Productcategory.js'
import { useRef } from 'react';
import Link from 'next/link';

export default function home() {

  const categoryRefs = useRef([]);

  const scrollLeft = (index) => {
    if (categoryRefs.current[index]) {
      categoryRefs.current[index].scrollBy({
        left: -300, // Adjust the value for the desired scroll amount
        behavior: 'smooth',
      });
    }
  };

  const scrollRight = (index) => {
    if (categoryRefs.current[index]) {
      categoryRefs.current[index].scrollBy({
        left: 300, // Adjust the value for the desired scroll amount
        behavior: 'smooth',
      });
    }
  };

  const categories = [
    { name: 'Our Categories', title: 'Browse by Categories',Categories:true },
    { name: 'Best Sellers', title: 'Best Sellers this Month' },
    { name: 'Trending Now', title: 'Most Popular this Week' },

  ];

  return (
    <>
      <Imageslider />

      {categories.map((category, index) => (
        <div className="category-list" key={index}>
          <div className="category-name">
            <img src="icons/Rectangle 2.svg" alt="" />
            <p>{category.name}</p>
          </div>

          <div className="category-title">
            <p style={{ fontWeight: '500' }}>{category.title}</p>

            <div style={{ display: 'flex', gap: '10px', cursor: 'pointer' }}>
              <img
                src="icons/Leftar.svg"
                alt="Left Arrow"
                className="left-arrow"
                onClick={() => scrollLeft(index)}
              />
              <img
                src="icons/Rightar.svg"
                alt="Right Arrow"
                className="right-arrow"
                onClick={() => scrollRight(index)}
              />
            </div>
          </div>

          <div
            className="products-container"
            ref={(el) => (categoryRefs.current[index] = el)}
          >
          { category.Categories? <>

            <Link href="/home/Categories/subCategories">
            <Productcategory/>
            </Link>
            <Link href="/home/Categories/subCategories">
            <Productcategory/>
            </Link>
            <Link href="/home/Categories/subCategories">
            <Productcategory/>
            </Link>
            <Link href="/home/Categories/subCategories">
            <Productcategory/>
            </Link>
            <Link href="/home/Categories/subCategories">
            <Productcategory/>
            </Link>
            <Link href="/home/Categories/subCategories">
            <Productcategory/>
            </Link>
          </>:

            <>
            <Link href="/home/products">
            <Productcard />
            </Link>
            <Link href="/home/products">
            <Productcard />
            </Link>
            <Link href="/home/products">
            <Productcard />
            </Link>

            <Link href="/home/products">
            <Productcard />
            </Link>

            <Link href="/home/products">
            <Productcard />
            </Link>
            </>}
          </div>
        </div>
      ))}
    </>
  );
}

