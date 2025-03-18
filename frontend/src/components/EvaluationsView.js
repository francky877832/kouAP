import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button, Modal, Form } from "react-bootstrap";
import '../styles/adminPanelStyles.css';
import InlineLoading from '../components/InlineLoading';
import { capitalize, formatDate } from '../utils/utilsFunctions';
import { UserContext } from '../context/UserContext';
import { AdminContext } from '../context/AdminContext';
import Loading from './Loading';

const EvaluationsView = ({
    isEvaluationsLoading, setIsEvaluationsLoading, evaluation_,
  limit1, limit2,
}) => {

   
     const [error, setError] = useState("");
     const { user } = useContext(UserContext)
     const { assignApplicaitonJurys } = useContext(AdminContext)
     const [isLoading, setIsLoading] = useState(false)
    
    
     const [selectedJuries, setSelectedJuries] = useState({});
    const [selectedCandidate, setSelectedCandidate] = useState(null);
     
     
   
    

  const { state } = useLocation();
  const evaluations = state?.evaluations || evaluation_;

  if(isLoading)
  {
    return <Loading/>
  }

  const toggleJuryList = (candidateId) => {
    setSelectedCandidate(selectedCandidate === candidateId ? null : candidateId);
  };
  const handleDecision = (e, evaluation, decision) => {
    if(evaluation.jurys?.length!=evaluation.application.jurys?.length)
    {
        e.preventDefault();
        alert('All juries appreciations must be submitted first before you can make a decision.')
        return;
    }
    //alert("f")
    //setStatus({ ...status, [candidateId]: decision });
  };

//console.log(evaluations)
  return (
    <div className="candidates-section container d-flex flex-column">
    <h3 className="mb-3">Candidate Evaluations</h3>
    <div className="list-group">
        {(isLoading||isEvaluationsLoading) && <InlineLoading />}

      {evaluations?.slice(limit1, limit2).map((evaluation) => (
        <div key={evaluation._id} className="candidate-item">
          <button
            className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center ${
              evaluation.application.status?.toLocaleLowerCase() === "accepted" ? "bg-success text-white" :
              evaluation.application.status?.toLocaleLowerCase() === "rejected" ? "bg-danger text-white" :
              evaluation.application.status?.toLocaleLowerCase() === "processing" ? "bg-warnin text-black" : ""
            }`}
            onClick={() => toggleJuryList(evaluation._id)}
          >
            <span>{evaluation.user?.name}</span>
            <span className="badge bg-primary">{evaluation.jurys?.length} Juries</span>
        </button>

          {/* Dropdown pour afficher les jurys */}
          {selectedCandidate === evaluation._id && (
            <div className="jury-list mt-2">
              {evaluation.jurys?.length>0 && evaluation.jurys?.map((jury) => (
                jury.decision?.toLocaleLowerCase() === "pending" ?
                  <span key={jury.jury?._id} className="list-group-item ms-3 jury-item jury-processing">
                    {jury.jury?.name} www
                  </span>
                :
                
                <Link
                  key={jury.id}
                  to={`/jury-evaluation-details`}
                  className={`list-group-item list-group-item-action ms-3 jury-item ${
                    jury.decision?.toLocaleLowerCase() === "accepted" ? "jury-accepted" : 
                    jury.decision?.toLocaleLowerCase()=== "rejected" ? "jury-rejected" : 
                    jury.decision?.toLocaleLowerCase() === "processing" ? "jury-processing" : ""
                    
                  }`}
                  state={{ evaluation:jury }} 
                >
                  {jury?.jury?.name}
                </Link>
              ))}

              {/* Boutons Accepter / Refuser */}
        {
              <div className="mt-3 d-flex gap-2">
                <button
                  className="btn btn-success"
                  onClick={(e) => handleDecision(e, evaluation, "accepted")}
                >
                  Accepter
                </button>
                <button
                  className="btn btn-danger"
                  onClick={(e) => handleDecision(e, evaluation, "rejected")}
                >
                  Refuser
                </button>
              </div>
        }
            </div>
          )}
        </div>
      ))}

            {evaluations.length ===0 && <div>There's not evaluations yet to display.</div>}
    </div>

    

  </div>

  );
}

export default EvaluationsView;
