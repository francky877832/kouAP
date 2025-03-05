import React from 'react';

const titles = ['Assistant Professor', 'Associate Professor', 'Professor'];

const PointActivityForm = ({
  positionsPoint, 
  handlePositonsPointChange,
  range, setRange, 
  from, setFrom, to, setTo, 
  criteria, setCriteria, 
  handleSubmitThirdForm, 
  handleFacultyChange,
  facultyDepartments, faculty
}) => {
  return (
    <form onSubmit={handleSubmitThirdForm}>


<div>
        <label htmlFor="range">Range:</label>
        <input
          type="checkbox"
          id="range"
          checked={range}
          onChange={(e) => setRange(e.target.checked)}
        />
      </div>

      {range && (
        <>
          <div>
            <label htmlFor="from">From:</label>
            <input
              type="number"
              id="from"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="to">To:</label>
            <input
              type="number"
              id="to"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              required
            />
          </div>
        </>
      )}

      {!range && (
        <div>
          <label htmlFor="criteria">Criteria:</label>
          <input
            type="text"
            id="criteria"
            value={criteria}
            onChange={(e) => setCriteria(e.target.value)}
            required
          />
        </div>
      )}


    
        <div>
          {/* Sélection de la position */}
          <div>
            <label>Position:</label>
            <select
              name="position"
              value={positionsPoint.position}
              onChange={(e) => handlePositonsPointChange(e)}
              required
            >
              {titles.map((title, pos) => (
                <option key={pos} value={title}>
                  {title}
                </option>
              ))}
            </select>
          </div>

          {/* Saisie du minPoint */}
          <div>
            <label>Min Points:</label>
            <input
              type="number"
              name="minPoint"
              value={positionsPoint.minPoint}
              onChange={(e) => handlePositonsPointChange(e)}
              required
            />
          </div>

          {/* Saisie du maxPoint */}
          <div>
            <label>Max Points:</label>
            <input
              type="number"
              name="maxPoint"
              value={positionsPoint.maxPoint}
              onChange={(e) => handlePositonsPointChange(e)}
              required
            />
          </div>

        



        {/* Faculty */}
          <div className="mb-3">
            <label className="form-label">Faculty</label>
            <select className="form-select" name="faculty" value={positionsPoint.faculty} onChange={(e) => handlePositonsPointChange(e)} required>
              <option value="">Select a faculty</option>
              {Object.keys(facultyDepartments).map((fac) => (
                <option key={facultyDepartments[fac]._id} value={fac}>
                  {fac}
                </option>
              ))}
            </select>
          </div>
        </div>
    

      {/* Bouton pour soumettre le formulaire */}
      <div>
        <button type="submit">Submit Third Form</button>
      </div>
    </form>
  );
};

export default PointActivityForm;
