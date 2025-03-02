import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Loading from '../components/Loading';

const AllAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false)

  const announcementsPerPage = 5; // Nombre d'annonces par page
  const navigate = useNavigate(); // Utiliser useNavigate

  useEffect(() => {
    // Fetch les annonces de la page actuelle
    const fetchAnnouncements = async () => {
      try {
        /*const response = await fetch(
          `/api/announcements?page=${currentPage}&limit=${announcementsPerPage}`
        );
        const data = await response.json();*/

        const data = { announcements : [
            {_id: 1, title: "Assistant Professor in Computer Science", date: "2025-02-01" },
            {_id: 2, title: "Associate Professor in Mechanical Engineering", date: "2025-02-05" },
            {_id: 3, title: "Professor in Physics", date: "2025-02-08" },
            {_id: 4, title: "Assistant Professor in Electrical Engineering", date: "2025-02-10" },
            {_id: 5, title: "Associate Professor in Mathematics", date: "2025-02-15" },
            {_id: 6, title: "Professor in Chemistry", date: "2025-02-18" },
            {_id: 6, title: "Professor in Chemistry", date: "2025-02-18" },
            {_id: 6, title: "Professor in Chemistry", date: "2025-02-18" },
            {_id: 6, title: "Professor in Chemistry", date: "2025-02-18" },
            {_id: 6, title: "Professor in Chemistry", date: "2025-02-18" },
            {_id: 6, title: "Professor in Chemistry", date: "2025-02-18" },
            {_id: 6, title: "Professor in Chemistry", date: "2025-02-18" },
          ],
          total : 12, 
        }

        setAnnouncements(data.announcements);
        setTotalPages(Math.ceil(data.total / announcementsPerPage)); // Calcul du nombre total de pages
      } catch (error) {
        console.error('Error fetching announcements:', error);
      }
    };

   

    fetchAnnouncements();
  }, [currentPage]);

  // Fonction pour gérer la navigation vers une annonce spécifique
  const handleAnnouncementClick = (announcementId) => {
    navigate(`/announcement/${announcementId}`); // Utiliser navigate pour rediriger
  };

  // Gérer les changements de page
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    
        isLoading ? <Loading/> : 
      
    <div className="container mt-5">
      <h2 className="text-center mb-4">All Announcements</h2>

      <div className="list-group">
        {announcements.map((announcement) => (
          <Link
          key={announcement._id}
          to={`/view-announcement`} 
          className="list-group-item list-group-item-action"
          state={{ announcement }}
        >
            <h5 className="mb-1">{announcement.title}</h5>
            <p className="mb-1 text-muted">Posted on: {announcement.date}</p>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      <div className="d-flex justify-content-center mt-4">
        <button
          className="btn btn-secondary"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </button>

        <span className="mx-3">
          Page {currentPage} of {totalPages}
        </span>

        <button
          className="btn btn-secondary"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
     
    </div>
  );
};

export default AllAnnouncements;
