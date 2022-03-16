import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export const Header = ({ showProfileIcon, token }) => {
  const navigate = useNavigate();

  const openProfilePage = () => {
    navigate("/profile", { state: { token } });
  };

  const routeHome = () => {
    navigate("/home");
  };

  return (
    <div className="dms-header flex-row-sb">
      <p className="dms-header-title" onClick={routeHome}>
        Data Mining System
      </p>
      {showProfileIcon && (
        <FontAwesomeIcon
          icon={faUserCircle}
          size="2x"
          className="dms-icon"
          onClick={openProfilePage}
        />
      )}
    </div>
  );
};
