'use client'

import { useState, useEffect } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import '../component/component-css/slider.css'

export default function Imageslider() {
  const [images, setImages] = useState([]);


  const getbanners = () => {


    document.querySelector('.loaderoverlay').style.display = 'flex';



    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/banner/`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return response.json().then((errorData) => {
            throw new Error(errorData.message || 'Failed. Please try again.');
          });
        }
      })
      .then((data) => {

        console.log(data)
        setImages(data.data)

        document.querySelector('.loaderoverlay').style.display = 'none';

      })
      .catch((err) => {

        alert(err.message);
        document.querySelector('.loaderoverlay').style.display = 'none';
      });
  };


  useEffect(() => {
    getbanners();

  }, []);


  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      className="mySwiper"
    >
      {images.map((image, index) => {
        return <SwiperSlide key={index}> {image.redirectUrl ? <a href={image.redirectUrl} className="bannerimageparent"><img src={image.url} alt="product image" className="bannerimage" /></a> : <img src={image.url} alt="product image" className="bannerimage" />}</SwiperSlide>;
      })}

    </Swiper>
  );
}

