import { useRouter } from "next/router";
import { useContext } from "react";
import { useState } from "react";
import { Web3Context } from '../contexts/Web3/Web3Context';
import { SocketContext } from "../contexts/Socket/SocketContext";

export const useNotification = () => {
    const { notifications: newNotifications } = useContext(SocketContext);
    console.log(newNotifications);

    const { web3 } = useContext(Web3Context);

    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const { pathname } = router;

    // console.log(pathname);

    // console.log(web3);

    const currentPath = pathname.split('/')[1];
    // console.log(currentPath);

    // trae las notificaciones desde la api rest
    const getNotifications = async () => {
        setLoading(true);
        try {
            const data = await fetch(
                currentPath === "admin" ?
                    'https://firulaix-api-test.vercel.app/api/notification/findByEntityRegistry' :
                    'https://firulaix-api-test.vercel.app/api/notification/findById'
                // 'http://localhost:5000/api/notification/findByEntityRegistry' :
                // 'http://localhost:5000/api/notification/findById'
                , {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-token': currentPath === "admin" ?
                            sessionStorage.getItem(`auth_token_${ (web3.account).toUpperCase() }`) :
                            sessionStorage.getItem('auth_token')
                    }
                });
            // console.log(`auth_token_${ web3.account }`);
            const resp = await data.json();
            console.log(resp);

            setLoading(false);

            if (resp.ok === false) {
                setNotifications([]);
                return;
            }

            const { notifications } = resp;
            setNotifications(notifications)
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }

    return {
        notifications,
        newNotifications,
        getNotifications,
        loading
    }

}