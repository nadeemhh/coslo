'use client'
import { useState } from 'react';
import './component-css/AttributeForm.css';

const AttributeForm = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedAttribute, setSelectedAttribute] = useState('');
  const [attributes, setAttributes] = useState({
    colors: [
      { key: 'color', value: 'red' },
      { key: 'color', value: 'blue' }
    ],
    sizes: [
      { key: 'size', value: 'S' },
      { key: 'size', value: 'M' },
      { key: 'size', value: 'L' }
    ]
  });
  const [newAttrName, setNewAttrName] = useState('');
  const [keyValue, setKeyValue] = useState({ key: '', value: '' });

  const handleAddAttributeType = () => {
    if (newAttrName && !attributes[newAttrName]) {
      setAttributes({ ...attributes, [newAttrName]: [] });
      setNewAttrName('');
    }
  };

  const handleAddKeyValue = () => {
    if (selectedAttribute && keyValue.key && keyValue.value) {
      setAttributes({
        ...attributes,
        [selectedAttribute]: [
          ...attributes[selectedAttribute],
          { key: keyValue.key, value: keyValue.value }
        ]
      });
      setKeyValue({ key: '', value: '' });
    }
  };

  return (
    <div className="attribute-wrapper-671">
        
          {showForm ? <i className="fa fa-times" onClick={() => setShowForm(!showForm)}></i> : <button className="create-attribute-btn-671" onClick={() => setShowForm(!showForm)}>
       Create Attribute
      </button>}

     

      {showForm && (
        <div className="attribute-form-671">
          <div className="form-group-671">
            <input
              type="text"
              placeholder="New attribute name (e.g. fabric)"
              value={newAttrName}
              onChange={(e) => setNewAttrName(e.target.value)}
              className="input-671"
            />
            <button className="add-attr-btn-671" onClick={handleAddAttributeType}>
              Add Attribute
            </button>
          </div>

          <select
            className="select-attribute-671"
            value={selectedAttribute}
            onChange={(e) => setSelectedAttribute(e.target.value)}
            style={{marginBottom:"10px"}}
          >
            <option value="">Select Attribute</option>
            {Object.keys(attributes).map((attr) => (
              <option key={attr} value={attr}>{attr}</option>
            ))}
          </select>

          {selectedAttribute && (
            <div className="attribute-details-671">
              <div className="form-group-671">
                <input
                  type="text"
                  placeholder="Key (e.g. color)"
                  value={keyValue.key}
                  onChange={(e) => setKeyValue({ ...keyValue, key: e.target.value })}
                  className="key-input-671"
                />
                <input
                  type="text"
                  placeholder="Value (e.g. blue)"
                  value={keyValue.value}
                  onChange={(e) => setKeyValue({ ...keyValue, value: e.target.value })}
                  className="value-input-671"
                />
                <button className="add-key-value-btn-671" onClick={handleAddKeyValue}>
                  Add
                </button>
              </div>

              <div className="added-attributes-671">
                <h4>{selectedAttribute} List:</h4>
                <ul>
                  {attributes[selectedAttribute].map((item, idx) => (
                    <li key={idx} style={{margin:'5px'}}>{item.key}: {item.value}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AttributeForm;
