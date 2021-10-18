import React from "react";
import { Redirect, Route } from "react-router-dom";

function ProtectedRoute({ component: Component, layout: Layout, ...restOfProps }) {
  const isAuthenticated = localStorage.getItem('token');

  return (
    <Route {...restOfProps} render={(props) =>
        isAuthenticated ? <Layout><Component {...props} /></Layout> : <Redirect to="/login" />
      }
    />
  );
}

export default ProtectedRoute;
