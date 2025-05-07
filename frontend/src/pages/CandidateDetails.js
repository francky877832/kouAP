import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/candidateDetailsStyles.css'
import { JuryContext } from '../context/JuryContext';
import { UserContext } from '../context/UserContext';
import InlineLoading from '../components/InlineLoading';
import Loading from '../components/Loading';
import UserMenu from './UserMenu';
import { Button, Table } from 'react-bootstrap';



const CandidateDetails = () => {
  const { state } = useLocation(); // Récupère les données du candidat passées avec 'navigate'
  const navigate = useNavigate()
  const candidate = state?.candidate; //==application
  const [juryEvaluation, setJuryEvaluation] = useState(null);
  const [validationStatus, setValidationStatus] = useState('');
  const [comment, setComment] = useState('');
  const [reportFile, setReportFile] = useState(null); // Pour gérer le fichier du rapport
  const [isLoading, setIsLoading] = useState(true)
  const [isReportSending, setIsReportSending] = useState(false)
  const [showForm, setShowForm] = useState(false);
  const [hasSubmittedReport, setHasSubmittedReport] = useState(false);

  const { submitEvaluation, fetchJuryEvaluation } = useContext(JuryContext)
  const { user, isAuthenticated } = useContext(UserContext)

  //console.log(candidate)
  useEffect(() => {
    //console.log(candidate)
    const getEvaluation = async () => {
        //if (!applicationId || !juryId) return; // Vérifie que les IDs sont valides
        setIsLoading(true);
        //console.log(candidate)
        const data = await fetchJuryEvaluation(candidate._id, user._id);
        //console.log(data)
        
        
          if(data && data?.length > 0 || ['accepted', 'rejected'].includes(candidate.status)) //candidate==application
          {
              setHasSubmittedReport(true)
              setJuryEvaluation(data[0]);
          }
        
        //console.log(data)
        setIsLoading(false);
    };
    if(isLoading)
    {
      getEvaluation();
    }
}, [candidate, user, isLoading]); 


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


  
  const handleValidationSubmit = async (e) => {
    e.preventDefault();
    const application = candidate
    setIsReportSending(true)
    const formData = new FormData();
      formData.append('user', application?.user?._id);
      formData.append('application', application?._id);
      formData.append('status', application?.status);
      formData.append('decision', validationStatus);
      formData.append('summary', comment);
      formData.append('jury', user?._id);

      if (reportFile) {
        formData.append('report', reportFile); // Le champ du formulaire qui contient le fichier
      }
    const result = await submitEvaluation(formData, application);
        
        if (result) {
            alert('Evaluation submitted with success:');
            setShowForm(false)
            setIsReportSending(false)
            navigate('/jury/panel');

        }else
        {
          alert('Error while submittion evaluatio:');
        }
        setIsReportSending(false)
  };




  const handleViewReport = () => {
    navigate('/jury/evaluation-details', { state: { evaluation : juryEvaluation } });
  }




 if(isReportSending)
 {
  return <Loading/>
 }

  return (
    <div className="container">
      <UserMenu user={user} isAuthenticated={isAuthenticated} />

      <h3 className="mb-4 text-center">Review Candidate Information</h3>

      <div className="mb-3">
        <h5 className="step-title">Personal Information</h5>
        <Table striped bordered hover>
          <tbody>
            <tr>
              <td><strong>Full Name:</strong></td>
              <td>{candidate.user.name}</td>
            </tr>
            <tr>
              <td><strong>Identification Number:</strong></td>
              <td>{candidate.user.tcID}</td>
            </tr>
            <tr>
              <td><strong>Email:</strong></td>
              <td>{candidate.user.email}</td>
            </tr>
            <tr>
              <td><strong>Phone Number:</strong></td>
              <td>{candidate.user.phoneNumber}</td>
            </tr>
            <tr>
              <td><strong>Postal Address:</strong></td>
              <td>{candidate.user.address}</td>
            </tr>
          </tbody>
        </Table>
      </div>

      <div className="mb-3">
        <h5 className="step-title">Candidate Documents</h5>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Category</th>
              <th>Document</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(candidate.categories).map((letter, i1) => {
              const forms = candidate.categories[letter];
              
              return (
                <>
                <tr><th colSpan={2} className='text-center'>{letter}</th></tr>
              
                { forms.map((f, i2) => (
                  <tr key={`${i1}-${i2}`}>
                    <td><strong>{letter}{f.number}</strong></td>
                    <td>
                      <Button variant="link" href={f.proof} title={letter + "" + f.number} target="_blank">
                        Download PDF
                      </Button>
                    </td>
                  </tr>
                ))}
              </>
            )})
          }


            <tr>
              <td><strong>CV</strong></td>
              <td>
                <Button variant="link" href={candidate?.user?.cv} title="CV" target="_blank">
                  Download PDF
                </Button>
              </td>
            </tr>


            <tr>
              <td><strong>Application Form</strong></td>
              <td>
                <Button variant="link" href={candidate.applicationDocument} title="Application form" target="_blank">
                  Download PDF
                </Button>
              </td>
            </tr>
          </tbody>
        </Table>
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
