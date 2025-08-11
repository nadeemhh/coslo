import React, { useState } from 'react';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow
} from '@react-google-maps/api';
import '../component/component-css/PropertyLocationDisplay.css'

const PropertyLocationDisplay = ({ propertyData }) => {
  console.log(propertyData)
  const [showInfoWindow, setShowInfoWindow] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const googleMapsApiKey = process.env.NEXT_PUBLIC_REACT_APP_Maps_API_KEY;

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: googleMapsApiKey,
    libraries: ['places'],
  });

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

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps...</div>;
  }

  return (
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
};

export default PropertyLocationDisplay;