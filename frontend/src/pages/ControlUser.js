import React, { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import '../styles/loginStyles.css';
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";


const ControlUser = () => {
    const { controlUser } = useContext(UserContext)
  const [tcID, setTcID] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [error, setError] = useState("");
  const [userExists, setUserExists] = useState(null)

  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate();


  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!tcID || !name || !surname || !birthYear) {
      setError("Please fill in all fields.");
      return;
    }

    setIsLoading(true)

    const result = await controlUser({name, surname, birthYear, tcID})
    //setUserExists(result)

    if(result) //if(result)
      {
        navigate("/register", {
          state: {tcID, name, surname, birthYear},
        }); 
      }
    
    setError(""); // Reset error after submission
    setIsLoading(false)

  };



  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center">Create an Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="tcID" className="form-label">TC Kimlik</label>
            <input
              type="text"
              id="tcID"
              className="form-control"
              value={tcID}
              onChange={(e) => setTcID(e.target.value)}
              placeholder="Enter your TC Kimlik number"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              id="name"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="surname" className="form-label">Surname</label>
            <input
              type="text"
              id="surname"
              className="form-control"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              placeholder="Enter your surname"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="birthYear" className="form-label">Birth Year</label>
            <input
              type="year"
              id="birthYear"
              className="form-control"
              value={birthYear}
              onChange={(e) => setBirthYear(e.target.value)}
              required
            />
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
          <button type="submit" className="btn btn-success w-100">
            Control On E-Devlet
          </button>
          <p className="text-center mt-3">
              Already have an account? <a href="/login">Login</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ControlUser;
