import { io } from "socket.io-client";

const socket = () => {
  const socketPack = io(process.env.mainSocket);
  return socketPack;
};

export default socket;
