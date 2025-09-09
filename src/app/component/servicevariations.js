'use client'

import { useState, useEffect } from 'react';
import '../component/component-css/ProductVariations.css';

const ServiceVariations = ({setshowslab, pdata, showslab, setActiveIndex, productType,selectedVariationIds, setSelectedVariationIds}) => {
  console.log(pdata);



  // Initialize component - Set first variation as selected
  useEffect(() => {
    if (!pdata || !pdata.variations || pdata.variations.length === 0) {
      return;
    }

    // Default to the first variation with the required object structure
    const firstVariation = pdata.variations[0];
    setSelectedVariationIds([{
      product: pdata._id,
      variation: firstVariation._id
    }]);
    setshowslab(0);
    
  }, [pdata]);

  // Handle service selection with checkbox
  const handleServiceSelect = (variationIndex) => {
    const selectedVariation = pdata.variations[variationIndex];
    const variationId = selectedVariation._id;
    
    // Reset image slider to start from 0
    setActiveIndex(0);
    
    // Toggle selection - add or remove from array with object structure
    setSelectedVariationIds(prev => {
      const existingIndex = prev.findIndex(item => item.variation === variationId);
      
      if (existingIndex !== -1) {
        // Remove if already selected
        return prev.filter(item => item.variation !== variationId);
      } else {
        // Add if not selected with required object structure
        return [...prev, {
          product: pdata._id,
          variation: variationId
        }];
      }
    });
    
    setshowslab(variationIndex);
  };

  // Check if variations exist
  if (!pdata || !pdata.variations || pdata.variations.length === 0) {
    return null;
  }

  console.log("Selected Variation IDs:", selectedVariationIds);

  return (
    <div className="container522">
      <div className="attribute-section522">
        <div className="attribute-label522" style={{color:'black'}}>
          Services Available
        </div>
        <div className="attribute-options522" style={{marginTop:'20px'}}>
          {pdata.variations.map((variation, index) => {
            const isSelected = selectedVariationIds.some(item => item.variation === variation._id);
            
            return (
              <div
                key={variation._id}
                className={`attribute-box522 ${isSelected ? 'selected522' : ''}`}
                onClick={() => handleServiceSelect(index)}
                style={{width:'120px',position: 'relative', cursor: 'pointer'}}
              >
              

                <div className='service-variation-item'>
                      {/* Animated HTML Checkbox */}
                <div className="checkbox-container">
                  <input 
                    type="checkbox" 
                    className="animated-checkbox"
                    checked={isSelected}
                    onChange={() => handleServiceSelect(index)}
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
                  {/* Service Image */}
                  {variation.productImages && variation.productImages[0] && (
                    <img 
                      src={variation.productImages[0]} 
                      width={70} 
                      height={70} 
                      style={{width:'100%',objectFit:'contain'}} 
                      alt={variation.serviceName || 'Service'} 
                    />
                  )}
                  
                  {/* Service Name */}
                  <p style={{color:'#3a3a3a',margin:'10px 0px 5px 0px', fontWeight: '600'}}>
                    {variation.serviceName}
                  </p>
                  
                  {/* Duration */}
                  {variation.duration && (
                    <p style={{margin:'0px', fontSize:'12px', color:'#666'}}>
                      {variation.duration.value} {variation.duration.unit}
                    </p>
                  )}
                  
                  {/* Price */}
                  <p style={{margin:'5px 0px 0px 0px', fontSize:'14px', fontWeight: '600'}}>
                    ₹{variation.mrp}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CSS Styles */}
      <style jsx>{`
         .checkbox-container {
         margin-bottom:10px;
        }

        .animated-checkbox {
          width: 20px;
          height: 20px;
          cursor: pointer;
          appearance: none;
          -webkit-appearance: none;
          -moz-appearance: none;
          border: 2px solid #a29d9d;
          border-radius: 4px;
          background: white;
          position: relative;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .animated-checkbox:hover {
          border-color: #4CAF50;
          transform: scale(1.1);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
        }

        .animated-checkbox:checked {
          background: linear-gradient(135deg, #4CAF50, #45a049);
          border-color: #4CAF50;
          transform: scale(1.1);
          box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
          animation: checkboxPulse 0.3s ease-out;
        }

        .animated-checkbox:checked::before {
          content: '✓';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: white;
          font-size: 14px;
          font-weight: bold;
          opacity: 0;
          animation: checkmarkAppear 0.3s ease-out 0.1s forwards;
        }

        @keyframes checkboxPulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.2);
          }
          100% {
            transform: scale(1.1);
          }
        }

        @keyframes checkmarkAppear {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0);
          }
          50% {
            transform: translate(-50%, -50%) scale(1.2);
          }
          100% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }

       
      `}</style>
    </div>
  );
};

export default ServiceVariations;