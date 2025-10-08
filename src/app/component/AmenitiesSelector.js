import React, { useState, useEffect } from 'react';

const AmenitiesSelector = ({selectedAmenities, setSelectedAmenities, propertyAmenities,setUserData}) => {
  const [amenities, setAmenities] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAmenityName, setNewAmenityName] = useState('');
  const [newAmenityImage, setNewAmenityImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // console.log(selectedAmenities,propertyAmenities)
  // Fetch amenities from API
  useEffect(() => {
    fetchAmenities();
  }, []);


   useEffect(() => {

    setUserData((prevState) => ({
      ...prevState,
      productData: {
        ...prevState.productData,
        ['ammenties']: selectedAmenities,
      },
    }));

  }, [selectedAmenities]);

  const fetchAmenities = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/amenity/`);
      const data = await response.json();
      console.log(data)
      setAmenities(data);

       

    } catch (error) {
      console.error('Error fetching amenities:', error);
    }
  };

  const filteredAmenities = amenities.filter(amenity =>
    amenity.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleAmenity = (amenity) => {
  const existingIndex = selectedAmenities.findIndex(id => id === amenity._id);
  
  if (existingIndex !== -1) {
    setSelectedAmenities(selectedAmenities.filter((_, index) => index !== existingIndex));
  } else {
    setSelectedAmenities([...selectedAmenities, amenity._id]);
  }
};

const isAmenitySelected = (amenity) => {
  return selectedAmenities.includes(amenity._id);
};


/////////

// const toggleAmenity = (amenity) => {
//     const existingIndex = selectedAmenities.findIndex(item => item._id === amenity._id);
    
//     if (existingIndex !== -1) {
//       setSelectedAmenities(selectedAmenities.filter((_, index) => index !== existingIndex));
//     } else {
//       setSelectedAmenities([...selectedAmenities, amenity]);
//     }
//   };

//   const isAmenitySelected = (amenity) => {
//     return selectedAmenities.some(item => item._id === amenity._id);
//   };

/////

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setNewAmenityImage(file);
    }
  };

  const handleCreateAmenity = async () => {
    if (!newAmenityName.trim()) {
      alert('Please enter amenity name');
      return;
    }
    if (!newAmenityImage) {
      alert('Please select an image');
      return;
    }

    setIsLoading(true);
    
    const formData = new FormData();
    formData.append('AmenitieName', newAmenityName);
    formData.append('AmenitieImage', newAmenityImage);

    try {
         const token = localStorage.getItem('token');

      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/amenity/`, {
        method: 'POST',
          headers: {
          ...(token && { Authorization: `Bearer ${token}` }), // Add token if it exists
        },
        body: formData,
      });

      if (response.ok) {
        // Refresh amenities list
        await fetchAmenities();
        
        // Reset form
        setNewAmenityName('');
        setNewAmenityImage(null);
        setShowAddForm(false);
        alert('Amenity created successfully!');
      } else {
        alert('Failed to create amenity');
      }
    } catch (error) {
      console.error('Error creating amenity:', error);
      alert('Error creating amenity');
    } finally {
      setIsLoading(false);
    }
  };

  const styles = {
    container676: {
      width: '500px',
      height: '500px',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: '#ddd',
      borderRadius: '8px',
      fontFamily: 'Arial, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#fff',
    },
    header676: {
      padding: '16px',
      borderBottomWidth: '1px',
      borderBottomStyle: 'solid',
      borderBottomColor: '#e0e0e0',
      backgroundColor: '#f8f9fa',
    },
    title676: {
      margin: '0 0 12px 0',
      fontSize: '18px',
      fontWeight: '600',
      color: '#333',
    },
    searchContainer676: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
    },
    searchIcon676: {
      position: 'absolute',
      left: '12px',
      color: '#666',
      fontSize: '14px',
    },
    searchInput676: {
      width: '100%',
      padding: '10px 10px 10px 36px',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: '#ddd',
      borderRadius: '6px',
      fontSize: '14px',
      outline: 'none',
      transition: 'border-color 0.2s',
    },
    selectedCount676: {
      marginTop: '8px',
      fontSize: '13px',
      color: '#666',
    },
    listContainer676: {
      overflowY: 'auto',
      flex: 1,
      padding: '8px',
      display: 'flex',
      flexWrap: 'wrap',
      gap: '8px',
      alignContent: 'flex-start',
    },
    amenityItem676: {
      display: 'flex',
      alignItems: 'center',
      padding: '12px',
      margin: '0',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: '#e0e0e0',
      borderRadius: '6px',
      cursor: 'pointer',
      transition: 'all 0.2s',
      backgroundColor: '#fff',
      width: 'calc(50% - 4px)',
      boxSizing: 'border-box',
      position: 'relative',
    },
    amenityItemSelected676: {
      backgroundColor: '#e3f2fd',
      borderColor: '#2196f3',
    },
    checkbox676: {
      width: '18px',
      height: '18px',
      minWidth: '18px',
      borderWidth: '2px',
      borderStyle: 'solid',
      borderColor: '#999',
      borderRadius: '4px',
      marginRight: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.2s',
    },
    checkboxSelected676: {
      backgroundColor: '#2196f3',
      borderColor: '#2196f3',
    },
    checkIcon676: {
      color: '#fff',
      fontSize: '12px',
    },
    amenityText676: {
      fontSize: '14px',
      color: '#333',
      userSelect: 'none',
      flex: 1,
    },
    noResults676: {
      padding: '20px',
      textAlign: 'center',
      color: '#999',
      fontSize: '14px',
      width: '100%',
    },
    imagePreview676: {
      width: '30px',
      height: '30px',
      borderRadius: '4px',
      objectFit: 'cover',
      marginLeft: '8px',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: '#ddd',
    },
    addButton: {
      padding: '10px 16px',
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '500',
      marginBottom: '12px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      transition: 'background-color 0.2s',
    },
    addFormContainer: {
      padding: '16px',
      backgroundColor: '#f5f5f5',
      borderRadius: '6px',
      marginBottom: '12px',
    },
    formInput: {
      width: '100%',
      padding: '10px',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: '#ddd',
      borderRadius: '6px',
      fontSize: '14px',
      marginBottom: '12px',
      boxSizing: 'border-box',
      outline: 'none',
    },
    fileInputLabel: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '10px',
      backgroundColor: '#fff',
      border: '1px dashed #999',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '14px',
      color: '#666',
      marginBottom: '12px',
      transition: 'border-color 0.2s',
    },
    fileInputHidden: {
      display: 'none',
    },
    createButton: {
      padding: '10px 16px',
      backgroundColor: '#4caf50',
      color: '#fff',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '500',
      marginRight: '8px',
      transition: 'background-color 0.2s',
    },
    cancelButton: {
      padding: '10px 16px',
      backgroundColor: '#999',
      color: '#fff',
      border: 'none',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '500',
      transition: 'background-color 0.2s',
    },
  };

  return (
    <div style={styles.container676}>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
      />
      
      <div style={styles.header676}>
      

        <h3 style={styles.title676}>Select Amenities</h3>
        <div style={styles.searchContainer676}>
          <i className="fa fa-search" style={styles.searchIcon676}></i>
          <input
            type="text"
            placeholder="Search amenities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.searchInput676}
            className="searchInput676"
          />
        </div>
        <div style={styles.selectedCount676}>
         <strong>Selected: {selectedAmenities.length}</strong> 
        </div>
      </div>

      <div style={styles.listContainer676}>
        {filteredAmenities.length > 0 ? (
          filteredAmenities.map((amenity) => {
            const isSelected = isAmenitySelected(amenity);
           
            return (
              <div
                key={amenity._id}
                onClick={() => toggleAmenity(amenity)}
                style={{
                  ...styles.amenityItem676,
                  ...(isSelected ? styles.amenityItemSelected676 : {}),
                }}
                className="amenityItem676"
              >
                <div
                  style={{
                    ...styles.checkbox676,
                    ...(isSelected ? styles.checkboxSelected676 : {}),
                  }}
                >
                  {isSelected && (
                    <i className="fa fa-check" style={styles.checkIcon676}></i>
                  )}
                </div>
                <span style={styles.amenityText676}>{amenity.name}</span>
                
                {amenity.image && (
                  <img 
                    src={amenity.image} 
                    alt={amenity.name}
                    style={styles.imagePreview676}
                  />
                )}
              </div>
            );
          })
        ) : (
          <div style={styles.noResults676}>
            <i className="fa fa-search" style={{ marginRight: '8px' }}></i>
            No amenities found
          </div>
        )}
      </div>

       <div style={styles.header676}>


 <button 
          style={styles.addButton}
          onClick={() => setShowAddForm(!showAddForm)}
          className="addButton"
        >
          Add Your Own Amenity 
          <i className="fas fa-plus-circle"></i>
        </button>

        {showAddForm && (
          <div style={styles.addFormContainer}>
            <input
              type="text"
              placeholder="Amenity Name"
              value={newAmenityName}
              onChange={(e) => setNewAmenityName(e.target.value)}
              style={styles.formInput}
            />
            
            <label style={styles.fileInputLabel} className="fileInputLabel">
              <i className="fas fa-upload"></i>
              {newAmenityImage ? newAmenityImage.name : 'Upload Amenity Image'}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={styles.fileInputHidden}
              />
            </label>

            <div>
              <button 
                style={styles.createButton}
                onClick={handleCreateAmenity}
                disabled={isLoading}
                className="createButton"
              >
                {isLoading ? 'Creating...' : 'Create Amenity'}
              </button>
              <button 
                style={styles.cancelButton}
                onClick={() => {
                  setShowAddForm(false);
                  setNewAmenityName('');
                  setNewAmenityImage(null);
                }}
                className="cancelButton"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

</div>

      <style>{`
        .searchInput676:focus {
          border-color: #2196f3;
        }
        .amenityItem676:hover {
          background-color: #f5f5f5;
          transform: translateX(2px);
        }
        .addButton:hover {
          background-color: #1976d2;
        }
        .createButton:hover:not(:disabled) {
          background-color: #45a049;
        }
        .createButton:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .cancelButton:hover {
          background-color: #777;
        }
        .fileInputLabel:hover {
          border-color: #2196f3;
        }
        .listContainer676::-webkit-scrollbar {
          width: 8px;
        }
        .listContainer676::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 4px;
        }
        .listContainer676::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 4px;
        }
        .listContainer676::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>
    </div>
  );
};

export default AmenitiesSelector;