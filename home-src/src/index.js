import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";

axios.defaults.baseURL = "/api";
// axios.defaults.baseURL = "/api";

ReactDOM.render(
  <BrowserRouter>
    <App/>
  </BrowserRouter>,
  document.getElementById("root")
);
