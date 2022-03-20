import React, { useState, useEffect } from "react";
import { DatasetListItem } from "../DatasetListItem";
import { API_BASE_URL } from "../../constants";

export const DatasetTab = () => {
  const [datasets, setDatasets] = useState([]);
  const [fetchComplete, setFetchComplete] = useState(false);

  useEffect(() => {
    fetchDatasets();
  }, []);

  const fetchDatasets = () => {
    const token = sessionStorage.getItem("token");

    fetch(`${API_BASE_URL}/filter-task`, {
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
        setDatasets(
          json.filter((dataset) => {
            return !dataset.is_error;
          })
        );
      });
  };

  const capitalizeFirstLetters = (title) => {
    const splitTitle = title.toLowerCase().split(" ");

    for (let i = 0; i < splitTitle.length; i++) {
      splitTitle[i] =
        splitTitle[i].charAt(0).toUpperCase() + splitTitle[i].substring(1);
    }

    return splitTitle.join(" ");
  };

  return (
    <div className="first-tab">
      {fetchComplete &&
        datasets.map((dataset) => {
          return (
            <DatasetListItem
              key={dataset.id}
              datasetId={dataset.id}
              title={capitalizeFirstLetters(dataset.keywords)}
              date={dataset.created.split("T")[0]}
              showLoadingIndicator={!dataset.is_complete}
            />
          );
        })}
      {fetchComplete && datasets.length === 0 && (
        <p className="center-text">
          You have no datasets. Enter keywords into the input above to generate
          a new dataset.
        </p>
      )}
    </div>
  );
};
