import React, { useState } from 'react';
import { Button, Modal, ListGroup } from 'react-bootstrap';

const A = ({ formData, userForms, handleChange, handleAddData, data, dataSetters, handleRemoveSubmittedData, handleFileChange}) => {
  const {submittedData, cases, coefs} = data
  const [selectedCategory, setSelectedCategory] = useState('');
  const formCases = formData
  const formCoefs = formData

  const [selectedMessage, setSelectedMessage] = useState(null);

  const [selectedArticle, setSelectedArticle] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleShowDetails = (article) => {
    setSelectedArticle(article);
    setShowModal(true);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleAddButtonClick = () => {
    if (!selectedCategory) {
      alert('Lütfen bir kategori seçin.');
      return;
    }

    const articleData = {...formData, number:selectedCategory, letter:userForms.activity.letter.trim()}
    const res = handleAddData(articleData, dataSetters);
    if(res)
    {
      setSelectedCategory('');
      handleChange({ target: { name: 'author', value: '' } },  userForms.activity.letter.trim(), true);
    }
   
  };

  const handleRemoveButtonClick = () => {
    if (!submittedData.length===0) {
      alert('No data submitted yet!');
      return;
    }

    handleRemoveSubmittedData(submittedData, dataSetters);
  };

  // Fonction pour rendre dynamiquement les champs en fonction du type
  const printFields = (field) => {
    if (['checkbox', 'radio'].includes(field.type) && field.options) {
      return field.options.map((option, index) => (
        <div key={index} className="mb-2">
          <label>
            <input
              type={field.type}
              name={field.name}
              value={option}
              checked={formData[field.name]?.includes(option) || false}
              onChange={(e) => handleChange(e,  userForms.activity.letter.trim())}
              className="me-2"
            />
            {option}
          </label>
        </div>
      ));
    } else if (field.type=="select" && field.options) {
      return (
        <select
          name={field.name}
          value={formData[field.name]}
          onChange={(e) => handleChange(e, userForms.activity.letter.trim())}
          className="form-select mb-3"
        >
          <option value="">-- Sélectionnez --</option>
          {field.options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      )
    } else if (field.type === 'textarea') {
      return (
        <textarea
          className="form-control mb-3"
          id={field.name}
          name={field.name}
          value={formData[field.name] || ''}
          onChange={(e) => handleChange(e, userForms.activity.letter.trim())}
        />
      );
    } else if (field.type=="file") {
      return (
        <input type={field.type}  className="form-control mb-3" id={field.name} name={field.name} onChange={(e) => handleFileChange(e, userForms.activity.letter.trim(), selectedCategory) } />
      )
    }else {
      return (
        <input
          type={field.type}
          className="form-control mb-3"
          id={field.name}
          name={field.name}
          value={formData[field.name] || ''}
          onChange={(e) => handleChange(e, userForms.activity.letter.trim())}
        />
      );
    } 
  };

  // Fonction pour rendre dynamiquement les champs de détails
  const renderDetailsFields = (details) => {
    return details.map((field) => (
      <div className="form-group mb-3" key={field.name}>
        <label htmlFor={field.name}><strong>{field.label}</strong></label>
        {printFields(field)}
      </div>
    ));
  };

  return (
    <div className="container">
      <div className="form-group mb-4">
        <label htmlFor="category"><h3>{userForms.activity.letter+" - "+userForms.activity.label}</h3></label>
        <select
          className="form-control"
          id="category"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="">Sélectionner une catégorie</option>
          {userForms.activity.activities.map((activity) => (
            <option key={activity._id} value={activity.number}>
              {activity.number+"- "+activity.name}
            </option>
          ))}
        </select>
      </div>

      <br/>

      {selectedCategory && (
        <>
          <div>
            <h4 className="mb-3">Détails de la Catégorie</h4>
            {renderDetailsFields(userForms.fields)}
          </div>

          <br/>

          <div>
            <h4 className="mb-3">Choose a situation</h4>
            {cases.map((item, index) => (
              <div key={index} className="form-check mb-2">
                <input
                  className="form-check-input"
                  type="radio"
                  name="messages"
                  value={item._id}
                  checked={formCases.cases[item._id]}
                  onChange={(e) => {setSelectedMessage(item._id); handleChange(e, userForms.activity.letter.trim(), false, 'cases')}}
                />
                <label className="form-check-label">
                  {item.message}
                </label>
              </div>
            ))}
            <div className="form-check mb-2">
              <input
                className="form-check-input"
                type="radio"
                name="messages"
                value="no_case"
                checked={formCases.cases["no_case"]}
                onChange={(e) => {setSelectedMessage("no_case"); handleChange(e, userForms.activity.letter.trim(), false, 'cases')}}
              />
              <label className="form-check-label">
                No Case
              </label>
            </div>
          </div>

          {/* Affichage des participants uniquement si un message est sélectionné */}
          {selectedMessage && (
            <div className="mt-3">
              <h5>Participants :</h5>
              {cases
                .find((item) => item._id === selectedMessage)
                ?.participants.map((p, i) => (
                  <div key={i} className="form-check mb-2">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="participants"
                      value={p.title}
                      checked={formCases.participants[p.title]}
                      onChange={(e) => handleChange(e, userForms.activity.letter.trim(), false, 'participants')}
                    />
                    <label className="form-check-label">{p.title}</label>
                  </div>
                ))}
            </div>
          )}

          <div className="mt-4 d-flex justify-content-center">
            <button
              type="button"
              className="btn btn-success btn-lg"
              onClick={handleAddButtonClick}
            >
              Add An Activity
            </button>
          </div>
        </>
      )}

      <div className="mt-4">
        <h5>Added Activities:</h5>
        <div className="container mt-4">
      <ul className="list-group">
        {submittedData.map((article, index) => {
          const infos = Object.keys(article);
          return (
            <li
              key={index}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div onClick={() => handleShowDetails(article)} style={{ cursor: "hand", color: "#007bff" }}>
                <strong>{index}:</strong> {article[infos[0]]} - {article[infos[1]]}
              </div>
              <div className="btn btn-danger ms-3 btn-sm" onClick={handleRemoveButtonClick}>
                Remove
              </div>
            </li>
          );
        })}
      </ul>

      {/* Modal d'affichage des détails */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Détails de l'activité</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedArticle && (
            <ul>
              {Object.entries(selectedArticle).map(([key, value]) => (
                <li key={key}>
                  <strong>{key}:</strong>{" "}
                  {typeof value === "object" && value !== null ? (
                    <ul>
                      {Object.entries(value).map(([subKey, subValue]) => (
                        <li key={subKey}>
                          <strong>{subKey}:</strong> {subValue.toString()}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    value.toString()
                  )}
                </li>
              ))}
            </ul>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Fermer
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
      </div>
    </div>
  );
};

export default A;
