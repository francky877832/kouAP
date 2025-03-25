import React, { useContext, useEffect, useState } from "react";
import { Card, Spinner, Modal, Button, Form } from "react-bootstrap";
import { UserContext } from "../context/UserContext";
import Loading from "../components/Loading";
import { titles } from "../datas/schoolDepartments";
import { ManagerContext } from "../context/ManagerContext";
import UserMenu from "./UserMenu";



const MinPoints = () => {
  const { user, isAuthenticated , minPoints, facultyDepartments, facultyGroups, isFacultyLoading, isMinPointsLoading, setIsMinPointsLoading } = useContext(UserContext);
  const { updateMinPoint, deleteMinPoint, } = useContext(ManagerContext)
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [editedGroups, setEditedGroups] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    letter: selectedPoint?.letter || "A", // Par défaut "A"
    from: selectedPoint?.from || "",
    to: selectedPoint?.to || "",
    range: selectedPoint?.range || false,
    criteria: selectedPoint?.criteria || "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };
 

  useEffect(() => {
    
  }, []);

  const handleDeletePoint = async (index) => {
    const isConfirmed = window.confirm("Êtes-vous sûr de vouloir supprimer cette activité ?");
    
    if (isConfirmed) {
      await deleteMinPoint(minPoints[index]._id)
    }
  };
  
  const handleModifyGroup = (index, field, value) => {
    const updatedGroups = [...editedGroups];
    updatedGroups[index] = { ...updatedGroups[index], [field]: value };
    //console.log(field, value)
    console.log(updatedGroups)
    setEditedGroups(updatedGroups);
  };

  const handleModalOpen = (point) => {
    setSelectedPoint(point);
    setEditedGroups(point.groups.map(group => ({ ...group, faculty:group.faculty._id })));
    setFormData({
      letter: point?.letter || "A", // Par défaut "A"
      from: point?.from || "",
      to: point?.to || "",
      range: point?.range || false,
      criteria: point?.criteria || "",
  })
    setIsEditing(false);
  };

  const handleModalClose = () => {
    setSelectedPoint(null);
    setEditedGroups([]);
    setIsEditing(false);
  };

  const handleSaveChanges = async () => {
    //console.log(editedGroups)
    const currentPoint =minPoints.find(act => act._id == selectedPoint._id)
    const updatedPoint = {...currentPoint, 
      letter: formData?.letter || currentPoint?.letter,
      from: formData?.from || currentPoint?.from,
      to: formData?.to || currentPoint?.to,
      range: formData?.range || currentPoint?.range,
      criteria: formData?.criteria || currentPoint?.criteria,
      groups : editedGroups}
    //database
    //console.log(updatedPoint)
    await updateMinPoint(updatedPoint)
    setIsMinPointsLoading(true)
    setIsEditing(false);
    handleModalClose()
  };

  if(isFacultyLoading || isMinPointsLoading)
  {
    return <Loading/>
  }
  //console.log(minPoints)

  return (
    <div className="container mt-4">
            <UserMenu user={user} isAuthenticated={isAuthenticated} />

      {
        minPoints.map((point, index) => (
          <Card key={index} className="mb-3">
            <Card.Body onClick={() => handleModalOpen(point)} style={{ cursor: "pointer" }}>
              <Card.Title>{point.letter || point.criteria }</Card.Title>
              <Card.Text className="d-flex justify-content-around">
                <div>
                  <strong>Letter:</strong> {point.letter || point.criteria} <br />
                </div>
                <div>
                  <strong>Range:</strong> {point.range ? `${point.letter} ${point.from} - ${point.letter}${point.to}` : "No"} <br/>
                </div>
                <div>
                  <strong>Criteria:</strong> {point?.range ? "N/A" : selectedPoint?.criteria}
                </div>
              </Card.Text>
            </Card.Body>
            {user.role=="manager" &&
              <div className="d-flex justify-content-center">
                <Button variant="danger" onClick={() => handleDeletePoint(index)} className="m-2">
                  Delete
                </Button>  
            </div>
          }
          </Card>

        ))
      }

      <Modal show={!!selectedPoint} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedPoint?.letter || selectedPoint?.criteria  }</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!isEditing ? (
            <>
              <p><strong>Letter:</strong> {selectedPoint?.letter}</p>
              <p><strong>Range:</strong> {selectedPoint?.range ? `${selectedPoint.letter} ${selectedPoint.from} - ${selectedPoint.letter} ${selectedPoint.to}` : "No"}</p>
              <p><strong>Criteria:</strong> {selectedPoint?.range ? "N/A" : selectedPoint?.criteria}</p>
              <p><strong>Created At:</strong> {new Date(selectedPoint?.createdAt).toLocaleDateString()}</p>
              <h5>Groups:</h5>
              {selectedPoint?.groups.map((group, i) => (
                <div key={i}>
                  <p><strong>Faculties:</strong> {group.faculty?.faculties?.map(f => (f.name+", "))} </p>
                  <ul>
                    {group.positions.map((pos, j) => (
                      <li key={j}><b>Position : </b> {(titles[pos.position-1].label)} - <b>Points : </b> {pos.minPoint} - {pos.maxPoint} </li>
                    ))}
                  </ul>
                </div>
              ))}
            </>
          ) : (
            <>

 {/* Range (Checkbox) */}
                  <Form.Group className="mb-3">
                    <Form.Check
                      type="checkbox"
                      label="Has Range"
                      name="range"
                      checked={formData.range}
                      onChange={handleChange}
                    />
                  </Form.Group>


                  {/* Letter (Sélection A - L) */}
               {formData.range && 
               <Form.Group className="mb-3">
                    <Form.Label>Letter</Form.Label>
                    <Form.Select name="letter" value={formData.letter} onChange={handleChange} required>
                      {Array.from({ length: 12 }, (_, i) => String.fromCharCode(65 + i)).map((letter) => (
                        <option key={letter} value={letter}>
                          {letter}
                        </option>
                      ))}
                    </Form.Select>
                </Form.Group>
            }
                  {/* From & To (Affichés seulement si Range est activé) */}
                  {formData.range && (
                    <>
                      <Form.Group className="mb-3">
                        <Form.Label>From</Form.Label>
                        <Form.Control
                          type="number"
                          name="from"
                          value={formData.from}
                          onChange={handleChange}
                          required={formData.range}
                        />
                      </Form.Group>
            
                      <Form.Group className="mb-3">
                        <Form.Label>To</Form.Label>
                        <Form.Control
                          type="number"
                          name="to"
                          value={formData.to}
                          onChange={handleChange}
                          required={formData.range}
                        />
                      </Form.Group>
                    </>
                  )}
            
                  {/* Criteria (Désactivé si Range est activé) */}
                  <Form.Group className="mb-3">
                    <Form.Label>Criteria</Form.Label>
                    <Form.Control
                      type="text"
                      name="criteria"
                      value={formData.criteria}
                      onChange={handleChange}
                      disabled={formData.range}
                      required={!formData.range}
                    />
                  </Form.Group>
      
              <h5>Edit Groups</h5>
              {editedGroups.map((group, i) => (
                <div key={i} className="mb-3">
                  <Form.Label>Faculty:</Form.Label>
                  <Form.Select
                    value={group.faculty}
                    onChange={(e) => handleModifyGroup(i, "faculty", e.target.value)}
                  >
                    {facultyGroups.map((fac) => (
                      <option key={fac._id} value={fac._id}>
                        {fac.faculties.map(f => f.name).join(", ")}
                      </option>
                    ))}
                  </Form.Select>

                  <ul>
                    {group.positions.map((pos, j) => (
                      <li key={j}>
                        <b>{titles[pos.position-1].label}</b> 
                        <Form.Control
                          type="number"
                          value={pos.minPoint}
                          onChange={(e) => {
                            const newPositions = [...group.positions];
                            newPositions[j] = { ...newPositions[j], minPoint: e.target.value };
                            handleModifyGroup(i, "positions", newPositions);
                          }}
                        />

                    <Form.Control
                          type="number"
                          value={pos.maxPoint}
                          onChange={(e) => {
                            const newPositions = [...group.positions];
                            newPositions[j] = { ...newPositions[j], maxPoint: e.target.value };
                            handleModifyGroup(i, "positions", newPositions);
                          }}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          {!isEditing ? (
            <>
              <Button variant="secondary" onClick={handleModalClose}>Close</Button>
              {user.role=="manager" &&
                <Button variant="primary" onClick={() => setIsEditing(true)}>Modify</Button>
              }
            </>
          ) : (
            <>
              <Button variant="secondary" onClick={() => setIsEditing(false)}>Cancel</Button>
              <Button variant="success" onClick={handleSaveChanges}>Save</Button>
            </>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  )
};

export default MinPoints;
