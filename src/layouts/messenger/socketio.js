import { io } from "socket.io-client";

const socket = () => {
  const socketPack = io("http://localhost:8900");
  return socketPack;
};

export default socket;
