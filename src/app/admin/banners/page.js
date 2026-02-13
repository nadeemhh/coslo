'use client'
import './page.css'
import { useState, useEffect } from "react";

export default function Page() {
  const [data, setdata] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState(null);
  const [newImages, setNewImages] = useState([]);
  const [redirectUrl, setRedirectUrl] = useState("");
  const [editRedirectUrl, setEditRedirectUrl] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getbanners();
  }, []);

  const getbanners = () => {
    setLoading(true);
    const token = localStorage.getItem('admintoken');
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/banner/`, {
      headers: { ...(token && { Authorization: `Bearer ${token}` }) },
    })
      .then((res) => res.json())
      .then((data) => {
        setdata(data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setNewImages([files[0]]);
    }
  };

  const removeNewImage = (index) => {
    setNewImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddSubmit = async () => {
    if (newImages.length === 0) return alert("Please select images");

    setLoading(true);
    const token = localStorage.getItem('admintoken');

    const convertToBase64 = (file) => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

    const base64Images = await Promise.all(newImages.map(convertToBase64));

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/banner/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({ images: base64Images, redirectUrl }),
      });
      const result = await res.json();
      if (res.ok) {
        alert(result.message);
        setIsModalOpen(false);
        setNewImages([]);
        setRedirectUrl("");
        getbanners();
      } else {
        alert(result.message || "Failed to add banner");
      }
    } catch (err) {
      console.error(err);
      alert("Error adding banner");
    } finally {
      setLoading(false);
    }
  };

  const handleEditSubmit = async () => {
    if (!selectedBanner) return;
    setLoading(true);
    const token = localStorage.getItem('admintoken');

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/banner`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({ bannerId: selectedBanner._id, redirectUrl: editRedirectUrl }),
      });
      const result = await res.json();
      if (res.ok) {
        alert(result.message);
        setIsEditModalOpen(false);
        setSelectedBanner(null);
        getbanners();
      } else {
        alert(result.message || "Failed to update banner");
      }
    } catch (err) {
      console.error(err);
      alert("Error updating banner");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure?")) return;
    setLoading(true);
    const token = localStorage.getItem('admintoken');

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/banner?bannerId=${id}`, {
        method: 'DELETE',
        headers: { ...(token && { Authorization: `Bearer ${token}` }) },
      });
      const result = await res.json();
      if (res.ok) {
        alert(result.message);
        getbanners();
      } else {
        alert(result.message || "Failed to delete");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting banner");
    } finally {
      setLoading(false);
    }
  };

  const openEditModal = (banner) => {
    setSelectedBanner(banner);
    setEditRedirectUrl(banner.redirectUrl || "");
    setIsEditModalOpen(true);
  };

  return (
    <div className="banner-page">
      <div className="header" style={{ display: 'flex', flexWrap: 'wrap' }}>
        <h2 style={{ fontSize: "1.5rem" }}>Home Page Banners</h2>
        <button className="add-btn" onClick={() => setIsModalOpen(true)}>
          <i className="fas fa-plus"></i> Add Banner
        </button>
      </div>

      <div className="banner-grid">
        {data.map((banner) => (
          <div key={banner._id} className="banner-card">
            <img src={banner.url} alt="Banner" className="banner-img" />
            <div className="banner-info">
              <p className="redirect-url" title={banner.redirectUrl}>
                <i className="fas fa-link"></i> {banner.redirectUrl || "No URL"}
              </p>
            </div>
            <div className="banner-actions">
              <button className="edit-action" onClick={() => openEditModal(banner)}>
                <i className="fas fa-edit"></i> Edit
              </button>
              <button className="delete-action" onClick={() => handleDelete(banner._id)}>
                <i className="fas fa-trash"></i> Delete
              </button>
            </div>
          </div>
        ))}
        {data.length === 0 && !loading && <p>No banners found.</p>}
      </div>

      {/* Add Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Add New Banner</h3>
            <div className="form-group">
              <label className="file-upload-label">
                <i className="fas fa-cloud-upload-alt"></i>
                <span style={{ marginLeft: "10px" }}>Click to Upload Image</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: 'none' }}
                />
              </label>
              <div className="preview-grid">
                {newImages.map((file, idx) => (
                  <div key={idx} className="preview-item">
                    <img src={URL.createObjectURL(file)} alt="preview" />
                    <button onClick={() => removeNewImage(idx)}>×</button>
                  </div>
                ))}
              </div>
            </div>
            <div className="form-group">
              <label>Redirect URL</label>
              <input
                type="text"
                placeholder="https://example.com"
                value={redirectUrl}
                onChange={(e) => setRedirectUrl(e.target.value)}
              />
            </div>
            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setIsModalOpen(false)}>Cancel</button>
              <button className="save-btn" onClick={handleAddSubmit} disabled={loading}>
                {loading ? "Saving..." : "Save Banners"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Edit Banner URL</h3>
            <div className="preview-single">
              <img src={selectedBanner?.url} alt="Current Banner" />
            </div>
            <div className="form-group">
              <label>Redirect URL</label>
              <input
                type="text"
                value={editRedirectUrl}
                onChange={(e) => setEditRedirectUrl(e.target.value)}
              />
            </div>
            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setIsEditModalOpen(false)}>Cancel</button>
              <button className="save-btn" onClick={handleEditSubmit} disabled={loading}>
                {loading ? "Updating..." : "Update URL"}
              </button>
            </div>
          </div>
        </div>
      )}

      {loading && <div className="loaderoverlay" style={{ display: 'flex' }}>
        <div className="loader"></div>
      </div>}
    </div>
  );
}
