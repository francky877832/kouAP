import React, { useContext, useState } from "react";
import { Table, Button, Form } from "react-bootstrap";
import { UserContext } from "../context/UserContext";
import { FaEdit, FaTrashAlt, FaCheck, FaTimes } from "react-icons/fa";  // Importation des icônes
import '../styles/activitiesStyles.css';
import { ManagerContext } from "../context/ManagerContext";
import Loading from "../components/Loading";
import UserMenu from "./UserMenu";

const Activities = () => {
  const { activities, user, isActivitiesLoading, isAuthenticated } = useContext(UserContext);
  const { deleteActivity, updateActivity } = useContext(ManagerContext);

  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState(null);

  const handleEdit = (index, activity) => {
    setEditIndex(index);
    setEditData({ ...activity, activities: [...activity.activities] });
  };

  const handleChange = (e, field, subIndex = null) => {
    const { value } = e.target;
    setEditData((prev) => {
      const newData = { ...prev };
      if (subIndex !== null) {
        newData.activities[subIndex][field] = value;
      } else {
        newData[field] = value;
      }
      return newData;
    });
  };

  const cancelEdit = () => {
    setEditIndex(null);
    setEditData(null);
  };

  const handleSubmit = async () => {
    // Vérification que 'letter' et 'label' sont présents
    if (!editData.letter || !editData.label) {
      alert("La lettre et le label sont obligatoires.");
      return;
    }

    // Vérification des éléments de chaque section
    const activitiesToDelete = [];
    editData.activities.forEach((act, i) => {
      if (!act.number || !act.name || !act.points) {
        activitiesToDelete.push(i);
      }
    });

    if (activitiesToDelete.length > 0) {
      const confirmDelete = window.confirm("Certaines lignes sont incomplètes. Voulez-vous les supprimer ?");
      if (confirmDelete) {
        // Suppression des lignes invalides
        editData.activities = editData.activities.filter((_, i) => !activitiesToDelete.includes(i));
      } else {
        // Annulation de l'édition si l'utilisateur ne confirme pas la suppression
        setEditIndex(null);
        setEditData(null);
        return;
      }
    }

    // Mise à jour de l'activité
    await updateActivity(editData);
    setEditIndex(null);
    setEditData(null);
  };

  const confirmDelete = (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette activité ?")) {
      deleteActivity(id);
    }
  };

  if(isActivitiesLoading)
  {
    return <Loading/>
  }


  return (
    <div className="container-lg mt-4">
      <UserMenu user={user} isAuthenticated={isAuthenticated} />
      <h2 className="text-center mb-4">Liste des Activités</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr className="table-primary text-center">
            <th style={{ width: '10%' }}>Number</th>
            <th style={{ width: '70%' }}>Activity</th>
            <th style={{ width: '10%' }}>Points</th>
            {user.role=="manager" &&
              <th style={{ width: '10%' }}>Actions</th> /* Petite largeur pour la colonne d'actions */
            }
          </tr>
        </thead>
        <tbody>
          {activities.length > 0 ? (
            activities.map((activity, index) => (
              <React.Fragment key={index}>
                <tr className="table-dark text-white fw-bold text-center">
                  <td colSpan="3">
                    {editIndex === index ? (
                      <>
                        {/* Champ select pour 'letter' */}
                        <Form.Control
                          as="select"
                          value={editData.letter}
                          onChange={(e) => handleChange(e, "letter")}
                          className="mb-1"
                        >
                          {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'].map((letter) => (
                            <option key={letter} value={letter}>
                              {letter}
                            </option>
                          ))}
                        </Form.Control>
                        <Form.Control
                          type="text"
                          value={editData.label}
                          onChange={(e) => handleChange(e, "label")}
                        />
                      </>
                    ) : (
                      <>{activity.letter} - {activity.label}</>
                    )}
                  </td>
                  {user.role=="manager" &&
                  <td className="text-center actions d-flex justify-content-center">
                    {editIndex === index ? (
                      <>
                        <Button variant="success" size="sm" onClick={handleSubmit} className="me-1 button-custom">
                          <FaCheck style={{ fontSize: '10px' }} />
                        </Button>
                        <Button variant="secondary" size="sm" onClick={cancelEdit} className="me-1 button-custom">
                          <FaTimes style={{ fontSize: '10px' }} />
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button variant="warning" size="sm" className="me-1 button-custom" onClick={() => handleEdit(index, activity)}>
                          <FaEdit style={{ fontSize: '10px' }} />
                        </Button>
                        <Button variant="danger" size="sm button-custom" onClick={() => confirmDelete(activity._id)}>
                          <FaTrashAlt style={{ fontSize: '10px' }} />
                        </Button>
                      </>
                    )}
                  </td>
            }
                </tr>
                {activity.activities.map((act, i) => (
                  <tr key={i} className="text-center">
                    <td>
                      {editIndex === index ? (
                        <Form.Control
                          type="number"
                          value={editData.activities[i].number}
                          onChange={(e) => handleChange(e, "number", i)}
                          size="sm"
                        />
                      ) : (
                        act.number
                      )}
                    </td>
                    <td>
                      {editIndex === index ? (
                        <Form.Control
                          type="text"
                          value={editData.activities[i].name}
                          onChange={(e) => handleChange(e, "name", i)}
                          size="sm"
                        />
                      ) : (
                        act.name
                      )}
                    </td>
            
                    <td>
                      {editIndex === index ? (
                        <Form.Control
                          type="number"
                          value={editData.activities[i].points}
                          onChange={(e) => handleChange(e, "points", i)}
                          size="sm"
                        />
                      ) : (
                        act.points
                      )}
                    </td>

                    {user.role=="manager" &&
                      <td></td>
                    }
                  </tr>
                ))}
              </React.Fragment>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center text-muted">Aucune activité disponible</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default Activities;
