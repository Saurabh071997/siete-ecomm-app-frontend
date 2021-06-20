import { Route, Navigate } from "react-router-dom";

export function PrivateRoute({ path, ...props }) {
  return JSON.parse(localStorage?.getItem("user"))?.userLoggedIn ? (
    <Route path={path} {...props} />
  ) : (
    <Navigate state={{ from: path }} replace to="/login" />
  );
}
