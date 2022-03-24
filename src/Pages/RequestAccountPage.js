import React, { useState } from "react";
import { API_BASE_URL } from "../constants";
import { DoubleInputFormCard } from "../Components/DoubleInputFormCard";
import { useNavigate } from "react-router-dom";

export const RequestAccountPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const onInputChange = (username, email) => {
    setUsername(username);
    setEmail(email);
  };

  const onRequestAccount = () => {
    fetch(`${API_BASE_URL}/register`, {
      method: "POST",
      body: JSON.stringify({
        username: username,
        email: email,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((response) => {
      if (!response.ok) {
        if (response.status === 409) {
          setErrorMessage("Username or email already exists.");
        } else {
          setErrorMessage(
            "There was an error processing your request. Please try again later"
          );
        }
        throw new Error("HTTP status " + response.status);
      }
      // TODO: would be nice to show toast on success
      navigate("/");
    });
  };

  return (
    <div className="dark-background">
      <div className="login-form-card-margin-top">
        <DoubleInputFormCard
          onInputChange={onInputChange}
          title="Request Account"
          subtitle="You will be notified by email if your request is accepted or rejected"
          placeholder1="Username"
          placeholder2="Email"
          buttonText="Request Account"
          onSubmit={onRequestAccount}
          height={errorMessage === "" ? 340 : 370}
          errorMessage={errorMessage}
        />
      </div>
    </div>
  );
};
