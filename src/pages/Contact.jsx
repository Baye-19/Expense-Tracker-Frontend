// src/pages/Contact.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Contact.css';

const Contact = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Please enter a valid email';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    // Show success message (in real app, send to backend)
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="contact-page">
      <div className="page-header">
        <div className="page-header-left">
          <button onClick={() => navigate(-1)} className="btn btn-ghost back-btn">← Back</button>
          <div>
            <h1 className="page-title">Contact Us</h1>
            <p className="page-subtitle">We'd love to hear from you! Send us a message and we'll respond as soon as possible.</p>
          </div>
        </div>
      </div>

      <div className="contact-grid">
        {/* Contact Form */}
        <div className="card contact-form-card">
          {submitted ? (
            <div className="success-message">
              <div className="success-icon">✅</div>
              <h2>Message Sent Successfully!</h2>
              <p>Thank you for reaching out. We'll get back to you within 24 hours.</p>
              <button 
                className="btn btn-primary" 
                onClick={() => setSubmitted(false)}
                style={{ marginTop: '1rem' }}
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label form-label-required">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    className={`form-control ${errors.name ? 'error' : ''}`}
                    placeholder="Baye Nigus"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  {errors.name && <span className="form-error-message">{errors.name}</span>}
                </div>
                <div className="form-group">
                  <label className="form-label form-label-required">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    className={`form-control ${errors.email ? 'error' : ''}`}
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && <span className="form-error-message">{errors.email}</span>}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label form-label-required">Subject</label>
                <input
                  type="text"
                  name="subject"
                  className={`form-control ${errors.subject ? 'error' : ''}`}
                  placeholder="How can we help you?"
                  value={formData.subject}
                  onChange={handleChange}
                />
                {errors.subject && <span className="form-error-message">{errors.subject}</span>}
              </div>

              <div className="form-group">
                <label className="form-label form-label-required">Message</label>
                <textarea
                  name="message"
                  className={`form-control ${errors.message ? 'error' : ''}`}
                  rows="6"
                  placeholder="Write your message here..."
                  value={formData.message}
                  onChange={handleChange}
                />
                {errors.message && <span className="form-error-message">{errors.message}</span>}
              </div>

              <button type="submit" className="btn btn-primary btn-lg">
                📧 Send Message
              </button>
            </form>
          )}
        </div>

        {/* Contact Info Sidebar */}
        <div className="contact-info">
          <div className="card">
            <h3>📞 Get in Touch</h3>
            <div className="info-item">
              <span className="info-icon">📧</span>
              <div>
                <strong>Email</strong>
                <p>bayenigus4104@gmail.com</p>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon">📱</span>
              <div>
                <strong>Phone</strong>
                <p>(+251) 969 278 258</p>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon">📍</span>
              <div>
                <strong>Address</strong>
                <p>Addis Ababa, Ethiopia</p>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon">🕐</span>
              <div>
                <strong>Business Hours</strong>
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p>Saturday: 10:00 AM - 2:00 PM</p>
              </div>
            </div>
          </div>

          <div className="card social-card">
            <h3>🌐 Follow Us</h3>
            <div className="social-links">
              {/* <a href="#" className="social-link">📘 Facebook</a> */}
              {/* <a href="#" className="social-link">🐦 Twitter</a> */}
              <a href="#" className="social-link">📸 Instagram</a>
              <a href="#" className="social-link">💼 LinkedIn</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;