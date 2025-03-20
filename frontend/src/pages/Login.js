import React, { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/loginStyles.css";
import { UserContext } from "../context/UserContext";
import Loading from "../components/Loading";

const Login = () => {

  const { loginUser } = useContext(UserContext);

  const [tcID, setTcID] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {

    e.preventDefault();
    setIsLoading(true)
    if (!tcID || !password) {
      setError("Please fill in all fields.");
      return;
    }


    const data = {tcID, password}
    const res = await loginUser(data);

    if (res) {
      //navigate("/", { state: { user: res } });
    }

    setIsLoading(false)

    setError(""); // Reset error after submission
  };


  if(isLoading)
  {
    return <Loading/>
  }

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="tcID" className="form-label">
              TC ID
            </label>
            <input
              type="text"
              id="tcID"
              className="form-control"
              value={tcID}
              onChange={(e) => setTcID(e.target.value)}
              placeholder="Enter your TC ID"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
