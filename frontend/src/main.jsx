import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import "./index.css";

import { ThemeProvider } from "./context/ThemeContext";
document.body.classList.add("dark");

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <div className="dark bg-[var(--bg-main)] text-[var(--text-main)] min-h-screen">
          <App />
        </div>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);
