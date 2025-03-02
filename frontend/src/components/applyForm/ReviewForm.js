import React from 'react';
import '../../styles/applyFormStyles.css'; // Importation du fichier CSS

const ReviewForm = ({ formData }) => {
  return (
    <div className="container">
      <h3 className="mb-4">Review Your Information</h3>

      <div className="mb-3">
        <h5 className="step-title">Personal Information</h5>
        <p><strong>Full Name:</strong> {formData.fullName}</p>
        <p><strong>Identification Number:</strong> {formData.idNumber}</p>
        <p><strong>Email:</strong> {formData.email}</p>
        <p><strong>Phone Number:</strong> {formData.phoneNumber}</p>
        <p><strong>Postal Address:</strong> {formData.address}</p>
      </div>

      <div className="mb-3">
        <h5 className="step-title">Academic Information</h5>
        <p><strong>Degree:</strong> {formData.degree}</p>
        <p><strong>Work and Academic Experience:</strong> {formData.experience}</p>
        <p><strong>Courses Taught:</strong> {formData.courses}</p>
        <p><strong>Thesis Supervision Experience:</strong> {formData.thesisSupervision}</p>
      </div>

      <div className="mb-3">
        <h5 className="step-title">Documents</h5>
        <p><strong>CV Uploaded:</strong> {formData.cv ? 'Yes' : 'No'}</p>
        <p><strong>Publications:</strong> {formData.publications}</p>
        <p><strong>Language Certificates:</strong> {formData.languageCertificates}</p>
        <p><strong>Conferences and Scientific Events:</strong> {formData.conferences}</p>
      </div>

      <div className="mb-3">
        <h5 className="step-title">Additional Information</h5>
        <p><strong>Position Type:</strong> {formData.positionType}</p>
        <p><strong>Proof of Citations and Indexing:</strong> {formData.citationsProof}</p>
        <p><strong>Research Project Participation:</strong> {formData.researchProjectCertificates}</p>
      </div>

      <div className="mb-3">
        <h5 className="step-title">Uploaded Files</h5>
        <p><strong>Recommendation Letters:</strong> {formData.recommendationLetters ? 'Uploaded' : 'Not Uploaded'}</p>
        <p><strong>Administrative Experience Proof:</strong> {formData.administrativeExperienceProof ? 'Uploaded' : 'Not Uploaded'}</p>
      </div>

      <div className="form-group mb-3">
        <h5>Publications and Citations</h5>
        <p><strong>Indexed Publications:</strong> {formData.indexedPublications ? 'Yes' : 'No'}</p>
        <p><strong>DOI or URL of Publications:</strong> {formData.indexedPublicationsDOI}</p>
        <p><strong>Proof of Citations:</strong> {formData.citationsProof ? 'Uploaded' : 'Not Uploaded'}</p>
      </div>

      <div className="form-group mb-3">
        <h5>Conference Publications</h5>
        <p><strong>Proof of Conference Participation:</strong> {formData.conferencePublicationProof ? 'Uploaded' : 'Not Uploaded'}</p>
      </div>

    </div>
  );
};

export default ReviewForm;
