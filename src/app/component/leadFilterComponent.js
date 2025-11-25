import React, { useState } from 'react';
import '../component/component-css/leadFilterComponent.css';
import Importleads from './importleads.js';
import SalespersonForm from './SalespersonForm.js';

const FilterComponent = ({ onFilterChange,inquiries765,salesrole }) => {
  const [showFilters565, setShowFilters565] = useState(false);
  const [filters565, setFilters565] = useState({
    call_status: '',
    lead_status: '',
    from_date: '',
    to_date: ''
  });
  const [loading565, setLoading565] = useState(false);
 const [filterurl, setfilterurl] = useState('');

  const callStatusOptions565 = [
    { value: '', label: 'All' },
    { value: 'Connected', label: '📞 Connected' },
    { value: 'Not Reachable', label: '🚫 Not Reachable' },
    { value: 'Switched Off', label: '📱 Switched Off' },
    { value: 'Did Not Pick', label: '🔕 Did Not Pick' },
    { value: 'Call Back Later', label: '🔁 Call Back Later' },
    { value: 'Wrong Number', label: '❌ Wrong Number' },
    { value: 'Maybe Later', label: '🤔 Maybe Later' }
  ];

  const leadStatusOptions565 = [
    { value: '', label: 'All' },
    { value: 'Interested', label: '💬 Interested' },
    { value: 'Not Interested', label: '💤 Not Interested' },
    { value: 'Deal Closed', label: '✅ Deal Closed' }
  ];

 
  const fetchFilteredData565 = async (updatedFilters) => {
    try {
      setLoading565(true);

      // Build query with updated filters
      const params = new URLSearchParams();
     
      
      if (updatedFilters.call_status) {
        params.append('call_status', updatedFilters.call_status);
      }
      if (updatedFilters.lead_status) {
        params.append('lead_status', updatedFilters.lead_status);
      }
      if (updatedFilters.from_date) {
        params.append('from_date', updatedFilters.from_date);
      }
      if (updatedFilters.to_date) {
        params.append('to_date', updatedFilters.to_date);
      }

     
      
      // Send the filtered data back to parent component
      onFilterChange(updatedFilters,params.toString());
      setfilterurl(params.toString())

    } catch (err) {
      console.error('Error fetching filtered data:', err);
      // Send empty array on error
      onFilterChange(updatedFilters,'');
    } finally {
      setLoading565(false);
    }
  };

  const handleFilterChange565 = (name, value) => {
    const updatedFilters = {
      ...filters565,
      [name]: value
    };
    setFilters565(updatedFilters);
    
    // Fetch data immediately when filter changes
    fetchFilteredData565(updatedFilters);
  };

  const handleClearFilters565 = () => {
    const clearedFilters = {
      call_status: '',
      lead_status: '',
      from_date: '',
      to_date: ''
    };
    setFilters565(clearedFilters);
    
    // Fetch data with cleared filters
    fetchFilteredData565(clearedFilters);
  };

  return (
    <div className="filter-wrapper565">

      <div style={{display:'flex',gap:'15px'}}>
      <button 
        className="refresh-btn765" 
        style={{ marginBottom: '10px' }}
        onClick={() => setShowFilters565(!showFilters565)}
      >
        {!showFilters565 && <i className="fas fa-filter"></i>} Filters {showFilters565 && <i className="fas fa-times" style={{color:'#ff3f3f',fontSize:'20px'}}></i>}
    
      </button>

   {salesrole === 'SALES_MANAGER' && <SalespersonForm />}

   </div>

      {showFilters565 && (
        <div className="filter-container565">
          {loading565 && (
            <div className="filter-loading565">
              <i className="fas fa-spinner fa-spin"></i>
            </div>
          )}
          
          <div className="filter-grid565">
            <div className="filter-item565">
              <label className="filter-label565">Call Status</label>
              <select
                className="filter-select565"
                value={filters565.call_status}
                onChange={(e) => handleFilterChange565('call_status', e.target.value)}
                disabled={loading565}
              >
                {callStatusOptions565.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-item565">
              <label className="filter-label565">Lead Status</label>
              <select
                className="filter-select565"
                value={filters565.lead_status}
                onChange={(e) => handleFilterChange565('lead_status', e.target.value)}
                disabled={loading565}
              >
                {leadStatusOptions565.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-item565">
              <label className="filter-label565">From Date</label>
              <input
                type="date"
                className="filter-date565"
                value={filters565.from_date}
                onChange={(e) => handleFilterChange565('from_date', e.target.value)}
                disabled={loading565}
              />
            </div>

            <div className="filter-item565">
              <label className="filter-label565">To Date</label>
              <input
                type="date"
                className="filter-date565"
                value={filters565.to_date}
                onChange={(e) => handleFilterChange565('to_date', e.target.value)}
                disabled={loading565}
              />
            </div>
          </div>

 <div className="filter-grid565" style={{marginTop:'30px'}}>
   <Importleads filterurl={filterurl}/>
 </div>

          <div className="filter-actions565">
            <button 
              className="clear-filter-btn565" 
              onClick={handleClearFilters565}
              disabled={loading565}
            >
              <i className="fas fa-times" style={{fontSize:'17px'}}></i> Remove Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterComponent;