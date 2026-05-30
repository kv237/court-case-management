import { io } from "socket.io-client";

const socket = io("https://court-case-management-rdly.onrender.com");

export default socket;