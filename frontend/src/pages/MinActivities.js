import React, { useContext, useEffect, useState } from "react";
import { Card, Spinner, Modal, Button, Form } from "react-bootstrap";
import { UserContext } from "../context/UserContext";
import Loading from "../components/Loading";
import { titles } from "../datas/schoolDepartments";



const MinActivityDisplay = () => {
    const { minActivities, facultyDepartments, facultyGroups, isFacultyLoading, isMinActivitiesLoading,  } = useContext(UserContext);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [editedGroups, setEditedGroups] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    
  }, []);

  const handleDeleteActivity = (index) => {
    const isConfirmed = window.confirm("Êtes-vous sûr de vouloir supprimer cette activité ?");
    
    if (isConfirmed) {
      
    }
  };
  
  const handleModifyGroup = (index, field, value) => {
    const updatedGroups = [...editedGroups];
    updatedGroups[index] = { ...updatedGroups[index], [field]: value };
    setEditedGroups(updatedGroups);
  };

  const handleModalOpen = (activity) => {
    setSelectedActivity(activity);
    setEditedGroups(activity.groups.map(group => ({ ...group })));
    setIsEditing(false);
  };

  const handleModalClose = () => {
    setSelectedActivity(null);
    setEditedGroups([]);
    setIsEditing(false);
  };

  const handleSaveChanges = () => {
    //console.log(editedGroups)

    const updatedActivity = {...minActivities.find(act => act._id == selectedActivity._id), groups : editedGroups}
    //database
    console.log(updatedActivity)
    setIsEditing(false);
  };

  if(isFacultyLoading || isMinActivitiesLoading)
  {
    return <Loading/>
  }
  //console.log(minActivities)

  return (
    <div className="container mt-4">
      {
        minActivities.map((activity, index) => (
          <Card key={index} className="mb-3">
            <Card.Body onClick={() => handleModalOpen(activity)} style={{ cursor: "pointer" }}>
              <Card.Title>{activity.letter || activity.criteria }</Card.Title>
              <Card.Text className="d-flex justify-content-around">
                <div>
                  <strong>Letter:</strong> {activity.letter || activity.criteria} <br />
                </div>
                <div>
                  <strong>Range:</strong> {activity.range ? `${activity.letter} ${activity.from} - ${activity.letter}${activity.to}` : "No"} <br/>
                </div>
                <div>
                  <strong>Criteria:</strong> {activity?.range ? "N/A" : selectedActivity?.criteria}
                </div>
              </Card.Text>
            </Card.Body>
            <div className="d-flex justify-content-center">
              <Button variant="danger" onClick={() => handleDeleteActivity(index)} className="m-2">
                Delete
              </Button>
            </div>
          </Card>

        ))
      }

      <Modal show={!!selectedActivity} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedActivity?.letter || selectedActivity?.criteria  }</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!isEditing ? (
            <>
              <p><strong>Letter:</strong> {selectedActivity?.letter}</p>
              <p><strong>Range:</strong> {selectedActivity?.range ? `${selectedActivity.letter} ${selectedActivity.from} - ${selectedActivity.letter} ${selectedActivity.to}` : "No"}</p>
              <p><strong>Criteria:</strong> {selectedActivity?.range ? "N/A" : selectedActivity?.criteria}</p>
              <p><strong>Created At:</strong> {new Date(selectedActivity?.createdAt).toLocaleDateString()}</p>
              <h5>Groups:</h5>
              {selectedActivity?.groups.map((group, i) => (
                <div key={i}>
                  <p><strong>Faculties:</strong> {group.faculty?.faculties?.map(f => (f.name+", "))} </p>
                  <ul>
                    {group.positions.map((pos, j) => (
                      <li key={j}><b>Position : </b> {(titles[pos.position-1].label)} - <b>Quantity</b> : {pos.quantity} </li>
                    ))}
                  </ul>
                </div>
              ))}
            </>
          ) : (
            <>
              <h5>Edit Groups</h5>
              {editedGroups.map((group, i) => (
                <div key={i} className="mb-3">
                  <Form.Label>Faculty:</Form.Label>
                  <Form.Select
                    value={group.faculty?.name || ""}
                    onChange={(e) => handleModifyGroup(i, "faculty", { name: e.target.value })}
                  >
                    {facultyGroups.map((fac) => (
                      <option key={fac._id} value={fac.name}>
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
                          value={pos.quantity}
                          onChange={(e) => {
                            const newPositions = [...group.positions];
                            newPositions[j] = { ...newPositions[j], quantity: e.target.value };
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
              <Button variant="primary" onClick={() => setIsEditing(true)}>Modify</Button>
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

export default MinActivityDisplay;
