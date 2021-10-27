import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import  persistStoreData  from "./reducers/index";
import store from "./reducers/index"
import { Provider } from "react-redux";
require("dotenv").config();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store} persiststore={persistStoreData} >
        <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
