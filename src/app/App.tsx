import React, { useEffect } from "react";
import "./App.css";
import { ConfigProvider } from "antd";
import { Routes, Route } from "react-router-dom";
import { PersonalAccount } from "../pages/PersonalAccountPage";
import { Main } from "../pages/MainPage";
import { LogInPage } from "../pages/LogInPage/LogInPage";
import { SignUpPage } from "../pages/SignUpPage/SignUpPage";
import { NotFound } from "../pages/NotFoundPage";
import { Arrangement } from "../pages/Layout/Layout";
import PrivateRoute from "../pages/privateRoute"
import { observer } from "mobx-react-lite";
import {authStore} from "../features/auth";

const App = observer(() => {
  // useEffect(() => {
  //   authStore.checkAuth();
  // }, []);

  return (
    <ConfigProvider
      theme={{ token: { colorPrimary: "#8096FF", colorBgContainer: "white" } }}
    >
      <Routes>
        <Route path="/" element={<Arrangement />}>

          <Route element={<PrivateRoute />}>
            <Route index element={<Main />} />
            <Route path="PersonalAccount" element={<PersonalAccount />} />
          </Route>

          <Route path="LogIn" element={<LogInPage />} />
          <Route path="SignUp" element={<SignUpPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </ConfigProvider>
  );
})

export default App;
