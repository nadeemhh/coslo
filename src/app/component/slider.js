'use client'

import { useState, useEffect } from "react";
import '../component/component-css/slider.css'

export default function Imageslider() {
  return (
    <div className="slider">
      <CustomSlider>
        {images.map((image, index) => {
          return <img key={index} src={image.imgURL} alt={image.imgAlt} />;
        })}
      </CustomSlider>
     
    </div>
  );
}

const images = [
    {
      imgURL:
        "https://blog.playstation.com/tachyon/2024/09/1d0ae4eca1d42d088bde97428219325f0c6d5a51.jpg?resize=1088%2C612&crop_strategy=smart",
      imgAlt: "img-1"
    },
    {
      imgURL:
        "https://theformalclub.in/cdn/shop/files/B1G1FREEDOM-SALE-off-goLEN.jpg?v=1725342313&width=2000",
      imgAlt: "img-2"
    },
    {
      imgURL:
        "https://images.pexels.com/photos/1128678/pexels-photo-1128678.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
      imgAlt: "img-3"
    },
    {
      imgURL:
        "https://images.pexels.com/photos/54455/cook-food-kitchen-eat-54455.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
      imgAlt: "img-4"
    }
    
  ];
  



function CustomSlider({ children }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideDone, setSlideDone] = useState(true);
  const [timeID, setTimeID] = useState(null);

  useEffect(() => {
    if (slideDone) {
      setSlideDone(false);
      setTimeID(
        setTimeout(() => {
          slideNext();
          setSlideDone(true);
        }, 5000)
      );
    }
  }, [slideDone]);

  const slideNext = () => {
    setActiveIndex((val) => {
      if (val >= children.length - 1) {
        return 0;
      } else {
        return val + 1;
      }
    });
  };

  const slidePrev = () => {
    setActiveIndex((val) => {
      if (val <= 0) {
        return children.length - 1;
      } else {
        return val - 1;
      }
    });
  };

  const AutoPlayStop = () => {
    if (timeID > 0) {
      clearTimeout(timeID);
      setSlideDone(false);
    }
  };

  const AutoPlayStart = () => {
    if (!slideDone) {
      setSlideDone(true);
    }
  };

  return (
    <div
      className="container__slider"
      onMouseEnter={AutoPlayStop}
      onMouseLeave={AutoPlayStart}
    >
      {children.map((item, index) => {
        return (
          <div
            className={"slider__item slider__item-active-" + (activeIndex + 1)}
            key={index}
          >
            {item}
          </div>
        );
      })}

      <div className="container__slider__links">
        {children.map((item, index) => {
          return (
            <button
              key={index}
              className={
                activeIndex === index
                  ? "container__slider__links-small container__slider__links-small-active"
                  : "container__slider__links-small"
              }
              onClick={(e) => {
                e.preventDefault();
                setActiveIndex(index);
              }}
            ></button>
          );
        })}
      </div>

      <button
        className="slider__btn-next"
        onClick={(e) => {
          e.preventDefault();
          slideNext();
        }}
        style={{marginRight:'5px'}}
      >

       <svg className="lfarsh" width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="23" cy="23" r="23" fill="white"/>
<path d="M14.5 23H31M31 23L24 16M31 23L24 30" stroke="#2F3234" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

      </button>
      <button
        className="slider__btn-prev"
        onClick={(e) => {
          e.preventDefault();
          slidePrev();
        }}
        style={{marginLeft:'5px'}}
      >
       <svg className="lfarsh" width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="23" cy="23" r="23" transform="matrix(-1 0 0 1 46 0)" fill="white"/>
<path d="M31.5 23H15M15 23L22 16M15 23L22 30" stroke="#2F3234" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

      </button>
    </div>
  );
}
