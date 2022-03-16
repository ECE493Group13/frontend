import React from "react";
import { Header } from "../Components/Header";
import { KeywordBar } from "../Components/KeywordBar";
import { Tabs } from "../Components/Tabs";
import { useLocation } from "react-router-dom";

export const HomePage = () => {
  const route = useLocation();

  const token = route.state.token;

  return (
    <div>
      <Header showProfileIcon token={token}></Header>
      <h2 className="new-dataset-text">New Dataset</h2>
      <KeywordBar />
      <Tabs />
    </div>
  );
};
