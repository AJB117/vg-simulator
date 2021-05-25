import getUsers from "./getUsers";

const validateUsername = async (
  username: string | null | undefined,
  isCheckingUponCreation: boolean,
  users: any[] | any
): Promise<boolean> => {
  // if (users.length === 0 || isCheckingUponCreation) {
  //   const newUsers = await getUsers();
  //   // setUsers((prevUsers) => [...prevUsers, newUsers]);
  // } else {
  //   // setUsers((prevUsers) => [...prevUsers, users]);
  // }
  users =
    users.length === 0 || isCheckingUponCreation ? await getUsers() : users;
  const userNames = users.docs.map((userDoc) => userDoc.data().username);
  return !userNames.includes(username);
};

export default validateUsername;
