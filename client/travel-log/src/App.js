import "./App.css";
import React, { Fragment } from "react";
import AddExperience from "./pages/AddExperience";
import HomePage from "./pages/HomePage";

const App = () => {
  return (
    <Fragment>
      <HomePage />
      <AddExperience />
    </Fragment>
  );
};

export default App;
