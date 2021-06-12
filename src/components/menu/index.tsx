import { Button, Tab, Tabs } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import React, { useEffect } from "react";
import {
  BrowserRouter,
  Link,
  Route,
  RouteComponentProps,
  Switch,
} from "react-router-dom";
import { firebaseApp } from "../../firebase";
import Thing from "../../thing";
import isLoggedIn from "../auth/util/isLoggedIn";
import DeckBuilder from "../deckBuilder";
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
      <Route
        render={(history) => (
          <BrowserRouter>
            <AppBar position="static">
              <Tabs value={history.location.pathname}>
                <Tab
                  label="Deck Builder"
                  value="/menu"
                  component={Link}
                  to={match.url + "/silly"}
                />
                <Tab label="Play" />
                <Tab label="Profile" />

                <Button onClick={handleGoBack}>Go back</Button>
                <Button onClick={handleLogOut}>Log Out</Button>
              </Tabs>
            </AppBar>
            <Switch>
              <Route path={match.url + "/silly"} component={Thing} />
            </Switch>
          </BrowserRouter>
        )}
      />
    </div>
  );
};

export default Menu;
