import { createContext } from "react";

const UserContext = createContext({
  isLoggedIn: false,
  username: "",
});

export default UserContext;
