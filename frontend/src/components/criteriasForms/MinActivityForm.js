import React, { useState } from 'react';
import { titles } from '../../datas/schoolDepartments';

const MinActivityForm = ({
  positionsCount, 
  handlePositonsCountChange,
  range, setRange, 
  from, setFrom, to, setTo, 
  criteria, setCriteria, 
  handleSubmitSecondForm, 
  facultyDepartments,
  letter, setLetter,
  faculties, setFaculties,
  handleAddFaculty, handleDeleteFaculty,
  selectedFaculty, setSelectedFaculty,
  selectedFaculties, setSelectedFaculties,
  handleAddPosition, handlePositionChange,
  positionData, positions,
}) => {




  return (
    <form onSubmit={handleSubmitSecondForm} className="container p-4 border rounded bg-light">
      <div className="mb-3 form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="range"
          checked={range}
          onChange={(e) => setRange(e.target.checked)}
        />
        <label className="form-check-label" htmlFor="range">Range</label>
      </div>

      {range ? (
        <div className="row">
          <div className="mb-3">
            <label className="form-label">Letter</label>
            <select className="form-select" value={letter} onChange={(e) => setLetter(e.target.value)} required>
              <option value="">Select a letter</option>
              {[...'ABCDEFGHIJKL'].map((letterOption) => (
                <option key={letterOption} value={letterOption}>{letterOption}</option>
              ))}
            </select>
          </div>
          
          <div className="col-md-6 mb-3">
            <label htmlFor="from" className="form-label">From:</label>
            <input
              type="number"
              className="form-control"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="to" className="form-label">To:</label>
            <input
              type="number"
              className="form-control"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              required
            />
          </div>
        </div>
      ) : (
        <div className="mb-3">
          <label className="form-label">Criteria:</label>
          <input
            type="text"
            className="form-control"
            value={criteria}
            onChange={(e) => setCriteria(e.target.value)}
            required
          />
        </div>
      )}

      {/* Sélection de la position */}
      <div className="mb-3">
        <label className="form-label">Position:</label>
        <select
          className="form-select"
          name="position"
          value={positionData.position}
          onChange={handlePositionChange}
          
        >
          <option value="">Select a position</option>
          {titles.map((title) => (
            <option key={title._id} value={title.value}>
              {title.value}
            </option>
          ))}
        </select>
      </div>

      {/* Quantité */}
      <div className="mb-3">
        <label className="form-label">Quantity:</label>
        <input
          type="text"
          className="form-control"
          name="quantity"
          value={positionData.quantity}
          onChange={handlePositionChange}
          
        />
      </div>

      {/* Sélection de la faculté */}
      <div className="mb-3">
        <label className="form-label">Faculty</label>
        <select
          className="form-select"
          value={selectedFaculty}
          onChange={(e) => setSelectedFaculty(e.target.value)}
        >
          <option value="">Select a faculty</option>
          {Object.keys(facultyDepartments).map((fac) => (
            <option key={facultyDepartments[fac]._id} value={fac}>
              {fac}
            </option>
          ))}
        </select>
      </div>

      {/* Bouton pour ajouter une faculté */}
      <div className="text-center mb-3">
        <button type="button" className="btn btn-success" onClick={handleAddFaculty}>
          Add Faculty
        </button>
      </div>

      {/* Liste des facultés ajoutées */}
      <div className="mb-3">
        <h5>Added Faculties:</h5>
        <ul className="list-group">
          {selectedFaculties.map((faculty, index) => (
            <li key={index} className="list-group-item d-flex justify-content-between">
              {faculty}
              <button
                type="button"
                className="btn btn-danger btn-sm"
                onClick={() => handleDeleteFaculty(index)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Bouton pour ajouter la position complète */}
      <div className="text-center mb-3">
        <button type="button" className="btn btn-primary" onClick={handleAddPosition}>
          Add Position
        </button>
      </div>

      {/* Liste des positions ajoutées */}
      <div className="mb-3">
        <h5>Added Positions:</h5>
        <ul className="list-group">
          {positions.map((pos, index) => (
            <li key={index} className="list-group-item">
              <strong>Position:</strong> {pos.position}, <strong>Quantity:</strong> {pos.quantity}, <strong>Faculties:</strong> {pos.faculties.join(', ')}
            </li>
          ))}
        </ul>
      </div>

      {/* Soumission du formulaire */}
      <div className="text-center">
        <button type="submit" className="btn btn-primary">Submit Second Form</button>
      </div>
    </form>
  );
};

export default MinActivityForm;
