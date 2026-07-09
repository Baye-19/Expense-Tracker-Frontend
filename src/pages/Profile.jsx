// src/pages/Profile.jsx
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Profile.css';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    bio: user?.bio || '',
  });
  const [profileImage, setProfileImage] = useState(user?.profileImage || null);
  const [previewImage, setPreviewImage] = useState(user?.profileImage || null);
  const [successMessage, setSuccessMessage] = useState('');

  // Handle text input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file (JPG, PNG, GIF)');
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image must be less than 5MB');
      return;
    }

    // Convert to base64 for preview and storage
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;
      setPreviewImage(base64String);
      setProfileImage(base64String);
    };
    reader.readAsDataURL(file);
  };

  // Remove profile picture
  const handleRemoveImage = () => {
    setPreviewImage(null);
    setProfileImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const updatedData = {
      ...formData,
      profileImage: profileImage,
    };
    
    updateUser(updatedData);
    setIsEditing(false);
    setSuccessMessage('Profile updated successfully!');
    
    // Clear success message after 3 seconds
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  // Get initials for avatar fallback
  const getInitials = () => {
    if (!user?.name) return 'U';
    const names = user.name.split(' ');
    if (names.length >= 2) {
      return (names[0][0] + names[names.length - 1][0]).toUpperCase();
    }
    return user.name.charAt(0).toUpperCase();
  };

  // Get member since date
  const getMemberSince = () => {
    return user?.createdAt || 'June 2026';
  };

  return (
    <div className="profile-page">
      <div className="page-header">
        <div className="page-header-left">
          <button onClick={() => navigate('/dashboard')} className="btn btn-ghost back-btn">← Back</button>
          <div>
            <h1 className="page-title">My Profile</h1>
            <p className="page-subtitle">Manage your personal information</p>
          </div>
        </div>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="success-alert">
          ✅ {successMessage}
        </div>
      )}

      {isEditing ? (
        /* ==========================================
           EDIT MODE
           ========================================== */
        <div className="card profile-card">
          <form onSubmit={handleSubmit}>
            {/* Profile Picture Upload */}
            <div className="profile-picture-section">
              <div className="profile-picture-wrapper">
                {previewImage ? (
                  <img 
                    src={previewImage} 
                    alt="Profile" 
                    className="profile-picture-img"
                  />
                ) : (
                  <div className="profile-avatar-large">
                    {getInitials()}
                  </div>
                )}
                <div className="profile-picture-overlay">
                  <span className="camera-icon">📷</span>
                </div>
              </div>
              
              <div className="profile-picture-actions">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="profile-image-input"
                />
                <button
                  type="button"
                  className="btn btn-sm btn-primary"
                  onClick={() => fileInputRef.current?.click()}
                >
                  📁 {previewImage ? 'Change Photo' : 'Upload Photo'}
                </button>
                {previewImage && (
                  <button
                    type="button"
                    className="btn btn-sm btn-danger"
                    onClick={handleRemoveImage}
                  >
                    🗑️ Remove
                  </button>
                )}
              </div>
              <p className="profile-picture-hint">
                JPG, PNG or GIF. Max 5MB.
              </p>
            </div>

            {/* Name Field */}
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <div className="input-wrapper">
                <span className="input-icon">👤</span>
                <input
                  type="text"
                  name="name"
                  className="form-control input-with-icon"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <div className="input-wrapper">
                <span className="input-icon">📧</span>
                <input
                  type="email"
                  name="email"
                  className="form-control input-with-icon"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Phone Field */}
            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <div className="input-wrapper">
                <span className="input-icon">📱</span>
                <input
                  type="tel"
                  name="phone"
                  className="form-control input-with-icon"
                  placeholder="+1 (555) 123-4567"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Bio Field */}
            <div className="form-group">
              <label className="form-label">Bio</label>
              <textarea
                name="bio"
                className="form-control"
                rows="3"
                placeholder="Tell us a little about yourself..."
                value={formData.bio}
                onChange={handleChange}
              />
            </div>

            {/* Action Buttons */}
            <div className="form-actions">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  setIsEditing(false);
                  setPreviewImage(user?.profileImage || null);
                  setFormData({
                    name: user?.name || '',
                    email: user?.email || '',
                    phone: user?.phone || '',
                    bio: user?.bio || '',
                  });
                }}
              >
                ❌ Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                💾 Save Changes
              </button>
            </div>
          </form>
        </div>
      ) : (
        /* ==========================================
           VIEW MODE
           ========================================== */
        <>
          <div className="card profile-card">
            {/* Profile Picture */}
            <div className="profile-picture-section">
              {user?.profileImage ? (
                <img 
                  src={user.profileImage} 
                  alt={user?.name} 
                  className="profile-picture-display"
                />
              ) : (
                <div className="profile-avatar-large">
                  {getInitials()}
                </div>
              )}
            </div>

            {/* User Info */}
            <div className="profile-info">
              <h2>{user?.name || 'User'}</h2>
              <p className="profile-email">{user?.email}</p>
              {user?.phone && (
                <p className="profile-phone">📱 {user.phone}</p>
              )}
              {user?.bio && (
                <p className="profile-bio">{user.bio}</p>
              )}
              <p className="profile-member-since">
                🗓️ Member since {getMemberSince()}
              </p>
            </div>

            {/* Edit Button */}
            <button 
              onClick={() => setIsEditing(true)} 
              className="btn btn-primary"
            >
              ✏️ Edit Profile
            </button>
          </div>

          {/* Account Stats Card */}
          <div className="card profile-stats-card">
            <h3>Account Overview</h3>
            <div className="profile-stats-grid">
              <div className="profile-stat-item">
                <span className="profile-stat-icon">📧</span>
                <div>
                  <p className="profile-stat-label">Email</p>
                  <p className="profile-stat-value">{user?.email || 'Not set'}</p>
                </div>
              </div>
              <div className="profile-stat-item">
                <span className="profile-stat-icon">📱</span>
                <div>
                  <p className="profile-stat-label">Phone</p>
                  <p className="profile-stat-value">{user?.phone || 'Not set'}</p>
                </div>
              </div>
              <div className="profile-stat-item">
                <span className="profile-stat-icon">🔐</span>
                <div>
                  <p className="profile-stat-label">Password</p>
                  <p className="profile-stat-value">••••••••</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;