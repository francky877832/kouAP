import React from 'react';
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
          <select className="form-select" id="letter" value={letter} onChange={(e) => setLetter(e.target.value)} required>
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
              id="from"
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
              id="to"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              required
            />
          </div>
        </div>
      ) : (
        <div className="mb-3">
          <label htmlFor="criteria" className="form-label">Criteria:</label>
          <input
            type="text"
            className="form-control"
            id="criteria"
            value={criteria}
            onChange={(e) => setCriteria(e.target.value)}
            required
          />
        </div>
      )}

      <div className="mb-3">
        <label className="form-label">Position:</label>
        <select
          className="form-select"
          name="position"
          value={positionsCount.position}
          onChange={handlePositonsCountChange}
          required
        >
          <option value="">Select a position</option>
          {titles.map((title) => (
            <option key={title._id} value={title._id}>
              {title.value}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Quantity:</label>
        <input
          type="text"
          className="form-control"
          name="quantity"
          value={positionsCount.quantity}
          onChange={handlePositonsCountChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Faculty</label>
        <select
          className="form-select"
          name="faculty"
          value={positionsCount.faculty}
          onChange={handlePositonsCountChange}
          required
        >
          <option value="">Select a faculty</option>
          {Object.keys(facultyDepartments).map((fac) => (
            <option key={facultyDepartments[fac]._id} value={fac}>
              {fac}
            </option>
          ))}
        </select>
      </div>

      <div className="text-center">
        <button type="submit" className="btn btn-primary">Submit Second Form</button>
      </div>
    </form>
  );
};

export default MinActivityForm;
