import { Tab, Tabs } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import React, { useContext, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { firebaseApp } from "../../firebase";
import Thing from "../../thing";
import UserContext from "../../UserContext";

const Menu: React.FC<RouteComponentProps> = ({ history }) => {
  const userContext = useContext(UserContext);
  useEffect(() => {
    if (firebaseApp.auth().currentUser) {
      return;
    }
    userContext.isLoggedIn = false;
    history.replace("/");
  }, [userContext, history]);

  const handleGoBack = () => {
    if (userContext.isLoggedIn) {
      history.replace("/menu");
      return;
    }
    history.goBack();
  };
  return (
    <div>
      <AppBar position="static">
        <Tabs>
          {/* <BrowserRouter> */}
          <Tab label="Deck Builder"></Tab>
          <Tab label="Play"></Tab>
          <Tab label="Profile"></Tab>
          <Tab label={userContext.username}></Tab>
          {/* </BrowserRouter> */}
        </Tabs>
        <button onClick={handleGoBack}>Back</button>
      </AppBar>
      Hi menu
    </div>
  );
};

export default Menu;
