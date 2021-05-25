import React from "react";
import { RouteComponentProps } from "react-router-dom";

const Menu: React.FC<RouteComponentProps> = ({ history }) => {
  return (
    <div>
      Hi menu
      <button onClick={history.goBack}>Back</button>
    </div>
  );
};

export default Menu;
