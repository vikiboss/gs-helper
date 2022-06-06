import { store } from ".";
import clearSessionCookie from "./clearSessionCookie";

const changeUser = async (uid: string) => {
  store.set("currentUid", uid);
  await clearSessionCookie();
};

export default changeUser;
