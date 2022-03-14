import React from "react";
import { DatasetListItem } from "../DatasetListItem";

export const DatasetTab = () => {
  const fakeDatasetList = [
    {
      date: "02/22/2022",
      title: "Back Pain",
      taskCompleted: true,
    },
    {
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
            key={dataset.title}
            title={dataset.title}
            date={dataset.date}
            showLoadingIndicator={!dataset.taskCompleted}
          />
        );
      })}
    </div>
  );
};
