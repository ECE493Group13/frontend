import React, { useState, useEffect } from "react";
import { Header } from "../Components/Header";
import { Button } from "../Components/Button";
import { API_BASE_URL } from "../constants";
import { useLocation } from "react-router-dom";

export const AnalogyTestPage = () => {
  const [wordA, setWordA] = useState("");
  const [wordB, setWordB] = useState("");
  const [wordC, setWordC] = useState("");
  const [trainedModelId, setTrainedModelId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [count, setCount] = useState(500);
  const [analogyTestResults, setAnalogyTestResults] = useState([]);

  const route = useLocation();

  useEffect(() => {
    setWordA(route.state?.word_a);
    setWordB(route.state?.word_b);
    setTrainedModelId(route.state?.trained_model_id);
  }, []);

  const getAnalogyTest = () => {
    if (!isFormValid()) return;
    const token = sessionStorage.getItem("token");

    fetch(
      `${API_BASE_URL}/verify/analogy-test?word_a=${wordA}&word_b=${wordB}&word_c=${wordC}&trained_model_id=${trainedModelId}&  count=${count}`,
      {
        method: "GET",
        headers: {
          Authorization: token,
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          // TODO: Error handling
          throw new Error("HTTP status " + response.status);
        }
        return response.json();
      })
      .then((json) => {
        setAnalogyTestResults(json);
      });
  };

  const isFormValid = () => {
    if (wordC === "") {
      setErrorMessage("Please enter a word");
      return false;
    } else {
      setErrorMessage("");
      return true;
    }
  };

  return (
    <div>
      <Header showProfileIcon />
      <p className="dms-page-title">Analogy Test</p>
      <p className="dms-double-input-form-subtitle">
        Enter a third word below to perform an analogy test on the given words.
      </p>
      <p className="analogy-test-paragraph">
        <span className="analogy-test-word-highlight">{wordA}</span> is to{" "}
        <span className="analogy-test-word-highlight">{wordB}</span> as...
      </p>
      {analogyTestResults.length === 0 && (
        <div className="analogy-test-form-container">
          <form onSubmit={getAnalogyTest} id="analogy-test-form">
            <div className="flex-row-sb">
              <input
                id="closest-word-input"
                type="text"
                placeholder="Word is to..."
                className="dms-text-input"
                required
                autoComplete="true"
                value={wordC}
                onInput={(e) => setWordC(e.target.value)}
              />
              <input
                id="num-closest-word-input"
                type="number"
                placeholder="n"
                className="dms-text-input"
                required
                autoComplete="true"
                value={count}
                onInput={(e) => setCount(e.target.value)}
              />
            </div>
            <p className="error-message">{errorMessage}</p>
            <div className="dms-double-input-form-button">
              <Button
                id="submitButton"
                buttonText="Submit"
                onClick={getAnalogyTest}
              ></Button>
            </div>
          </form>
        </div>
      )}
      <div>
        {analogyTestResults.length > 0 && (
          <p className="analogy-test-paragraph">
            <span className="analogy-test-word-highlight">{wordC}</span> is
            to...
          </p>
        )}
        <table className="closest-analogies-table">
          <tbody>
            {analogyTestResults.length > 0 && (
              <tr>
                <th>Word</th>
                <th>Proximity</th>
              </tr>
            )}
            {analogyTestResults.map((wordProximity, index) => {
              return (
                <tr
                  onClick={() => startAnalogyTest(wordProximity.word)}
                  key={index}
                >
                  <td>{wordProximity.word}</td>
                  <td>{wordProximity.proximity}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
