import { Navigate, Outlet, OutletProps } from "react-router-dom";
import { authStore } from "../features/auth";
import { observer } from "mobx-react-lite";
import { PostProvider } from "../features/PostsContext";

const PrivateRoute = (props: OutletProps) => {
  if (authStore.isAuthInProgress) {
    return <div>Checking auth...</div>;
  } else if (authStore.isAuth) {
    return (
      <PostProvider>
        <Outlet />
      </PostProvider>
    );
  } else {
    return <Navigate to="/login" />;
  }
};

export default observer(PrivateRoute);
