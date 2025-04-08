import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { JuryContext } from '../context/JuryContext';
import { UserContext } from '../context/UserContext';
import Loading from '../components/Loading';
import { capitalize, formatDate } from '../utils/utilsFunctions';
import NotificationIcon from '../components/NotificationIcon';
import UserMenu from './UserMenu';
import EmptyPage from '../components/EmptyPage';

const JuryPanel = () => {
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [filter, setFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { fetchJuryApplications } = useContext(JuryContext);
  const { user, isAuthenticated } = useContext(UserContext);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setIsLoading(true);
        const data = await fetchJuryApplications(user._id);
        setApplications(data);
        setFilteredApplications(data);
      } catch (err) {
        setError(err.message);
        alert(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (user._id) {
      fetchApplications();
    }
  }, [user, fetchJuryApplications]);

  useEffect(() => {
    if (filter === "all") {
      setFilteredApplications(applications);
    } else if (filter === "processing") {
      setFilteredApplications(applications.filter(app => app.status === "processing"));
    } else {
      setFilteredApplications(applications.filter(app => app.status === "accepted" || app.status === "rejected"));
    }
  }, [filter, applications]);

  const handleSelectApplication = (application) => {
    navigate('/application-details', { state: { candidate: application, a:application } });
  };

  if (isLoading) {
    return <Loading />;
  }
  /*
  if(!isLoading && filteredApplications?.length===0)
  {
    return <EmptyPage/>
  }*/

  return (
    <div className="container mt-5">
      {/* Notification Icon added at the top-left */}
      <div style={{ position: 'absolute', top: '20px', left: '10px' }}>
        <NotificationIcon />
      </div>

      <UserMenu user={user} isAuthenticated={isAuthenticated} />


      <h2 className="text-center mb-4">Jury Panel</h2>
      <h4 className="text-center mb-4">Select an application to review:</h4>
      
      {/* Boutons de filtrage */}
      <div className="d-flex justify-content-center mb-3">
        <button className={`btn btn-primary mx-2 ${filter === "processing" ? "active" : ""}`} onClick={() => setFilter("processing")}>
         Ongoing
        </button>
        <button className={`btn btn-success mx-2 ${filter === "completed" ? "active" : ""}`} onClick={() => setFilter("completed")}>
          Ended
        </button>
        <button className={`btn btn-secondary mx-2 ${filter === "all" ? "active" : ""}`} onClick={() => setFilter("all")}>
          All
        </button>
      </div>

      {/* Tableau des applications */}
      {filteredApplications.length > 0 ? (
        <table className="table table-bordered table-striped text-center">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>TC ID</th>
              <th>Apply On</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredApplications.map((application) => (
              <tr key={application._id}>
                <td>{application?.user?.name}</td>
                <td>{application?.user?.email}</td>
                <td>{application?.user?.phoneNumber}</td>
                <td>{application?.user?.tcID}</td>
                <td>{formatDate(application.submittedOn)}</td>
                <td>
                  <button
                    className={`btn ${
                      application.status === "processing"
                        ? "btn-primary"
                        : application.status.toLowerCase() === "approved"
                        ? "btn-success"
                        : "btn-danger"
                    }`}
                    onClick={() => handleSelectApplication(application)}
                  >
                    {application.status === "pending" ? "Review" : capitalize(application.status)}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        /*<p className="text-center mt-3">No applications yet to display for this category.</p> */
       <EmptyPage/>
      )}
    </div>
  );
};

export default JuryPanel;