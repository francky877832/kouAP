import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../styles/adminPanelStyles.css';

const AllEvaluations = () => {
  const { state } = useLocation(); // Récupère les évaluations passées via "state"
  const evaluations = state?.evaluations || []; // Si aucune évaluation n'est passée, un tableau vide est utilisé

  // État pour suivre le candidat sélectionné
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  // Fonction pour gérer la sélection du candidat
  const handleCandidateClick = (candidateId) => {
    setSelectedCandidate((prev) => (prev === candidateId ? null : candidateId)); // Si le même candidat est cliqué à nouveau, il est désélectionné
  };

const handleDecision = (candidateId, decision) => {
    //setStatus({ ...status, [candidateId]: decision });
  };

  return (
    <div className="evaluations-section container mt-4">
      <h3 className="text-center mb-4">Toutes les évaluations</h3>

      <div className="list-group">
        {evaluations.length > 0 ? (
          evaluations.map((candidate) => (
            <div key={candidate._id} className="candidate-item">
              <button
                className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center ${
                  candidate.status?.toLowerCase() === "accepted"
                    ? "bg-success text-white"
                    : candidate.status?.toLowerCase() === "rejected"
                    ? "bg-danger text-white"
                    : candidate.status?.toLowerCase() === "processing"
                    ? "bg-warning text-white"
                    : ""
                }`}
                onClick={() => handleCandidateClick(candidate._id)} // Clic pour sélectionner/désélectionner le candidat
              >
                <span>{candidate.name}</span>
                <span className="badge bg-primary">{candidate.juries.length} Jurys</span>
              </button>

              {/* Affichage de la liste des jurys uniquement si ce candidat est sélectionné */}
              {selectedCandidate === candidate._id && candidate.juries.length > 0 && (
                <div className="jury-list mt-2">
                  {candidate.juries.map((jury) => (
                    <Link
                      key={jury.id}
                      to={`/jury-evaluation-details`}
                      className={`list-group-item list-group-item-action ms-3 jury-item ${
                        jury.status?.toLowerCase() === "accepted"
                          ? "jury-accepted"
                          : jury.status?.toLowerCase() === "rejected"
                          ? "jury-rejected"
                          : jury.status?.toLowerCase() === "processing"
                          ? "jury-processing"
                          : ""
                      }`}
                      state={{ evaluation: jury }}
                    >
                      {jury.juryName}
                    </Link>
                  ))}

                     {/* Section pour la décision finale */}
              <div className="mt-3 d-flex gap-2">
                <button className="btn btn-success" onClick={() => handleDecision(candidate._id, "Accepted")} >Accepter</button>
                <button className="btn btn-danger" onClick={() => handleDecision(candidate._id, "Accepted")}>Refuser</button>
              </div> <br/>
                </div>
              )}

           
            </div>
          ))
        ) : (
          <p>Aucune évaluation trouvée.</p>
        )}
      </div>
    </div>
  );
};

export default AllEvaluations;
