import React, { useState } from 'react';
import './Payment.css'; // Import your Payment.css stylesheet

const Payment = ({ propertyId }) => { // Adjust props as needed
  const [paymentMethod, setPaymentMethod] = useState('visa'); // Default payment method
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
      console.log('Payment successful!');
    } catch (error) {
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
    <div className="container">
      <h1>Payment Page</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row">
        <div className="col-md-4">
          <div className="list-group">
            <button
              type="button"
              className={`list-group-item list-group-item-action ${paymentMethod === 'visa' ? 'active' : ''}`}
              onClick={() => handlePaymentMethodChange('visa')}
            >
              Visa Card
            </button>
            <button
              type="button"
              className={`list-group-item list-group-item-action ${paymentMethod === 'mpesa' ? 'active' : ''}`}
              onClick={() => handlePaymentMethodChange('mpesa')}
            >
              M-Pesa
            </button>
            <button
              type="button"
              className={`list-group-item list-group-item-action ${paymentMethod === 'paypal' ? 'active' : ''}`}
              onClick={() => handlePaymentMethodChange('paypal')}
            >
              PayPal
            </button>
          </div>
        </div>
        <div className="col-md-8">
          <form onSubmit={handlePaymentSubmit}>
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
            <button type="submit" className="btn btn-primary" disabled={processing}>
              {processing ? 'Processing...' : 'Pay Now'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Payment;
