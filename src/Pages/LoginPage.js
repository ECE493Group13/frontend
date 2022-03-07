import React, { useState } from "react";
import { API_BASE_URL } from "../constants";
import { Button } from "../Components/Button";

export const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPasswrod] = useState("");

  const onLogin = () => {
    fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      body: JSON.stringify({
        username: username,
        password: password,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((message) => {
        // TODO: do something with the response
        console.log(message);
      });
  };

  return (
    <div className="dark-background">
      <div className="login-form-container">
        <p className="login-form-title">Data Mining System</p>
        <form onSubmit={onLogin}>
          <input
            type="text"
            placeholder="Username"
            className="login-text-input"
            onInput={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="login-text-input"
            onInput={(e) => setPasswrod(e.target.value)}
          />
          <div className="login-form-button">
            <Button buttonText="Log in" onClick={(e) => onLogin(e)}></Button>
          </div>
        </form>
        <p className="request-account-button">No account? Get started here</p>
      </div>
    </div>
  );
};
