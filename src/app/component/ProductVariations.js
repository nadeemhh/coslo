'use client'

import { useState, useEffect } from 'react';
import '../component/component-css/ProductVariations.css';

const ProductVariations = ({setshowslab, pdata}) => {
  console.log(pdata)

  const productData = pdata;

  const [selectedVariationId, setSelectedVariationId] = useState('');
  const [selectedVariationPosition, setSelectedVariationPosition] = useState(-1);
  const [selectedAttributes, setSelectedAttributes] = useState({});
  const [attributeStructure, setAttributeStructure] = useState([]);

  // Discover attribute structure using defaultAttribute
  const getAttributeStructure = () => {
    const attributeMap = new Map();
    
    // Collect all unique attributes and identify the default variation
    productData.variations.forEach(variation => {
      variation.attributes.forEach(attr => {
        if (!attributeMap.has(attr.key)) {
          attributeMap.set(attr.key, {
            key: attr.key,
            values: new Set(),
            isDefault: !!attr.defaultAttribute,
            order: attr.defaultAttribute ? 0 : 1 // Default variation gets priority
          });
        }
        attributeMap.get(attr.key).values.add(attr.value);
      });
    });

    // Convert to array and sort by order (default variation first)
    const structure = Array.from(attributeMap.values())
      .sort((a, b) => a.order - b.order)
      .map(attr => ({
        ...attr,
        values: Array.from(attr.values)
      }));

    return structure;
  };

  // Get available values for a specific attribute based on current selections
  const getAvailableValuesForAttribute = (targetAttributeKey, tempSelection = null) => {
    const availableValues = new Set();
    const currentSelection = tempSelection || selectedAttributes;
    
    productData.variations.forEach(variation => {
      let matchesCurrentSelection = true;
      
      // Check if this variation matches all currently selected attributes (except the target one)
      for (const [selectedAttrKey, selectedValue] of Object.entries(currentSelection)) {
        if (selectedAttrKey !== targetAttributeKey) {
          const attr = variation.attributes.find(a => a.key === selectedAttrKey);
          if (!attr || attr.value !== selectedValue) {
            matchesCurrentSelection = false;
            break;
          }
        }
      }
      
      // If it matches, add the target attribute value as available
      if (matchesCurrentSelection) {
        const targetAttr = variation.attributes.find(a => a.key === targetAttributeKey);
        if (targetAttr) {
          availableValues.add(targetAttr.value);
        }
      }
    });
    
    return Array.from(availableValues);
  };

  // Find variation ID and position based on selected attributes
  const findVariationDetails = (attributes) => {
    const variationIndex = productData.variations.findIndex(v => {
      return Object.entries(attributes).every(([key, value]) => {
        const attr = v.attributes.find(a => a.key === key);
        return attr && attr.value === value;
      });
    });
    
    return {
      id: variationIndex !== -1 ? productData.variations[variationIndex]._id : '',
      position: variationIndex !== -1 ? variationIndex : -1
    };
  };

  // Initialize component - Ensure first variation is selected
  useEffect(() => {
    if (!productData || !productData.variations || productData.variations.length === 0) {
      return;
    }

    const structure = getAttributeStructure();
    setAttributeStructure(structure);

    // Always default to the first variation (position 0)
    const firstVariation = productData.variations[0];
    const initialSelection = {};
    
    // CRITICAL: Build selection directly from first variation's attributes
    firstVariation.attributes.forEach(attr => {
      initialSelection[attr.key] = attr.value;
    });
    
    // For your data, this should set:
    // initialSelection = { size: "small", color: "black" }
    
    // Set all states synchronously
    setSelectedAttributes(initialSelection);
    setSelectedVariationId(firstVariation._id);
    setSelectedVariationPosition(0);
    setshowslab(0);
    
  }, [pdata]); // Changed dependency to pdata to ensure it runs when prop changes

  // Handle attribute selection - Auto-select complete variation
  const handleAttributeSelect = (attributeKey, value) => {
    // Find the variation that has this specific attribute-value combination
    const matchingVariation = productData.variations.find(variation => 
      variation.attributes.some(attr => attr.key === attributeKey && attr.value === value)
    );
    
    if (matchingVariation) {
      // Select ALL attributes from this matching variation
      const completeSelection = {};
      
      matchingVariation.attributes.forEach(attr => {
        completeSelection[attr.key] = attr.value;
      });
      
      // Find the position of this variation
      const variationPosition = productData.variations.findIndex(v => v._id === matchingVariation._id);
      
      // Update all states with the complete variation
      setSelectedAttributes(completeSelection);
      setSelectedVariationId(matchingVariation._id);
      setSelectedVariationPosition(variationPosition);
      setshowslab(variationPosition);
    }
  };

  // Get current variation for display
  const getCurrentVariation = () => {
    return productData.variations.find(v => v._id === selectedVariationId);
  };

  const currentVariation = getCurrentVariation();

  return (
    <div className="container522">
      
      {/* Dynamic Attribute Sections */}
      {attributeStructure.map((attribute) => (
        <div key={attribute.key} className="attribute-section522">
          <div className="attribute-label522">
            {attribute.key}:
            {attribute.isDefault && <span className="default-indicator522"></span>}
          </div>
          <div className="attribute-options522">
            {attribute.values.map((value) => {
              // Check if this value is available based on current selections
              const isAvailable = attribute.isDefault 
                ? true 
                : getAvailableValuesForAttribute(attribute.key).includes(value);
              
              // Check if this value is currently selected
              const isSelected = selectedAttributes[attribute.key] === value;
              
              return (
                <div
                  key={value}
                  className={`attribute-box522 ${
                    !isAvailable 
                      ? 'disabled522' 
                      : isSelected 
                        ? 'selected522' 
                        : ''
                  }`}
                  onClick={() => isAvailable && handleAttributeSelect(attribute.key, value)}
                >
                  {value}
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {/* Selected Variation Info */}
      {/* {selectedVariationId && currentVariation && (
        <div className="selected-info522">
          <div className="selected-title522">Selected Variation:</div>
          {Object.entries(selectedAttributes).map(([key, value]) => (
            <div key={key} className="selected-detail522">
              <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
            </div>
          ))}
          <div className="selected-detail522">
            <strong>Variation ID:</strong> {selectedVariationId}
          </div>
          <div className="selected-detail522">
            <strong>Array Position:</strong> {selectedVariationPosition}
          </div>
          <div className="selected-detail522">
            <strong>Price:</strong> ₹{currentVariation.mrp}
          </div>
        </div>
      )} */}
    </div>
  );
};

export default ProductVariations;