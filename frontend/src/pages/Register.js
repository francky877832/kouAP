import React, { useContext, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { UserContext } from "../context/UserContext";
import Loading from "../components/Loading";
import { useLocation, useNavigate } from "react-router-dom";

const Register = () => {
    const { signUpUser } = useContext(UserContext);
    const location = useLocation();
    const navigate = useNavigate();

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
    const [isLoading, setIsLoading] = useState(false);
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
        if (!formData.email) newErrors.email = "Email is required.";
        if (!formData.phoneNumber) newErrors.phoneNumber = "Phone number is required.";
        if (!formData.address) newErrors.address = "Address is required.";
        if (!formData.password) newErrors.password = "Password is required.";
        if (formData.password !== formData.confirmPassword)
            newErrors.confirmPassword = "Passwords do not match.";
        if (formData.role === "user" && !formData.cv) {
            newErrors.cv = "CV is required for users.";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm() || !formData.cv) return;

        setIsLoading(true);
        const data = new FormData();
        data.append("tcID", "tcID");
        data.append("name", "name");
        data.append("surname", "surname");
        data.append("birthYear", "12-03-2004");

        data.append("email", formData.email);
        data.append("phoneNumber", formData.phoneNumber);
        data.append("address", formData.address);
        data.append("password", formData.password);
        data.append("role", formData.role);
        data.append("cv", formData.cv);
       // console.log(formData.email)

        const res = await signUpUser(data);

        if (res) {
            //navigate("/", { state: { user: res } });
        }

        setIsLoading(false);
    };

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card p-4 shadow">
                        <h2 className="text-center">Register</h2>
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
                                <label className="form-label">Phone Number:</label>
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
                                <label className="form-label">Address:</label>
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
                                <label className="form-label">Password:</label>
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
                                <label className="form-label">Confirm Password:</label>
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
                                <label className="form-label">Role:</label>
                                <select name="role" className="form-select" value={formData.role} disabled>
                                    <option value="user">User</option>
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

                            <button type="submit" className="btn btn-primary w-100">Register</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
