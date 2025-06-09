'use client'

import { useState, useEffect } from 'react';
import '../component/component-css/ProductVariations.css';


const ProductVariations = ({setshowslab,pdata}) => {
  // Demo data
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

  // Initialize component
  useEffect(() => {
    const structure = getAttributeStructure();
    setAttributeStructure(structure);

    if (productData.variations.length > 0) {
      const firstVariation = productData.variations[0];
      const initialSelection = {};
      
      firstVariation.attributes.forEach(attr => {
        initialSelection[attr.key] = attr.value;
      });
      
      setSelectedAttributes(initialSelection);
      setSelectedVariationId(firstVariation._id);
      setSelectedVariationPosition(0);
      setshowslab(0)
    }
  }, []);

  // Handle attribute selection
  const handleAttributeSelect = (attributeKey, value) => {
    const newSelection = { ...selectedAttributes, [attributeKey]: value };
    
    // If this is the default variation attribute, update dependent attributes
    const selectedAttribute = attributeStructure.find(attr => attr.key === attributeKey);
    if (selectedAttribute?.isDefault) {
      // Auto-select first available value for other attributes
      const updatedSelection = { ...newSelection };
      
      attributeStructure.forEach(attr => {
        if (attr.key !== attributeKey) {
          const availableValues = getAvailableValuesForAttribute(attr.key, newSelection);
          if (availableValues.length > 0 && !availableValues.includes(selectedAttributes[attr.key])) {
            // Only auto-select if current selection is not available
            updatedSelection[attr.key] = availableValues[0];
          } else if (availableValues.includes(selectedAttributes[attr.key])) {
            // Keep current selection if it's still available
            updatedSelection[attr.key] = selectedAttributes[attr.key];
          }
        }
      });
      
      setSelectedAttributes(updatedSelection);
      const variationDetails = findVariationDetails(updatedSelection);
      setSelectedVariationId(variationDetails.id);
      setSelectedVariationPosition(variationDetails.position);
      setshowslab(variationDetails.position)
    } else {
      setSelectedAttributes(newSelection);
      const variationDetails = findVariationDetails(newSelection);
      setSelectedVariationId(variationDetails.id);
      setSelectedVariationPosition(variationDetails.position);
      setshowslab(variationDetails.position)
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
              // For the default variation attribute (size), all values should be available
              const isAvailable = attribute.isDefault ? true : getAvailableValuesForAttribute(attribute.key).includes(value);
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
      {selectedVariationId && currentVariation && (
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
      )}
    </div>
  );
};

export default ProductVariations;