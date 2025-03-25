import React, { useContext, useEffect, useState } from "react";
import { Table, Button, Badge, Container, Modal } from "react-bootstrap";
import { FaTrashAlt, FaEye } from "react-icons/fa"; // Icons for Delete and View
import { UserContext } from "../context/UserContext";
import Loading from "../components/Loading";
import { NotificationsContext } from "../context/NotificationsContext";
import { formatDate } from "../utils/utilsFunctions";
import NotificationIcon from "../components/NotificationIcon";
import UserMenu from "./UserMenu";

const Notifications = () => {
  const { fetchNotifications, updateNotificationsRead, updateNotification, deleteNotification} = useContext(NotificationsContext);
  const { user, isAuthenticated } = useContext(UserContext);

  const [notifications, setNotifications] = useState([]);
  const [totalData, setTotalData] = useState(null);
  const [isNotificationsLoading, setIsNotificationsLoading] = useState(true);

  
  // Pagination states
  const [page, setPage] = useState(1); // Current page
  const [limit, setLimit] = useState(5); // Limit of notifications per page

  useEffect(() => {
    const fetchNotificationsEffect = async () => {
      setIsNotificationsLoading(true);
      const notif = await fetchNotifications(user, page, limit);
      //console.log(notif.notifications)
      setTotalData(notif.totalNotifications)
      setNotifications(notif.notifications);

      setIsNotificationsLoading(false);
    };

    if(isNotificationsLoading)
    {
      fetchNotificationsEffect();
    }
  }, [isNotificationsLoading, page, limit, user]);

  const [showModal, setShowModal] = useState(false);
  const [currentNotification, setCurrentNotification] = useState(null);

  const markAsRead = async (notif) => {
    const data = await updateNotification(user, notif)
    if(!data)
    {
      alert("Error while updating the message status!")
      return;
    }

    setIsNotificationsLoading(true) //relancer useEffect
    setShowModal(false); // Close the modal after marking as read
  };

const deleteUserNotification = async (notif) => {
  console.log(notif)
    const isConfirmed = window.confirm("Voulez-vous vraiment supprimer cette notification ?");
    
    if (!isConfirmed) return;
  
    const data = await deleteNotification(user, notif);
    
    if (!data) {
      alert("Erreur lors de la suppression de la notification !");
      return;
    }
  
    setIsNotificationsLoading(true); // Relancer useEffect
  };
  

  const showNotificationDetails = (notif) => {
    setCurrentNotification(notif);
    setShowModal(true);
  };

  // Pagination handlers
  const handleNextPage = () => {
    setPage(page + 1); // Go to next page
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1); // Go to previous page
    }
  };

  if (isNotificationsLoading) {
    return <Loading />;
  }

  return (
    <Container className="mt-4">
            <UserMenu user={user} isAuthenticated={isAuthenticated} />

      <h3>📢 Notifications</h3>
      {(!notifications || notifications?.length === 0) ? (
        <p>No notifications available.</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Source</th>
              <th>Title</th>
              <th>Message</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {notifications?.map((notif) => (
            
              <tr key={notif._id} style={notif.read==0 ? {fontWeight:"bold", color:"red", } : {}}>
                <td>{notif.source}</td>
                <td>{notif.title}</td>
                <td>
                  {notif?.message?.slice(0, 20)}
                  {notif?.message?.length > 20 ? "..." : ""}
                </td>
                <td>{formatDate(notif.createdAt)}</td>
                <td>
                  {notif.read === 0 ? (
                    <Badge bg="danger">Unread</Badge>
                  ) : (
                    <Badge bg="success">Read</Badge>
                  )}
                </td>
                <td className="d-flex">
                  {notif.read === 0 && (
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => showNotificationDetails(notif)}
                      className="me-2"
                    >
                      <FaEye />
                    </Button>
                  )}
                  {notifications.length > 20 && (
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => deleteUserNotification(notif)}
                    >
                      <FaTrashAlt />
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Pagination controls */}
      <div className="d-flex justify-content-between">
        <Button
          variant="secondary"
          onClick={handlePrevPage}
          disabled={page === 1}
        >
          Previous
        </Button>
        <Button
          variant="secondary"
          onClick={handleNextPage}
        >
          Next
        </Button>
      </div>

      {/* Modal for showing full notification details */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{currentNotification?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>Source:</strong> {currentNotification?.source}</p>
          <p><strong>Title:</strong> {currentNotification?.title}</p>
          <p><strong>Message:</strong> {currentNotification?.message}</p>
          <p><strong>Created At:</strong> {new Date(currentNotification?.createdAt).toLocaleString()}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={() => markAsRead(currentNotification)}>
            Mark as Read
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Notifications;
