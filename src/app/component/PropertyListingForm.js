import React, { useState } from 'react';

const PropertyListingForm = ({ listingType = null }) => {
    console.log(listingType)
  const [variations, setVariations] = useState([{
    id: Date.now(),
    totalSqft: '',
    perSqftCost: '',
    totalCost: 0,
    bhkTypes: [],
    propertyImages: [],
    video: null
  }]);

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
    fileArray.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setVariations(variations.map(v => {
          if (v.id === id) {
            if (type === 'images') {
              return { ...v, propertyImages: [...v.propertyImages, reader.result] };
            } else {
              return { ...v, video: reader.result };
            }
          }
          return v;
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (varId, imgIndex) => {
    setVariations(variations.map(v => {
      if (v.id === varId) {
        return { ...v, propertyImages: v.propertyImages.filter((_, i) => i !== imgIndex) };
      }
      return v;
    }));
  };

  const removeVideo = (varId) => {
    setVariations(variations.map(v => {
      if (v.id === varId) {
        return { ...v, video: null };
      }
      return v;
    }));
  };

  return (
     <> 
   { listingType && <div className="property-listing-container-878">
      <style>{`
        .property-listing-container-878 {
          width: 520px;
          height: 520px;
          overflow-x: auto;
          overflow-y: auto;
          background: #ffffff;
          padding: 20px;
          margin-bottom: 20px;
        }

        .variation-card-878 {
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          padding: 20px;
          margin-bottom: 20px;
          position: relative;
          background: #f9f9f9;
        }

        .remove-btn-878 {
          position: absolute;
          top: 10px;
          right: 10px;
          background: #dc3545;
          color: white;
          border: none;
          border-radius: 50%;
          width: 30px;
          height: 30px;
          cursor: pointer;
          font-size: 16px;
        }

        .remove-btn-878:hover {
          background: #c82333;
        }

        .input-group-878 {
          margin-bottom: 15px;
        }

        .input-label-878 {
          display: block;
          margin-bottom: 5px;
          font-weight: bold;
          color: #333;
          font-size: 14px;
        }

        .input-field-878 {
          width: 100%;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 4px;
          font-size: 14px;
          box-sizing: border-box;
        }

        .input-field-878:focus {
          outline: none;
          border-color: #007bff;
        }

        .input-field-878:disabled {
          background: #e9ecef;
        }

        .bhk-container-878 {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 10px;
        }

        .bhk-checkbox-878 {
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .bhk-checkbox-878 input {
          width: 18px;
          height: 18px;
          cursor: pointer;
          accent-color: #007bff;
        }

        .bhk-checkbox-878 label {
          cursor: pointer;
          font-size: 14px;
        }

        .upload-section-878 {
          margin-top: 15px;
        }

        .upload-btn-878 {
          display: inline-block;
          padding: 10px 15px;
          background: #2d83df;
          color: white;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
          margin-right: 10px;
        }

        .upload-btn-878:hover {
          background: #0056b3;
        }

        .upload-btn-878 input {
          display: none;
        }

        .preview-container-878 {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 10px;
        }

        .preview-item-878 {
          position: relative;
          width: 80px;
          height: 80px;
          border: 1px solid #ddd;
          border-radius: 4px;
          overflow: hidden;
        }

        .preview-item-878 img,
        .preview-item-878 video {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .preview-remove-878 {
          position: absolute;
          top: 2px;
          right: 2px;
          background: rgba(220, 53, 69, 0.9);
          color: white;
          border: none;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          cursor: pointer;
          font-size: 12px;
          line-height: 1;
        }

        .add-variation-btn-878 {
          width: 100%;
          padding: 10px;
          background: #007bff;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }

        .add-variation-btn-878:hover {
          background: #0056b3;
        }
      `}</style>

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

            <label className="upload-btn-878">
              <i className="fa fa-video-camera"></i> Upload Video
              <input
                type="file"
                accept="video/*"
                onChange={(e) => handleFileUpload(variation.id, 'video', e.target.files)}
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