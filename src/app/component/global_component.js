"use client"
import "./component-css/ui.css";
import { createContext, useContext, useState } from 'react';



 function Uiview() {
  return (
    <div className="main-container"> 
    {/* Page Heading */}
    <h2 className="custom-heading">Custom Components Example</h2>
  
    {/* Buttons Section */}

    <div className="custom-section">
      <h5>Buttons</h5>

      {/* Default Button */}

      <button className="custom-btn small-btn">Small Button</button>
      <button className="custom-btn medium-btn">Medium Button</button>
      <button className="custom-btn large-btn">Large Button</button>
      <button className="custom-btn full-btn mt-2">Full-Width Button</button>
    </div>
  
    {/* Buttons with Icons */}

    <div className="custom-section">
      <h5>Buttons with Icons</h5>

      {/* Button with left icon */}

      <button className="custom-btn icon-btn left-icon">
        <i className="icon fas fa-arrow-left"></i> Back
      </button>

      {/* Button with right icon */}

      <button className="custom-btn icon-btn right-icon">
        Forward <i className="icon fas fa-arrow-right"></i>
      </button>
    </div>
  


      {/* Bootstrap Switch */}
     
      <div>

      <div className="form-check form-switch">
        <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
        <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
          Default switch checkbox input
        </label>
      </div>

      <div className="form-check form-switch">
        <input
          className="form-check-input"
          type="checkbox"
          role="switch"
          id="flexSwitchCheckChecked"
          defaultChecked
        />
        <label className="form-check-label" htmlFor="flexSwitchCheckChecked">
          Checked switch checkbox input
        </label>
      </div>

      <div className="form-check form-switch">
        <input
          className="form-check-input"
          type="checkbox"
          role="switch"
          id="flexSwitchCheckDisabled"
          disabled
        />
        <label className="form-check-label" htmlFor="flexSwitchCheckDisabled">
          Disabled switch checkbox input
        </label>
      </div>

      <div className="form-check form-switch">
        <input
          className="form-check-input"
          type="checkbox"
          role="switch"
          id="flexSwitchCheckCheckedDisabled"
          defaultChecked
          disabled
        />
        <label className="form-check-label" htmlFor="flexSwitchCheckCheckedDisabled">
          Disabled checked switch checkbox input
        </label>
      </div>

    </div>

      {/* Radio Buttons */}
     
          <input type="radio" name="radioGroup" className="form-check-input" id="radio1" />
      
        
          <br />
          
      {/* Checkboxes */}
      
          <input type="checkbox" className="form-check-input" id="checkbox1" />
      


    {/* Input Section */}

    <div className="custom-section">
      <h5>Input</h5>
      <input type="text" className="custom-input small-input" placeholder="Small Input" />
      <input type="text" className="custom-input medium-input" placeholder="Medium Input" />
      <input type="text" className="custom-input large-input" placeholder="Large Input" />
      <input type="text" className="custom-input full-width-input mt-2" placeholder="Full-Width Input" />
    </div>
  

    {/* Select Section */}

    <div className="custom-section">
      <h5>Select Options</h5>

      <select className="custom-select small-select">
        <option value="1">Small Select</option>
        <option value="2">Small Select Option</option>
      </select>

      <select className="custom-select medium-select">
        <option value="1">Medium Select</option>
        <option value="2">Medium Select Option</option>
      </select>

      <select className="custom-select large-select mt-2">
        <option value="1">Large Select</option>
        <option value="2">Large Select Option</option>
      </select>

      <select className="custom-select full-width-select mt-2">
        <option value="1">Full-Width Select</option>
        <option value="2">Full-Width Select Option</option>
      </select>

    </div>
    <CounterComponent />

  </div>
  
  );
}


const CounterComponent = () => {
  const [value, setValue] = useState(0);

  // Handle decrement
  const handleDecrement = () => {
    setValue((prev) => prev - 1);
  };

  // Handle increment
  const handleIncrement = () => {
    setValue((prev) => prev + 1);
  };

  // Handle manual input change
  const handleChange = (e) => {
    const newValue = e.target.value;

    if (/^-?\d*$/.test(newValue)) {
      setValue(Number(newValue));
    }
  };

  return (
    <div className="counter-container">
      {/* Decrease Area */}
      <div className="counter-btn" onClick={handleDecrement}>
        -
      </div>

      {/* Input Field */}
      <input
        type="text"
        value={value}
        onChange={handleChange}
        className="counter-input"
      />

      {/* Increase Area */}
      <div className="counter-btn" onClick={handleIncrement}>
        +
      </div>
    </div>
  );
};

export default CounterComponent;