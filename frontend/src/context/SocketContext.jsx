import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";

const SocketContext = createContext();
const useSocketContext = () => {
    return useContext(SocketContext);
}

const SocketContextProvider = ({children}) => {
    const [socket,setSocket] = useState(null);
    const [onlineUsers,setOnlineUsers] = useState([]);
    const {authUser} = useAuthContext();

    useEffect(() => {
        if(authUser) {
            const socket = io("https://mern-socket-chat-app-4.onrender.com",{
                query: {
                    userId: authUser._id
                }
            });

            setSocket(socket);

            socket.on("getOnlineUsers",(users) => {
                setOnlineUsers(users);
            })

            return () => socket.close();
        }else{
            if(socket){
                socket.close();
                setSocket(null);
            }
        }
    },[authUser]);


    return <SocketContext.Provider value={{socket,onlineUsers}}>{children}</SocketContext.Provider>
};

export {
    useSocketContext,
    SocketContextProvider
};
