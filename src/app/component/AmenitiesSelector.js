import React, { useState, useRef ,useEffect} from 'react';

const AmenitiesSelector = ({selectedAmenities, setSelectedAmenities}) => {
  const amenities = [
  "24/7 Security",
  "AC in Bedrooms",
  "Air Conditioning",
  "Amphitheater",
  "ATM",
  "Badminton Court",
  "Basketball Court",
  "BBQ Area",
  "BBQ Pavilion",
  "Billiards / Pool Table",
  "Biometric Entry",
  "Cafeteria / Coffee Shop",
  "Car Parking",
  "CCTV Surveillance",
  "Children's Library",
  "Children's Play Area",
  "Clubhouse",
  "Community Garden",
  "Community Hall",
  "Convenience Store",
  "Covered Parking",
  "Cricket Pitch",
  "Dance / Yoga Studio",
  "Designer Entrance Lobby",
  "Dog Park",
  "Electric Car Parking",
  "Electric Vehicle Charging Station",
  "Elevator / Lift",
  "Emergency Power Backup",
  "Fire Alarm System",
  "Fire Safety System",
  "Fitness Center / Gym",
  "Flower Garden",
  "Gated Community",
  "Gazebo / Pergola",
  "Golf Course",
  "Green Landscaping",
  "Guest Rooms",
  "Helipad",
  "Herbal / Medicinal Garden",
  "Indoor Games Room",
  "Indoor Swimming Pool",
  "Intercom Facility",
  "Jacuzzi / Hot Tub",
  "Jogging Track",
  "Juice / Snack Bar",
  "Kids' Play Area",
  "Kids' Pool",
  "Landscape Lighting",
  "Library / Reading Room",
  "Lift / Elevator",
  "Maintenance Staff",
  "Meditation Area",
  "Mini Golf",
  "Mini Theater / Screening Room",
  "Multipurpose Court",
  "Open Air Theater",
  "Open Terrace",
  "Outdoor Gym",
  "Outdoor Seating",
  "Paved Driveway",
  "Pet-Friendly Area",
  "Piped Gas",
  "Power Backup / Generator",
  "Rainwater Harvesting",
  "Rainwater Recharge System",
  "Recycling Facility",
  "Reflexology Path",
  "Restaurant / Cafe",
  "Retail Shops",
  "Roof Garden",
  "Rooftop Lounge",
  "Security Cabin",
  "Shopping Complex",
  "Skating Rink",
  "Smart Home Features",
  "Smart Metering",
  "Solar Panels",
  "Spa / Sauna",
  "Sports Facilities",
  "Squash Court",
  "Staff Quarters",
  "Steam Room",
  "Street Lighting",
  "Swimming Pool",
  "Swimming Pool with Slide",
  "Tennis Court",
  "Theater Room / Mini Cinema",
  "Transformer / Electrical Substation",
  "Trekkers' Path / Nature Trail",
  "Trolley / Golf Cart",
  "UGC Approved Community Hall",
  "Underground Parking",
  "Urban Garden / Park",
  "Utility Shops",
  "Vastu Compliant",
  "Video Door Security",
  "Video Intercom",
  "Visitor Lounge",
  "Visitor Parking",
  "Washing / Laundry Area",
  "Waste Disposal System",
  "Water Fountain / Feature",
  "Water Storage / Tank",
  "Water Treatment Plant",
  "Wellness Center",
  "Wet Area / Jacuzzi",
  "Wheelchair Access",
  "Wi-Fi / Internet Connectivity",
  "Wooden Deck / Patio",
  "Work from Home / Office Room",
  "Yoga Deck",
  "Zebra Crossing / Internal Roads"
  ];

 
  const [searchTerm, setSearchTerm] = useState('');
  const fileInputRefs = useRef({});

console.log(selectedAmenities)


  const filteredAmenities = amenities.filter(amenity =>
    amenity.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleAmenity = (amenity) => {
    const existingIndex = selectedAmenities.findIndex(item => item.AmenitieName === amenity);
    
    if (existingIndex !== -1) {
      setSelectedAmenities(selectedAmenities.filter((_, index) => index !== existingIndex));
    } else {
      setSelectedAmenities([...selectedAmenities, { AmenitieName: amenity, AmenitieImage: null }]);
    }
  };

  const isAmenitySelected = (amenity) => {
    return selectedAmenities.some(item => item.AmenitieName === amenity);
  };

  const getAmenityData = (amenity) => {
    return selectedAmenities.find(item => item.AmenitieName === amenity);
  };

  const handleImageUpload = (amenity, event) => {
    event.stopPropagation();
    const file = event.target.files[0];
    
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setSelectedAmenities(prev => 
          prev.map(item => 
            item.AmenitieName === amenity 
              ? { ...item, AmenitieImage: base64String }
              : item
          )
        );
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (amenity, event) => {
    event.stopPropagation();
    event.preventDefault();
    setSelectedAmenities(prev => 
      prev.map(item => 
        item.AmenitieName === amenity 
          ? { ...item, AmenitieImage: null }
          : item
      )
    );
  };

  const openFileInput = (amenity, event) => {
    event.stopPropagation();
    event.preventDefault();
    fileInputRefs.current[amenity]?.click();
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
    uploadButton676: {
      width: '28px',
      height: '28px',
      borderRadius: '50%',
      backgroundColor: '#4caf50',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      transition: 'all 0.2s',
      marginLeft: '8px',
      flexShrink: 0,
    },
    uploadIcon676: {
      color: '#fff',
      fontSize: '12px',
    },
    removeButton676: {
      width: '28px',
      height: '28px',
      borderRadius: '50%',
      backgroundColor: '#f44336',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      transition: 'all 0.2s',
      marginLeft: '8px',
      flexShrink: 0,
    },
    removeIcon676: {
      color: '#fff',
      fontSize: '12px',
    },
    fileInput676: {
      display: 'none',
    },
    noResults676: {
      padding: '20px',
      textAlign: 'center',
      color: '#999',
      fontSize: '14px',
      width: '100%',
    },
    imagePreview676: {
      width: '28px',
      height: '28px',
      borderRadius: '4px',
      objectFit: 'cover',
      marginLeft: '8px',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: '#ddd',
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
            const amenityData = getAmenityData(amenity);
            const hasImage = amenityData?.AmenitieImage;
            
            return (
              <div
                key={amenity}
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
                <span style={styles.amenityText676}>{amenity}</span>
                
                {isSelected && (
                  <>
                    <input
                      ref={(el) => (fileInputRefs.current[amenity] = el)}
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(amenity, e)}
                      style={styles.fileInput676}
                      onClick={(e) => e.stopPropagation()}
                    />
                    
                    {hasImage ? (
                      <>
                        <img 
                          src={amenityData.AmenitieImage} 
                          alt={amenity}
                          style={styles.imagePreview676}
                          onClick={(e) => e.stopPropagation()}
                        />
                        <div
                          onMouseDown={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            removeImage(amenity, e);
                          }}
                          style={styles.removeButton676}
                          className="removeButton676"
                          title="Remove image"
                        >
                          <i 
                            className="fa fa-times" 
                            style={{...styles.removeIcon676, pointerEvents: 'none'}}
                          ></i>
                        </div>
                      </>
                    ) : (
                      <div
                        onMouseDown={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          openFileInput(amenity, e);
                        }}
                        style={styles.uploadButton676}
                        className="uploadButton676"
                        title="Upload image"
                      >
                        <i 
                          className="fa fa-upload" 
                          style={{...styles.uploadIcon676, pointerEvents: 'none'}}
                        ></i>
                      </div>
                    )}
                  </>
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

      <style>{`
        .searchInput676:focus {
          border-color: #2196f3;
        }
        .amenityItem676:hover {
          background-color: #f5f5f5;
          transform: translateX(2px);
        }
        .uploadButton676:hover {
          background-color: #45a049;
          transform: scale(1.1);
        }
        .removeButton676:hover {
          background-color: #da190b;
          transform: scale(1.1);
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