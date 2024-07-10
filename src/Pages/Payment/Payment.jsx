import React, { useState } from 'react';
import './Payment.css'; // Import your Payment.css stylesheet

const Payment = ({ property, onClose }) => {
  const [paymentMethod, setPaymentMethod] = useState('visa');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [phone, setPhone] = useState('');
  const [paypalEmail, setPaypalEmail] = useState('');
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);

  const handlePaymentSubmit = async (event) => {
    event.preventDefault();
    try {
      setProcessing(true);
      // Simulate payment processing (replace with actual payment logic)
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate 2 second delay

      // Assuming payment succeeds in this example
      alert('Payment successful!'); // Replace with success handling logic
      onClose(); // Close the payment modal after successful payment
    } catch (error) {
      console.error('Payment failed:', error);
      setError('Payment failed. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
    // Reset form fields based on selected payment method (if needed)
    setCardNumber('');
    setExpiryDate('');
    setCvv('');
    setPhone('');
    setPaypalEmail('');
    setError(null); // Clear any previous errors

    // Adjust input requirements based on payment method
    if (method === 'mpesa') {
      // Initialize with country code prefix for M-Pesa (e.g., +254 for Kenya)
      setPhone('+254');
    }
  };

  const validatePaypalEmail = (email) => {
    // Basic email validation for PayPal
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const handlePaypalEmailChange = (e) => {
    setPaypalEmail(e.target.value);
    if (error && validatePaypalEmail(e.target.value)) {
      setError(null);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Payment for {property.name}</h2>
        
        {/* Payment form */}
        <form onSubmit={handlePaymentSubmit}>
          {/* Payment method selection */}
          <div className="form-group">
            <label>Select Payment Method:</label>
            <select value={paymentMethod} onChange={(e) => handlePaymentMethodChange(e.target.value)}>
              <option value="visa">Visa Card</option>
              <option value="mpesa">M-Pesa</option>
              <option value="paypal">PayPal</option>
            </select>
          </div>
          
          {/* Form fields based on payment method */}
          {paymentMethod === 'visa' && (
            <>
              <div className="form-group">
                <label htmlFor="cardNumber">Card Number</label>
                <input
                  type="text"
                  className="form-control"
                  id="cardNumber"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  required
                />
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="expiryDate">Expiry Date</label>
                  <input
                    type="text"
                    className="form-control"
                    id="expiryDate"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    placeholder="MM/YYYY"
                    required
                  />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="cvv">CVV</label>
                  <input
                    type="text"
                    className="form-control"
                    id="cvv"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    required
                  />
                </div>
              </div>
            </>
          )}
          {paymentMethod === 'mpesa' && (
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="text"
                className="form-control"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+254123456789" // Placeholder with the country code example
                required
              />
            </div>
          )}
          {paymentMethod === 'paypal' && (
            <div className="form-group">
              <label htmlFor="paypalEmail">PayPal Email</label>
              <input
                type="email"
                className="form-control"
                id="paypalEmail"
                value={paypalEmail}
                onChange={handlePaypalEmailChange}
                required
              />
            </div>
          )}
          
          {error && <div className="alert alert-danger">{error}</div>}
          
          <button type="submit" className="btn btn-primary" disabled={processing}>
            {processing ? 'Processing...' : 'Pay Now'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Payment;
