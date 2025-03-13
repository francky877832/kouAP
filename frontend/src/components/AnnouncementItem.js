import React from "react";
import { Link } from "react-router-dom";
import { titles } from "../datas/schoolDepartments";

const AnnouncementItem = ({ announcement, user, formatDate }) => {
    const daysRemaining = Math.max(
        Math.ceil((new Date(announcement.deadline) - new Date()) / (1000 * 60 * 60 * 24)),
        0
    );

    return (
        <Link
            to={`/view-announcement`}
            className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
            state={{ announcement, user }}
        >
            <div>
                <h5 className="mb-1">
                    {announcement.title}
                    <i className="text-muted"> - {daysRemaining} {daysRemaining === 1 ? "day" : "days"} left</i>
                </h5>
                <p className="mb-1 text-muted">
                    <b>Posted on: {formatDate(announcement.startingDate)}</b>
                </p>
                <p className="mb-1 text-danger" style={{ color: "rgb(200, 50, 50)" }}>
                    Ends on: {formatDate(announcement.deadline)}
                </p>
            </div>
            <span className="badge bg-primary">{(titles.find(el => el._id==announcement.position)).label}</span>
        </Link>
    );
};

export default AnnouncementItem;
