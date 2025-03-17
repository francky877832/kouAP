import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import Loading from '../components/Loading';
import NotFound from '../components/NotFound';
import { AdminContext } from '../context/AdminContext';
import InlineLoading from '../components/InlineLoading';
import { formatDate } from '../utils/utilsFunctions';
import AnnouncementItem from '../components/AnnouncementItem';
import { titles } from '../datas/schoolDepartments';
import { UserContext } from '../context/UserContext';

const AllAnnouncements = () => {
  const location = useLocation();
  const dataReceived = location?.state?.announcements
  const { user } = useContext(UserContext)
  const [announcements, setAnnouncements] = useState([]);
  const [filteredAnnouncements, setFilteredAnnouncements] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const { fetchAnnouncements } = useContext(AdminContext);
  const [selectedPosition, setSelectedPosition] = useState(''); // État pour la position sélectionnée
  const [page, setPage] = useState(1);
  const limit = 10;

  const announcementsPerPage = 5; // Nombre d'annonces par page
  const navigate = useNavigate(); // Utiliser useNavigate

  useEffect(() => {
    const getAnnouncements = async () => {
      const data = await fetchAnnouncements(currentPage, limit);
      setAnnouncements(data.data || []);
      setTotalPages(data.totalPages);
      setIsLoading(false);
    };
    if(dataReceived)
    {
      setAnnouncements(dataReceived);
       setIsLoading(false);
    }
    else
    {
      getAnnouncements();
    }
  }, [currentPage, page]);

  // Fonction pour gérer la navigation vers une annonce spécifique
  const handleAnnouncementClick = (announcementId) => {
    navigate(`/announcement/${announcementId}`); // Utiliser navigate pour rediriger
  };

  // Gérer les changements de page
  const handlePageChange = (page) => {
    setIsLoading(true);
    setCurrentPage(page);
  };

  useEffect(() => {
    const fA = selectedPosition
    ? announcements.filter((announcement) => parseInt(announcement.position) === parseInt(selectedPosition))
    : announcements;
    //console.log(announcements)
    setFilteredAnnouncements(fA)
  }, [selectedPosition])
  // Filtrer les annonces en fonction de la position sélectionnée


  if (isLoading) {
    return <Loading />;
  }
  if (!isLoading && announcements?.length === 0) {
    return <NotFound />;
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">All Announcements</h2>

      {/* Buttons for Position */}
      <div className="d-flex justify-content-center mb-4">
        {
          titles.map((title, index) => (
            <button
            className="btn btn-primary mx-2"
            onClick={() => setSelectedPosition(index+1)}
          >
          { title.label }
          </button>
          ))
        }

          <button
            className="btn btn-secondary mx-2"
            onClick={() => setSelectedPosition(null)}
          >
          Show All
        </button>
       
      </div>

      {isLoading ? (
        <InlineLoading />
      ) : (
        <div className="list-group">
          {(selectedPosition?filteredAnnouncements : announcements).map((announcement) => (
            <AnnouncementItem
              key={announcement._id}
              announcement={announcement}
              user={user}
              formatDate={formatDate}
            />
          ))}
        </div>
      )}

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
