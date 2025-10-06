import React, { useState, useCallback, useRef } from 'react';
import { 
  GoogleMap, 
  LoadScript, 
  Marker, 
  StandaloneSearchBox 
} from '@react-google-maps/api';
import '../component/component-css/PropertyLocationForm.css'
  import Nearbyarea from '../component/nearbyarea.js';

const libraries = ['places'];

const PropertyLocationForm = ({setUserData,show,userlocation}) => {
  // Form state

  const [formData, setFormData] = useState(userlocation);
    const [selectedBengaluruPlace, setSelectedBengaluruPlace] = useState("");

  // Map state
  const [mapCenter, setMapCenter] = useState({
    lat: userlocation.location.latitude,
    lng: userlocation.location.longitude
  });

  // Refs
  const searchBoxRef = useRef(null);
  const mapRef = useRef(null);

  // Google Maps API key from environment
  const googleMapsApiKey = process.env.NEXT_PUBLIC_REACT_APP_Maps_API_KEY;

  // Map options
  const mapOptions = {
    zoom: 13,
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false,
  };

  // Handle search box load
  const onLoadSearchBox = useCallback((ref) => {
    searchBoxRef.current = ref;
  }, []);

  // Handle places changed (address selection)
  const onPlacesChanged = useCallback(() => {
    if (searchBoxRef.current) {
      const places = searchBoxRef.current.getPlaces();
      if (places && places.length > 0) {
        const place = places[0];
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        const address = place.formatted_address;

        // Update form data
        setFormData(prev => ({
          ...prev,
          location: {
              ...prev.location,
            address,
            latitude: lat,
            longitude: lng
           
          }
        }));

        // Update map center
        setMapCenter({ lat, lng });
      }
    }
  }, []);

  // Handle map click
  const onMapClick = useCallback((event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();

    // Update form data with new coordinates
    setFormData(prev => ({
      ...prev,
      location: {
        ...prev.location,
        latitude: lat,
        longitude: lng
      }
    }));

    // Optionally reverse geocode to get address
    if (window.google && window.google.maps) {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ location: { lat, lng } }, (results, status) => {
        if (status === 'OK' && results[0]) {
          setFormData(prev => ({
            ...prev,
            location: {
              ...prev.location,
              address: results[0].formatted_address
            }
          }));
        }
      });
    }
  }, []);

  // Handle form input changes
 const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log('Input change:', name, value);
    console.log('Current formData before update:', formData);
    
    // Update the location object with the new value
    setFormData(prev => {
      const updated = {
        ...prev,
        location: {
          ...prev.location,
          [name]: value
        }
      };
      console.log('Updated formData:', updated);
      return updated;
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    

    if(!formData.location.address||!formData.location.city||!formData.location.state||!selectedBengaluruPlace){ 
      alert('Enter All Details')
    return;
  }


    const geocode = async () => {
      const apiKey = process.env.NEXT_PUBLIC_REACT_APP_Maps_API_KEY;
      const address = formData.location.address;
      console.log(address)

      fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          address
        )}&key=${apiKey}`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          if (data.results.length > 0) {
            console.log("Full Response:", data);

           const longNames = data?.results[0]?.address_components
  .map(comp => comp?.long_name)
  .join(", ");

console.log(longNames);

 // Prepare data for backend
    const dataToSend = {

      location: {
        geoJsonType: "Point",
        address: formData.location.address,
        coordinates:[formData.location.longitude,formData.location.latitude],
         state:formData.location.state,
      city:formData.location.city,
      area:selectedBengaluruPlace,
      googleAddress:longNames,
      }
    };

console.log(dataToSend)

 setUserData((prevState) => ({
      ...prevState,
      productData: {
        ...prevState.productData,
        ['location']: dataToSend.location,
      },
    }));
   
    alert('Location submitted successfully')

          } else {
            console.log("No results found.");
          }
        })
        .catch((error) => {
          console.error("Error fetching geocode data:", error.message);
        });
    };

    geocode();


   
  };

  if (!googleMapsApiKey) {
    return (
      <div className="container767">
        <div className="error-card767">
          <h2 className="error-title767">Configuration Error</h2>
          <p className="error-message767">
            Please add your Google Maps API key to the .env file as REACT_APP_Maps_API_KEY
          </p>
        </div>
      </div>
    );
  }

  return (

      <div className={show === "property"?"content-wrapper767":'hide767'}>
    

        <LoadScript 
          googleMapsApiKey={googleMapsApiKey}
          libraries={libraries}
        >
          <div className="form-container767">
            <div className="form-grid767">
              {/* Form Fields */}
              <div className="form-section767">
             
             <div className="form-group767">
                  <label className="form-label767">
                  Enter State
                  </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.location.state||''}
                      onChange={handleInputChange}
                      placeholder="Enter state"
                      className="form-input767"
                    />
                </div>

                <div className="form-group767">
                  <label className="form-label767">
                  Enter City
                  </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.location.city||''}
                      onChange={handleInputChange}
                      placeholder="Enter city"
                      className="form-input767"
                    />
                </div>

               

                <div className="form-group767">
                  <label className="form-label767">
                  Enter Property Address
                  </label>
                  <StandaloneSearchBox
                    onLoad={onLoadSearchBox}
                    onPlacesChanged={onPlacesChanged}
                  >
                    <input
                      type="text"
                      name="address"
                      value={formData.location.address}
                      onChange={handleInputChange}
                      placeholder="Enter address to search..."
                      className="form-input767"
                    />
                  </StandaloneSearchBox>
                </div>

                 <div className="form-group767">
                  <label className="form-label767">
                  Select Area
                  </label>
                  
                  <Nearbyarea selectedBengaluruPlace={selectedBengaluruPlace} setSelectedBengaluruPlace={setSelectedBengaluruPlace}/>
                </div>

              

                {/* Hidden coordinate fields for debugging */}
                <div className="location-info767">
                  <p className="location-title767">Location Data</p>
                  <p className="location-text767">
                    Latitude: {formData.location.latitude.toFixed(6)}
                  </p>
                  <p className="location-text767">
                    Longitude: {formData.location.longitude.toFixed(6)}
                  </p>
                </div>
              </div>

              {/* Map */}
              <div className="map-section767">
                <div className="map-group767">
                  <label className="form-label767" style={{marginBottom:'20px',textAlign:'center',fontSize:'20px',fontWeight:"600"}}>
                    Property Location
                  </label>
                  <p className="map-description767">
                    Search for an address or click on the map to set the location
                  </p>
                  <div className="map-container767">
                    <GoogleMap
                      ref={mapRef}
                      mapContainerStyle={{ width: '100%', height: '100%' }}
                      center={mapCenter}
                      zoom={13}
                      onClick={onMapClick}
                      options={mapOptions}
                    >
                      <Marker
                        position={{
                          lat: formData.location.latitude,
                          lng: formData.location.longitude
                        }}
                        draggable={true}
                        onDragEnd={(e) => {
                          const lat = e.latLng.lat();
                          const lng = e.latLng.lng();
                          setFormData(prev => ({
                            ...prev,
                            location: {
                              ...prev.location,
                              latitude: lat,
                              longitude: lng
                            }
                          }));
                        }}
                      />
                    </GoogleMap>
                  </div>
                </div>
              </div>
            </div>

            <div className="form-footer767">
              <button
                type="button"
                onClick={handleSubmit}
                className="submit-button767"
              >
                Submit Location
              </button>
            </div>
          </div>
        </LoadScript>
      </div>
   
  );
};

export default PropertyLocationForm;