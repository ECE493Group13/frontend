import React from "react";
import { Button } from "./Button";

export const DatasetListItem = ({ title, date, showLoadingIndicator }) => {
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
        <Button buttonText={"Train"} disabled={showLoadingIndicator} />
      </div>
    </div>
  );
};
