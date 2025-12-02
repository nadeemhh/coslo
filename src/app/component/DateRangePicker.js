'use client'

import { useState } from "react";

 const DateRangePicker = ({setsearchquery}) => {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [isRangeSelected, setIsRangeSelected] = useState(false);
  
    const handleApply = () => {
      console.log(`Selected Range: Start Date - ${startDate}, End Date - ${endDate}`);
      setIsRangeSelected(true);
      if(startDate !== '' && endDate !== ''){
        setsearchquery([`startDate=${startDate}&`, `endDate=${endDate}`]);
      }
    };
  
    const handleClear = () => {
      setStartDate("");
      setEndDate("");
      setIsRangeSelected(false);
    };
  
    const handleDateChange = (type, value) => {
      if (type === "start") setStartDate(value);
      if (type === "end") setEndDate(value);
  
      if (startDate && endDate) {
        setIsRangeSelected(true);
      }
    };
  
    return (
      <div className="date-range-picker" style={{marginBottom:'20px',display:'flex',flexWrap:'wrap',alignItems:'flex-end',textAlign:'left'}}>
        <div>
        <label htmlFor="">Start Date</label>
        <div className="date-input">
          
          <input
            type="date"
            placeholder="Start Date"
            value={startDate}
            onChange={(e) => handleDateChange("start", e.target.value)}
          />
        </div>
        </div>

  <div>
        <label htmlFor="">End Date</label>
        <div className="date-input">
        
          <input
            type="date"
            placeholder="End Date"
            value={endDate}
            onChange={(e) => handleDateChange("end", e.target.value)}
          />
        </div>
        </div>

        {!isRangeSelected && (
          <button className="apply-button" onClick={handleApply}>
            Apply
          </button>
        )}
        {isRangeSelected && (
          <button className="clear-button" onClick={handleClear}>
            Clear
          </button>
        )}
      </div>
    );
  
  };
  

  export default DateRangePicker;