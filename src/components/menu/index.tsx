import { Tab, Tabs } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Link,
  Route,
  RouteComponentProps,
  Switch,
} from "react-router-dom";
import { firebaseApp } from "../../firebase";
import Thing from "../../thing";
import isLoggedIn from "../auth/util/isLoggedIn";

const Menu: React.FC<RouteComponentProps> = ({ history, match }) => {
  useEffect(() => {
    firebaseApp.auth().onAuthStateChanged((user) => {
      if (!user) {
        history.replace("/");
        localStorage.removeItem("user");
      }
    });
  }, []);

  const handleGoBack = () => {
    if (isLoggedIn()) {
      return;
    }
    history.goBack();
  };
  return (
    <div>
      <AppBar position="static">
        <Tabs>
          <Tab label="Deck Builder"></Tab>
          <Tab label="Play"></Tab>
          <Tab label="Profile"></Tab>
          <Tab
            label={
              JSON.parse(localStorage.getItem("user") || "{username: ''}")
                .username
            }
          ></Tab>
        </Tabs>
        <button onClick={handleGoBack}>Back</button>
      </AppBar>
      <Router>
        <Switch>
          <Route path={match.url + "/silly"} component={Thing} exact />
        </Switch>
      </Router>
    </div>
  );
};

export default Menu;
