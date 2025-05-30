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
  const [checkedItems, setCheckedItems] = useState({});
  const [relationSelection, setRelationSelection] = useState({});
  const [relationAttrSelection, setRelationAttrSelection] = useState({});

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

  const handleCheck = (attr, index) => {
    const key = `${attr}-${index}`;
    setCheckedItems({
      ...checkedItems,
      [key]: {
        ...checkedItems[key],
        checked: !checkedItems[key]?.checked,
        attr,
        index
      }
    });
  };

  const handleRelationValueToggle = (parentKey, relationAttr, value) => {
    const current = relationSelection[parentKey]?.[relationAttr] || [];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];

    setRelationSelection({
      ...relationSelection,
      [parentKey]: {
        ...(relationSelection[parentKey] || {}),
        [relationAttr]: updated
      }
    });
  };

  const handleSetAttribute = () => {
    const dataToSave = Object.entries(checkedItems)
      .filter(([_, val]) => val.checked)
      .map(([key, val]) => {
        const [attrKey, index] = key.split('-');
        const item = attributes[attrKey][index];
        const relations = relationSelection[key] || {};
        return {
          ...item,
          increasePrice: val.increasePrice || 0,
          relation: Object.keys(relations).length > 0 ? relations : null
        };
      });
    console.log('Save to DB:', dataToSave);
  };

  return (
    <div className="attribute-wrapper-671">
      {showForm ? (
        <i className="fa fa-times" onClick={() => setShowForm(!showForm)}></i>
      ) : (
        <button className="create-attribute-btn-671" onClick={() => setShowForm(!showForm)}>
          Create Attribute
        </button>
      )}

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
            style={{ marginBottom: '10px' }}
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
                <h4 style={{marginBottom:'15px',marginTop: '30px'}}>{selectedAttribute} List:</h4>
                <ul>
                  {attributes[selectedAttribute].map((item, idx) => {
                    const key = `${selectedAttribute}-${idx}`;
                    const checked = checkedItems[key]?.checked || false;
                    const selectedRelationAttr = relationAttrSelection[key] || '';
                    return (
                      <li key={idx} style={{ margin: '5px' }}>
                        <label>
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => handleCheck(selectedAttribute, idx)}
                          />{' '}
                          {item.key}: {item.value}
                        </label>
                        {checked && (
                          <div className="form-group-671" style={{ marginTop: '5px',marginBottom:'40px',marginTop:'20px'  }}>
                            <div style={{ marginTop: '10px' }}>
                            <label>Increase price</label>
                            <input
                              type="number"
                              placeholder="Enter price"
                              onChange={(e) =>
                                setCheckedItems({
                                  ...checkedItems,
                                  [key]: {
                                    ...checkedItems[key],
                                    increasePrice: parseFloat(e.target.value) || 0
                                  }
                                })
                              }
                              className="input-671"
                            />
                            </div>
                            <div style={{ marginTop: '10px' }}>
                              <label>Select relation attribute:</label>
                              <select
                                className="select-attribute-671"
                                value={selectedRelationAttr}
                                onChange={(e) =>
                                  setRelationAttrSelection({
                                    ...relationAttrSelection,
                                    [key]: e.target.value
                                  })
                                }
                              >
                                <option value="">-- Select Attribute --</option>
                                {Object.keys(attributes).map((attr) => (
                                  <option key={attr} value={attr}>{attr}</option>
                                ))}
                              </select>

                              {selectedRelationAttr && (
                                <div style={{ marginTop: '10px' }}>
                                  <strong>{selectedRelationAttr} values:</strong>
                                  <ul style={{ marginLeft: '15px' }}>
                                    {attributes[selectedRelationAttr].map((val, i) => (
                                      <li key={i}>
                                        <label>
                                          <input
                                            type="checkbox"
                                            checked={
                                              relationSelection[key]?.[selectedRelationAttr]?.includes(val.value) || false
                                            }
                                            onChange={() => handleRelationValueToggle(key, selectedRelationAttr, val.value)}
                                          />{' '}
                                          {val.value}
                                        </label>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
              <button className="add-key-value-btn-671" onClick={handleSetAttribute} style={{marginTop: '20px'}}>
                Set Attribute
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AttributeForm;
