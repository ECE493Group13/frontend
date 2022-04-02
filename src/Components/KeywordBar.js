import React, { useState } from "react";
import { API_BASE_URL } from "../constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export const KeywordBar = () => {
  const [input, setInput] = useState("");

  const onSubmitKeywords = (e) => {
    if (input === "") return;

    e.preventDefault();
    const keywords = input.toLowerCase().split(/\s+/);

    const token = sessionStorage.getItem("token");
    fetch(`${API_BASE_URL}/filter-task`, {
      method: "POST",
      body: JSON.stringify({
        keywords,
      }),
      headers: {
        Authorization: token,
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("HTTP status " + response.status);
        }
        return response.json();
      })
      .then((json) => {
        if (json.is_error) {
          // TODO: Would be nice to show a toast on error
          console.log("ERROR");
        }
        window.location.reload(false);
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
