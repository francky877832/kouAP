import React from 'react';

const titles = ['Assistant Professor', 'Associate Professor', 'Professor'];

const MinActivityForm = ({
  positionsCount, 
  handlePositonsCountChange,
  range, setRange, 
  from, setFrom, to, setTo, 
  criteria, setCriteria, 
  handleSubmitSecondForm, 
  facultyDepartments, faculty,

}) => {
  return (
    <form onSubmit={handleSubmitSecondForm}>


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
              value={positionsCount.position}
              onChange={(e) => handlePositonsCountChange(e)}
              required
            >
              {titles.map((title, pos) => (
                <option key={pos} value={pos}>
                  {title}
                </option>
              ))}
            </select>
          </div>

          {/* Saisie du minPoint */}
          <div>
            <label>Min Points:</label>
            <input
              type="text"
              name="quantity"
              value={positionsCount.quantity}
              onChange={(e) => handlePositonsCountChange(e)}
              required
            />
          </div>

         {/* Faculty */}
         <div className="mb-3">
            <label className="form-label">Faculty</label>
            <select className="form-select" name="faculty" value={positionsCount.faculty} onChange={(e) => handlePositonsCountChange(e)} required>
              <option value="">Select a faculty</option>
              {Object.keys(facultyDepartments).map((fac) => (
                <option key={fac} value={fac}>
                  {fac}
                </option>
              ))}
            </select>
          </div>


      </div>
    

      {/* Bouton pour soumettre le formulaire */}
      <div>
        <button type="submit">Submit Second Form</button>
      </div>
    </form>
  );
};

export default MinActivityForm;
