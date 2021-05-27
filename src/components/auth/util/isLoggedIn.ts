import { firebaseApp } from "../../../firebase";

const isLoggedIn = () => {
  firebaseApp.auth().onAuthStateChanged((user) => {
    if (!user) return false;
  });
  return true;
};

export default isLoggedIn;
