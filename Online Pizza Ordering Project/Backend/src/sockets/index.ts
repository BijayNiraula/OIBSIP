import { Server as socketIO, Socket } from "socket.io";
import { Server } from "http";
import EventEmitter from "events";
export const ordersSocketEventEmitter = new EventEmitter()


export const setupSocketIO = (server: Server) => {

  const io = new socketIO(server, {
    cors: {
      origin: process.env.FRONTENT_BASE_URL as string
    }
  });

  io.on('connection', (socket: Socket) => {
    console.log("a user connected")
    socket.on('join', (userId: string) => {
      socket.join(userId);
    });
    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  });

  ordersSocketEventEmitter.on("updateOrderStatus", ({ userId, _id, orderStatus }) => {
    io.to(userId).emit("updatedOrderStatus", { userId, _id, orderStatus })
  })
};
