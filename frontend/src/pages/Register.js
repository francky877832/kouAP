import React, { useContext, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { UserContext } from "../context/UserContext";
import Loading from "../components/Loading";
import { useLocation, useNavigate } from "react-router-dom";

const Register = () => {
    const { signUpUser } = useContext(UserContext)
    const location = useLocation()
    const navigate = useNavigate()

  const { tcID, name, surname, birthYear } = location.state || {};
  const [formData, setFormData] = useState({
    email: "",
    phoneNumber: "",
    address: "",
    password: "",
    confirmPassword: "",
    role: "user",
    cv: null,
  });
  const [isLoading, setIsLoading] = useState(false)

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      cv: e.target.files[0],
    }));
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.email) newErrors.email = "L'email est requis.";
    if (!formData.phoneNumber) newErrors.phoneNumber = "Le numéro de téléphone est requis.";
    if (!formData.address) newErrors.address = "L'adresse est requise.";
    if (!formData.password) newErrors.password = "Le mot de passe est requis.";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas.";
    if (formData.role === "user" && !formData.cv) {
      newErrors.cv = "Le CV est requis pour les utilisateurs.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true)
    const data = new FormData();
    data.append("tcID", formData.tcID);
    data.append("name", formData.name);
    data.append("surname", formData.surname);
    data.append("birthYear", formData.birthYear);
    data.append("email", formData.email);
    data.append("phoneNumber", formData.phoneNumber);
    data.append("address", formData.address);
    data.append("password", formData.password);
    data.append("role", formData.role);
    if (formData.cv) {
      data.append("cv", formData.cv);
    }

    const res = await signUpUser(data)

    if(res)
    {
        navigate("/apply", {
            state: {user:res},
          });
    }

    setIsLoading(false)
};

if(isLoading)
{
    return <Loading/>
}

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4 shadow">
            <h2 className="text-center">Inscription</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="mb-3">
                <label className="form-label">Email:</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                {errors.email && <div className="text-danger">{errors.email}</div>}
              </div>
              
              <div className="mb-3">
                <label className="form-label">Téléphone:</label>
                <input
                  type="text"
                  name="phoneNumber"
                  className="form-control"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                />
                {errors.phoneNumber && <div className="text-danger">{errors.phoneNumber}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label">Adresse:</label>
                <input
                  type="text"
                  name="address"
                  className="form-control"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
                {errors.address && <div className="text-danger">{errors.address}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label">Mot de passe:</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                {errors.password && <div className="text-danger">{errors.password}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label">Confirmer le mot de passe:</label>
                <input
                  type="password"
                  name="confirmPassword"
                  className="form-control"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
                {errors.confirmPassword && <div className="text-danger">{errors.confirmPassword}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label">Rôle:</label>
                <select name="role" className="form-select" value={formData.role} onChange={handleChange}>
                  <option value="user">Utilisateur</option>
                  <option value="admin">Admin</option>
                  <option value="jury">Jury</option>
                  <option value="manager">Manager</option>
                </select>
              </div>

              {formData.role === "user" && (
                <div className="mb-3">
                  <label className="form-label">CV:</label>
                  <input
                    type="file"
                    name="cv"
                    className="form-control"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                  />
                  {errors.cv && <div className="text-danger">{errors.cv}</div>}
                </div>
              )}

              <button type="submit" className="btn btn-primary w-100">S'inscrire</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;