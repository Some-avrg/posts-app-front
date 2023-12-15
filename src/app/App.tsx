import { useEffect } from "react";
import "./App.css";
import { Route } from "react-router-dom";
import { PersonalAccount } from "../pages/PersonalAccountPage";
import { Main } from "../pages/MainPage/MainPage";
import { LogInPage } from "../pages/LogInPage/LogInPage";
import { SignUpPage } from "../pages/SignUpPage/SignUpPage";
import { PostPage } from "../pages/PostPage/PostPage";
import { NotFound } from "../pages/NotFoundPage";
import { Arrangement } from "../pages/Layout/Layout";
import PrivateRoute from "../pages/privateRoute";
import { observer } from "mobx-react-lite";
import { authStore } from "../features/auth";
import { postLoader } from "../features/loaders/postloader";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

const App = observer(() => {
  //при загрузке страницы пытаемся получить access token
  useEffect(() => {
    authStore.checkAuth();
  }, []);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Arrangement />}>
        <Route element={<PrivateRoute />}>
          <Route index element={<Main />} />
          <Route
            path="post/:postId"
            element={<PostPage />}
            loader={postLoader}
          />
          <Route path="personal-account" element={<PersonalAccount />} />
        </Route>

        <Route path="login" element={<LogInPage />} />
        <Route path="signup" element={<SignUpPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
});

export default App;
