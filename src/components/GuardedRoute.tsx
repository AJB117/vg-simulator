import { Route, Redirect, RouteProps } from "react-router-dom";
import isLoggedIn from "./auth/util/isLoggedIn";

const GuardedRoute = ({ ...routerProps }: RouteProps) => {
  if (isLoggedIn()) {
    return <Route {...routerProps} />;
  }
  localStorage.removeItem("user");
  return <Redirect to="/" />;
};

export default GuardedRoute;
