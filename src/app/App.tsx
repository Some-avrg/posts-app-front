import React from "react";
import "./App.css";
import { ConfigProvider } from "antd";
import { Routes, Route } from "react-router-dom";
import { PersonalAccount } from "../pages/PersonalAccountPage";
import { Main } from "../pages/MainPage";
import { LogInPage } from "../pages/LogInPage/LogInPage";
import { NotFound } from "../pages/NotFoundPage";

import { Arrangement } from "../pages/Layout/Layout";

function App() {
  return (
    <ConfigProvider theme={{ token: { colorPrimary: '#8096FF', colorBgContainer:'white' } }}>

      <Routes>
        <Route path="/" element={<Arrangement />}>
          <Route index element={<Main />} />
          <Route path="PersonalAccount" element={<PersonalAccount />} />
          <Route path="LogIn" element={<LogInPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      </ConfigProvider>
  );
}

export default App;
