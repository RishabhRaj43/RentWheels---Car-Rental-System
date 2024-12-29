import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter
      future={{
        v7_startTransition: import.meta.env.VITE_NODE_ENV === "development",
        v7_relativeSplatPath: import.meta.env.VITE_NODE_ENV === "development",
      }}
    >
      <Toaster />
      <App />
    </BrowserRouter>
  </StrictMode>
);
