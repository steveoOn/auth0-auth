import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { useMyContext } from "../context";

function ProtectedRoute({ component: Component, path, ...rest }) {
  const { isAuthenticated, loading, loginWithRedirect } = useMyContext();

  useEffect(() => {
    if (loading || isAuthenticated) {
      return;
    }
    const fn = async () => {
      await loginWithRedirect({
        appState: { targetUrl: path }
      });
    };
    fn();
  }, [loading, isAuthenticated, loginWithRedirect, path]);

  const render = props => (isAuthenticated ? <Component {...props} /> : null);

  return <Route path={path} render={render} {...rest} />;
}

export default ProtectedRoute;
