import React, { useState } from "react";
import { API_BASE_URL } from "../constants";
import { DoubleInputFormCard } from "../Components/DoubleInputFormCard";

export const RequestAccountPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const onInputChange = (username, email) => {
    setUsername(username);
    setEmail(email);
  };

  const onRequestAccount = () => {
    // TODO: Update with URL from api when its ready
    fetch(`${API_BASE_URL}/register`, {
      method: "POST",
      body: JSON.stringify({
        username: username,
        email: email,
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
      <div className="login-form-card-margin-top">
        <DoubleInputFormCard
          onInputChange={onInputChange}
          title="Request Account"
          subtitle="You will be notified if your request is accepted or rejected"
          placeholder1="Username"
          placeholder2="Email"
          buttonText="Request Account"
          onSubmit={onRequestAccount}
          height={340}
        />
      </div>
    </div>
  );
};
