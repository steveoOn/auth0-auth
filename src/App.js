import React from "react";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import Home from "./pages/home";
import Protected from "./pages/protected";
import { MyContext } from "./context";
import ProtectedRoute from "./components/protectedRoute";

function App() {
  const history = useHistory();
  const location = useLocation();

  const onRedirectCallback = appState => {
    history.push(
      appState && appState.targetUrl ? appState.targetUrl : location.pathname
    );
  };

  return (
    <MyContext
      domain={process.env.REACT_APP_DOMAIN}
      client_id={process.env.REACT_APP_CLIENT_ID}
      redirect_uri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
    >
      <Switch>
        <Route path='/' exact component={Home} />
        <ProtectedRoute path='/protected' component={Protected} />
      </Switch>
    </MyContext>
  );
}

export default App;
