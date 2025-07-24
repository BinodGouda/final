import React, { useState } from 'react';
import { motion } from 'framer-motion';
import GoogleMapReact from 'google-map-react';
import { MapPin, Phone, Mail, User, ArrowLeft, ArrowRight, Navigation } from 'lucide-react';

const Marker = () => (
  <div style={{ position: 'absolute', transform: 'translate(-50%, -100%)' }}>
    <MapPin size={30} color="#f72585" />
  </div>
);

const ContactLocationForm = ({ formData, updateFormData, onNext, onPrevious }) => {
  const [errors, setErrors] = useState({});
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpTimer, setOtpTimer] = useState(60);
  const [phoneVerified, setPhoneVerified] = useState(false);
  
  const serviceAreas = [
    'Delhi NCR', 'Mumbai', 'Bangalore', 'Hyderabad', 'Chennai', 
    'Kolkata', 'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow'
  ];
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };
  
  const handleMapClick = ({ lat, lng }) => {
    updateFormData({ location: { lat, lng } });
  };
  
  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          updateFormData({ location: { lat: latitude, lng: longitude } });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };
  
  const sendOTP = () => {
    if (!formData.phoneNumber) {
      setErrors({ ...errors, phoneNumber: 'Phone number is required' });
      return;
    }
    
    // Simulate OTP sending
    setOtpSent(true);
    
    // Start countdown timer
    const interval = setInterval(() => {
      setOtpTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };
  
  const verifyOTP = () => {
    // Simulate OTP verification (in a real app, this would verify with backend)
    if (otp === '123456') { // Demo OTP
      setPhoneVerified(true);
      setErrors({ ...errors, otp: '' });
    } else {
      setErrors({ ...errors, otp: 'Invalid OTP. Try 123456 for demo' });
    }
  };
  
  const resendOTP = () => {
    setOtpTimer(60);
    // Simulate resending OTP
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    const newErrors = {};
    
    if (!formData.ownerName) {
      newErrors.ownerName = 'Owner name is required';
    }
    
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid 10-digit phone number';
    }
    
    if (!phoneVerified) {
      newErrors.phoneNumber = 'Please verify your phone number';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.address) {
      newErrors.address = 'Business address is required';
    }
    
    if (!formData.serviceArea) {
      newErrors.serviceArea = 'Please select a service area';
    }
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      onNext();
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="form-step"
    >
      <h2 className="text-center mb-4">How Can Customers Reach You?</h2>
      
      <div className="neumorphic-card">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="ownerName" className="form-label">
                  <User size={16} className="me-1" /> Owner's Name*
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="ownerName"
                  name="ownerName"
                  value={formData.ownerName}
                  onChange={handleChange}
                  placeholder="Enter owner's name"
                />
                {errors.ownerName && <div className="error-message">{errors.ownerName}</div>}
              </div>
              
              <div className="mb-3">
                <label htmlFor="phoneNumber" className="form-label">
                  <Phone size={16} className="me-1" /> Phone Number*
                </label>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="Enter 10-digit phone number"
                    disabled={phoneVerified}
                  />
                  {!otpSent && !phoneVerified && (
                    <button 
                      type="button" 
                      className="btn btn-outline-primary" 
                      onClick={sendOTP}
                    >
                      Send OTP
                    </button>
                  )}
                  {phoneVerified && (
                    <span className="input-group-text bg-success text-white">
                      Verified ✓
                    </span>
                  )}
                </div>
                {errors.phoneNumber && <div className="error-message">{errors.phoneNumber}</div>}
              </div>
              
              {otpSent && !phoneVerified && (
                <div className="mb-3">
                  <label htmlFor="otp" className="form-label">Enter OTP</label>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      id="otp"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="Enter 6-digit OTP"
                    />
                    <button 
                      type="button" 
                      className="btn btn-primary" 
                      onClick={verifyOTP}
                    >
                      Verify
                    </button>
                  </div>
                  {errors.otp && <div className="error-message">{errors.otp}</div>}
                  <div className="d-flex justify-content-between align-items-center mt-2">
                    <small className="text-muted">
                      {otpTimer > 0 ? `Resend OTP in ${otpTimer}s` : 'Didn\'t receive OTP?'}
                    </small>
                    {otpTimer === 0 && (
                      <button 
                        type="button" 
                        className="btn btn-link btn-sm p-0" 
                        onClick={resendOTP}
                      >
                        Resend OTP
                      </button>
                    )}
                  </div>
                  <small className="text-info">For demo, use OTP: 123456</small>
                </div>
              )}
              
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  <Mail size={16} className="me-1" /> Email Address*
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email address"
                />
                {errors.email && <div className="error-message">{errors.email}</div>}
              </div>
            </div>
            
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="address" className="form-label">
                  <MapPin size={16} className="me-1" /> Business Address*
                </label>
                <textarea
                  className="form-control"
                  id="address"
                  name="address"
                  rows="3"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter complete business address"
                ></textarea>
                {errors.address && <div className="error-message">{errors.address}</div>}
              </div>
              
              <div className="mb-3">
                <label htmlFor="serviceArea" className="form-label">Service Area*</label>
                <select
                  className="form-select"
                  id="serviceArea"
                  name="serviceArea"
                  value={formData.serviceArea}
                  onChange={handleChange}
                >
                  <option value="">Select service area</option>
                  {serviceAreas.map((area) => (
                    <option key={area} value={area}>{area}</option>
                  ))}
                </select>
                {errors.serviceArea && <div className="error-message">{errors.serviceArea}</div>}
              </div>
              
              <div className="mb-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <label className="form-label mb-0">Pin Your Location on Map</label>
                  <button 
                    type="button" 
                    className="btn btn-sm btn-outline-primary"
                    onClick={handleCurrentLocation}
                  >
                    <Navigation size={14} className="me-1" /> Use Current Location
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="map-container mb-4">
            <GoogleMapReact
              bootstrapURLKeys={{ key: '' }} // In a real app, you would add your Google Maps API key
              defaultCenter={{ lat: 28.6139, lng: 77.2090 }}
              center={formData.location}
              defaultZoom={12}
              onClick={handleMapClick}
            >
              <Marker
                lat={formData.location.lat}
                lng={formData.location.lng}
              />
            </GoogleMapReact>
          </div>
          
          <div className="d-flex justify-content-between">
            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={onPrevious}
            >
              <ArrowLeft size={16} className="me-2" /> Previous
            </button>
            <button type="submit" className="btn btn-primary">
              Next <ArrowRight size={16} className="ms-2" />
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default ContactLocationForm;