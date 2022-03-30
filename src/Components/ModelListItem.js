import React from "react";
import { Button } from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTasksAlt } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export const ModelListItem = ({
  title,
  date,
  hyperparameters,
  showLoadingIndicator,
  disableButtons,
}) => {
  const navigate = useNavigate();

  const openVisualization = () => {
    navigate("/visualize");
  };

  const openAnalogyTestForm = () => {
    navigate("/analogyTestForm");
  };

  return (
    <div className="list-item flex-row-sb">
      <div className="list-item-text flex-row-sb">
        <div className="tooltip">
          <FontAwesomeIcon
            icon={faTasksAlt}
            size="xl"
            className="model-list-item-icon"
          />
          <span className="tooltip-content">
            <p>Embedding Size: {hyperparameters.embedding_size}</p>
            <p>Epochs to Train: {hyperparameters.epochs_to_train}</p>
            <p>Learning Rate: {hyperparameters.learning_rate}</p>
            <p>Num Neg Sample: {hyperparameters.num_neg_samples}</p>
            <p>Batch Size: {hyperparameters.batch_size}</p>
            <p>Concurrent Steps: {hyperparameters.concurrent_steps}</p>
            <p>Window Size: {hyperparameters.window_size}</p>
            <p>Min Count: {hyperparameters.min_count}</p>
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
        <Button
          buttonText={"Validate"}
          disabled={disableButtons}
          onClick={openAnalogyTestForm}
        />
        <Button
          buttonText={"Visualize"}
          disabled={disableButtons}
          onClick={openVisualization}
        />
      </div>
    </div>
  );
};
