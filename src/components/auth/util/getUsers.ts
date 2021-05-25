import { db } from "../../../firebase";
import firebase from "firebase";

const getUsers = async (): Promise<
  firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>
> => {
  const users = db.collection("users");
  return await users.get();
};

export default getUsers;
