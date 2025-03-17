import React, { useState, useEffect, useContext } from 'react';
import { Modal, Button, Form } from "react-bootstrap";

import { mockAnnouncements, mockApplications, mockJuries } from '../datas/mockData';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/adminPanelStyles.css'

import { mockCandidates } from '../datas/mockData'; 
import { UserContext } from '../context/UserContext';
import InlineLoading from '../components/InlineLoading';
import { AdminContext } from '../context/AdminContext';
import { capitalize } from '../utils/utilsFunctions';

const AdminPanel = () => {
  const navigate = useNavigate()
  const [applications, setApplications] = useState(mockApplications);
  const [jurors, setJurors] = useState(mockJuries);
  const [selectedJuries, setSelectedJuries] = useState({});
  const [viewJuries, setViewJuries] = useState(null);
  const [isApplicationsLoading, setIsApplicationsLoading] = useState(true)

  const {fetchAnnouncementsByUser, announcements, isAnnouncementsLoading} = useContext(AdminContext)

//
  const [show, setShow] = useState(false);
  const [jurorsCount, setJurorsCount] = useState(3);
  const [error, setError] = useState("");

  const handleClose = () => {
    setShow(false);
    setError("");
  };
  const handleShow = () => setShow(true);



  useEffect(() => {
    setApplications(mockApplications);
    setJurors(mockJuries);
  }, []);

  const handleAssignJuries = (applicationId) => {
    const randomJurors = [];
    while (randomJurors.length < 5) {
      const randomIndex = Math.floor(Math.random() * jurors.length);
      const randomJuror = jurors[randomIndex];
      if (!randomJurors.includes(randomJuror)) {
        randomJurors.push(randomJuror);
      }
    }
    setSelectedJuries(prevState => ({
      ...prevState,
      [applicationId]: randomJurors,
    }));
    alert(`5 jurys ont été assignés à la candidature ${applicationId}`);
  };

  const handleDecision = (candidateId, decision) => {
    alert("f")
    setStatus({ ...status, [candidateId]: decision });
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
    
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [status, setStatus] = useState({});

  const toggleJuryList = (candidateId) => {
    setSelectedCandidate(selectedCandidate === candidateId ? null : candidateId);
  };

  const handleConfirm = (applicationId) => {
    if (jurorsCount < 3 || jurorsCount > 7) {
      setError("Le nombre de jurés doit être entre 3 et 7.");
      return;
    }
    handleAssignJuries(applicationId, jurorsCount);
    handleClose();
  };

  const viewMoreAnnouncements = () => {
    let data = []
    switch(activeTab)
    {
      case 'ongoing' :
        data = ongoingAnnouncements
        break;
      case 'past' : 
      data = pastAnnouncements
      break;
      case 'upcoming' :
        data = upcomingAnnouncements
        break;
      default : 
        data = ongoingAnnouncements
        break;
    }
    navigate('/all-announcements', {state:{announcements:data}})
  }

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
              [...ongoingAnnouncements.slice(0,5)].map((announcement) => (
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
              [...pastAnnouncements.slice(0,5)].map((announcement) => (
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
              [...upcomingAnnouncements.slice(0,5)].map((announcement) => (
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

              {/* Bouton "View All My Announcements" */}
      <div className="text-center mt-4">
          <button
              className="btn btn-primary"
              onClick={() => viewMoreAnnouncements()}
            >
              More {capitalize(activeTab)} Announcements
            </button>
      </div>

          </div>
          </div>

      {/* Liste des candidatures */}
      <div className="applications-section">
        <h3 className="mb-3">Candidatures</h3>
        <ul className="list-group">
          {applications.slice(0, 5).map((application) => (
            <li key={application._id} className="list-group-item">
              <div>
                <strong>{application.candidateName}</strong> - {application.position}
            </div>
 {
              <div className="jurors-selection mt-3">
               <Button variant="primary" onClick={handleShow}>
                  Assign Jurors
                </Button>

                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Assigner des Jurés</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form>
                      <Form.Group>
                        <Form.Label>Nombre de jurés (entre 3 et 7)</Form.Label>
                        <Form.Control
                          type="number"
                          value={jurorsCount}
                          onChange={(e) => setJurorsCount(Number(e.target.value))}
                          min="3"
                          max="7"
                        />
                        {error && <p className="text-danger mt-2">{error}</p>}
                      </Form.Group>
                    </Form>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Annuler
                    </Button>
                    <Button variant="primary" onClick={() => handleConfirm(application._id)}>
                      Confirmer
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>
       }
            </li>
          ))}
        </ul>

        <div className="text-center mt-4">
      
            <Link
                  to={`view-candidates`}
                  className="list-group-item list-group-item-action"
                  state={{ applications}}
                >
                  <button className="btn btn-primary">
                    All Candidatures
                  </button>
                </Link>
      </div>

      </div>

      {/* Evaluations des Jurys */}
      <div className="candidates-section">
        <h3 className="mb-3">Candidate Evaluations</h3>
        <div className="list-group">
          {mockCandidates.slice(0, 5).map((candidate) => (
            <div key={candidate._id} className="candidate-item">
              <button
                className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center ${
                  status[candidate._id]?.toLocaleLowerCase() === "accepted" ? "bg-success text-white" :
                  status[candidate._id]?.toLocaleLowerCase() === "rejected" ? "bg-danger text-white" :
                  status[candidate._id]?.toLocaleLowerCase() === "processing" ? "bg-warning text-white" : ""
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
                    jury.status.toLocaleLowerCase() === "processing" ?
                      <span className="list-group-item ms-3 jury-item jury-processing">
                        {jury.juryName}
                      </span>
                    :
                    
                    <Link
                      key={jury.id}
                      to={`/jury-evaluation-details`}
                      className={`list-group-item list-group-item-action ms-3 jury-item ${
                        jury.status.toLocaleLowerCase() === "accepted" ? "jury-accepted" : 
                        jury.status.toLocaleLowerCase()=== "rejected" ? "jury-rejected" : 
                        jury.status.toLocaleLowerCase() === "processing" ? "jury-processing" : ""
                        
                      }`}
                      state={{ evaluation:jury }} 
                      disabled
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

        <div className="text-center mt-4">
            <Link
                  to={`view-evaluations`}
                  className="list-group-item list-group-item-action"
                  state={{ evaluations : mockCandidates }}
                >
                  <button className="btn btn-primary">
                    All Evaluationss
                  </button>
                </Link>
      </div>

      </div>

      
    </div>
  );
};

export default AdminPanel;
