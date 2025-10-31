'use client'
import { useState, useEffect } from 'react';
import './page.css'
import extractDate from '../../component/extdate.js';

const page = () => {
  const [inquiries765, setInquiries765] = useState([]);
  const [loading765, setLoading765] = useState(true);
  const [error765, setError765] = useState(null);
 const [editingField, setEditingField] = useState(null);
  const [showModal765, setShowModal765] = useState(false);
  const [currentComment765, setCurrentComment765] = useState('');
  const [currentInquiryId765, setCurrentInquiryId765] = useState(null);

  const callStatusOptions765 = [
    { value: 'Select', label: '📌 Select' },
    { value: 'Connected', label: '📞 Connected' },
    { value: 'Not Reachable', label: '🚫 Not Reachable' },
    { value: 'Switched Off', label: '📱 Switched Off' },
    { value: 'Did Not Pick', label: '🔕 Did Not Pick' },
    { value: 'Call Back Later', label: '🔁 Call Back Later' },
    { value: 'Wrong Number', label: '❌ Wrong Number' },
    { value: 'Maybe Later', label: '🤔 Maybe Later' }
  ];

     const leadStatusOptions =  [
          { value: 'Select', label: '📌 Select' },
      { value: 'Interested', label: '💬 Interested' },
    { value: 'Not Interested', label: '💤 Not Interested' },
    { value: 'Deal Closed', label: '✅ Deal Closed' }]


  useEffect(() => {
    fetchInquiries765();
  }, []);

  const fetchInquiries765 = async () => {
    try {
       const token = localStorage.getItem('salestoken');
      setLoading765(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/sales/leads`, {
        method: 'GET',
         headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }), // Add token if it exists
      }});
      
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      
      const data = await response.json();
      setInquiries765(data.data.leads);
      setError765(null);
      console.log(data)
    } catch (err) {
      setError765(err.message);
      // Demo data for testing
      setInquiries765([
        {
          id: 1,
          inquiry_date: '2025-10-25',
          buyer_name: 'John Doe',
          phone_number: '+91 9876543210',
          interested_in: 'plots',
          assigned_to: 'Sukumar',
          call_status: '',
          follow_up_date: '',
          lead_status: '',
          scheduled_datetime: '',
          comments: '',
          source: ''
        },
        {
          id: 2,
          inquiry_date: '2025-10-26',
          buyer_name: 'Jane Smith',
          phone_number: '+91 9876543211',
          interested_in: 'villas',
          assigned_to: 'Sukumar',
          call_status: '',
          follow_up_date: '',
          lead_status: '',
          scheduled_datetime: '',
          comments: '',
          source: ''
        }
      ]);
    } finally {
      setLoading765(false);
    }
  };

  const updateStatus = async (id, statuvalue,statusname) => {
console.log(statuvalue)
if(statuvalue==='Select'){return;}

    try {
      const token = localStorage.getItem('salestoken');
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/sales/leads/${id}`, {
        method: 'PATCH',
        headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }), // Add token if it exists
      },
        
        body: JSON.stringify({ [statusname]: statuvalue })
      });

      if (!response.ok) {
        throw new Error('Failed to update call status');
      }

      // Update local state
      setInquiries765(prevInquiries =>
        prevInquiries.map(inquiry =>
          inquiry._id === id ? { ...inquiry, [statusname]: statuvalue } : inquiry
        )
      );
    } catch (err) {
      console.error('Error updating call status:', err);
      // Update local state even if API fails (for demo)
      setInquiries765(prevInquiries =>
        prevInquiries.map(inquiry =>
          inquiry._id === id ? { ...inquiry, [statusname]: statuvalue } : inquiry
        )
      );
    }
  };

  

