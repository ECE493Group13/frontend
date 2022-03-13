import React from "react";
import { Header } from "../Components/Header";
import { KeywordBar } from "../Components/KeywordBar";
import { Tabs } from "../Components/Tabs";

export const HomePage = () => {
  return (
    <div>
      <Header showProfileIcon></Header>
      <h2 className="new-dataset-text">New Dataset</h2>
      <KeywordBar />
      <Tabs />
    </div>
  );
};
