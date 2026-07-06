// ============================================
// src/pages/Profile.jsx
// PROFILE PAGE (WITH BACK BUTTON)
// ============================================

import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ← For back navigation
import { useAuth } from '../context/AuthContext';
import './Profile.css';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate(); // ← Hook for navigation
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(formData);
    setIsEditing(false);
  };

  return (
    <div className="profile-page">
      {/* ========================================
          PAGE HEADER
          ======================================== */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Profile</h1>
          <p className="page-subtitle">Manage your account information</p>
        </div>
        {/* ===== BACK BUTTON ===== */}
        <button onClick={() => navigate('/dashboard')} className="btn btn-ghost">
          ← Back to Dashboard
        </button>
      </div>

      <div className="card profile-card">
        <div className="profile-avatar-large">
          {user?.name?.charAt(0)?.toUpperCase() || 'U'}
        </div>
        
        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Name</label>
              <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} />
            </div>
            <div className="form-actions">
              <button type="button" className="btn btn-secondary" onClick={() => setIsEditing(false)}>Cancel</button>
              <button type="submit" className="btn btn-primary">Save Changes</button>
            </div>
          </form>
        ) : (
          <>
            <div className="profile-info">
              <h2>{user?.name}</h2>
              <p>{user?.email}</p>
              <p className="profile-member-since">Member since June 2026</p>
            </div>
            <button onClick={() => setIsEditing(true)} className="btn btn-primary">Edit Profile</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;