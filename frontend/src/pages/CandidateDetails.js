import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/candidateDetailsStyles.css'
import { JuryContext } from '../context/JuryContext';
import { UserContext } from '../context/UserContext';
import InlineLoading from '../components/InlineLoading';
import Loading from '../components/Loading';
import UserMenu from './UserMenu';



const CandidateDetails = () => {
  const { state } = useLocation(); // Récupère les données du candidat passées avec 'navigate'
  const navigate = useNavigate()
  const candidate = state?.candidate; //==application
  const [juryEvaluation, setJuryEvaluation] = useState(null);
  const [validationStatus, setValidationStatus] = useState('');
  const [comment, setComment] = useState('');
  const [reportFile, setReportFile] = useState(null); // Pour gérer le fichier du rapport
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false);
  const [hasSubmittedReport, setHasSubmittedReport] = useState(false);

  const { submitEvaluation, fetchJuryEvaluation } = useContext(JuryContext)
  const { user, isAuthenticated } = useContext(UserContext)

  
  useEffect(() => {
    console.log(candidate)
    const getEvaluation = async () => {
        //if (!applicationId || !juryId) return; // Vérifie que les IDs sont valides
        setIsLoading(true);
        //console.log(candidate)
        const data = await fetchJuryEvaluation(candidate._id, user._id);
        console.log(data)
        
        if(['accepted', 'rejected'].includes(candidate.status))
        {
          setHasSubmittedReport(true)
          if(data && data?.length > 0)
          {
              setJuryEvaluation(data[0]);
          }
        }
        //console.log(data)
        setIsLoading(false);
    };
    if(isLoading)
    {
      getEvaluation();
    }
}, [candidate, user, isLoading]); 


  const handleValidationSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true)
    const result = await submitEvaluation(validationStatus, comment, reportFile, candidate, user);
        
        if (result) {
            alert('Evaluation submitted with success:');
            setShowForm(false)
        }else
        {
          alert('Error while submittion evaluatio:');
        }
    setIsLoading(false)
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setReportFile(file);
    }
  };




  const handleOpenForm = () => {
        if (!hasSubmittedReport) {
            setShowForm(prev => !prev);
        }
  }

  const handleViewReport = () => {
    navigate('/jury/evaluation-details', { state: { evaluation : juryEvaluation } });
  }

 if(isLoading)
 {
  return <Loading/>
 }

  return (
    <div className="container">
            <UserMenu user={user} isAuthenticated={isAuthenticated} />

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
  {isLoading ? <InlineLoading/> :
      <div>
            {/* Boutons d'action */}
        <div className="d-flex justify-content-between mb-3">
          <button className={hasSubmittedReport ? "btn btn-primary" : "btn btn-secondary"} onClick={handleViewReport} disabled={hasSubmittedReport?false:true}>View Report</button>
          <button className={hasSubmittedReport ? "btn btn-secondary" : "btn btn-primary"} onClick={handleOpenForm} disabled={hasSubmittedReport?true:false} >
              {!showForm ? "Add Report" : "Close Form" }
          </button>
        </div>

        {/*<Link
                      key={jury.id}
                      to={`/evaluation-details`}
                      className={`list-group-item list-group-item-action ms-3 jury-item ${
                        jury.status === "Accepted" ? "jury-accepted" : 
                        jury.status === "Rejected" ? "jury-rejected" : ""
                      }`}
                      state={{ evaluation:jury }}
                    >
                      {jury.juryName}
                    </Link> */}

            {/* Affichage du formulaire si le bouton est cliqué */}
    
    {showForm && 
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
            <option value="approved">Approve</option>
            <option value="rejected">Reject</option>
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
    }
         </div>
  }
    </div>
  );
};

export default CandidateDetails;