const openModal765 = (inquiryId, currentComments) => {
    setCurrentInquiryId765(inquiryId);
    setCurrentComment765(currentComments || '');
    setShowModal765(true);
  };

  const closeModal765 = () => {
    setShowModal765(false);
    setCurrentInquiryId765(null);
    setCurrentComment765('');
  };

  const handleCommentChange765 = (e) => {
    setCurrentComment765(e.target.value);
    updateStatus(currentInquiryId765, e.target.value, 'comments');
  };


  if (loading765) {
    return (
      <div className="container765">
        <div className="loading765">
          <i className="fas fa-spinner fa-spin"></i> Loading...
        </div>
      </div>
    );
  }

 function formatDate(dateString, includeTime = 0) {
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  let formatted = `${day}-${month}-${year}`;

  if (includeTime) {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    formatted += ` ${hours}:${minutes}:${seconds}`;
  }

  return formatted;
}

  return (
    <div className="container765">
      <div className="header765">
        <h3 style={{color:'#1890ff'}}>
          <i className="fas fa-phone-alt" style={{color:'#434343ff'}}></i> Inquiry Management
        </h3>
        <button className="refresh-btn765" onClick={fetchInquiries765}>
          <i className="fas fa-sync-alt"></i> Refresh
        </button>
      </div>

      <div className="table-wrapper765">
      <table className="table765">
          <thead>
            <tr>
              <th>Inquiry Date</th>
              <th>Buyer Name</th>
              <th>Phone Number</th>
              <th>Interested In</th>
              <th>Assigned To</th>
              <th>Call Status</th>
              <th>Follow-up Date</th>
              <th>Lead Status</th>
              <th>Site Visit</th>
              <th>Comments</th>
              <th>Source</th>
            </tr>
          </thead>
          <tbody>
            {inquiries765.map((inquiry,index) => (
              <tr key={index}>
                <td>{extractDate(inquiry.inquiry_date)}</td>
                <td><strong>{inquiry.buyer_name}</strong></td>
                <td>
                  <a href={`tel:${inquiry.phone_number}`} className="phone-link765">
                    {inquiry.phone_number}
                  </a>
                </td>
                <td>{inquiry.interested_in}</td>
                <td>{inquiry.assigned_to}</td>
                <td>
                  <select
                    className="status-select765"
                    value={inquiry.call_status}
                    onChange={(e) => updateStatus(inquiry._id, e.target.value,'call_status')}
                  >
                    {callStatusOptions765.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </td>
               <td>
                  {(!inquiry.follow_up_date || editingField === `${inquiry._id}-follow_up_date`) ? (
                    <input
                      type="date"
                      className="date-input765"
                      value={inquiry.follow_up_date ? inquiry.follow_up_date.split('T')[0] : ''}
                      onChange={(e) => {
                        updateStatus(inquiry._id, e.target.value, 'follow_up_date');
                        setEditingField(null);
                      }}
                      onBlur={() => setEditingField(null)}
                       onFocus={(e) => e.target.showPicker && e.target.showPicker()}
                      autoFocus={editingField === `${inquiry._id}-follow_up_date`}
                    />
                  ) : (
                    <p 
                      className="date-input765" 
                      style={{display:"flex", justifyContent:'space-between', cursor:'pointer'}}
                    >
                      {formatDate(inquiry.follow_up_date, 0)}
                      <i 
                        className="fas fa-calendar" 
                        onClick={() => setEditingField(`${inquiry._id}-follow_up_date`)}
                        style={{cursor:'pointer'}}
                      ></i>
                    </p>
                  )}
                </td>

                <td> 
                  <select
                    className="status-select765"
                    value={inquiry.lead_status}
                    onChange={(e) => updateStatus(inquiry._id, e.target.value,'lead_status')}
                  >
                    {leadStatusOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  </td>

                 <td>
                  {(!inquiry.scheduled_datetime || editingField === `${inquiry._id}-scheduled_datetime`) ? (
                    <input
                      type="datetime-local"
                      className="date-input765"
                      value={inquiry.scheduled_datetime ? inquiry.scheduled_datetime.slice(0, 16) : ''}
                      onChange={(e) => {
                        updateStatus(inquiry._id, e.target.value, 'scheduled_datetime');
                        setEditingField(null);
                      }}
                      onBlur={() => setEditingField(null)}
                      onFocus={(e) => e.target.showPicker && e.target.showPicker()}
                      autoFocus={editingField === `${inquiry._id}-scheduled_datetime`}
                    />
                  ) : (
                    <p 
                      className="date-input765" 
                      style={{display:"flex", justifyContent:'space-between', cursor:'pointer'}}
                    >
                      {formatDate(inquiry.scheduled_datetime, 1)}
                      <i 
                        className="fas fa-calendar" 
                        onClick={() => setEditingField(`${inquiry._id}-scheduled_datetime`)}
                        style={{cursor:'pointer'}}
                      ></i>
                    </p>
                  )}
                </td>

                  <td>
                    
                    <button 
                    className="show-btn765"
                    onClick={() => openModal765(inquiry._id, inquiry.comments)}
                  >
                    Show
                  </button>
                  
                    </td>
                   <td>{inquiry.source}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {inquiries765.length === 0 && !loading765 && (
        <div className="empty-state765">
          <i className="fas fa-inbox"></i>
          <p>No inquiries found</p>
        </div>
      )}

        {showModal765 && (
        <div className="modal-overlay765" onClick={closeModal765}>
          <div className="modal-content765" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header765">
              <h3>Comments</h3>
              <button className="close-btn765" onClick={closeModal765}>
                ×
              </button>
            </div>
            <div className="modal-body765">
              <textarea
                className="modal-textarea765"
                value={currentComment765}
                onChange={handleCommentChange765}
                placeholder="Enter your comments here..."
                autoFocus
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


export default page;