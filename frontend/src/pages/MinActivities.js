import React, { useState, useContext } from "react";
import { Card, Container, Row, Col, Form, Button } from "react-bootstrap";
import { UserContext } from "../context/UserContext";
import { titles } from "../datas/schoolDepartments";

const MinActivities = () => {
  const { minActivities } = useContext(UserContext);
  const { facultyDepartments } = useContext(UserContext);
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [selectedFacultyName, setSelectedFacultyName] = useState("");
  const [isFacultyEditable, setIsFacultyEditable] = useState(false);
  const [newFaculty, setNewFaculty] = useState("");
  const [isAllDataEditable, setIsAllDataEditable] = useState(false);
  const [updatedFacultyData, setUpdatedFacultyData] = useState(null); // For form data
  const [selectedCardIndex, setSelectedCardIndex] = useState(null); // Track selected card index for add faculty form visibility
  const [selectedPositionIndex, setSelectedPositionIndex] = useState(null); 

  const handleFacultyChange = (e, position, activityIndex, positionIndex) => {
    const facultyName = e.target.value
    setSelectedCardIndex(activityIndex)
    setSelectedPositionIndex(positionIndex)

    setSelectedFacultyName(facultyName);
    const faculty = minActivities[activityIndex].positions[positionIndex].faculty.filter(f => f.name==facultyName)
    const positions = minActivities[activityIndex].positions[positionIndex]
   
   // console.log(minActivities[activityIndex].positions[positionIndex])
    console.log(faculty)
    if (faculty) {
        const activity = minActivities[activityIndex]
      /*  const activity = minActivities.find(
        (activity) =>
          activity.positions.some((pos) =>
            pos.faculty.some((f) => f.name === facultyName)
          )
      );*/
      //console.log(faculty.name)
      setSelectedFaculty({
        letter: activity.letter,
        position : position, //position name
        range : activity.range,
        criteria: activity.range ? null : activity.criteria,
        from: activity.range ? activity.from : null,
        to: activity.range ? activity.to : null,
        quantity: positions.quantity,
        facultyName: facultyName,
        faculty : faculty,
        activityIndex: activityIndex, //minActivities.indexOf(activity),
        positionIndex : positionIndex,
      });
    }
   setSelectedFacultyName("")

  };

  const handleDeleteFaculty = async (activityIndex) => {
    //console.log(activityIndex)
   // console.log(minActivities)
   //Icı je vais verifier que la faculte nest pas la seule presente pour la position(prof...)
   //if(minActivities[activityIndex].positions)
    const deleteId = selectedFaculty.faculty._id
    //console.log(deleteId)

    

  };

  const handleModifyFaculty = (activityIndex) => {
    handleSelectCard(activityIndex)
    setIsFacultyEditable(true);
  };

  const handleAddFaculty = async (activityIndex, positionIndex) => {
    if (newFaculty && Object.keys(facultyDepartments).includes(newFaculty)) {
      /*
        const updatedActivities = [...minActivities];
      const activity = updatedActivities[selectedFaculty.activityIndex];
      const position = activity.positions[selectedFaculty.positionIndex];
    */
        //newFaculty
        console.log(minActivities)
        const newMinActivity ={
            ...minActivities[activityIndex],
            //...minActivities[activityIndex].positions,
        }
        console.log(newMinActivity)
      //position.faculty.push({ name: newFaculty, quantity: 1 });


      //setSelectedFaculty(null);
      //setIsFacultyEditable(false);
      //setSelectedCardIndex(null); // Reset selected card index
    } else {
      alert("Invalid faculty selected.");
    }
  };

  const handleModifyAllData = (activityIndex) => {
    setIsAllDataEditable(true);
    setUpdatedFacultyData({ ...selectedFaculty }); // Populate form with current data
  };

  const handleSaveAllData = (activityIndex) => {
    console.log(minActivities)
    // Save updated data logic
    const activity = minActivities[selectedCardIndex];
   
    /*const activity = updatedActivities[selectedFaculty.activityIndex];
    const position = activity.positions[selectedFaculty.positionIndex];
    const updatedFacultyIndex = position.faculty.findIndex(
      (faculty) => faculty.name === selectedFaculty.faculty
    );

    position.faculty[updatedFacultyIndex] = {
      ...position.faculty[updatedFacultyIndex],
      quantity: updatedFacultyData.quantity,
      criteria: updatedFacultyData.criteria,
      from: updatedFacultyData.from,
      to: updatedFacultyData.to,
      //range : ,
    };*/
    //console.log(activity)
    const position = activity.positions[selectedPositionIndex]
    
    const modifiedPositions = {
        ...position,
        position : updatedFacultyData.position,
        quantity : updatedFacultyData.quantity,
        faculty : position.faculty
    }
    const updatedActivity = {
        //...activity,
        range : activity.range,
        letter : updatedFacultyData.letter,
        from: updatedFacultyData.from,
        to: updatedFacultyData.to,
        criteria: updatedFacultyData.criteria,
        positions : modifiedPositions,
        //faculty,
    }

    console.log(updatedActivity)

    /*
    letter,
        range,
        from,
        to,
        criteria,
        position : positionsCount.position,
        quantity : positionsCount.quantity,
        faculty :  selectedFaculties.map(sf => facultyDepartments[sf]._id),
    */

    //setSelectedFaculty(null);
    //setIsAllDataEditable(false); // Close edit mode
  };

  const handleSelectCard = (index) => {
    setSelectedCardIndex(index === selectedCardIndex ? null : index); // Toggle selection
  };

  const handleDeleteCard = (activityIndex) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this activity?");
    if (confirmDelete) {
      // Logic to delete the activity at activityIndex
      const updatedActivities = [...minActivities];
      updatedActivities.splice(activityIndex, 1); // Remove activity at given index
      //setMinActivities(updatedActivities); // Update the state with the new list
    }
  };
  

  return (
    <Container fluid>
      <Row>
        <Col md={8}>
          {minActivities.map((activity, activityIndex) => (
            <Card key={activityIndex} className="mb-3">
              <Card.Body>
              <Card.Title>
                Activity : {activity.range ? activity.letter+activity.from + " - " + activity.letter+activity.to : activity.criteria}
                <Button
                    variant="danger"
                    size="sm"
                    className="float-end"
                    onClick={() => handleDeleteCard(activityIndex)}
                >
                    Delete
                </Button>
                </Card.Title>

                <Row>
                  {activity.positions.map((pos, positionIndex) => (
                    <Col key={positionIndex} md={4} className="mb-2">
                      <h5>{titles[parseInt(pos.position)].value}</h5>
                      <p>Quantity: {pos.quantity}</p>
                      
                      
                      <Form.Control
                        as="select"
                        value={selectedFacultyName}
                        onChange={(e) => handleFacultyChange(e, titles[parseInt(pos.position)].value, activityIndex, positionIndex)}
                        className="mb-2"
                      >
                        <option value="">Choose a faculty</option>
                        {pos.faculty.map((faculty, fidx) => (
                          <option key={fidx} value={faculty.name}>
                            {faculty.name}
                          </option>
                        ))}
                      </Form.Control>

                      <div>
                        <Button variant="primary" className="mr-2" onClick={() => {handleModifyFaculty(activityIndex, positionIndex)}}>
                          Modify Faculty
                        </Button>
                      </div>

                      {/* Add Faculty Section (Only visible for the selected card) */}
                      {selectedCardIndex === activityIndex && isFacultyEditable && (
                        <div className="mt-2">
                          <Form.Control
                            as="select"
                            onChange={(e) => setNewFaculty(e.target.value)}
                          >
                            <option value="">Select a Faculty</option>
                            {Object.keys(facultyDepartments).map((fac, idx) => (
                              <option key={idx} value={fac}>
                                {fac}
                              </option>
                            ))}
                          </Form.Control>
                          <Button
                            variant="success"
                            className="mt-2"
                            onClick={() => {handleAddFaculty(activityIndex, positionIndex)}}
                          >
                            Add Faculty
                          </Button>
                        </div>
                      )}
                    </Col>
                  ))}
                </Row>
              </Card.Body>
            </Card>
          ))}
        </Col>

        {/* Details Section on the Right */}
        <Col md={4}>
          {selectedFaculty && (
            <Card className="mt-3">
              <Card.Body>
                <Card.Title>Details</Card.Title>

                {/* Display/Edit Form Fields for Faculty Data */}
                {isAllDataEditable ? (
                  <div>
                    <Form>
                      <Form.Group>
                        <Form.Label>Label </Form.Label>
                        <Form.Control
                          type="text"
                          value={updatedFacultyData.letter}
                          disabled
                        />
                      </Form.Group>




                      <Form.Group className="mb-3">
                        <Form.Label>Position:</Form.Label>
                        <Form.Control
                            as="select"
                            name="position"
                            value={updatedFacultyData.position}
                            onChange={(e) =>
                            setUpdatedFacultyData({
                                ...updatedFacultyData,
                                position: e.target.value,
                            })
                            }
                            required
                        >
                            <option value="">Select a position</option>
                            {titles.map((title) => (
                            <option key={title._id} value={title._id}>
                                {title.value}
                            </option>
                            ))}
                        </Form.Control>
                        </Form.Group>






                      <Form.Group>
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control
                          type="number"
                          value={updatedFacultyData.quantity}
                          onChange={(e) =>
                            setUpdatedFacultyData({
                              ...updatedFacultyData,
                              quantity: e.target.value,
                            })
                          }
                        />
                      </Form.Group>

                     {!minActivities[selectedCardIndex].range &&
                      <Form.Group>
                        <Form.Label>Criteria</Form.Label>
                        <Form.Control
                          type="text"
                          value={updatedFacultyData.criteria || ""}
                          onChange={(e) =>
                            setUpdatedFacultyData({
                              ...updatedFacultyData,
                              criteria: e.target.value,
                            })
                          }
                        />
                      </Form.Group>}
                
                {minActivities[selectedCardIndex].range &&
                      <Form.Group>
                        <Form.Label>Range</Form.Label>
                        <div className="d-flex">
                          <Form.Control
                            type="number"
                            value={updatedFacultyData.from || ""}
                            onChange={(e) =>
                              setUpdatedFacultyData({
                                ...updatedFacultyData,
                                from: e.target.value,
                              })
                            }
                          />
                          <span className="mx-2">-</span>
                          <Form.Control
                            type="number"
                            value={updatedFacultyData.to || ""}
                            onChange={(e) =>
                              setUpdatedFacultyData({
                                ...updatedFacultyData,
                                to: e.target.value,
                              })
                            }
                          />
                        </div>
                      </Form.Group>
                }
                    </Form>
                
                    <Button
                      variant="success"
                      className="mt-2"
                      onClick={handleSaveAllData}
                    >
                      Save All Data
                    </Button>
                  </div>
                ) : (
                  <>
                     {selectedFaculty.criteria ? (
                      <p>Criteria: {selectedFaculty.criteria}</p>
                    ) : (
                        <p>
                            Label: {minActivities[selectedCardIndex].range ? minActivities[selectedCardIndex].letter+minActivities[selectedCardIndex].from 
                            + " - " + minActivities[selectedCardIndex].letter+minActivities[selectedCardIndex].to : minActivities[selectedCardIndex].criteria}
                        </p>
                    )}
                   
                    <p>Position: {selectedFaculty.position}</p>
                    <p>Quantity: {selectedFaculty.quantity}</p>
                 
                    <p>Selected Faculty: {selectedFaculty.facultyName}</p>

                    {/* Buttons for modifying or deleting faculty */}
                    <div className="d-flex flex-column mt-3">
                        <Button
                            variant="danger"
                            className="mb-2 w-100"
                            onClick={() => { handleDeleteFaculty(selectedCardIndex) }}
                        >
                            Delete Faculty
                        </Button>

                        <Button
                            variant="warning"
                            className="mt-2 w-100"
                            onClick={() => {handleModifyAllData(selectedCardIndex)}}
                        >
                            Modify All Data
                        </Button>
                    </div>
                  </>
                )}
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default MinActivities;
