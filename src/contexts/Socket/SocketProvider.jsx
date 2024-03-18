import { FC, useContext, useEffect, useReducer, useState } from "react";
// import { useAppDispatch, useAppSelector } from "";
import { SocketContext } from "./SocketContext";
import { SocketReducer } from "./SocketReducer";
import { useSocket } from "../../hooks/useSocket";

export const Socket_INITIAL_STATE = {
    online: false,
};

export const SocketProvider = ({ children }) => {
    const [state, dispatch] = useReducer(SocketReducer, Socket_INITIAL_STATE);
    const baseUrl = process.env.BASE_URL;
    // http://127.0.0.1:5000
    // http://localhost:5000
    // https://firulaix-api-test.vercel.app
    const { socket, online } = useSocket(baseUrl || "https://firulaix-api-test.vercel.app");
    // const dispatchVotation = useAppDispatch();
    // const { votation: votacion } = useAppSelector(state => state.votation);
    // const { setVotation } = useContext(VoteContext);
    const [notifications, setNotifications] = useState([]);

    const getVotations = () => {
        console.log("getVotations");
        // emitir el evento para obtener las votaciones
        // socket.emit("get-votations");
    };

    const setGeolocalization = (id, coords) => {
        // console.log("increment-vote", coords);
        // socket.emit("increment-votes", { idVotes, idVotation });
        socket.emit("set-location", { id, coords });
    };

    useEffect(() => {
        socket.on("set-location", (data) => {
            const { info, msg } = data;
            console.log("set-location socket context", msg, info);
            setNotifications([...notifications, info]);
        })

        console.log(online);
    }, [socket]);

    return (
        <SocketContext.Provider
            value={{
                ...state,
                notifications,
                getVotations,
                setGeolocalization
            }}
        >
            {children}
        </SocketContext.Provider>
    );
};