import React, { useState } from "react";
import axios from "axios";

const PaymentForm = () => {
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("USD");

  const handlePayment = async () => {
    try {
      const response = await axios.post("/api/payment", { amount, currency });
      if (response.status === 200) {
        alert("Payment successful!");
      }
    } catch (error) {
      console.error("Error processing payment", error);
    }
  };

  return (
    <div>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
      />
      <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="GBP">GBP</option>
      </select>
      <button onClick={handlePayment}>Pay</button>
    </div>
  );
};

export default PaymentForm;