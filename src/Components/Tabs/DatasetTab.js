import React, { useState, useEffect } from "react";
import { DatasetListItem } from "../DatasetListItem";
import { API_BASE_URL } from "../../constants";
import { LoadingIndicator } from "../LoadingIndicator";

export const DatasetTab = () => {
  const [datasets, setDatasets] = useState([]);
  const [fetchComplete, setFetchComplete] = useState(false);
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    fetchDatasets();
  }, []);

  const fetchDataset = (datasetId) => {
    fetch(`${API_BASE_URL}/filter-task/${datasetId}`, {
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
        if (!json.is_complete) {
          setTimeout(fetchDataset(datasetId), 1000);
        } else {
          fetchDatasets();
        }
      });
  };

  const fetchDatasets = () => {
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
        const incompleteDatasets = json.filter(
          (dataset) => !dataset.is_complete
        );
        incompleteDatasets.forEach((dataset) => {
          fetchDataset(dataset.id);
        });
        setDatasets(
          json
            .filter((dataset) => !dataset.is_error)
            .sort(function (a, b) {
              return (
                new Date(a.created).getTime() - new Date(b.created).getTime()
              );
            })
            .reverse() // Want to view newest first
        );
      });
  };

  const capitalizeFirstLetters = (title) => {
    return title
      .toLowerCase()
      .split(" ")
      .map((token) => token.charAt(0).toUpperCase() + token.substring(1))
      .join(" ");
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
      {/* Fetch is complete but there are no results */}
      {fetchComplete && datasets.length === 0 && (
        <p className="center-text">
          You have no datasets. Enter keywords into the input above to generate
          a new dataset.
        </p>
      )}
      {/* Show loading indicator until fetch is complete */}
      {!fetchComplete && <LoadingIndicator style={{ marginTop: "65px" }} />}
    </div>
  );
};
