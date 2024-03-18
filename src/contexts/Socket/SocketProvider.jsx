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
  // http://localhost:5000
  // https://firulaix-api-test.vercel.app
  const { socket, online } = useSocket(
    "https://firulaix-api-prueba.onrender.com"
  );
  // const { socket, online } = useSocket("https://3tfgz37n-5000.brs.devtunnels.ms");
  // const { socket, online } = useSocket("http://localhost:5000");
  // const { socket, online } = useSocket("https://firulaix-api-prueba.onrender.com");
  // const dispatchVotation = useAppDispatch();
  console.log({ socket, online });
  // const web3Provider = useContext(Web3Context);
  // console.log({ web3Provider })
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
    // socket.on("set-location context", (data) => {
    //  se usará el uuid si la cuenta es un adopter, si no se usará el address
    const uuid = sessionStorage.getItem("uuid");
    // console.log("uuid", uuid)
    const address = sessionStorage.getItem("account");
    // console.log(address)

    const id = uuid !== null ? uuid : address?.toUpperCase();

    // console.log(`set-location context ${ id }`)
    socket.on(`set-location context ${id}`, (data) => {
      const { info, msg } = data;
      // console.log("set-location socket context", msg, info);
      setNotifications([...notifications, info]);
    });

    console.log(online);
  }, [socket]);

  return (
    <SocketContext.Provider
      value={{
        ...state,
        notifications,
        getVotations,
        setGeolocalization,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
