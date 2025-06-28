'use client';
import { useEffect, useState } from 'react';
import './component-css/AttributeForm.css';

const SelectedAttributeArray = ({attributes,primaryGroup,addAttribute,currentattributes}) => {
  const [selectedAttribute, setSelectedAttribute] = useState('');
  const [selectedAttributeArray, setSelectedAttributeArray] = useState([]);

  const handleCheckboxChange = (item, isChecked) => {
    if (isChecked) {
      // Add to selectedAttributeArray if not already present
      setSelectedAttributeArray(prev => {
        const exists = prev.some(attr => attr.value === item.value);
        if (!exists) {
          // Add defaultAttribute property only if item's key matches primaryGroup
          const itemWithDefault = {
            ...item
          };
          
          // Only add defaultAttribute if the item's key matches the primary group
          if (primaryGroup && item.key === primaryGroup) {
            itemWithDefault.defaultAttribute = primaryGroup;
          }
          
          return [...prev, itemWithDefault];
        }
        return prev;
      });
    } else {
      // Remove from selectedAttributeArray
      setSelectedAttributeArray(prev => prev.filter(attr => attr.value !== item.value));
    }
  };

  const isItemSelected = (itemValue) => {
    return selectedAttributeArray.some(attr => attr.value === itemValue);
  };

  console.log('Selected Attribute Array:', selectedAttributeArray);
 
  useEffect(() => {
    if(selectedAttributeArray.length>0){addAttribute(selectedAttributeArray);}
  }, [selectedAttributeArray]);

  useEffect(() => {
   if(selectedAttributeArray.length===0){ setSelectedAttributeArray([...currentattributes])}
  }, []);

  return (
    <div className="attribute-form-671">
      
 <p className="form-label"  style={{fontSize:'15px',fontWeight:'600',margin:'15px 0px',color:'#1389F0'}}>Add Attributes</p>
      {/* Select Group */}
      <select
        className="select-attribute-671"
        value={selectedAttribute}
        onChange={(e) => {
          setSelectedAttribute(e.target.value)
        }}
        style={{ marginBottom: '10px' }}
      >
        <option value="">Select Attribute</option>
        {attributes.map((attr, idx) => (
          <option key={idx} value={attr.GroupName}>
            {attr.GroupName}
          </option>
        ))}
      </select>

      {selectedAttribute && (
        <div className="attribute-details-671">
          {/* Attribute List */}
          <div className="added-attributes-671">
            <h4>{selectedAttribute} List:</h4>
            <ul>
              {attributes
                .find(attr => attr.GroupName === selectedAttribute)
                ?.Attributes.map((item, idx) => (
                  <li key={idx} style={{ margin: '5px', marginTop: '10px', display: 'flex', alignItems: 'center' }}>
                   <input
                      type="checkbox"
                      checked={isItemSelected(item.value)}
                      onChange={(e) => {
                        // If checking this item, first remove any existing item with the same key
                        if (e.target.checked) {
                          setSelectedAttributeArray(prev => prev.filter(attr => attr.key !== item.key));
                        }
                        handleCheckboxChange(item, e.target.checked);
                      }}
                      style={{ marginRight: '8px' }}
                    />
                    <span>
                      {item.key}: {item.value}
                    </span>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      )}

      {/* Display Selected Attributes */}
      {selectedAttributeArray.length > 0 && (
        <div className="selected-attributes-671" style={{ marginTop: '20px', padding: '10px', borderRadius: '5px' }}>
          <h4>Selected Attributes ({selectedAttributeArray.length}):</h4>
          <ul>
            {selectedAttributeArray.map((item, idx) => (
              <li key={idx} style={{ margin: '3px 0' }}>
                {item.key}: {item.value} 
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SelectedAttributeArray;