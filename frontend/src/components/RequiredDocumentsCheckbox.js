import React from 'react';

const RequiredDocumentsCheckbox = ({ formData, handleChange }) => {
  return (
    <div className="form-group mb-3">
      <h5>Required Documents</h5>

      <div className="form-check">
        <input
          type="checkbox"
          className="form-check-input"
          name="cv"
          checked={formData.cv}
          onChange={handleChange}
        />
        <label className="form-check-label">
          CV
        </label>
      </div>

      <div className="form-check">
        <input
          type="checkbox"
          className="form-check-input"
          name="indexedPublications"
          checked={formData.indexedPublications}
          onChange={handleChange}
        />
        <label className="form-check-label">
          Indexed Publications
        </label>
      </div>

      <div className="form-check">
        <input
          type="checkbox"
          className="form-check-input"
          name="citationsProof"
          checked={formData.citationsProof}
          onChange={handleChange}
        />
        <label className="form-check-label">
          Proof of Citations Count
        </label>
      </div>

      <div className="form-check">
        <input
          type="checkbox"
          className="form-check-input"
          name="conferenceProof"
          checked={formData.conferenceProof}
          onChange={handleChange}
        />
        <label className="form-check-label">
          Conference Publication Proof
        </label>
      </div>

      <div className="form-check">
        <input
          type="checkbox"
          className="form-check-input"
          name="recommendationLetters"
          checked={formData.recommendationLetters}
          onChange={handleChange}
        />
        <label className="form-check-label">
          Recommendation Letters
        </label>
      </div>

      <div className="form-check">
        <input
          type="checkbox"
          className="form-check-input"
          name="administrativeExperienceProof"
          checked={formData.administrativeExperienceProof}
          onChange={handleChange}
        />
        <label className="form-check-label">
          Administrative Experience Proof
        </label>
      </div>
    </div>
  );
};

export default RequiredDocumentsCheckbox;
