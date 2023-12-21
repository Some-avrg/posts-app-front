import React from "react";
import ReactDOM from "react-dom/client";
import { ConfigProvider } from "antd";
import "./index.css";
import App from "./app/App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <ConfigProvider
    theme={{ token: { colorPrimary: "#8096FF", colorBgContainer: "white" } }}
  >
    <App />
  </ConfigProvider>
);
