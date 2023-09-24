import { createContext,useContext,ReactNode } from 'react';
import { Socket, io } from 'socket.io-client';

const SocketContext=createContext<Socket|null>(null);

interface SocketProviderProps{
  children:ReactNode
}
 const SocketProvider:React.FC<SocketProviderProps>=({children})=>{
    const socket:Socket=io(import.meta.env.VITE_BACKEND_BASE_URL);
    return(
        <SocketContext.Provider value={socket}>
          {children}
        </SocketContext.Provider>
    )
}


export const useSocketContext=():Socket|null=>useContext(SocketContext);;
export default SocketProvider;
