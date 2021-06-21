import { Route, Navigate } from "react-router-dom";

export function PrivateRoute({ path, ...props }) {
  return JSON.parse(localStorage?.getItem("accessToken"))?.accessToken ? (
    <Route path={path} {...props} />
  ) : (
    <Navigate state={{ from: path }} replace to="/login" />
  );
}
