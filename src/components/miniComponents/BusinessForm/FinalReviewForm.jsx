import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import { Check, ArrowLeft, Edit, MapPin, Phone, Mail, CreditCard } from 'lucide-react';

const FinalReviewForm = ({ formData, updateFormData, onPrevious }) => {
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleToggleChange = (e) => {
    const { name, checked } = e.target;
    updateFormData({ [name]: checked });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    const newErrors = {};

    if (!formData.termsAgreed) {
      newErrors.termsAgreed = 'You must accept the terms and conditions';
    }

    if (!formData.detailsConfirmed) {
      newErrors.detailsConfirmed = 'You must confirm that all details are accurate';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);

      // Simulate form submission
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
        setShowConfetti(true);

        setTimeout(() => {
          setShowConfetti(false);
        }, 5000);
      }, 2000);
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center success-animation"
      >
        {showConfetti && (
          <div className="confetti-container">
            <Confetti
              width={window.innerWidth}
              height={window.innerHeight}
              recycle={false}
              numberOfPieces={500}
            />
          </div>
        )}



        <h2 className="success-message">Registration Submitted Successfully!</h2>
        <p className="mt-3">
          Thank you for registering your business with UdhyogUnity.
          Your application has been received and is now under review.
        </p>

        <div className="alert alert-info mt-4">
          <p className="mb-1"><strong>What's Next?</strong></p>
          <p className="mb-0">
            Our team will review your application within 2-3 business days.
            You'll receive an email notification once your business is verified.
          </p>
        </div>

        <div className="mt-4">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => window.location.reload()}
          >
            Back to Home
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="form-step"
    >
      <h2 className="text-center mb-4">Final Review Before Submission</h2>

      <div className="neumorphic-card">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6">
              <div className="card mb-4">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">Business Details</h5>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => onPrevious()}
                  >
                    <Edit size={14} className="me-1" /> Edit
                  </button>
                </div>
                <div className="card-body">
                  <div className="d-flex mb-3">
                    {formData.logo && (
                      <div
                        style={{
                          width: '60px',
                          height: '60px',
                          borderRadius: '50%',
                          backgroundImage: `url(${formData.logo})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          marginRight: '15px'
                        }}
                      ></div>
                    )}
                    <div>
                      <h5>{formData.businessName}</h5>
                      <p className="text-muted mb-0">{formData.businessType}</p>
                    </div>
                  </div>

                  <p className="mb-3">{formData.description}</p>

                  <div className="mb-3">
                    <strong>Categories:</strong>
                    <div className="d-flex flex-wrap gap-1 mt-1">
                      {formData.categories.map(category => (
                        <span key={category} className="badge bg-light text-dark">{category}</span>
                      ))}
                    </div>
                  </div>

                  {formData.operatingSince && (
                    <p className="mb-0"><strong>Operating Since:</strong> {formData.operatingSince}</p>
                  )}
                </div>
              </div>

              <div className="card mb-4">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">Contact & Location</h5>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => onPrevious()}
                  >
                    <Edit size={14} className="me-1" /> Edit
                  </button>
                </div>
                <div className="card-body">
                  <p><strong>Owner:</strong> {formData.ownerName}</p>

                  <p className="d-flex align-items-center mb-2">
                    <Phone size={16} className="me-2" /> {formData.phoneNumber}
                  </p>

                  <p className="d-flex align-items-center mb-2">
                    <Mail size={16} className="me-2" /> {formData.email}
                  </p>

                  <p className="d-flex align-items-start mb-2">
                    <MapPin size={16} className="me-2 mt-1" />
                    <span>{formData.address}</span>
                  </p>

                  <p><strong>Service Area:</strong> {formData.serviceArea}</p>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card mb-4">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">Verification Documents</h5>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => onPrevious()}
                  >
                    <Edit size={14} className="me-1" /> Edit
                  </button>
                </div>
                <div className="card-body">
                  {formData.governmentId && (
                    <p><strong>Government ID:</strong> {formData.governmentId.name}</p>
                  )}

                  {formData.verificationDocument && (
                    <p><strong>Verification Document:</strong> {formData.verificationDocument.name}</p>
                  )}

                  <p><strong>Business Photos:</strong> {formData.businessPhotos.length} uploaded</p>

                  <div className="d-flex flex-wrap gap-2 mt-2">
                    {formData.businessPhotos.map((photo, index) => (
                      <div
                        key={photo.id}
                        style={{
                          width: '60px',
                          height: '60px',
                          borderRadius: '8px',
                          backgroundImage: `url(${photo.preview})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center'
                        }}
                      ></div>
                    ))}
                  </div>

                  {formData.introVideo && (
                    <p className="mt-3"><strong>Introduction Video:</strong> {formData.introVideo.name}</p>
                  )}
                </div>
              </div>

              <div className="card mb-4">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">Payment Setup</h5>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => onPrevious()}
                  >
                    <Edit size={14} className="me-1" /> Edit
                  </button>
                </div>
                <div className="card-body">
                  <p><strong>Accepted Payment Methods:</strong></p>
                  <div className="d-flex flex-wrap gap-2 mb-3">
                    {formData.paymentMethods.map(method => (
                      <span key={method} className="badge bg-light text-dark d-flex align-items-center">
                        <CreditCard size={14} className="me-1" /> {method.charAt(0).toUpperCase() + method.slice(1)}
                      </span>
                    ))}
                  </div>

                  {formData.upiId && (
                    <p><strong>UPI ID:</strong> {formData.upiId}</p>
                  )}

                  {formData.bankDetails && (
                    <p><strong>Bank Details:</strong> ******** (Encrypted)</p>
                  )}

                  <p>
                    <strong>UdhyogUnity Payment Processing:</strong>
                    {formData.useUdhyogUnityPayment ? ' Enabled' : ' Disabled'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <div className="form-check mb-3">
              <input
                className="form-check-input"
                type="checkbox"
                id="detailsConfirmed"
                name="detailsConfirmed"
                checked={formData.detailsConfirmed}
                onChange={handleToggleChange}
              />
              <label className="form-check-label" htmlFor="detailsConfirmed">
                I confirm that all details provided are accurate and complete.
              </label>
              {errors.detailsConfirmed && <div className="error-message">{errors.detailsConfirmed}</div>}
            </div>

            <div className="form-check mb-4">
              <input
                className="form-check-input"
                type="checkbox"
                id="termsAgreed"
                name="termsAgreed"
                checked={formData.termsAgreed}
                onChange={handleToggleChange}
              />
              <label className="form-check-label" htmlFor="termsAgreed">
                I accept UdhyogUnity's <a href="#" className="text-decoration-none">Terms & Conditions</a> and <a href="#" className="text-decoration-none">Privacy Policy</a>.
              </label>
              {errors.termsAgreed && <div className="error-message">{errors.termsAgreed}</div>}
            </div>
          </div>

          <div className="d-flex justify-content-between">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onPrevious}
            >
              <ArrowLeft size={16} className="me-2" /> Previous
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Submitting...
                </>
              ) : (
                <>
                  <Check size={16} className="me-2" /> Submit Registration
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default FinalReviewForm;