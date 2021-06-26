import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ component: Component, page, ...rest }) => {
  const state = useSelector(state => state.auth);
  const { isAuthenticated, loading } = state;
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated !== null &&
        (isAuthenticated === true && !loading ? (
          <Component {...props} page={page} />
        ) : (
          <Redirect to="/login" />
        ))
      }
    />
  );
};

export default PrivateRoute;
