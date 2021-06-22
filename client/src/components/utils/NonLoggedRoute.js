import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const NonLoggedRoute = ({ component: Component, ...rest }) => {
  const state = useSelector(state => state.auth);
  const { isAuthenticated } = state;
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated !== null &&
        (isAuthenticated === false ? (
          <Component {...props} />
        ) : (
          <Redirect to="/home" />
        ))
      }
    />
  );
};

export default NonLoggedRoute;
