import React from "react";
import { Button } from "../Components/Button";
import { Header } from "../Components/Header";
import { useNavigate } from "react-router-dom";

export const HyperparameterAdjustmentPage = () => {
  const navigate = useNavigate();

  const onSubmit = (e) => {
    navigate(`/home`);
  };

  const formInputs = [
    {
      label: "Embedding Size:",
      type: "number",
    },
    {
      label: "Epochs to Train:",
      type: "number",
    },
    {
      label: "Learning Rate:",
      type: "number",
    },
    {
      label: "Num Neg Samples:",
      type: "number",
    },
    {
      label: "Batch Size:",
      type: "number",
    },
    {
      label: "Concurrent Steps:",
      type: "number",
    },
    {
      label: "Window Size:",
      type: "number",
    },
    {
      label: "Min Count:",
      type: "number",
    },
    {
      label: "Sub Sample:",
      type: "number",
    },
  ];

  return (
    <div>
      <Header showProfileIcon />
      <h2 className="adjust-hyperparameters-text">
        Adjust Word2Vec Hyperparameters
      </h2>
      <form className="flex-column hyperparameter-form" onSubmit={onSubmit}>
        {formInputs.map((input, id) => {
          return (
            <label
              key={id}
              htmlFor="embeddingSize"
              className="flex-row-sb hyperparameter-form-row"
            >
              <p>{input.label}</p>
              <input
                className="dms-number-input"
                type={input.type}
                name="embeddingSize"
                required
              ></input>
            </label>
          );
        })}
        <div className="hyperparameter-form-button">
          <Button
            id="submitHyperparametersButton"
            buttonText="Train Model"
            onClick={(e) => onSubmit(e)}
          ></Button>
        </div>
      </form>
    </div>
  );
};
