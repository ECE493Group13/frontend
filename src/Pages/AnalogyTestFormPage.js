import React, { useState } from "react";
import { Header } from "../Components/Header";
import { Button } from "../Components/Button";
import { API_BASE_URL } from "../constants";

export const AnalogyTestFormPage = () => {
  const [domain1Name, setDomain1Name] = useState("");
  const [domain1Words, setDomain1Words] = useState("");
  const [domain2Name, setDomain2Name] = useState("");
  const [domain2Words, setDomain2Words] = useState("");
  const [domain3Name, setDomain3Name] = useState("");
  const [domain3Words, setDomain3Words] = useState("");

  const postFormData = () => {
    const token = sessionStorage.getItem("token");

    // TODO: Update url when API is ready
    fetch(`${API_BASE_URL}/analogy-test`, {
      method: "POST",
      body: JSON.stringify({
        domain1_name: domain1Name,
        domain1_words: domain1Words,
        domain2_name: domain2Name,
        domain2_words: domain2Words,
        domain3_name: domain3Name,
        domain3_words: domain3Words,
      }),
      headers: {
        Authorization: token,
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        if (!response.ok) {
          // TODO: Error handling
          throw new Error("HTTP status " + response.status);
        }
        return response.json();
      })
      .then((json) => {
        // TODO: Do something with the response
        console.log(json);
        navigate(`/home`);
      });
  };

  return (
    <div>
      <Header showProfileIcon />
      <p className="dms-page-title">Analogy Testing</p>
      <p className="dms-double-input-form-subtitle">
        Complete the form below to...
      </p>
      <div className="analogy-test-form-container">
        <form onSubmit={postFormData} id="analogy-test-form">
          <p className="p-no-padding">Domain 1</p>
          <input
            id="domain-name-input-1"
            type="text"
            placeholder="Domain Name"
            className="dms-text-input"
            required
            autoComplete="true"
            value={domain1Name}
            onInput={(e) => setDomain1Name(e.target.value)}
          />
          <input
            id="domain-words-input-1"
            type="text"
            placeholder="Space separated target words"
            className="dms-text-input"
            required
            autoComplete="true"
            value={domain1Words}
            onInput={(e) => setDomain1Words(e.target.value)}
          />
          <p>Domain 2</p>
          <input
            id="domain-name-input-2"
            type="text"
            placeholder="Domain Name"
            className="dms-text-input"
            required
            autoComplete="true"
            value={domain2Name}
            onInput={(e) => setDomain2Name(e.target.value)}
          />
          <input
            id="domain-words-input-2"
            type="text"
            placeholder="Space separated target words"
            className="dms-text-input"
            required
            autoComplete="true"
            value={domain2Words}
            onInput={(e) => setDomain2Words(e.target.value)}
          />
          <p>Domain 3</p>
          <input
            id="domain-name-input-3"
            type="text"
            placeholder="Domain Name"
            className="dms-text-input"
            required
            autoComplete="true"
            value={domain3Name}
            onInput={(e) => setDomain3Name(e.target.value)}
          />
          <input
            id="domain-words-input-3"
            type="text"
            placeholder="Space separated target words"
            className="dms-text-input"
            required
            autoComplete="true"
            value={domain3Words}
            onInput={(e) => setDomain3Words(e.target.value)}
          />
          <div className="dms-double-input-form-button">
            <Button
              id="submitButton"
              buttonText="Submit"
              onClick={postFormData}
            ></Button>
          </div>
        </form>
      </div>
    </div>
  );
};
