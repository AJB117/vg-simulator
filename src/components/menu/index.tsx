import { Button } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
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
import "./menu.css";

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

  const handleLogOut = async () => {
    await firebaseApp.auth().signOut();
    history.push("/");
  };

  return (
    <div>
      <AppBar position="static">
        {/* <Tabs>
          <Tab label="Deck Builder"></Tab>
          <Tab label="Play"></Tab>
          <Tab label="Profile"></Tab>
          <Tab
            label={
              JSON.parse(localStorage.getItem("user") || "{username: ''}")
                .username
            }
          ></Tab>
        </Tabs> */}
        <Toolbar>
          <Button onClick={handleGoBack}>Go back</Button>
          <Button onClick={handleLogOut}>Log Out</Button>
        </Toolbar>
      </AppBar>
      <Router>
        <Link to={match.url + "/silly"}>silly</Link>
        <Switch>
          <Route path={match.url + "/silly"} component={Thing} />
        </Switch>
      </Router>
    </div>
  );
};

export default Menu;
