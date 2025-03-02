import React, { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/candidateDetailsStyles.css'
import { JuryContext } from '../context/JuryContext';
import { UserContext } from '../context/UserContext';



const CandidateDetails = () => {
  const { state } = useLocation(); // Récupère les données du candidat passées avec 'navigate'
  const candidate = state?.candidate;
  
  const [validationStatus, setValidationStatus] = useState('');
  const [comment, setComment] = useState('');
  const [reportFile, setReportFile] = useState(null); // Pour gérer le fichier du rapport

  const { submitEvaluation } = useContext(JuryContext)
  const { user } = useContext(UserContext)


  const handleValidationSubmit = async (e) => {
    e.preventDefault();
    
    const result = await submitEvaluation(validationStatus, comment, reportFile, candidate, user);
        
        if (result) {
            console.log('Évaluation soumise avec succès:', result);
            // Traite la réponse du backend ou redirige l'utilisateur
        }
    
    // Tu peux maintenant envoyer ces données (y compris le fichier) au backend pour traitement
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setReportFile(file);
    }
  };


  return (
    <div className="container">
      <h3 className="mb-4 text-center">Review Candidate Information</h3>

      <div className="mb-3">
        <h5 className="step-title">Personal Information</h5>
        <p><strong>Full Name:</strong> {candidate.user.name}</p>
        <p><strong>Identification Number:</strong> {candidate.user.tcID}</p>
        <p><strong>Email:</strong> {candidate.user.email}</p>
        <p><strong>Phone Number:</strong> {candidate.user.phoneNumber}</p>
        <p><strong>Postal Address:</strong> {candidate.user.address}</p>
      </div>

      <div className="mb-3">
        <h5 className="step-title">Academic Information</h5>
        <p><strong>Degree:</strong> {candidate.degree}</p>
        <p><strong>Work and Academic Experience:</strong> {candidate.experience}</p>
        <p><strong>Courses Taught:</strong> {candidate.courses}</p>
        <p><strong>Thesis Supervision Experience:</strong> {candidate.thesisSupervision}</p>
      </div>

      <div className="mb-3">
        <h5 className="step-title">Documents</h5>
        <p><strong>CV Uploaded:</strong> {candidate.cv ? 'Yes' : 'No'}</p>
        <p><strong>Publications:</strong> {candidate.publications}</p>
        <p><strong>Language Certificates:</strong> {candidate.languageCertificates}</p>
        <p><strong>Conferences and Scientific Events:</strong> {candidate.conferences}</p>
      </div>

      <div className="mb-3">
        <h5 className="step-title">Additional Information</h5>
        <p><strong>Position Type:</strong> {candidate.positionType}</p>
        <p><strong>Proof of Citations and Indexing:</strong> {candidate.citationsProof}</p>
        <p><strong>Research Project Participation:</strong> {candidate.researchProjectCertificates}</p>
      </div>

      <div className="mb-3">
        <h5 className="step-title">Uploaded Files</h5>
        <p><strong>Recommendation Letters:</strong> {candidate.recommendationLetters ? 'Uploaded' : 'Not Uploaded'}</p>
        <p><strong>Administrative Experience Proof:</strong> {candidate.administrativeExperienceProof ? 'Uploaded' : 'Not Uploaded'}</p>
      </div>

      <div className="form-group mb-3">
        <h5>Publications and Citations</h5>
        <p><strong>Indexed Publications:</strong> {candidate.indexedPublications ? 'Yes' : 'No'}</p>
        <p><strong>DOI or URL of Publications:</strong> {candidate.indexedPublicationsDOI}</p>
        <p><strong>Proof of Citations:</strong> {candidate.citationsProof ? 'Uploaded' : 'Not Uploaded'}</p>
      </div>

      <div className="form-group mb-3">
        <h5>Conference Publications</h5>
        <p><strong>Proof of Conference Participation:</strong> {candidate.conferencePublicationProof ? 'Uploaded' : 'Not Uploaded'}</p>
      </div>

      {/* Form for validation */}
      <form onSubmit={handleValidationSubmit} className="mt-4">
        <div className="form-group">
          <h5>Evaluation Status</h5>
          <select 
            value={validationStatus} 
            onChange={(e) => setValidationStatus(e.target.value)} 
            className="form-control" 
            required
          >
            <option value="">Select Status</option>
            <option value="Approved">Approve</option>
            <option value="Rejected">Reject</option>
          </select>
        </div>

        <div className="form-group">
          <h5>Comments</h5>
          <textarea 
            value={comment} 
            onChange={(e) => setComment(e.target.value)} 
            className="form-control" 
            rows="4" 
            placeholder="Add your comments here..." 
            required
          ></textarea>
        </div>

        <div className="form-group">
          <h5>Upload Report</h5>
          <input 
            type="file" 
            accept=".pdf, .docx, .txt" 
            onChange={handleFileChange} 
            className="form-control" 
            required 
          />
        </div>

        <div className="form-group text-center">
          <button type="submit" className="btn btn-primary">Submit Evaluation</button>
        </div>
      </form>
    </div>
  );
};

export default CandidateDetails;
