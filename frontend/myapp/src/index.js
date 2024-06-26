import React from "react";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { store } from "../src/redux/store";
render(
  <BrowserRouter>
    <Provider store={store}>
      {" "}
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
