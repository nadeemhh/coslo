import { useState } from 'react';
import './component-css/PropertyListingForm.css';

const PropertyListingForm = ({ listingType = null }) => {
   
  const [variations, setVariations] = useState([{
    id: Date.now(),
    totalSqft: '',
    perSqftCost: '',
    totalCost: 0,
    bhkTypes: [],
    propertyImages: [],
    video: null
  }]);





   console.log(variations)


  const bhkOptions = ['1BHK', '2BHK', '3BHK', '4BHK', '5BHK', '6BHK'];

  const handleAddVariation = () => {
    setVariations([...variations, {
      id: Date.now(),
      totalSqft: '',
      perSqftCost: '',
      totalCost: 0,
      bhkTypes: [],
      propertyImages: [],
      video: null
    }]);
  };

  const handleRemoveVariation = (id) => {
    if (variations.length > 1) {
      setVariations(variations.filter(v => v.id !== id));
    }
  };

  const handleInputChange = (id, field, value) => {
    setVariations(variations.map(v => {
      if (v.id === id) {
        const updated = { ...v, [field]: value };
        if (field === 'totalSqft' || field === 'perSqftCost') {
          const sqft = field === 'totalSqft' ? parseFloat(value) || 0 : parseFloat(v.totalSqft) || 0;
          const cost = field === 'perSqftCost' ? parseFloat(value) || 0 : parseFloat(v.perSqftCost) || 0;
          updated.totalCost = sqft * cost;
        }
        return updated;
      }
      return v;
    }));
  };

  const handleBhkToggle = (id, bhk) => {
    setVariations(variations.map(v => {
      if (v.id === id) {
        const bhkTypes = v.bhkTypes.includes(bhk)
          ? v.bhkTypes.filter(b => b !== bhk)
          : [...v.bhkTypes, bhk];
        return { ...v, bhkTypes };
      }
      return v;
    }));
  };

const handleFileUpload = (id, type, files) => {
  const fileArray = Array.from(files);
  
  if (type === 'video') {
    // For video, only process the first file
    const reader = new FileReader();
    reader.onloadend = () => {
      setVariations(variations.map(v => {
        if (v.id === id) {
          return { ...v, video: reader.result };
        }
        return v;
      }));
    };
    reader.readAsDataURL(fileArray[0]);
  } else {
    // For images, read all files and collect results
    const promises = fileArray.map(file => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(promises).then(results => {
      setVariations(prevVariations => prevVariations.map(v => {
        if (v.id === id) {
          return { ...v, propertyImages: [...v.propertyImages, ...results] };
        }
        return v;
      }));
    });
  }
};

  const removeImage = (varId, imgIndex) => {
    setVariations(variations.map(v => {
      if (v.id === varId) {
        return { ...v, propertyImages: v.propertyImages.filter((_, i) => i !== imgIndex) };
      }
      return v;
    }));
  };






  return (
     <> 
   { listingType && <div className="property-listing-container-878">

      {variations.map((variation, index) => (
        <div key={variation.id} className="variation-card-878">
          {variations.length > 1 && (
            <button 
              className="remove-btn-878"
              onClick={() => handleRemoveVariation(variation.id)}
            >
              <i className="fa fa-times"></i>
            </button>
          )}

          <h3 style={{ marginTop: 0, marginBottom: 20, color: '#007bff' }}>
            Variation {index + 1}
          </h3>

          <div className="input-group-878">
            <label className="input-label-878">Total Sqft</label>
            <input
              type="number"
              className="input-field-878"
              value={variation.totalSqft}
              onChange={(e) => handleInputChange(variation.id, 'totalSqft', e.target.value)}
              placeholder="Enter total square feet"
            />
          </div>

          <div className="input-group-878">
            <label className="input-label-878">Per Sqft Cost</label>
            <input
              type="number"
              className="input-field-878"
              value={variation.perSqftCost}
              onChange={(e) => handleInputChange(variation.id, 'perSqftCost', e.target.value)}
              placeholder="Enter cost per square feet"
            />
          </div>

          <div className="input-group-878">
            <label className="input-label-878">Total Cost</label>
            <input
              type="text"
              className="input-field-878"
              value={variation.totalCost.toFixed(2)}
              disabled
            />
          </div>

          {listingType === 'Apartments' && (
            <div className="input-group-878" style={{marginBottom:'30px'}}>
              <label className="input-label-878">Select BHK Types</label>
              <div className="bhk-container-878">
                {bhkOptions.map(bhk => (
                  <div key={bhk} className="bhk-checkbox-878">
                    <input
                      type="checkbox"
                      id={`${variation.id}-${bhk}`}
                      checked={variation.bhkTypes.includes(bhk)}
                      onChange={() => handleBhkToggle(variation.id, bhk)}
                    />
                    <label htmlFor={`${variation.id}-${bhk}`}>{bhk}</label>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="upload-section-878">
            <label className="upload-btn-878">
              <i className="fa fa-image"></i> Upload Images
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => handleFileUpload(variation.id, 'images', e.target.files)}
              />
            </label>

          

            <div className="preview-container-878">
              {variation.propertyImages.map((img, imgIndex) => (
                <div key={imgIndex} className="preview-item-878">
                  <img src={img} alt={`Property ${imgIndex + 1}`} />
                  <button
                    className="preview-remove-878"
                    onClick={() => removeImage(variation.id, imgIndex)}
                  >
                    <i className="fa fa-times"></i>
                  </button>
                </div>
              ))}

              {variation.video && (
                <div className="preview-item-878">
                  <video src={variation.video} />
                  <button
                    className="preview-remove-878"
                    onClick={() => removeVideo(variation.id)}
                  >
                    <i className="fa fa-times"></i>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}

      <button className="add-variation-btn-878" onClick={handleAddVariation}>
        <i className="fa fa-plus"></i> Add Variation
      </button>
    </div>}
   </>
  );
};

export default PropertyListingForm;