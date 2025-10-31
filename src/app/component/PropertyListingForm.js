import { useState } from 'react';
import './component-css/PropertyListingForm.css';

const PropertyListingForm = ({ listingType = null,propertyvariations, setpropertyvariations,productupdate }) => {
  

 const [bhkOptions,setbhkOptions] = useState(['1bhk', '2bhk', '3bhk', '4bhk', '5bhk', '6bhk']);
  const [showAddBhk, setShowAddBhk] = useState(true);
  const [newBhk, setNewBhk] = useState('');


   console.log(propertyvariations)


  const handleAddVariation = () => {
    setpropertyvariations([...propertyvariations, {
      id: Date.now(),
      totalSqft: '',
      perSqftCost: '',
      totalCost: 0,
      bhkTypes: [],
      productImages: [],
    }]);
  };

  const handleRemoveVariation = (id) => {
    if (propertyvariations.length > 1) {
      setpropertyvariations(propertyvariations.filter(v => v.id !== id));
    }
  };

  const handleInputChange = (id, field, value) => {
    setpropertyvariations(propertyvariations.map(v => {
      if (v.id === id) {
        const updated = { ...v, [field]: Number(value) };
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
    setpropertyvariations(propertyvariations.map(v => {
      if (v.id === id) {
        const bhkTypes = v.bhkTypes.includes(bhk)
          ? v.bhkTypes.filter(b => b !== bhk)
          : [bhk];
        return { ...v, bhkTypes };
      }
      return v;
    }));

    //  setpropertyvariations(propertyvariations.map(v => {
    //   if (v.id === id) {
    //     const bhkTypes = v.bhkTypes.includes(bhk)
    //       ? v.bhkTypes.filter(b => b !== bhk)
    //       : [...v.bhkTypes, bhk];
    //     return { ...v, bhkTypes };
    //   }
    //   return v;
    // }));
  };

   const handleAddMoreBhkClick = () => {
    setShowAddBhk(false);
  };

  const handleAddNewBhk = () => {
    if (newBhk.trim() && !bhkOptions.includes(newBhk.trim()) && newBhk.toLowerCase().includes('bhk') ) {
      setbhkOptions([...bhkOptions, newBhk.trim()]);
      setNewBhk('');
      setShowAddBhk(true);
    }
  };

  const handleCancelAddBhk = () => {
    setNewBhk('');
    setShowAddBhk(true);
  };



const handleFileUpload = (id, type, files) => {
  const fileArray = Array.from(files);
  
  if (type === 'video') {
    // For video, only process the first file
    const reader = new FileReader();
    reader.onloadend = () => {
      setpropertyvariations(propertyvariations.map(v => {
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
      setpropertyvariations(prevpropertyvariations => prevpropertyvariations.map(v => {
        if (v.id === id) {
          return { ...v, productImages: [...v.productImages, ...results] };
        }
        return v;
      }));
    });
  }
};

  const removeImage = (varId, imgIndex) => {
    setpropertyvariations(propertyvariations.map(v => {
      if (v.id === varId) {
        return { ...v, productImages: v.productImages.filter((_, i) => i !== imgIndex) };
      }
      return v;
    }));
  };


   const removeawsImage = (varId, imgIndex) => {
  
    setpropertyvariations(propertyvariations.map(v => {
      if (v._id === varId) {
        return { ...v, awsImages: v.awsImages.filter((_, i) => i !== imgIndex),deleteImages: [...v.deleteImages ,v.awsImages[imgIndex]] };
      }
      return v;
    }));
  };



  


  function postnewVariation(newVariation=false,vid,vindex) {

     let propertyvariation =structuredClone(propertyvariations[vindex]);

  

    function cleanVariationData(variationsDataRemove) {
  const keysToRemove = variationsDataRemove;
 console.log(keysToRemove)
    const cleaned = { ...propertyvariation };
    keysToRemove.forEach(key => delete cleaned[key]);
    return cleaned;
}

 propertyvariation = cleanVariationData(["attributes","availableSlots","priceSlabs"]);
 console.log(propertyvariation)
try {
    document.querySelector('.loaderoverlay').style.display = 'flex';

    const token = localStorage.getItem('token');
    let pid = new URLSearchParams(window.location.search).get("pid");

    let uploadurl = newVariation
      ? `${process.env.NEXT_PUBLIC_BASE_URL}/product/variation/${pid}`
      : `${process.env.NEXT_PUBLIC_BASE_URL}/product/updateVariation/${pid}/${vid}`;

    fetch(uploadurl, {
      method: newVariation ? "POST" : "PUT",
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify(propertyvariation),
    })
      .then(response => {
        if (!response.ok) {
          return response.json().then(errorData => {
            throw new Error(errorData.message || "Failed to update product");
          });
        }
        document.querySelector('.loaderoverlay').style.display = 'none';
        alert("Product Updated successfully!");
         location.reload()
  
      })
      .catch(error => {
        document.querySelector('.loaderoverlay').style.display = 'none';
        alert("Failed to Update Product: " + error.message);
      });
  } catch (error) {
    console.error("Error:", error);
    document.querySelector('.loaderoverlay').style.display = 'none';
    alert("Something went wrong!");
  }

  }



  

  function deletevariation(vid) {

    
    const token = localStorage.getItem('token');
  
    let pid = new URLSearchParams(window.location.search).get("pid");

        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/product/variation/${pid}/${vid}`, {
          method: 'DELETE',
           headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }), // Add token if it exists
        }
        })
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              return response.json().then((errorData) => {
               
                throw new Error(errorData.error || 'Failed');
              });
            }
          })
          .then((data) => {
         
  
          alert(data.message)
        location.reload()
          })
          .catch((err) => {
            document.querySelector('.loaderoverlay').style.display = 'none';
            console.log(err)
           
           
          });
    
      
    }



  return (
     <> 
   { listingType && <div className="property-listing-container-878">

      {propertyvariations.map((variation, vindex) => (
        <div key={vindex} className="variation-card-878">
          {propertyvariations.length > 1 && (
            !variation._id ?
            <button 
              className="remove-btn-878"
              onClick={() => handleRemoveVariation(variation.id)}
            >
              <i className="fa fa-times"></i>
            </button>
            :
            <button 
              className="remove-btn-878"
              onClick={() => deletevariation(variation._id)}
            >
              <i className="fa fa-times"></i>
            </button>
          )}

          <h3 style={{ marginTop: 0, marginBottom: 20, color: '#007bff' }}>
            Property {vindex + 1}
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

          {(listingType === 'Apartments' || listingType === 'Villa') && (
              <div className="input-group-878" style={{marginBottom:listingType!=='Plots'?'60px':'30px'}}>
                <label className="input-label-878">Select BHK Types</label>
                <div className="bhk-container-878" style={{marginBottom:'7px'}}>
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
                
                {showAddBhk ? (
                  <button 
                    onClick={handleAddMoreBhkClick}
                    style={{
                      marginTop: '10px',
                      padding: '8px 16px',
                      backgroundColor: '#198231cf',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      float:'right'
                    }}
                  >
                    Add More BHK
                  </button>
                ) : (
                  <div style={{ marginTop: '10px', display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <input
                      type="text"
                      value={newBhk}
                      onChange={(e) => setNewBhk(e.target.value)}
                      placeholder="Enter BHK (e.g., 7BHK)"
                      style={{
                        padding: '8px 12px',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        fontSize: '14px',
                        flex: 1
                      }}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleAddNewBhk();
                        }
                      }}
                    />
                    <button 
                      onClick={handleAddNewBhk}
                      style={{
                        padding: '8px 16px',
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '14px'
                      }}
                    >
                      Add
                    </button>
                    <button 
                      onClick={handleCancelAddBhk}
                      style={{
                        padding: '8px 16px',
                        backgroundColor: '#6c757d',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '14px'
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                )}
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
              {variation.productImages.map((img, imgIndex) => (
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

 {variation?.awsImages?.map((img, imgIndex) => (
                <div key={imgIndex} className="preview-item-878">
                  <img src={img} alt={`Property ${imgIndex + 1}`} />
                  <button
                    className="preview-remove-878"
                    onClick={() => removeawsImage(variation._id, imgIndex)}
                  >
                    <i className="fa fa-times"></i>
                  </button>
                </div>
              ))}

            </div>
          </div>

          {variation._id && <button 
                      onClick={()=>(postnewVariation(false,variation._id,vindex))}
                      style={{
                        width:'100%',
                        marginTop:'20px',
                        padding: '8px 16px',
                        backgroundColor: '#00a10dff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '14px'
                      }}
                    >
                      Save Changes
                    </button>}

                    
          {productupdate && !variation._id && <button 
                      onClick={()=>(postnewVariation(true,null,vindex))}
                      style={{
                        width:'100%',
                        marginTop:'20px',
                        padding: '8px 16px',
                        backgroundColor: '#00a10dff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '14px'
                      }}
                    >
                      Save n Changes
                    </button>}

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