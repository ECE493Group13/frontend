import React from "react";
import { ModelListItem } from "../ModelListItem";

export const ModelsTab = () => {
  const fakeModelList = [
    {
      date: "02/22/2022",
      title: "Back Pain",
      hyperparameters: {
        embedding_size: 200,
        epochs_to_train: 15,
        learning_rate: 0.025,
        num_neg_samples: 25,
        batch_size: 500,
        concurrent_steps: 12,
        window_size: 5,
        min_count: 5,
        subsample: 1e-3,
      },
      taskCompleted: true,
    },
    {
      date: "02/10/2022",
      title: "Nausea",
      hyperparameters: {
        embedding_size: 200,
        epochs_to_train: 15,
        learning_rate: 0.025,
        num_neg_samples: 25,
        batch_size: 500,
        concurrent_steps: 12,
        window_size: 5,
        min_count: 5,
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
