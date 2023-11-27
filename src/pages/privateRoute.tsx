import { Navigate, Outlet, OutletProps } from "react-router-dom";
import {authStore} from "../features/auth";
import {observer} from "mobx-react-lite"


const PrivateRoute = (props: OutletProps) => {

  if (authStore.isAuthInProgress) {
    return <div>Checking auth...</div>;
  }
  if (authStore.isAuth) {
     return <Outlet/>
  } else {
    return <Navigate to="/LogIn" />;
  }
};
  
export default observer (PrivateRoute)