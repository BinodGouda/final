import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Wallet, DollarSign, Ban as Bank, ArrowLeft, ArrowRight } from 'lucide-react';

const PaymentSetupForm = ({ formData, updateFormData, onNext, onPrevious }) => {
  const [errors, setErrors] = useState({});
  
  const paymentMethods = [
    { id: 'upi', name: 'UPI', icon: <Wallet size={24} /> },
    { id: 'card', name: 'Card', icon: <CreditCard size={24} /> },
    { id: 'cash', name: 'Cash', icon: <DollarSign size={24} /> },
    { id: 'bank', name: 'Bank Transfer', icon: <Bank size={24} /> }
  ];
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };
  
  const handleToggleChange = (e) => {
    const { name, checked } = e.target;
    updateFormData({ [name]: checked });
  };
  
  const togglePaymentMethod = (methodId) => {
    const updatedMethods = formData.paymentMethods.includes(methodId)
      ? formData.paymentMethods.filter(id => id !== methodId)
      : [...formData.paymentMethods, methodId];
    
    updateFormData({ paymentMethods: updatedMethods });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    const newErrors = {};
    
    if (formData.paymentMethods.length === 0) {
      newErrors.paymentMethods = 'Please select at least one payment method';
    }
    
    if (formData.paymentMethods.includes('upi') && !formData.upiId) {
      newErrors.upiId = 'UPI ID is required when UPI payment method is selected';
    }
    
    if (formData.paymentMethods.includes('bank') && !formData.bankDetails) {
      newErrors.bankDetails = 'Bank details are required when Bank Transfer is selected';
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
      <h2 className="text-center mb-4">Set Up Your Payment Preferences</h2>
      
      <div className="neumorphic-card">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="form-label">Accepted Payment Methods*</label>
            <div className="row">
              {paymentMethods.map((method) => (
                <div key={method.id} className="col-md-3 col-6 mb-3">
                  <div 
                    className={`card h-100 ${formData.paymentMethods.includes(method.id) ? 'border-primary' : ''}`}
                    style={{ cursor: 'pointer' }}
                    onClick={() => togglePaymentMethod(method.id)}
                  >
                    <div className="card-body text-center">
                      <div className="mb-2">
                        {method.icon}
                      </div>
                      <h6 className="card-title mb-0">{method.name}</h6>
                      {formData.paymentMethods.includes(method.id) && (
                        <div className="position-absolute top-0 end-0 p-2">
                          <span className="badge bg-primary rounded-circle">✓</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {errors.paymentMethods && <div className="error-message">{errors.paymentMethods}</div>}
          </div>
          
          {formData.paymentMethods.includes('upi') && (
            <div className="mb-4">
              <label htmlFor="upiId" className="form-label">UPI ID*</label>
              <input
                type="text"
                className="form-control"
                id="upiId"
                name="upiId"
                value={formData.upiId}
                onChange={handleChange}
                placeholder="Enter your UPI ID (e.g., name@upi)"
              />
              {errors.upiId && <div className="error-message">{errors.upiId}</div>}
            </div>
          )}
          
          {formData.paymentMethods.includes('bank') && (
            <div className="mb-4">
              <label htmlFor="bankDetails" className="form-label">Bank Account Details*</label>
              <textarea
                className="form-control"
                id="bankDetails"
                name="bankDetails"
                rows="3"
                value={formData.bankDetails}
                onChange={handleChange}
                placeholder="Enter your bank account details (Account Number, IFSC, Bank Name)"
              ></textarea>
              <small className="text-muted">Your bank details will be encrypted for security.</small>
              {errors.bankDetails && <div className="error-message">{errors.bankDetails}</div>}
            </div>
          )}
          
          <div className="mb-4">
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                id="useUdhyogUnityPayment"
                name="useUdhyogUnityPayment"
                checked={formData.useUdhyogUnityPayment}
                onChange={handleToggleChange}
              />
              <label className="form-check-label" htmlFor="useUdhyogUnityPayment">
                Use UdhyogUnity Secure Payment Processing
              </label>
            </div>
            <small className="text-muted d-block mt-2">
              Enable this to use our integrated payment system powered by Stripe/Razorpay. 
              We charge a 2% transaction fee for this service.
            </small>
          </div>
          
          {formData.useUdhyogUnityPayment && (
            <div className="alert alert-info">
              <h6 className="alert-heading">Benefits of UdhyogUnity Payments:</h6>
              <ul className="mb-0">
                <li>Secure payment processing</li>
                <li>Automatic invoicing</li>
                <li>Dispute resolution support</li>
                <li>Faster payouts</li>
              </ul>
            </div>
          )}
          
          <div className="d-flex justify-content-between mt-4">
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

export default PaymentSetupForm;