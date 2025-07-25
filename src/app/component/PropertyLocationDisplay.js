import React, { useState } from 'react';
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow
} from '@react-google-maps/api';
import '../component/component-css/PropertyLocationDisplay.css'

// Utility function to check if Google Maps is already loaded
const isGoogleMapsLoaded = () => {
  return typeof window !== 'undefined' && window.google && window.google.maps;
};

const PropertyLocationDisplay = ({ propertyData }) => {
  console.log(propertyData)
  const [showInfoWindow, setShowInfoWindow] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);

  const googleMapsApiKey = process.env.NEXT_PUBLIC_REACT_APP_Maps_API_KEY;

  if (!propertyData || !propertyData.location || !propertyData.location.coordinates) {
    return (
      <div className="display-container767">
        <div className="error-card767">
          <h2 className="error-title767">Invalid Property Data</h2>
          <p className="error-message767">
            Property location data is missing or incomplete.
          </p>
        </div>
      </div>
    );
  }

  const { propertyName, propertyType, price, description, location } = propertyData;
  const [longitude, latitude] = location.coordinates;
  const address = location.address;

  const mapCenter = { lat: latitude, lng: longitude };

  const mapOptions = {
    zoom: 15,
    mapTypeControl: true,
    streetViewControl: true,
    fullscreenControl: true,
    zoomControl: true,
  };

  const formatPrice = (price) => {
    if (price >= 10000000) return `₹${(price / 10000000).toFixed(1)} Cr`;
    if (price >= 100000) return `₹${(price / 100000).toFixed(1)} L`;
    return `₹${price.toLocaleString()}`;
  };

  const getPropertyTypeDisplay = (type) => {
    const types = {
      apartment: 'Apartment',
      house: 'House',
      villa: 'Villa',
      commercial: 'Commercial Property'
    };
    return types[type] || type;
  };

  // Check if Google Maps is already loaded
  const mapsAlreadyLoaded = isGoogleMapsLoaded();

  // Map component that will be used in both cases
  const MapComponent = () => (
    <div className="map-display-container767">
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '100%' }}
        center={mapCenter}
        zoom={15}
        options={mapOptions}
        onLoad={() => setMapLoaded(true)}
      >
        <Marker
          position={mapCenter}
          onClick={() => setShowInfoWindow(true)}
          title={propertyName}
        />

        {showInfoWindow && (
          <InfoWindow
            position={mapCenter}
            onCloseClick={() => setShowInfoWindow(false)}
          >
            <div className="info-window767">
             
              <p className="info-address767">{address||''}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );

  return (
    <div className="display-content-wrapper767">
      {mapsAlreadyLoaded ? (
        // If Google Maps is already loaded, render map directly
        <div className="property-display-container767">
          <MapComponent />
        </div>
      ) : (
        // If Google Maps is not loaded, use LoadScript
        <LoadScript 
          googleMapsApiKey={googleMapsApiKey} 
          libraries={['places']}
          onLoad={() => console.log('Google Maps API loaded')}
          onError={() => console.error('Error loading Google Maps API')}
        >
          <div className="property-display-container767">
            <MapComponent />
          </div>
        </LoadScript>
      )}
    </div>
  );
};

export default PropertyLocationDisplay;