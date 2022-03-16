import React, { useState } from "react";
import { DoubleInputFormCard } from "../Components/DoubleInputFormCard";
import { Header } from "../Components/Header";
import { useNavigate, useLocation } from "react-router-dom";
import { API_BASE_URL } from "../constants";

export const ChangePasswordPage = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const route = useLocation();

  const token = route.state.token;

  const onInputChange = (oldPassword, newPassword) => {
    setOldPassword(oldPassword);
    setNewPassword(newPassword);
  };

  const isValidPassword = () => {
    const passwordStrengthRegex = new RegExp(
      "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})"
    );

    const isValidPassword = passwordStrengthRegex.test(newPassword);

    if (!isValidPassword) {
      setErrorMessage(
        "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one digit and one special character."
      );
    }

    return isValidPassword;
  };

  const onChangePassword = () => {
    if (!isValidPassword()) return;

    fetch(`${API_BASE_URL}/auth/update-password`, {
      method: "POST",
      body: JSON.stringify({
        old_password: oldPassword,
        new_password: newPassword,
      }),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        if (!response.ok) {
          setErrorMessage(
            "There was an error processing this request. Please try again later."
          );
          throw new Error("HTTP status " + response.status);
        }
        return response.json();
      })
      .then((json) => {
        const token = json && json.token ? json.token : "";
        navigate("/home", { state: { token } });
      });
  };

  return (
    <div>
      <Header></Header>
      <div className="change-password-card-margin-top">
        <DoubleInputFormCard
          onInputChange={onInputChange}
          title="Reset Password"
          subtitle="DMS has detected a temporary password, please reset it before continuing"
          placeholder1="Old password"
          placeholder2="New password"
          buttonText="Submit"
          onSubmit={onChangePassword}
          placeholder1IsPass
          placeholder2IsPass
          height={errorMessage === "" ? 340 : 370}
          errorMessage={errorMessage}
        />
      </div>
    </div>
  );
};
