import React, { useState } from 'react';
import './component-css/FiltersComponent.css'

const FiltersComponent = ({sortOrder,setSortOrder,setPage,setProducts,fetchProducts,setHasMore}) => {
  const [isOpen, setIsOpen] = useState(false);


  const toggleFilters = () => {
    setIsOpen(!isOpen);
  };

  const handlePriceFilter = (order) => {
    setSortOrder(order);
    setPage(1);
    setProducts([]);
  setHasMore(true)
    // fetchProducts()
    console.log('Sort order set to:', sortOrder);
  };

  return (
    <div className="filters-767-container">
     

      <button 
        className={`filters-767-button ${isOpen ? 'open' : ''}`}
        onClick={toggleFilters}
      >
        <span>Filters</span>
       <i className="fas fa-filter"></i>
      </button>

      {isOpen && (
        <div className={`filters-767-dropdown ${isOpen ? 'open' : 'closed'}`}>
          <div className="filters-767-content">
            <div className="filters-767-title">
              <span>🏷️</span>
              Price Sorting
            </div>
            
            <div className="filters-767-options">
              <button
                className={`filters-767-option ${sortOrder === 'desc' ? 'active' : ''}`}
                onClick={() => handlePriceFilter('desc')}
              >
                Highest Price
              </button>
              
              <button
                className={`filters-767-option ${sortOrder === 'asc' ? 'active' : ''}`}
                onClick={() => handlePriceFilter('asc')}
              >
                Lowest Price
              </button>
            </div>

            {sortOrder && (
              <div className="filters-767-status">
                <strong>Active Filter:</strong> {sortOrder === 'desc' ? 'Highest Price First' : 'Lowest Price First'}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FiltersComponent;