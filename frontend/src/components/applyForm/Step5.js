import React from 'react';

const Step5 = ({ formData, handleChange, handleFileChange }) => {
  return (
    <div className="container">
      <h3 className="mb-4">Additional Documents</h3>

      <div className="form-group mb-3">
        <h5>İndeksli Yayın (Indexed Publications)</h5>
        <label className="form-label">Proof of Indexed Publications (e.g., in Scopus, Web of Science):</label>
        <input
          type="file"
          name="indexedPublications"
          onChange={handleFileChange}
          className="form-control"
        />
      </div>

      <div className="form-group mb-3">
        <label className="form-label">Publication DOI or URL:</label>
        <input
          type="text"
          name="indexedPublicationsDOI"
          value={formData.indexedPublicationsDOI}
          onChange={handleChange}
          className="form-control"
        />
      </div>

      <div className="form-group mb-3">
        <h5>Atıf Sayısı (Citations Count)</h5>
        <label className="form-label">Proof of Citations Count:</label>
        <input
          type="file"
          name="citationsProof"
          onChange={handleFileChange}
          className="form-control"
        />
      </div>

      <div className="form-group mb-3">
        <h5>Konferans Yayını (Conference Publications)</h5>
        <label className="form-label">Proof of Conference Participation (Certificate):</label>
        <input
          type="file"
          name="conferencePublicationProof"
          onChange={handleFileChange}
          className="form-control"
        />
      </div>
    </div>
  );
};

export default Step5;
