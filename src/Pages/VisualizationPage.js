import React, { useState, useEffect } from "react";
import { Header } from "../Components/Header";
import { API_BASE_URL } from "../constants";
import { Scatter } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
import { useNavigate } from "react-router-dom";
ChartJS.register(...registerables);

export const VisualizationPage = () => {
  const [dataPoints, setDataPoints] = useState([]);
  const token = sessionStorage.getItem("token");

  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("token") === null) {
      navigate("/");
    }

    fetchChartData();
  }, []);

  const fetchChartData = () => {
    fetch(`${API_BASE_URL}/visualize`, {
      // TODO: Update with payload if needed
      method: "GET",
      headers: {
        Authorization: token,
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        mapEachDataPointToObject(json);
      });
  };

  const mapEachDataPointToObject = (apiResponseData) => {
    let dataPoints = [];

    if (!apiResponseData.labels || !apiResponseData.x || !apiResponseData.y)
      return;

    for (let i = 0; i < apiResponseData.labels.length; i++) {
      dataPoints.push({
        x: apiResponseData.x[i],
        y: apiResponseData.y[i],
        label: apiResponseData.labels[i],
      });
    }

    setDataPoints(dataPoints);
  };

  return (
    <div>
      <Header showProfileIcon />
      <div className="chart-container">
        <Scatter
          data={{
            datasets: [
              {
                label: "Scatter Dataset",
                data: dataPoints,
                backgroundColor: "#63b9de",
              },
            ],
          }}
          options={{
            plugins: {
              title: {
                display: true,
                text: "Visualization Results",
              },
              legend: {
                display: false,
              },
              tooltip: {
                callbacks: {
                  label: function (tooltipItem) {
                    const label = tooltipItem.raw.label;
                    return label;
                  },
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};
