'use client'

import { useState ,useRef,useEffect} from "react";
import "../component/component-css/wideImageSlider.css";

// Sample image data
const images = [
  "https://blog.playstation.com/tachyon/2024/09/1d0ae4eca1d42d088bde97428219325f0c6d5a51.jpg?resize=1088%2C612&crop_strategy=smart",
  "https://theformalclub.in/cdn/shop/files/B1G1FREEDOM-SALE-off-goLEN.jpg?v=1725342313&width=2000",
  "https://images.pexels.com/photos/1128678/pexels-photo-1128678.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
  "https://images.pexels.com/photos/1128678/pexels-photo-1128678.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
  "https://images.pexels.com/photos/1128678/pexels-photo-1128678.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
  "https://images.pexels.com/photos/1128678/pexels-photo-1128678.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
  "https://images.pexels.com/photos/1128678/pexels-photo-1128678.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
  "https://images.pexels.com/photos/54455/cook-food-kitchen-eat-54455.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
];

const ImageSlider = () => {
    const sliderRef = useRef(null); // Reference to the image-wrapper
    const [translateX, setTranslateX] = useState(0); // Current position of the slider
    const [maxTranslateX, setMaxTranslateX] = useState(0); // Maximum slide width
  
    useEffect(() => {
      // Calculate the maximum slide width on load and window resize
      const calculateMaxWidth = () => {
        const containerWidth = sliderRef.current.offsetWidth;
        const trackWidth = sliderRef.current.scrollWidth;
        setMaxTranslateX(trackWidth - containerWidth);
      };
  
      calculateMaxWidth();
      window.addEventListener("resize", calculateMaxWidth);
  
      return () => window.removeEventListener("resize", calculateMaxWidth);
    }, []);
  
    // Slide to the previous position
    const goToPrevious = () => {
      setTranslateX((prev) => Math.min(prev + sliderRef.current.offsetWidth, 0));
    };
  
    // Slide to the next position
    const goToNext = () => {
      setTranslateX((prev) =>
        Math.max(prev - sliderRef.current.offsetWidth, -maxTranslateX)
      );
    };
  
    return (
      <div className="slider-container">
        {/* Left Button */}
        <button className="nav-btn" onClick={goToPrevious}>
          <i className="fas fa-chevron-left"></i>
        </button>
  
        {/* Image Wrapper */}
        <div className="image-wrapper" ref={sliderRef}>
          <div
            className="image-track"
            style={{
              transform: `translateX(${translateX}px)`,
            }}
          >
            {images.map((image, index) => (
              <div key={index} className="image-container">
                <img src={image} alt={`Slide ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>
  
        {/* Right Button */}
        <button className="nav-btn" onClick={goToNext}>
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>
    );
  };
  

export default ImageSlider;
