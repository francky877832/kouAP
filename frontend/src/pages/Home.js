import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom"; 
import "bootstrap/dist/css/bootstrap.min.css";
import '../styles/homeStyles.css'
import Loading from "../components/Loading";
import InlineLoading from "../components/InlineLoading";
import { AdminContext } from "../context/AdminContext";
import { formatDate } from "../utils/utilsFunctions";
import AnnouncementItem from "../components/AnnouncementItem";


const fetchAnnouncements = async () => {
  return [
    {_id: 1, title: "Assistant Professor in Computer Science", date: "2025-02-01" },
    {_id: 2, title: "Associate Professor in Mechanical Engineering", date: "2025-02-05" },
    {_id: 3, title: "Professor in Physics", date: "2025-02-08" },
    {_id: 4, title: "Assistant Professor in Electrical Engineering", date: "2025-02-10" },
    {_id: 5, title: "Associate Professor in Mathematics", date: "2025-02-15" },
    {_id: 6, title: "Professor in Chemistry", date: "2025-02-18" }, // Extra for testing
  ];
};

const Home = () => {
    const [announcements, setAnnouncements] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const { fetchAnnouncements } = useContext(AdminContext)
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 10
  

  useEffect(() => {
    const getAnnouncements = async () => {
      const data = await fetchAnnouncements(page, limit);
      setAnnouncements(data.data);
      setTotalPages(data.totalPages);
      setIsLoading(false)
    };
    getAnnouncements();
  }, [page]);


  

  return (
    <div className="container mt-5">
      <div className="text-center">
        <h1 className="display-4">Welcome to KOU Akademik Personel</h1>
        <p className="lead">Your portal for academic job opportunities at KOU University</p>
        <hr />
        <p className="text-muted">
          Here you can find the latest academic position announcements for faculty members. Stay updated on open roles in various
          disciplines and apply to be a part of our esteemed faculty.
        </p>
      </div>

      <div className="mt-5">
        <h2 className="text-center mb-4">Latest Announcements</h2>

        {isLoading ? <InlineLoading/> : 
          <div className="list-group">
            {announcements.slice(0, 5).map((announcement) => (
                <AnnouncementItem key={announcement._id} announcement={announcement} formatDate={formatDate} />
            ))}
          </div>
        }

        <div className="text-center mt-4">
          <a href="/all-announcements" className="btn btn-primary btn-lg">
            More Announcements
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
