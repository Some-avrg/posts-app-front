import React from "react";
import ReactDOM from "react-dom/client";
import { ConfigProvider } from "antd";
import "./index.css";
import App from "./app/App";
import { PostProvider } from "./features/PostsContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <ConfigProvider
    theme={{ token: { colorPrimary: "#8096FF", colorBgContainer: "white" } }}
  >
    <PostProvider>
      <App/>
    </PostProvider>
  </ConfigProvider>
);
