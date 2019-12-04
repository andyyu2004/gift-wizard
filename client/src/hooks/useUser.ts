import { useSelector } from "react-redux";
import { User } from "shared/types";
import { AppState } from "../reducers";

/** Only use when logged in so that the socket exists */
const useUser = () => useSelector<AppState, User>(state => state.user.user!);
export default useUser;