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

  facultyGroups, handleDeletePosition,
  handleAddGroup, handleDeleteGroup, groups
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
        {/* Sélection de la faculté */}
             <div className="mb-3">
               <label className="form-label">Faculty</label>
               <select
                 className="form-select"
                 value={selectedFaculty}
                 onChange={(e) => setSelectedFaculty(e.target.value)}
               >
                 <option value="">Select a faculty</option>
                 {facultyGroups.map((fac) => (
                   <option key={fac._id} value={fac.name}>
                     {fac.faculties.map(f => (f.name+", "))}
                   </option>
                 ))}
               </select>
             </div>
       
             {/* Bouton pour ajouter une faculté 
             <div className="text-center mb-3">
               <button type="button" className="btn btn-success" onClick={handleAddFaculty}>
                 Add Faculty
               </button>
             </div>
       
             {
             /* Liste des facultés ajoutées 
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
             */}
       
             {/* Bouton pour ajouter la position complète */}
           {positions.length < 3 &&
             <div className="text-center mb-3">
               <button type="button" className="btn btn-primary" onClick={handleAddPosition}>
                 Add Position
               </button>
             </div>
           }
             <div className="mb-3 ">
               <h5>Added Positions:</h5>
               <ul className="list-group ">
                 {positions.map((pos, index) => (
                   <li key={index} className="list-group-item d-flex justify-content-between">
                     <strong>Position:</strong> {pos.position}, <strong>Quantity:</strong> {pos.quantity}
                     <button
                            type="button"
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDeletePosition(index)}
                          >
                            Delete
                     </button>
                   </li>
                 ))}
               </ul>
             </div>
       
               {positions.length === 3 &&
                     <div className="text-center mb-3">
                       <button type="button" className="btn btn-primary" onClick={handleAddGroup}>
                         Add Group
                       </button>
                     </div>
               }
             {/* Liste des positions ajoutées */}
             <div className="mb-3">
               <h5>Added Group:</h5>
               <ul className="list-group">
                   {groups.map((group, groupIndex) => (
                       <li key={groupIndex} className="list-group-item d-flex justify-content-between">
                         {group.positions.map((pos, posIndex) => (
                           <div key={posIndex}>
                             <strong> Position:</strong> {(titles.find(t => t.value==pos.position)).label},  
                             <strong> Min: </strong> {pos.minPoint}, 
                             <strong> Max: </strong> {pos.maxPoint}
                           </div>
                         ))}
       
                         <button
                            type="button"
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDeleteGroup(groupIndex)}
                          >
                            Delete
                          </button>
                  
                   </li>
                 ))}
       
                  
               </ul>
             </div>
       
             {/* Soumission du formulaire */}
             <div className="text-center">
               <button type="submit" className="btn btn-primary">Submit Third Form</button>
             </div>
           </form>
  );
};

export default PointActivityForm;
