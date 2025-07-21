import React, { useState, useRef } from 'react';
import { LoadScript, StandaloneSearchBox } from '@react-google-maps/api';

const libraries = ['places'];

const Googlelocationsearch = ({setProducts}) => {
  const [searchValue, setSearchValue] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(null);
  const searchBoxRef = useRef(null);

  // Replace with your actual Google Maps API key
  const googleMapsApiKey = process.env.NEXT_PUBLIC_REACT_APP_Maps_API_KEY;

  const onLoadSearchBox = (ref) => {
    searchBoxRef.current = ref;
  };

  const onPlacesChanged = () => {
    if (searchBoxRef.current) {
      const places = searchBoxRef.current.getPlaces();
      if (places && places.length > 0) {
        const place = places[0];
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        const address = place.formatted_address;

        const locationData = {
          address,
          latitude: lat,
          longitude: lng
        };

        setSelectedLocation(locationData);
        setSearchValue(address);
        
        // Log the stored data
        console.log('Stored Location Data:', locationData);

        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/product/properties/search-by-location?longitude=72.01&latitude=19`)
  .then(response => {
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    return response.json();
  })
  .then(data => {
    console.log("Data received:", data);
    setProducts(data.data.properties)
  })
  .catch(error => {
    console.error("Fetch error:", error);
  });

      }
    }
  };

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  // If no API key is provided, show a demo version
  if (!googleMapsApiKey || googleMapsApiKey === 'YOUR_GOOGLE_MAPS_API_KEY') {
    return (
      <div style={{ 
        maxWidth: '600px', 
        margin: '0 auto', 
        padding: '20px',
        fontFamily: 'Arial, sans-serif'
      }}>
        <div style={{
          backgroundColor: '#fff3cd',
          border: '1px solid #ffeaa7',
          borderRadius: '8px',
          padding: '20px',
          marginBottom: '20px'
        }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#856404' }}>Demo Mode</h3>
          <p style={{ margin: 0, color: '#856404' }}>
            To use this component, replace 'YOUR_GOOGLE_MAPS_API_KEY' with your actual Google Maps API key.
          </p>
        </div>
        
        <div style={{
          border: '2px solid #e1e5e9',
          borderRadius: '8px',
          padding: '20px'
        }}>
          <h2 style={{ marginTop: 0, color: '#333' }}>Location Search</h2>
          
          <div style={{ marginBottom: '20px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px',
              fontWeight: 'bold',
              color: '#555'
            }}>
              Search Location:
            </label>
            <input
              type="text"
              value={searchValue}
              onChange={handleInputChange}
              placeholder="Enter address to search... (Demo mode - Google Places disabled)"
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #ddd',
                borderRadius: '6px',
                fontSize: '16px',
                boxSizing: 'border-box'
              }}
              disabled
            />
          </div>

          {selectedLocation && (
            <div style={{
              backgroundColor: '#d4edda',
              border: '1px solid #c3e6cb',
              borderRadius: '6px',
              padding: '15px',
              marginTop: '20px'
            }}>
              <h3 style={{ margin: '0 0 10px 0', color: '#155724' }}>Selected Location:</h3>
              <p style={{ margin: '5px 0', color: '#155724' }}>
                <strong>Address:</strong> {selectedLocation.address}
              </p>
              <p style={{ margin: '5px 0', color: '#155724' }}>
                <strong>Latitude:</strong> {selectedLocation.latitude}
              </p>
              <p style={{ margin: '5px 0', color: '#155724' }}>
                <strong>Longitude:</strong> {selectedLocation.longitude}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <LoadScript 
      googleMapsApiKey={googleMapsApiKey}
      libraries={libraries}
    >
      <div style={{ 
        width: 'fit-content', 
        margin: '0 auto', 
        padding: '10px',
        fontFamily: 'Arial, sans-serif',
        marginBottom:'20px'
       
      }}>
        <div style={{
          borderRadius: '8px',
          padding: '20px',
           boxShadow:'0 1px 2px #3c404391, 0 1px 3px 1px #3c404326'
        }}>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px',
              fontWeight: 'bold',
              color: '#555',
              textAlign:'left'
            }}>
              Property Search:
            </label>

            <div style={{
              display:'flex',
              gap:"10px",
              borderRadius:'10px',
              alignItems:"center",
                  width: '100%',
                  border: '2px solid #ddd',
                  borderRadius: '6px',
                  fontSize: '16px',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.3s ease',
                  backgroundColor:'white',
                  padding:'0px 5px'

                }}>

            <StandaloneSearchBox
              onLoad={onLoadSearchBox}
              onPlacesChanged={onPlacesChanged}
            >
              <input
                type="text"
                value={searchValue}
                onChange={handleInputChange}
                placeholder="Enter address to search..."
                style={{
                  width: '100%',
                  padding: '12px',
                  fontSize: '16px',
                  outline:'none',
                  border:'none',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.3s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = '#007bff'}
                onBlur={(e) => e.target.style.borderColor = '#ddd'}
              />
            </StandaloneSearchBox>

     <img src="\icons\newsearchicon.svg" alt="search icon" />
            </div>
          </div>

          {selectedLocation && (
            <div style={{
              backgroundColor: '#d4edda',
              border: '1px solid #c3e6cb',
              borderRadius: '6px',
              padding: '15px',
              marginTop: '20px'
            }}>
              <h3 style={{ margin: '0 0 10px 0', color: '#155724' }}>Selected Location:</h3>
              <p style={{ margin: '5px 0', color: '#155724' }}>
                <strong>Address:</strong> {selectedLocation.address}
              </p>
              <p style={{ margin: '5px 0', color: '#155724' }}>
                <strong>Latitude:</strong> {selectedLocation.latitude}
              </p>
              <p style={{ margin: '5px 0', color: '#155724' }}>
                <strong>Longitude:</strong> {selectedLocation.longitude}
              </p>
            </div>
          )}
        </div>
      </div>
    </LoadScript>
  );
};

export default Googlelocationsearch;