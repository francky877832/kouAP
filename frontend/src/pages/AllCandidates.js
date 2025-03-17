import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Modal, Button, Form } from "react-bootstrap";


const AllCandidates = () => {
  const { state } = useLocation();
  const applications = state?.applications || [];

  ///
  const [show, setShow] = useState(false);
  const [jurorsCount, setJurorsCount] = useState(3);
  const [error, setError] = useState("");

  const handleClose = () => {
    setShow(false);
    setError("");
  };
  const handleShow = () => setShow(true);
  const handleConfirm = (applicationId) => {
    if (jurorsCount < 3 || jurorsCount > 7) {
      setError("Le nombre de jurés doit être entre 3 et 7.");
      return;
    }
    handleAssignJuries(applicationId, jurorsCount);
    handleClose();
  };



const handleAssignJuries = (applicationId) => {

    console.log('Assignation des jurés pour la candidature ID:', applicationId);
  };
  
  const handleDecision = (candidateId, decision) => {
    
  };
  return (
    <div className="applications-section container mt-4">
      <h3 className="text-center mb-4">All Applications</h3>
     
      <ul className="list-group">
      { applications.length > 0 ?
          applications.slice(0, 5).map((application) => (
            <li key={application._id} className="list-group-item">
              <div>
                <strong>{application.candidateName}</strong> - {application.position}
              </div>

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
            </li>
          ))
    
          
         : (
          <li className="list-group-item text-center">
            Aucune candidature trouvée.
          </li>
        )}
      </ul>
    </div>
  );
};


export default AllCandidates;
