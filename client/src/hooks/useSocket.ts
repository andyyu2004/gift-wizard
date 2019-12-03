import { useSelector } from "react-redux";
import { AppState } from "../reducers";

/** Only use when logged in so that the socket exists */
const useSocket = () => useSelector<AppState, SocketIOClient.Socket>(state => state.user.socket!);
export default useSocket;