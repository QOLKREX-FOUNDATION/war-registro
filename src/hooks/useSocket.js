import { useMemo, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

export const useSocket = (serverPath) => {
    const socket = useMemo(
        () =>
            io(serverPath, {
                transports: ["websocket", "polling", "flashsocket"],
                rememberUpgrade: true,
                reconnection: false,
                reconnectionAttempts: Infinity,
                reconnectionDelay: 1000,
                reconnectionDelayMax: 5000,
                randomizationFactor: 0.5,
                autoConnect: true,
                timeout: 10000,
                forceNew: true,
                multiplex: true,
                upgrade: false,
            }),
        [serverPath]
    );

    // function conect to socket server

    const [online, setOnline] = useState(false);

    useEffect(() => {
        setOnline(socket.connected);
    }, [socket]);

    useEffect(() => {
        socket.on("connect", () => {
            console.log("connected");
            setOnline(true);
        });

        return () => {
            socket.disconnect();
        }

    }, [socket]);

    useEffect(() => {
        socket.on("disconnect", () => {
            console.log("disconnected");
            setOnline(false);
        });

        return () => {
            socket.disconnect();
        }

    }, [socket]);

    return {
        socket,
        online,
    };
};