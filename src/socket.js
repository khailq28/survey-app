import io from "socket.io-client";
import { ENDPOINT } from "./constant";

const socket = io(ENDPOINT, {
    transports: ["websocket", "polling", "flashsocket"],
});

export default socket;
