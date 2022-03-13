import React from "react";
import { ModelListItem } from "../ModelListItem";

export const SecondTab = () => {
  const fakeModelList = [
    {
      date: "02/22/2022",
      title: "Back Pain",
      hyperparameters: {
        embeddingSize: 200,
        epochsToTrain: 15,
        learningRate: 0.025,
        numNegSamples: 25,
        batchSize: 500,
        concurrentSteps: 12,
        windowSize: 5,
        minCount: 5,
        subsample: 1e-3,
      },
      taskCompleted: true,
    },
    {
      date: "02/10/2022",
      title: "Nausea",
      hyperparameters: {
        embeddingSize: 200,
        epochsToTrain: 15,
        learningRate: 0.025,
        numNegSamples: 25,
        batchSize: 500,
        concurrentSteps: 12,
        windowSize: 5,
        minCount: 5,
        subsample: 1e-3,
      },
      taskCompleted: false,
    },
  ];

  return (
    <div className="second-tab">
      {fakeModelList.map((model) => {
        return (
          <ModelListItem
            key={model.title}
            title={model.title}
            hyperparameters={model.hyperparameters}
            date={model.date}
            showLoadingIndicator={!model.taskCompleted}
          />
        );
      })}
    </div>
  );
};
