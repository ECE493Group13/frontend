import React, { useState } from "react";
import { API_BASE_URL } from "../constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export const KeywordBar = () => {
  const [input, setInput] = useState("");

  const onSubmitKeywords = (e) => {
    e.preventDefault(); // Prevent full page load on form submit
    const keywords = input.split(/\s+/);

    // TODO: Match the URL to the API in Flask app
    fetch(`${API_BASE_URL}/data/filter`, {
      method: "POST",
      body: JSON.stringify({
        keywords,
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
    <form onSubmit={onSubmitKeywords}>
      <div className="flex-row-sb">
        <input
          type="text"
          placeholder="Space separated keywords..."
          className="dms-keyword-bar"
          value={input}
          onInput={(e) => setInput(e.target.value)}
        />
        <button className="keyword-submit-button" onClick={onSubmitKeywords}>
          <FontAwesomeIcon icon={faPlus} size="lg" color="white" />
        </button>
      </div>
    </form>
  );
};
