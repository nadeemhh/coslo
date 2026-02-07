'use client'
import { useState, useEffect } from 'react';
import extractDate from '../../component/extdate.js';
import '../leads/page.css'
import '../../component/component-css/leadFilterComponent.css';

const SellerLeadsPage = () => {
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingField, setEditingField] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [currentComment, setCurrentComment] = useState('');
    const [currentLeadId, setCurrentLeadId] = useState(null);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);

    // Filter states
    const [showFilters, setShowFilters] = useState(false);
    const [filters, setFilters] = useState({
        callStatus: '',
        startDate: '',
        endDate: ''
    });

    console.log(leads)

    const callStatusOptions = [
        { value: '', label: 'All' },
        { value: 'Not Called', label: '📌 Not Called' },
        { value: 'Called', label: '📞 Called' },
        { value: 'Follow Up', label: '🔁 Follow Up' },
        { value: 'Not Interested', label: '💤 Not Interested' },
        { value: 'Converted', label: '✅ Converted' },
        { value: 'Busy/Not Picked', label: '🔕 Busy/Not Picked' }
    ];

    const fetchLeads = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('salestoken');

            // Build query params
            const params = new URLSearchParams();
            params.append('page', page);
            params.append('limit', 20);

            if (filters.callStatus) params.append('callStatus', filters.callStatus);
            if (filters.startDate) params.append('startDate', filters.startDate);
            if (filters.endDate) params.append('endDate', filters.endDate);

            const queryString = params.toString() ? `?${params.toString()}` : '';

            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/seller-lead${queryString}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token && { Authorization: `Bearer ${token}` }),
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const data = await response.json();

            // Based on user snippet: { leads, currentPage, totalPages, totalLeads } 
            // OR checks for data.data
            const leadsData = data.data || data;

            let fetchedLeads = [];

            if (Array.isArray(leadsData)) {
                // If direct array, likely no pagination structure from backend yet, or standard response
                fetchedLeads = leadsData;
            } else if (leadsData.leads && Array.isArray(leadsData.leads)) {
                fetchedLeads = leadsData.leads;
            } else {
                console.error("Unexpected data format", data);
            }

            if (fetchedLeads.length === 0) {
                setHasMore(false);
                if (page !== 1) setPage(prev => prev - 1);
                setLeads([]); // Or keep previous if we want to avoid empty table on last page overshoot? 
                // Logic in leads/page writes: setInquiries765(data.data.leads) which is empty.
                // But it also decrements page if page != 1.
                // Checking logic: if length === 0, setHasMore(false), if page!=1 setPage(prev-1). 
                // If page is 1 and empty, that's fine.
                if (page === 1) setLeads([]);
            } else {
                setLeads(fetchedLeads);
                setError(null);
                // Heuristic for hasMore: if we got full limit, likely more. 
                // leads/page.js doesn't seem to set hasMore=true explicitly based on length, 
                // it defaults to true and sets false if empty. 
                // But wait, leads/page.js:
                // if (data.data.leads.length === 0) ... setHasMore(false) ...
                // else ... setInquiries765(...)
                // It doesn't explicitly set hasMore(true) in the else block? 
                // Ah, prevPage sets hasMore(true).
                // So if we hit a page with data, we assume hasMore is valid unless we know total.
                // If the backend returns totalPages, we can be smarter.
                if (leadsData.totalPages) {
                    setHasMore(page < leadsData.totalPages);
                } else {
                    // Fallback: if we got less than limit, no more.
                    setHasMore(fetchedLeads.length === 20);
                }

                const tableWrapper = document.querySelector('.table-wrapper765');
                if (tableWrapper) tableWrapper.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLeads();
    }, [page, filters]); // Refetch when page or filters change

    const handleFilterChange = (name, value) => {
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
        setPage(1); // Reset to page 1 on filter change
    };

    const handleClearFilters = () => {
        setFilters({
            callStatus: '',
            startDate: '',
            endDate: ''
        });
        setPage(1);
    };

    const nextPage = () => {
        setPage((prevPage) => prevPage + 1);
        const tableWrapper = document.querySelector('.table-wrapper765');
        if (tableWrapper) {
            tableWrapper.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const prevPage = () => {
        setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));
        setHasMore(true); // Reset hasMore when going back, similar to leads page
        const tableWrapper = document.querySelector('.table-wrapper765');
        if (tableWrapper) {
            tableWrapper.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const updateStatus = async (id, value, field) => {
        try {
            const token = localStorage.getItem('salestoken');

            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/seller-lead/update/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token && { Authorization: `Bearer ${token}` }),
                },
                body: JSON.stringify({ [field]: value })
            });

            if (!response.ok) {
                throw new Error('Failed to update status');
            }

            // Update local state
            setLeads(prevLeads =>
                prevLeads.map(lead =>
                    lead._id === id ? { ...lead, [field]: value } : lead
                )
            );

        } catch (err) {
            console.error('Error updating status:', err);
            alert('Failed to update. Please try again.');
        }
    };

    const openModal = (leadId, comments) => {
        setCurrentLeadId(leadId);
        setCurrentComment(comments || '');
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setCurrentLeadId(null);
        setCurrentComment('');
    };

    const handleCommentChange = (e) => {
        setCurrentComment(e.target.value);
        updateStatus(currentLeadId, e.target.value, 'comments');
    };

    function formatDate(dateString, includeTime = 0) {
        if (!dateString) return 'N/A';
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
                <h3 style={{ color: '#1890ff' }} className='toptable'>
                    <i className="fas fa-user-tag"></i> Seller Leads
                </h3>
            </div>

            <div className="filter-wrapper565">
                <div style={{ display: 'flex', gap: '15px' }}>
                    <button
                        className="refresh-btn765"
                        style={{ marginBottom: '10px' }}
                        onClick={() => setShowFilters(!showFilters)}
                    >
                        {!showFilters && <i className="fas fa-filter"></i>} Filters {showFilters && <i className="fas fa-times" style={{ color: '#ff3f3f', fontSize: '20px' }}></i>}
                    </button>
                </div>

                {showFilters && (
                    <div className="filter-container565" style={{ position: 'relative' }}>
                        <div className="filter-grid565">
                            <div className="filter-item565">
                                <label className="filter-label565">Call Status</label>
                                <select
                                    className="filter-select565"
                                    value={filters.callStatus}
                                    onChange={(e) => handleFilterChange('callStatus', e.target.value)}
                                    disabled={loading}
                                >
                                    {callStatusOptions.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="filter-item565">
                                <label className="filter-label565">Start Date</label>
                                <input
                                    type="date"
                                    className="filter-date565"
                                    value={filters.startDate}
                                    onChange={(e) => handleFilterChange('startDate', e.target.value)}
                                    disabled={loading}
                                />
                            </div>

                            <div className="filter-item565">
                                <label className="filter-label565">End Date</label>
                                <input
                                    type="date"
                                    className="filter-date565"
                                    value={filters.endDate}
                                    onChange={(e) => handleFilterChange('endDate', e.target.value)}
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        <div className="filter-actions565">
                            <button
                                className="clear-filter-btn565"
                                onClick={handleClearFilters}
                                disabled={loading}
                            >
                                <i className="fas fa-times" style={{ fontSize: '17px' }}></i> Remove Filters
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <div className="table-wrapper765">
                <table className="table765">
                    <thead>
                        <tr>
                            <th>##</th>
                            <th>Date</th>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Seller registered</th>
                            <th>Listing Type</th>
                            <th>Selected Plan</th>
                            <th>Total Properties</th>

                            <th>Call Status</th>
                            <th>Follow-up Date</th>
                            <th>Comments</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leads.map((lead, index) => (
                            <tr key={lead._id || index}>
                                <td>{(page - 1) * 20 + index + 1}</td>
                                <td>{extractDate(lead.createdAt)}</td>
                                <td><strong>{lead.name}</strong></td>
                                <td>
                                    <a href={`tel:${lead.phone}`} className="phone-link765">
                                        {lead.phone}
                                    </a>
                                </td>
                                <td>{`${lead?.phoneExist === true ? 'Yes' : 'No'}`}</td>
                                <td>{lead.listingType || 'N/A'}</td>

                                <td>{lead?.selectedPlan || 'N/A'}</td>
                                <td>{`${lead?.totalProperties}`}</td>

                                <td>
                                    <select
                                        className="status-select765"
                                        value={lead.callStatus || 'Not Called'}
                                        onChange={(e) => updateStatus(lead._id, e.target.value, 'callStatus')}
                                    >
                                        {callStatusOptions.filter(opt => opt.value !== '').map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </td>

                                <td>
                                    {(!lead.followupDate || editingField === `${lead._id}-followupDate`) ? (
                                        <input
                                            type="date"
                                            className="date-input765"
                                            value={lead.followupDate ? lead.followupDate.split('T')[0] : ''}
                                            onChange={(e) => {
                                                updateStatus(lead._id, e.target.value, 'followupDate');
                                                setEditingField(null);
                                            }}
                                            onBlur={() => setEditingField(null)}
                                            onFocus={(e) => e.target.showPicker && e.target.showPicker()}
                                            autoFocus={editingField === `${lead._id}-followupDate`}
                                        />
                                    ) : (
                                        <p
                                            className="date-input765"
                                            style={{ display: "flex", justifyContent: 'space-between', cursor: 'pointer', margin: 0 }}
                                            onClick={() => setEditingField(`${lead._id}-followupDate`)}
                                        >
                                            {formatDate(lead.followupDate, 0)}
                                            <i className="fas fa-calendar"></i>
                                        </p>
                                    )}
                                </td>

                                <td>
                                    <button
                                        className="show-btn765"
                                        onClick={() => openModal(lead._id, lead.comments)}
                                    >
                                        Show
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {leads.length === 0 && !loading && (
                <div className="empty-state765">
                    <i className="fas fa-inbox"></i>
                    <p>No seller leads found</p>
                </div>
            )}

            {loading && (
                <div className="container765">
                    <div className="loading765">
                        <i className="fas fa-spinner fa-spin"></i> Loading...
                    </div>
                </div>
            )}

            <div className="pagination">
                <span className="pre" onClick={prevPage} style={{ cursor: "pointer", opacity: page === 1 ? 0.5 : 1 }}>
                    <i className="fas fa-arrow-left"></i> Previous
                </span>

                <span className="page-number">Page {page}</span>

                {hasMore && <span className="next" onClick={nextPage} style={{ cursor: "pointer" }}>
                    Next <i className="fas fa-arrow-right"></i>
                </span>}
            </div>

            {showModal && (
                <div className="modal-overlay765" onClick={closeModal}>
                    <div className="modal-content765" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header765">
                            <h3>Comments</h3>
                            <button className="close-btn765" onClick={closeModal}>
                                ×
                            </button>
                        </div>
                        <div className="modal-body765">
                            <textarea
                                className="modal-textarea765"
                                value={currentComment}
                                onChange={handleCommentChange}
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

export default SellerLeadsPage;
