import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

export const Header = ({ showProfileIcon }) => {
  return (
    <div className="dms-header flex-row-sb">
      <p id="header" className="dms-header-title">
        Data Mining System
      </p>
      {showProfileIcon && (
        <FontAwesomeIcon
          id="profile-icon"
          icon={faUserCircle}
          size="2x"
          className="dms-icon"
        />
      )}
    </div>
  );
};
