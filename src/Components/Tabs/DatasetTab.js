import React from "react";
import { DatasetListItem } from "../DatasetListItem";

export const DatasetTab = () => {
  const fakeDatasetList = [
    {
      id: 1,
      date: "02/22/2022",
      title: "Back Pain",
      taskCompleted: true,
    },
    {
      id: 2,
      date: "02/10/2022",
      title: "Nausea",
      taskCompleted: false,
    },
  ];

  return (
    <div className="first-tab">
      {fakeDatasetList.map((dataset) => {
        return (
          <DatasetListItem
            key={dataset.id}
            datasetId={dataset.id}
            title={dataset.title}
            date={dataset.date}
            showLoadingIndicator={!dataset.taskCompleted}
          />
        );
      })}
    </div>
  );
};
