import React, { useState, useEffect } from "react";
import { ModelListItem } from "../ModelListItem";
import { API_BASE_URL } from "../../constants";

export const ModelsTab = () => {
  const [models, setModels] = useState([]);
  const [fetchComplete, setFetchComplete] = useState(false);

  useEffect(() => {
    fetchDatasets();
  }, []);

  const fetchDatasets = () => {
    const token = sessionStorage.getItem("token");

    fetch(`${API_BASE_URL}/train-task`, {
      method: "GET",
      headers: {
        Authorization: token,
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        setFetchComplete(true);
        if (!response.ok) {
          throw new Error("HTTP status " + response.status);
        }
        return response.json();
      })
      .then((json) => {
        setModels(
          json.filter((model) => {
            return !model.is_error;
          })
        );
      });
  };

  return (
    <div className="second-tab">
      {fetchComplete &&
        models.map((model) => {
          return (
            <ModelListItem
              key={model.id}
              title={model.id}
              hyperparameters={JSON.parse(model.hparams)}
              date={model.created.split("T")[0]}
              showLoadingIndicator={!model.is_complete}
            />
          );
        })}
      {fetchComplete && models.length === 0 && (
        <p className="center-text">
          You have no models. Train your datasets to generate a new model.
        </p>
      )}
    </div>
  );
};
