import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Optional: log to confirm env variable is loaded (REMOVE in production)
console.log(
  "Groq API Key loaded:",
  import.meta.env.VITE_GROQ_API_KEY ? "✅" : "❌ Missing!"
);

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
