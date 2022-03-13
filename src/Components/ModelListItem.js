import React from "react";
import { Button } from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTasksAlt } from "@fortawesome/free-solid-svg-icons";

export const ModelListItem = ({
  title,
  date,
  hyperparameters,
  showLoadingIndicator,
}) => {
  return (
    <div className="list-item flex-row-sb">
      <div className="list-item-text flex-row-sb">
        <div className="tooltip">
          <FontAwesomeIcon
            icon={faTasksAlt}
            size="xl"
            className="model-list-item-icon"
          />
          <span class="tooltip-content">
            <p>Embedding Size: {hyperparameters.embeddingSize}</p>
            <p>Epochs to Train: {hyperparameters.epochsToTrain}</p>
            <p>Learning Rate: {hyperparameters.learningRate}</p>
            <p>Num Neg Sample: {hyperparameters.numNegSamples}</p>
            <p>Batch Size: {hyperparameters.batchSize}</p>
            <p>Concurrent Steps: {hyperparameters.concurrentSteps}</p>
            <p>Window Size: {hyperparameters.windowSize}</p>
            <p>Min Count: {hyperparameters.minCount}</p>
            <p>Sub Sample: {hyperparameters.subsample}</p>
          </span>
        </div>
        <p className="grey-text">{date}</p>
        <p>{title}</p>
      </div>
      <div className="list-item-text flex-row-sb">
        {showLoadingIndicator && (
          <div className="list-item-text flex-row-sb">
            <div className="dms-loading-indicator"></div>
            <p>Training...</p>
          </div>
        )}
        <Button buttonText={"Validate"} disabled={showLoadingIndicator} />
        <Button buttonText={"Visualize"} disabled={showLoadingIndicator} />
      </div>
    </div>
  );
};
