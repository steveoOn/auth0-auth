import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./pages/home";
import Protected from "./pages/protected";
import Login from "./pages/login";
import { MyContext } from "./context";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <MyContext>
          <Route path='/' exact component={Home} />
          <Route path='/protected' component={Protected} />
          <Route path='/login' component={Login} />
        </MyContext>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
