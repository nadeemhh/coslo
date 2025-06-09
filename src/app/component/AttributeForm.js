'use client';
import { useEffect, useState } from 'react';
import './component-css/AttributeForm.css';


const AttributeForm = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedAttribute, setSelectedAttribute] = useState('');
  const [attributes, setAttributes] = useState([]);
  const [newAttrName, setNewAttrName] = useState('');
  const [keyValue, setKeyValue] = useState({ key: '', value: '' });

  // Fetch all attribute groups on mount
  useEffect(() => {
    fetchAttributes();
  }, []);

  const fetchAttributes = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/attribute`);
      const data = await res.json();
      setAttributes(data);
    } catch (err) {
      console.error('Error fetching attributes:', err);
    }
  };

  const handleAddAttributeType = async () => {
    if (!newAttrName.trim()) return;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/attribute/attribute-groups`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ groupName: newAttrName })
      });
      if (res.ok) {
        setNewAttrName('');
        fetchAttributes(); // refresh
      }
    } catch (err) {
      console.error('Error creating group:', err);
    }
  };

  const handleAddKeyValue = async () => {
    if (!selectedAttribute || !keyValue.key || !keyValue.value) return;
    const group = attributes.find(attr => attr.GroupName === selectedAttribute);
    if (!group) return;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/attribute/attribute-groups/${group.groupid}/attributes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(keyValue)
      });
      if (res.ok) {
        setKeyValue({ ...keyValue, value: '' });
        fetchAttributes(); // refresh
      }
    } catch (err) {
      console.error('Error adding attribute:', err);
    }
  };

  const handleDeleteAttribute = async (groupid, attributeid) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/attribute/attribute-groups/${groupid}/attributes/${attributeid}`, {
        method: 'DELETE'
      });
      if (res.ok) fetchAttributes();
    } catch (err) {
      console.error('Error deleting attribute:', err);
    }
  };

  return (
    <div className="attribute-wrapper-679" style={{border:showForm?'1px solid rgb(153 202 255)':'none'}}>
      {showForm ? (
        <i className="fa fa-times" onClick={() => setShowForm(!showForm)}></i>
      ) : (
        <button className="create-attribute-btn-671" onClick={() => setShowForm(true)}>
          Create Attribute
        </button>
      )}

      {showForm && (
        <div className="attribute-form-671">
          {/* Create New Group */}
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

          {/* Select Group */}
          <select
            className="select-attribute-671"
            value={selectedAttribute}
            onChange={(e) => {
              setSelectedAttribute(e.target.value)
              setKeyValue({ ...keyValue, key: e.target.value })
            }}
            style={{ marginBottom: '10px' }}
          >
            <option value="">Select Attribute</option>
            {attributes.map((attr, idx) => (
              <option key={idx} value={attr.GroupName}>
                {attr.GroupName}
              </option>
            ))}
          </select>

          {/* Add Key-Value to Group */}
          {selectedAttribute && (
            <div className="attribute-details-671">
              <div className="form-group-671">
                <input
                  type="text"
                  placeholder="Key (e.g. color)"
                  value={keyValue.key}
                  onChange={(e) => setKeyValue({ ...keyValue, key: keyValue.key })}
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

              {/* Attribute List */}
              <div className="added-attributes-671">
                <h4>{selectedAttribute} List:</h4>
                <ul>
                  {attributes
                    .find(attr => attr.GroupName === selectedAttribute)
                    ?.Attributes.map((item, idx) => (
                      <li key={idx} style={{ margin: '5px',marginTop:'10px' }}>
                        {item.key}: {item.value}{' '}
                        <i
                          className="fas fa-trash"
                          style={{ color: 'red', cursor: 'pointer', marginLeft: '8px' }}
                          onClick={() =>
                            handleDeleteAttribute(
                              attributes.find(attr => attr.GroupName === selectedAttribute)?.groupid,
                              item._id
                            )
                          }
                        ></i>
                      </li>
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
