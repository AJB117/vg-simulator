import { firebaseApp } from "../../../firebase";

const isLoggedIn = () => {
  if (firebaseApp.auth().currentUser) {
    return true;
  }
  return false;
};

export default isLoggedIn;
