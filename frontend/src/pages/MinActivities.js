import React, { useContext, useEffect, useState } from "react";
import { Card, Spinner, Modal, Button, Form } from "react-bootstrap";
import { UserContext } from "../context/UserContext";
import Loading from "../components/Loading";
import { titles } from "../datas/schoolDepartments";
import { ManagerContext } from "../context/ManagerContext";
import UserMenu from "./UserMenu";



const MinActivities = () => {
  const { user, isAuthenticated, minActivities, facultyDepartments, facultyGroups, isFacultyLoading, isMinActivitiesLoading, setIsMinActivitiesLoading } = useContext(UserContext);
  const { updateMinActivity, updateMinPoint, deleteMinActivity, deleteMinPoint, } = useContext(ManagerContext)
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [editedGroups, setEditedGroups] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
      letter: selectedActivity?.letter,
      from: selectedActivity?.from,
      to: selectedActivity?.to,
      range: selectedActivity?.range,
      criteria: selectedActivity?.criteria,
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

  const handleDeleteActivity = async (index) => {
    const isConfirmed = window.confirm("Êtes-vous sûr de vouloir supprimer cette activité ?");
    
    if (isConfirmed) {
      await deleteMinActivity(minActivities[index])
    }
  };
  
  const handleModifyGroup = (index, field, value) => {
    const updatedGroups = [...editedGroups];
    updatedGroups[index] = { ...updatedGroups[index], [field]: value };
    //console.log(field, value)
    console.log(updatedGroups)
    setEditedGroups(updatedGroups);
  };

  const handleModalOpen = (activity) => {
    setSelectedActivity(activity);
    setEditedGroups(activity.groups.map(group => ({ ...group, faculty:group.faculty._id })));
    setFormData({
      letter: activity?.letter,
      from: activity?.from,
      to: activity?.to,
      range: activity?.range,
      criteria: activity?.criteria,
  })
    setIsEditing(false);
  };

  const handleModalClose = () => {
    setSelectedActivity(null);
    setEditedGroups([]);
    setIsEditing(false);
  };

  const handleSaveChanges = async () => {
    //console.log(editedGroups)

    //const updatedActivity = {...minActivities.find(act => act._id == selectedActivity._id), groups : editedGroups}
    const currentActivity = minActivities.find(act => act._id == selectedActivity._id)
    const updatedActivity = {...currentActivity,
      letter: formData?.letter || currentActivity?.letter,
      from: formData?.from || currentActivity?.from,
      to: formData?.to || currentActivity?.to,
      range: formData?.range || currentActivity?.range,
      criteria: formData?.criteria || currentActivity?.criteria,
       groups : editedGroups
      }
    //database
    //console.log(updatedActivity)
    await updateMinActivity(updatedActivity)
    setIsMinActivitiesLoading(true)
    setIsEditing(false);
    handleModalClose()
  };

  if(isFacultyLoading || isMinActivitiesLoading)
  {
    return <Loading/>
  }
  //console.log(minActivities)

  return (
    <div className="container mt-4">
            <UserMenu user={user} isAuthenticated={isAuthenticated} />

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
          { user.role=="manager" &&
            <div className="d-flex justify-content-center">
              <Button variant="danger" onClick={() => handleDeleteActivity(index)} className="m-2">
                Delete
              </Button>
            </div>
        }
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

export default MinActivities;
