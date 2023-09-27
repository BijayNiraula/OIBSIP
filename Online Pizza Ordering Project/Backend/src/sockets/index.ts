import { Server as socketIO, Socket } from "socket.io";
import { Server } from "http";
import EventEmitter from "events";
export const ordersSocketEventEmitter = new EventEmitter()

let liveTraffic = 0;

export const setupSocketIO = (server: Server) => {

  const io = new socketIO(server, {
    cors: {
      origin: process.env.FRONTENT_BASE_URL as string
    }
  });

  io.on('connection', (socket: Socket) => {
    console.log(" a user connected : "+socket.id)
    liveTraffic++;
    console.log(liveTraffic)
    io.emit("liveTraffic", liveTraffic);
    socket.on('join', (userId: string) => {
      socket.join(userId);
    });
    
    socket.on('disconnect', () => {
      console.log('a user disconnected : '+socket.id);
      liveTraffic--;
      io.emit("liveTraffic", liveTraffic);
    });
  });

  ordersSocketEventEmitter.on("updateOrderStatus", ({ userId, _id, orderStatus }) => {
    io.to(userId).emit("updatedOrderStatus", { userId, _id, orderStatus })
  })
};
