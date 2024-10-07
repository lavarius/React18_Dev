import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "bootstrap/dist/css/bootstrap.css";

// Type the App component
const AppComponent = App as React.ComponentType<any>;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppComponent />
  </React.StrictMode>
);
