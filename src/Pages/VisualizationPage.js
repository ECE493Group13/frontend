import React, { useState, useEffect } from "react";
import { Header } from "../Components/Header";
import { API_BASE_URL } from "../constants";
import { Scatter } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
ChartJS.register(...registerables);

export const VisualizationPage = () => {
  const [data, setData] = useState([]);
  const token = sessionStorage.getItem("token");

  useEffect(() => {
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

  const mapEachDataPointToObject = (rawData) => {
    let data = [];

    if (!rawData.labels || !rawData.x || !rawData.y) return;

    for (let i = 0; i < rawData.labels.length; i++) {
      data.push({
        x: rawData.x[i],
        y: rawData.y[i],
        label: rawData.labels[i],
      });
    }

    setData(data);
  };

  const chartData = {
    datasets: [
      {
        label: "Scatter Dataset",
        data: data,
        backgroundColor: "#63b9de",
      },
    ],
  };

  return (
    <div>
      <Header showProfileIcon />
      <div className="chart-container">
        <Scatter
          data={chartData}
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
                    var label = tooltipItem.raw.label;
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
