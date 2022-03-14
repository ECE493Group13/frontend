import React from "react";
import { Button } from "../Components/Button";
import { Header } from "../Components/Header";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../constants";

export const ProfilePage = () => {
  const navigate = useNavigate();

  const onRequestLogout = () => {
    fetch(`${API_BASE_URL}/logout`, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((message) => {
        // TODO: do something with the response
        console.log(message);
      });

    navigate("/");
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
