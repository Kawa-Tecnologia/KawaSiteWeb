import React from "react";
import ReactDOM from "react-dom"; // Importe ReactDOM
import RoutesApp from "./Routes";
import "./style.css";
import { ThemeProvider } from "./components/ThemeProvider";

const rootElement = document.getElementById("root");

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <div>
        <RoutesApp />
      </div>
    </ThemeProvider>
  </React.StrictMode>,
  rootElement
);