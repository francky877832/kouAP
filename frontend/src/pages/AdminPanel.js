import React, { useState, useEffect, useContext } from 'react';
import { Modal, Button, Form } from "react-bootstrap";

import { mockAnnouncements, mockApplications, mockJuries } from '../datas/mockData';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/adminPanelStyles.css'

import { mockCandidates as evaluations } from '../datas/mockData'; 
import { UserContext } from '../context/UserContext';
import InlineLoading from '../components/InlineLoading';
import { AdminContext } from '../context/AdminContext';
import { capitalize, formatDate } from '../utils/utilsFunctions';
import ApplicaitonsView from '../components/ApplicationsView';
import EvaluationsView from '../components/EvaluationsView';
import NotificationIcon from '../components/NotificationIcon';

const AdminPanel = () => {
  const limit1 = 0, limit2=3
  const navigate = useNavigate()
  const [applications, setApplications] = useState([]);
  const [evaluations, setEvaluations] = useState([]);
  

  const [isApplicationsLoading, setIsApplicationsLoading] = useState(true)
  const [isEvaluationsLoading, setIsEvaluationsLoading] = useState(true)

  const {fetchAnnouncementsByUser, announcements, isAnnouncementsLoading, fetchApplications, updateApplicationStatus, assignApplicaitonJurys,
    fetchAdminEvaluations,
  } = useContext(AdminContext)
  const { user } = useContext(UserContext)

//
  



  useEffect(() => {
    //setApplications(mockApplications);
    //setJurors(mockJuries);
    const fetchApp = async () => {
      setIsApplicationsLoading(true)
        const apps = await fetchApplications()
        setApplications(apps)
      setIsApplicationsLoading(false)
    }
    if(isApplicationsLoading)
    {
      fetchApp()
    }
  }, [isApplicationsLoading]);

  useEffect(() => {
    //setApplications(mockApplications);
    //setJurors(mockJuries);
    const fetchEv = async () => {
      setIsApplicationsLoading(true)
        const evs = await fetchAdminEvaluations(user)
        setEvaluations(evs)
        setIsEvaluationsLoading(false)
    }
    if(isEvaluationsLoading)
    {
      fetchEv()
    }
  }, [isEvaluationsLoading]);


  



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
    
  const [status, setStatus] = useState({});



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
      <div style={{ position: 'absolute', top: '20px', left: '10px' }}>
        <NotificationIcon />
      </div>

      <h2 className="text-center mb-4">Admin Panel</h2>

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
              [...ongoingAnnouncements.slice(limit1, limit2)].map((announcement) => (
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
              [...pastAnnouncements.slice(limit1, limit2)].map((announcement) => (
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
              [...upcomingAnnouncements.slice(limit1, limit2)].map((announcement) => (
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
          
          {/* Applicaitons */}
        <div>
            <ApplicaitonsView isApplicationsLoading={isApplicationsLoading}
            setIsApplicationsLoading={setIsApplicationsLoading}
                applications_={applications}
                limit1={limit1} limit2={limit2}
            />
            <div className="text-center mt-4">
        {applications.length > 0 &&
          <Link
              to={`view-applications`}
              className="list-group-item list-group-item-action"
              state={{ applications}}
            >
              <button className="btn btn-primary">
                All Candidatures
              </button>
            </Link>
        }
        </div>

        </div>
     
      {/* Evaluations des Jurys */}
      <EvaluationsView isEvaluationsLoading={isEvaluationsLoading}
      setIsEvaluationsLoading={setIsEvaluationsLoading}
      evaluation_={evaluations}
      liit1={limit1} limit2={limit2}
      />

      <div className="text-center mt-4">
         {evaluations.length > 0 &&
         <div className='contianer d-flex'>
            <Link
              to={`view-evaluations`}
              className="list-group-item list-group-item-action"
              state={{ evaluations : evaluations.filter(ev => !['accepted', 'rejected'].includes(ev.application.status)) }}
            >
              <button className="btn btn-primary">
                More Ongoing Evaluationss
              </button>
            </Link>


            <Link
              to={`view-evaluations`}
              className="list-group-item list-group-item-action"
              state={{ evaluations : evaluations.filter(ev => ['accepted', 'rejected'].includes(ev.application.status)) }}
            >
              <button className="btn btn-primary">
                Passed Evaluationss
              </button>
            </Link>
        </div>
        }
      </div>
    
      
    </div>
  );
};

export default AdminPanel;
