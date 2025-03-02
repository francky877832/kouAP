import React from 'react';

const Step1 = ({ formData, handleChange }) => {
  return (
    <div className="container">
      <div className="mb-3">
        <label className="form-label">Full Name:</label>
        <input
          type="text"
          name="fullName"
          className="form-control"
          value={formData.fullName}
          onChange={(e) => { handleChange(e, "step1"); }}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Identification Number (TC Kimlik):</label>
        <input
          type="text"
          name="idNumber"
          className="form-control"
          value={formData.idNumber}
          onChange={(e) => { handleChange(e, "step1"); }}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Email Address:</label>
        <input
          type="email"
          name="email"
          className="form-control"
          value={formData.email}
          onChange={(e) => { handleChange(e, "step1"); }}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Phone Number:</label>
        <input
          type="tel"
          name="phoneNumber"
          className="form-control"
          value={formData.phoneNumber}
          onChange={(e) => { handleChange(e, "step1"); }}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Postal Address:</label>
        <textarea
          name="address"
          className="form-control"
          value={formData.address}
          onChange={(e) => { handleChange(e, "step1"); }}
          required
        />
      </div>
    </div>
  );
};

export default Step1;
