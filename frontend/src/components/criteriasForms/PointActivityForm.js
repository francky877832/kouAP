import React from 'react';
import { titles } from '../../datas/schoolDepartments';
import 'bootstrap/dist/css/bootstrap.min.css';

const PointActivityForm = ({
  positionsPoint, 
  handlePositonsPointChange,
  range, setRange, 
  from, setFrom, to, setTo, 
  criteria, setCriteria, 
  handleSubmitThirdForm, 
  handleFacultyChange,
  facultyDepartments, faculty,
  letter, setLetter,
  handleAddFaculty, handleDeleteFaculty,
  selectedFaculty, setSelectedFaculty,
  selectedFaculties, setSelectedFaculties,
  handleAddPosition, handlePositionChange,
  positionData, positions,
}) => {
  return (
    <form onSubmit={handleSubmitThirdForm} className="container p-4 border rounded bg-light">
      <div className="mb-3 form-check">
        <input
          type="checkbox"
          id="range"
          className="form-check-input"
          checked={range}
          onChange={(e) => setRange(e.target.checked)}
        />
        <label htmlFor="range" className="form-check-label">Range</label>
      </div>

      {range ? (
        <>

        <div className="mb-3">
          <label className="form-label">Letter</label>
          <select className="form-select" id="letter" value={letter} onChange={(e) => setLetter(e.target.value)} >
            <option value="">Select a letter</option>
            {[...'ABCDEFGHIJKL'].map((letterOption) => (
              <option key={letterOption} value={letterOption}>{letterOption}</option>
            ))}
          </select>
        </div>


          <div className="mb-3">
            <label htmlFor="from" className="form-label">From:</label>
            <input
              type="number"
              id="from"
              className="form-control"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="to" className="form-label">To:</label>
            <input
              type="number"
              id="to"
              className="form-control"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              required
            />
          </div>
        </>
      ) : (
        <div className="mb-3">
          <label htmlFor="criteria" className="form-label">Criteria:</label>
          <input
            type="text"
            id="criteria"
            className="form-control"
            value={criteria}
            onChange={(e) => setCriteria(e.target.value)}
            required
          />
        </div>
      )}

      <div className="mb-3">
        <label className="form-label">Position:</label>
        <select
          name="position"
          className="form-select"
          value={positionData.position}
          onChange={handlePositionChange}
          
        >
          <option value="">Select a position</option>
          {titles.map((title) => (
            <option key={title._id} value={title.value}>{title.value}</option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Min Points:</label>
        <input
          type="number"
          name="minPoint"
          className="form-control"
          value={positionData.minPoint}
          onChange={handlePositionChange}
          
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Max Points:</label>
        <input
          type="number"
          name="maxPoint"
          className="form-control"
          value={positionData.maxPoint}
          onChange={handlePositionChange}
          
        />
      </div>

       {/* Afficher et gérer le select de la faculté */}
       <div className="mb-3">
        <label className="form-label">Faculty</label>
        <select
          className="form-select"
          name="faculty"
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

      {/* Afficher la liste des facultés ajoutées */}
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

      <div className="text-center">
        <button type="submit" className="btn btn-primary">Submit Third Form</button>
      </div>
    </form>
  );
};

export default PointActivityForm;
