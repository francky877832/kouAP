import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";  // Import de useLocation pour récupérer l'état

import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/viewAnnouncement.css"; 
import Loading from "../components/Loading";
import NotFound from "../components/NotFound";

const ViewAnnouncement = ({ match }) => {

  const location = useLocation();
  const { announcement } = location.state || {}; 
  const [isLoading, setIsLoading] = useState(false)

  if (!announcement) {
    return <NotFound/>;
  }

  return (
    isLoading ? <Loading/> : 
    <div className="single-announcement-container">
      <div className="container mt-5 ">
        <div className="card shadow-lg p-4">
          <h2 className="text-center">{announcement.title}</h2>
          <p className="text-center text-muted">Posted on {announcement.date}</p>
          <hr />

          <div className="row mt-4">
            <div className="col-lg-8">
              <p className="lead">{announcement.description}</p>
            </div>

            <div className="d-flex justify-content-between align-items-center">

              <div className="col-lg-4">
                <Link
                  key={announcement._id}
                  to={`/admin/add-announcement`}
                  className="btn btn-warning btn-lg w-100"
                  state={{ announcement }}
                >
                  Modify Announcement
                </Link>
              </div>

              <div className="col-lg-4">
                <div className="d-flex flex-column align-items-start">
                  <button className="btn btn-success btn-lg w-100" onClick={() => window.location.href = '/apply'}>
                    Apply Now
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAnnouncement;
