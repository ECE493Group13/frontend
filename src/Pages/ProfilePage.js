import React from "react";
import { Button } from "../Components/Button";
import { Header } from "../Components/Header";
import { useNavigate, useLocation } from "react-router-dom";
import { API_BASE_URL } from "../constants";

export const ProfilePage = () => {
  const navigate = useNavigate();
  const route = useLocation();

  const token = route.state.token;

  const onRequestLogout = () => {
    fetch(`${API_BASE_URL}/auth/logout`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((response) => {
      if (!response.ok) {
        throw new Error("HTTP status " + response.status);
      }
      navigate("/");
    });
  };

  return (
    <div>
      <Header showProfileIcon />
      <div className="logout-button">
        <Button buttonText={"Logout"} onClick={onRequestLogout} />
      </div>
    </div>
  );
};
