import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Loading from '../components/Loading';
import { AdminContext } from '../context/AdminContext';
import InlineLoading from '../components/InlineLoading';
import { formatDate } from '../utils/utilsFunctions';
import AnnouncementItem from '../components/AnnouncementItem';


const AllAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true)
  const { fetchAnnouncements } = useContext(AdminContext)
  const [page, setPage] = useState(1);
  const limit = 10

  const announcementsPerPage = 5; // Nombre d'annonces par page
  const navigate = useNavigate(); // Utiliser useNavigate

  useEffect(() => {
      const getAnnouncements = async () => {
        const data = await fetchAnnouncements(currentPage, limit);
        setAnnouncements(data.data);
        setTotalPages(data.totalPages);
        setIsLoading(false)
      };
      getAnnouncements();
  }, [currentPage, page]);


  // Fonction pour gérer la navigation vers une annonce spécifique
  const handleAnnouncementClick = (announcementId) => {
    navigate(`/announcement/${announcementId}`); // Utiliser navigate pour rediriger
  };

  // Gérer les changements de page
  const handlePageChange = (page) => {
    setIsLoading(true)
    setCurrentPage(page);
  };

  return (
    

      
    <div className="container mt-5">
      <h2 className="text-center mb-4">All Announcements</h2>

      {isLoading ? <InlineLoading/> : 
          <div className="list-group">
            {announcements.slice(0, 5).map((announcement) => (
                <AnnouncementItem key={announcement._id} announcement={announcement} formatDate={formatDate} />
            ))}
          </div>
        }

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
