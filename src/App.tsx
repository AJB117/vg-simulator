import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import isLoggedIn from "./components/auth/util/isLoggedIn";
import GuardedRoute from "./components/GuardedRoute";
import Home from "./components/home/Home";
import Menu from "./components/menu/index";
import UserContext from "./UserContext";

function App() {
  return (
    <UserContext.Provider value={{ isLoggedIn: false, username: "" }}>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
          <GuardedRoute path="/menu" exact component={Menu} />
          <Route path="/silly" exact render={() => <div>505</div>} />
          <Route path="/" render={() => <div>404</div>} />
        </Switch>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
