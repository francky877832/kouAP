import React, { useContext, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation, useNavigate } from "react-router-dom";
import RequiredDocumentsCheckbox from "../components/RequiredDocumentsCheckbox";
import { UserContext } from "../context/UserContext";
import { facultyDepartments } from "../datas/schoolDepartments";
import { titles } from "../datas/schoolDepartments";
import { server } from "../remote/server";
import Loading from "../components/Loading";
import UserMenu from "./UserMenu";
import { AdminContext } from "../context/AdminContext";
import { formatDateForInput, formatDateForInput2 } from "../utils/utilsFunctions";

const AnnouncementForm = () => {
  const navigate = useNavigate()
  const location = useLocation();
  const { announcement } = location.state || {}; 

  const [faculty, setFaculty] = useState("");
  const [department, setDepartment] = useState("");
  const [position, setPosition] = useState("");
 
  const [isLoading, setIsLoading] = useState(false)

  const { user, isAuthenticated, facultyGroups} = useContext(UserContext)
  const { createAnnouncement } = useContext(AdminContext)
  

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    deadline: formatDateForInput2(announcement.deadline),
    startingDate: "",
    cv : true,
    indexedPublications: false,
    citationsProof: false,
    conferenceProof: false,
    recommendationLetters: false,
    administrativeExperienceProof: false,
  });

  useEffect(() => {
    if (announcement) {
      setFaculty(announcement.faculty || "Faculty of Technology");
      setDepartment(announcement.department || "Information Systems and Engineering");
      setPosition(announcement.position || "");
      setFormData({
        title: announcement.title || "",
        description: announcement.description || "",
        deadline: announcement.deadline || "",
        startingDate: announcement.startingDate || "",
      });
    }
  }, [announcement]);

  

  // Update form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckBoxChange = (event) => {
    const { name, checked } = event.target;
    setFormData({
      ...formData,
      [name]: checked,
    });
  };

  // Handle faculty change and reset department
  const handleFacultyChange = (e) => {
    setFaculty(e.target.value);
    setDepartment(""); // Reset department when faculty changes
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newAnnouncement = {
      title: formData.title,
      description: formData.description,
      position : titles.find(el => el.value==position)._id,
      faculty: faculty,
      department: department,
      deadline: formData.deadline,
      startingDate : formData.startingDate,
      postedBy : user._id,
    };

      setIsLoading(true)
      const res = await createAnnouncement(newAnnouncement)
      if(res)
      {
        alert("Announcement has been posted successfully.")
        navigate('/home')
      }
      else{
        alert("An error occured while creating the announcement.")
      }
      setIsLoading(false)

    
      
  };

  if(isLoading)
  {
    return <Loading/>
  }
  //console.log(facultyGroups)

  return (
    <div className="container mt-5">
        <UserMenu user={user} isAuthenticated={isAuthenticated} />
      <div className="card shadow-lg p-4">

        <h2 className="text-center">{announcement ? 'Edit' : 'Add'} Announcement</h2>
        <form onSubmit={handleSubmit}>
          {/* Announcement Title */}
          <div className="mb-3">
            <label className="form-label">Announcement Title</label>
            <input
              type="text"
              className="form-control"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          {/* Open Position */}
          <div className="mb-3">
            <label className="form-label">Open Position</label>
            <select className="form-select" value={position} onChange={(e) => setPosition(e.target.value)} required>
              <option value="">Select a position</option>
              {titles.map((position) => (
                <option key={position.value} value={position.value}>
                  {position.label}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          {/* Faculty */}
          <div className="mb-3">
            <label className="form-label">Faculty</label>
            <select className="form-select" value={faculty} onChange={handleFacultyChange} required>
              <option value="">Select a faculty</option>
              {facultyGroups?.map((fac, index) => (
                <option key={index} value={fac._id}>
                  {fac?.faculties?.map(el => el.name+", ")}
                </option>
              ))}
            </select>
          </div>

          {/* Department 
          <div className="mb-3">
            <label className="form-label">Department</label>
            <select
              className="form-select"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              disabled={!faculty}
              required
            >
              <option value="">Select a department</option>
              {faculty &&
                facultyDepartments[faculty].map((dep) => (
                  <option key={dep} value={dep}>
                    {dep}
                  </option>
                ))}
            </select>
          </div>
        */}

        {/* required doc */}

          {/*<RequiredDocumentsCheckbox formData={formData} handleChange={handleCheckBoxChange} />*/}



        {/* Application Deadline */}

        {!announcement &&
            <div className="mb-3">
              <label className="form-label">Application Starting Date</label>
              <input
                type="date"
                className="form-control"
                name="startingDate"
                value={formData.startingDate}
                onChange={handleChange}
                required
              />
            </div>
          }


          <div className="mb-3">
            <label className="form-label">Application Deadline</label>
            <input
              type="date"
              className="form-control"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              required
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-100">
          {announcement ? 'Update' : 'Publish'} Announcement
          </button>
        </form>
      </div>
    </div>
  );
};

export default AnnouncementForm;
