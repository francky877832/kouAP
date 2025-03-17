import React from 'react';
import { useLocation } from 'react-router-dom';

const AllCandidates = () => {
  const { state } = useLocation();
  const applications = state?.applications || [];


const handleAssignJuries = (applicationId) => {

    console.log('Assignation des jurés pour la candidature ID:', applicationId);
  };
  

  return (
    <div className="applications-section container mt-4">
      <h3 className="text-center mb-4">All Applications</h3>
      <ul className="list-group">
        {applications.length > 0 ? (
          applications.map((application) => (
            <li key={application._id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <strong>{application.candidateName}</strong> - {application.position}
              </div>

              <button
                className="btn btn-primary"
                onClick={() => handleAssignJuries(application._id)} // Assurez-vous de définir cette fonction
              >
                Assigner 5 jurés
              </button>
            </li>
          ))
        ) : (
          <li className="list-group-item text-center">
            Aucune candidature trouvée.
          </li>
        )}
      </ul>
    </div>
  );
};


export default AllCandidates;
