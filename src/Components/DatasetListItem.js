import React from "react";
import { Button } from "./Button";
import { useNavigate } from "react-router-dom";

export const DatasetListItem = ({
  datasetId,
  title,
  date,
  showLoadingIndicator,
}) => {
  const navigate = useNavigate();

  const openHyperparameterAdjustmentForm = () => {
    navigate("/trainSettings", { state: { datasetId } });
  };

  return (
    <div className="list-item flex-row-sb">
      <div className="list-item-text flex-row-sb">
        <p className="grey-text">{date}</p>
        <p>{title}</p>
      </div>
      <div className="list-item-text flex-row-sb">
        {showLoadingIndicator && (
          <div className="list-item-text flex-row-sb">
            <div className="dms-loading-indicator"></div>
            <p>Fetching Dataset...</p>
          </div>
        )}
        <Button
          buttonText={"Train"}
          disabled={showLoadingIndicator}
          onClick={openHyperparameterAdjustmentForm}
        />
      </div>
    </div>
  );
};
