import React, { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Modal, Form } from "react-bootstrap";
import '../styles/adminPanelStyles.css';
import InlineLoading from '../components/InlineLoading';
import { capitalize, formatDate } from '../utils/utilsFunctions';
import { UserContext } from '../context/UserContext';
import { AdminContext } from '../context/AdminContext';
import Loading from './Loading';

const ApplicaitonsView = ({
  isApplicationsLoading, setIsApplicationsLoading, applications_,
  limit1, limit2,
}) => {

    const [show, setShow] = useState(false);
     const [jurorsCount, setJurorsCount] = useState(3);
     const [error, setError] = useState("");
     const { user } = useContext(UserContext)
     const { assignApplicaitonJurys } = useContext(AdminContext)
     const [isLoading, setIsLoading] = useState(false)
   
     const handleClose = () => {
       setShow(false);
       setError("");
     };
     const handleShow = () => setShow(true);

     
  const handleConfirm = (application) => {
    if (jurorsCount < 3 || jurorsCount > 7) {
      setError("Le nombre de jurés doit être entre 3 et 7.");
      return;
    }

    const handleAssignJuries = async (application, juryCounts, admin) => {
        setIsLoading(true)
            const data = await assignApplicaitonJurys(application, juryCounts, admin)
         //useEffect va rechager automatiquement et refermer le loading
        state?.applications ? setIsLoading(false) : setIsApplicationsLoading(true)
      if(data)
      {
        alert(`${juryCounts} jurys ont été assignés à la candidature de ${application.user.name}`);
      }
    };

    handleAssignJuries(application, jurorsCount, user);
    handleClose();
  };
    

  const { state } = useLocation();
  const applications = state?.applications || applications_;

  if(isLoading)
  {
    return <Loading/>
  }

  return (
    <div className="applications-section container d-flex flex-column ">
      <h3 className="mb-3 text-center">Applications</h3>
      <ul className="list-group w-100" >
        {(isLoading||isApplicationsLoading) && <InlineLoading />}

        {applications.slice(limit1, limit2).map((application) => (
          <li key={application._id} className="list-group-item ">
            <div>
              <strong>{application.user.name}</strong>
              <br />
              <i>submitted on : {formatDate(application.submittedOn)}</i>
            </div>

            <div className="jurors-selection mt-3">
              <Button variant="primary" onClick={handleShow}>
                Assign Jurors
              </Button>

              <Modal show={show} onHide={handleClose} centered>
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
                  <Button variant="primary" onClick={() => handleConfirm(application)}>
                    Confirmer
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </li>
        ))}
        {applications.length ===0 && <div>There's not applicaitonsyet to display.</div>}
      </ul>
    </div>
  );
}

export default ApplicaitonsView;
