import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import InlineLoading  from "./InlineLoading"; // Ton composant de chargement
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { FaBell } from "react-icons/fa";
import { NotificationsContext } from "../context/NotificationsContext";

const NotificationIcon = () => {
  const navigate = useNavigate();
  const { unreadNotif, isUnreadNotifLoading } = useContext(NotificationsContext);

  return (
    <OverlayTrigger
      placement="bottom"
      overlay={<Tooltip>See notifications</Tooltip>}
    >
      <div
        className="position-relative"
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/system/notifications")}
      >
        {isUnreadNotifLoading ? (
          <InlineLoading />
        ) : (
          <>
            <FaBell size={24} color={unreadNotif > 0 ? "#222" : "#000"} />
            {unreadNotif > 0 && (
              <span
                className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                style={{ fontSize: "12px", minWidth: "20px" }}
              >
                {unreadNotif}
              </span>
            )}
          </>
        )}
      </div>
    </OverlayTrigger>
  );
};

export default NotificationIcon;
