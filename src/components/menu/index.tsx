import React, { useContext } from "react";
import { RouteComponentProps } from "react-router-dom";
import UserContext from "../../UserContext";

const Menu: React.FC<RouteComponentProps> = ({ history }) => {
  const userContext = useContext(UserContext);
  const handleGoBack = () => {
    if (userContext.isLoggedIn) {
      history.replace("/menu");
    }
    history.goBack();
  };
  return (
    <div>
      Hi menu
      <button onClick={handleGoBack}>Back</button>
    </div>
  );
};

export default Menu;
