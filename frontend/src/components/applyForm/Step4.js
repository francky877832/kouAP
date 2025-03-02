import React from 'react';

const Step4 = ({ formData, handleChange, handleFileChange }) => {
  return (
    <div className="container">
      <div className="mb-3">
        <label className="form-label">Proof of Citations and Indexing:</label>
        <textarea
          name="citationsProof"
          className="form-control"
          value={formData.citationsProof}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Research Project Participation Certificates:</label>
        <textarea
          name="researchProjectCertificates"
          className="form-control"
          value={formData.researchProjectCertificates}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Letters of Recommendation (If requested):</label>
        <input
          type="file"
          name="recommendationLetters"
          className="form-control"
          onChange={handleFileChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Administrative and Academic Experience Proof:</label>
        <input
          type="file"
          name="administrativeExperienceProof"
          className="form-control"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};

export default Step4;
