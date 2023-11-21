import React from "react";
import "./App.css";
import axios from 'axios';
import { ConfigProvider } from "antd";
import { Routes, Route } from "react-router-dom";
import { PersonalAccount } from "../pages/PersonalAccountPage";
import { Main } from "../pages/MainPage";
import { LogInPage } from "../pages/LogInPage/LogInPage";
import { SignUpPage } from "../pages/SignUpPage/SignUpPage";
import { NotFound } from "../pages/NotFoundPage";

import { Arrangement } from "../pages/Layout/Layout";


function App() {
  axios.defaults.baseURL = process.env.REACT_APP_SERVER_ENDPOINT;

  //debug
  // axios.interceptors.request.use(request => {
  //   console.log('Starting Request', JSON.stringify(request, null, 2))
  //   return request
  // });
  // axios.interceptors.response.use(response => {
  //   console.log('Response:', JSON.stringify(response, null, 2))
  //   return response
  // });

  return (
    <ConfigProvider theme={{ token: { colorPrimary: '#8096FF', colorBgContainer:'white' } }}>

      <Routes>
        <Route path="/" element={<Arrangement />}>
          <Route index element={<Main />} />
          <Route path="PersonalAccount" element={<PersonalAccount />} />
          <Route path="LogIn" element={<LogInPage />} />
          <Route path="SignUp" element={<SignUpPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      </ConfigProvider>
  );
}

export default App;
