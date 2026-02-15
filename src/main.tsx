import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import FloatingLines from "@/components/FloatingLines";


const RootLayout = () => {
  return (
    <div style={{ width: "100%", height: "100vh", position: "relative" }}>
      
      {/* Background Animation */}
      <FloatingLines
        enabledWaves={["top", "middle", "bottom"]}
        lineCount={5}
        lineDistance={5}
        bendRadius={5}
        bendStrength={-0.5}
        interactive={true}
        parallax={true}
      />

      {/* Main App Content */}
      <BrowserRouter>
        <App />
      </BrowserRouter>

    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RootLayout />
  </React.StrictMode>
);
