import React, { useState, useEffect, useContext } from 'react';
import { mockAnnouncements, mockApplications, mockJuries } from '../datas/mockData';
import { Link } from 'react-router-dom';
import '../styles/adminPanelStyles.css'

import { mockCandidates } from '../datas/mockData'; 
import { UserContext } from '../context/UserContext';
import InlineLoading from '../components/InlineLoading';
import { AdminContext } from '../context/AdminContext';

const AdminPanel = () => {
  const [applications, setApplications] = useState(mockApplications);
  const [jurors, setJurors] = useState(mockJuries);
  const [selectedJuries, setSelectedJuries] = useState({});
  const [viewJuries, setViewJuries] = useState(null);
  const [isApplicationsLoading, setIsApplicationsLoading] = useState(true)
  

  const {fetchAnnouncementsByUser, announcements, isAnnouncementsLoading} = useContext(AdminContext)

  useEffect(() => {
    // Simule le chargement des données ici
    //setAnnouncements(mockAnnouncements);
    setApplications(mockApplications);
    setJurors(mockJuries);
  }, []);








  const handleAssignJuries = (applicationId) => {
    const jurorsAssigned = selectedJuries[applicationId];
    if (jurorsAssigned && jurorsAssigned.length === 5) {
      alert(`5 jurys ont été assignés à la candidature ${applicationId}`);
    } else {
      alert("Veuillez sélectionner exactement 5 jurys pour cette candidature.");
    }
  };

  const handleSelectJuror = (applicationId, jurorId) => {
    setSelectedJuries((prevState) => {
      const selectedForApplication = prevState[applicationId] || [];
      if (selectedForApplication.includes(jurorId)) {
        return {
          ...prevState,
          [applicationId]: selectedForApplication.filter(id => id !== jurorId),
        };
      }
      if (selectedForApplication.length < 5) {
        return {
          ...prevState,
          [applicationId]: [...selectedForApplication, jurorId],
        };
      }
      return prevState;
    });
  };

  const toggleJurySelection = (applicationId) => {
    setViewJuries(prevState => prevState === applicationId ? null : applicationId);
  };


  /* PAST ANNOUCEMENTS */
  const [activeTab, setActiveTab] = useState('ongoing'); // "ongoing", "past" ou "upcoming"
  const now = new Date();
  const ongoingAnnouncements = announcements.filter(
    (announcement) =>
      new Date(announcement.startingDate) <= now && new Date(announcement.deadline) >= now
  );

  const pastAnnouncements = announcements.filter(
    (announcement) => new Date(announcement.deadline) < now
  );

  const upcomingAnnouncements = announcements.filter(
    (announcement) => new Date(announcement.startingDate) > now
  );

  /*Jury Selection */
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [status, setStatus] = useState({}); // Stocke le statut des candidatures

  const toggleJuryList = (candidateId) => {
    setSelectedCandidate(selectedCandidate === candidateId ? null : candidateId);
  };

  const handleDecision = (candidateId, decision) => {
    setStatus({ ...status, [candidateId]: decision });
  };

  return (
    <div className="container admin-dashboard mt-4">
      <h2 className="text-center mb-4">Tableau de bord Admin</h2>

      {/* Liste des annonces */}
      <div className="announcements-section">
      {/* Titre + Bouton pour ajouter une annonce */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Announcements</h3>
        <Link to="/admin/add-announcement" className="btn btn-primary">
          Create Announcement
        </Link>
      </div>

      {/* Boutons pour basculer entre les annonces */}
      <div className="btn-group mb-3">
        <button
          className={`btn ${activeTab === 'ongoing' ? 'btn-secondary' : 'btn-outline-secondary'}`}
          onClick={() => setActiveTab('ongoing')}
        >
          Ongoing Announcements
        </button>
        <button
          className={`btn ${activeTab === 'past' ? 'btn-secondary' : 'btn-outline-secondary'}`}
          onClick={() => setActiveTab('past')}
        >
          Past Announcements
        </button>
        <button
          className={`btn ${activeTab === 'upcoming' ? 'btn-secondary' : 'btn-outline-secondary'}`}
          onClick={() => setActiveTab('upcoming')}
        >
          Upcoming Announcements
        </button>
      </div>

    {
      isAnnouncementsLoading && <InlineLoading/>
    }
      {/* Liste des annonces (affichage en fonction du bouton actif) */}
      <div className="list-group">
        {activeTab === 'ongoing' &&
          ongoingAnnouncements.map((announcement) => (
            <Link
              key={announcement._id}
              to={`/view-announcement`}
              className="list-group-item list-group-item-action"
              state={{ announcement }}
            >
              <h5 className="mb-1">{announcement.title}</h5>
              <p className="mb-1 text-muted">Posted on: {announcement.startingDate}</p>
            </Link>
          ))}

        {activeTab === 'past' &&
          pastAnnouncements.map((announcement) => (
            <Link
              key={announcement._id}
              to={`/view-announcement`}
              className="list-group-item list-group-item-action"
              state={{ announcement }}
            >
              <h5 className="mb-1">{announcement.title}</h5>
              <p className="mb-1 text-muted">Expired on: {announcement.deadline}</p>
            </Link>
          ))}

        {activeTab === 'upcoming' &&
          upcomingAnnouncements.map((announcement) => (
            <Link
              key={announcement._id}
              to={`/view-announcement`}
              className="list-group-item list-group-item-action"
              state={{ announcement }}
            >
              <h5 className="mb-1">{announcement.title}</h5>
              <p className="mb-1 text-muted">Starts on: {announcement.startingDate}</p>
            </Link>
          ))}
      </div>
    </div>


      {/* Liste des candidatures */}
      <div className="applications-section">
        <h3 className="mb-3">Candidatures</h3>
        <ul className="list-group">
          {applications.map((application) => (
            <li key={application._id} className="list-group-item">
              <div>
                <strong>{application.candidateName}</strong> - {application.position}
              </div>

              <div className="jurors-selection mt-3">
                <button
                  className="btn btn-primary"
                  onClick={() => toggleJurySelection(application._id)}
                >
                  {viewJuries === application._id ? "Cacher les jurys" : "Voir les jurys"}
                </button>

                {viewJuries === application._id && (
                  <div className="mt-3">
                    <h5>Attribuer des jurys (5 jurys nécessaires)</h5>
                    <div className="list-group">
                      {jurors.map((juror) => (
                        <label key={juror._id} className="list-group-item d-flex align-items-center">
                          <input
                            type="checkbox"
                            value={juror._id}
                            onChange={() => handleSelectJuror(application._id, juror._id)}
                            checked={selectedJuries[application._id]?.includes(juror._id)}
                            className="me-2"
                          />
                          {juror.name}
                        </label>
                      ))}
                    </div>
                    <button
                      className="btn btn-success mt-3"
                      onClick={() => handleAssignJuries(application._id)}
                    >
                      Assigner les 5 jurys
                    </button>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>



      {/* Evaluations des Jurys */}

      <div className="candidates-section">
        <h3 className="mb-3">Candidate Evaluations</h3>
        <div className="list-group">
          {mockCandidates.map((candidate) => (
            <div key={candidate._id} className="candidate-item">
              <button
                className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center ${
                  status[candidate._id] === "Accepted" ? "bg-success text-white" :
                  status[candidate._id] === "Rejected" ? "bg-danger text-white" : ""
                }`}
                onClick={() => toggleJuryList(candidate._id)}
              >
                <span>{candidate.name}</span>
                <span className="badge bg-primary">{candidate.juries.length} Juries</span>
              </button>

              {/* Dropdown pour afficher les jurys */}
              {selectedCandidate === candidate._id && (
                <div className="jury-list mt-2">
                  {candidate.juries.map((jury) => (
                    <Link
                      key={jury.id}
                      to={`/jury-evaluation-details`}
                      className={`list-group-item list-group-item-action ms-3 jury-item ${
                        jury.status === "Accepted" ? "jury-accepted" : 
                        jury.status === "Rejected" ? "jury-rejected" : ""
                      }`}
                      state={{ evaluation:jury }} //state={{ evaluation:jury }}
                    >
                      {jury.juryName}
                    </Link>
                  ))}

                  {/* Boutons Accepter / Refuser */}
                  <div className="mt-3 d-flex gap-2">
                    <button
                      className="btn btn-success"
                      onClick={() => handleDecision(candidate._id, "Accepted")}
                    >
                      Accepter
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDecision(candidate._id, "Rejected")}
                    >
                      Refuser
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>



    </div>
  );
};

export default AdminPanel;
