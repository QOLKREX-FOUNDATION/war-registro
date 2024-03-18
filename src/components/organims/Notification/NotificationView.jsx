import React, { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../../../contexts/Socket/SocketContext';
import { useRouter } from 'next/router';
import { Web3Context } from '../../../contexts/Web3/Web3Context';

export const NotificationView = () => {
    const { notifications: geoNotification } = useContext(SocketContext);
    console.log(geoNotification);

    const { web3 } = useContext(Web3Context);

    const [notifications, setNotifications] = useState([]);

    const router = useRouter();

    const { pathname } = router;

    console.log(pathname);

    // console.log(web3);

    const currentPath = pathname.split('/')[1];
    console.log(currentPath);

    const getNotifications = async () => {
        try {
            const data = await fetch(
                currentPath === "admin" ?
                    'https://firulaix-api-test.vercel.app/api/notification/findByEntityRegistry' :
                    'https://firulaix-api-test.vercel.app/api/notification/findById'
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

            if (resp.ok === false) {
                setNotifications([]);
                return;
            }

            const { notifications } = resp;
            setNotifications(notifications)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getNotifications();
    }, [])

    return (

        <div className='dark:text-white flex flex-col gap-2'>
            <p className='text-xl mb-4'>Listado de Notificaciones:</p>
            {
                geoNotification.length === 0 && notifications.length === 0 &&
                <div className="rounded-lg bg-gray-500 px-4 py-4">
                    <p className='text-2xl text-white'>No hay notificaciones</p>
                </div>
            }

            {
                geoNotification.length > 0 &&
                geoNotification.map((notification, index) => (
                    <div key={index} className='rounded-lg bg-gray-500 px-4 py-4'>
                        <div className="flex flex-col gap-2 mb-2">
                            <p className='text-xl font-bold'>{notification.data.user.name} {notification.data.user.lastName}</p>
                            <p className='text-lg ml-2'>tú mascota se fue vista por ultima vez en está ubicación:</p>
                            <p className='text-lg ml-2'>para más información ingrese al siguiente link de google maps:</p>
                            <a href={`https://www.google.com/maps/search/?api=1&query=${ notification.data.coords.latitude },${ notification.data.coords.longitude }`} target="_blank" rel="noreferrer" className='text-lg ml-2 font-bold'>https://www.google.com/maps/search/?api=1&query={notification.data.coords.latitude},{notification.data.coords.longitude}</a>
                        </div>

                        <div className="flex flex-col gap-2 mb-2">
                            <p className='text-xl'>Fecha de la última vez que se vio a la mascota:</p>
                            <p className='text-xl font-bold'>{
                                new Date(notification.createdAt).toLocaleDateString('es-ES', {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                    hour: "numeric",
                                    minute: "numeric",
                                    second: "numeric",
                                    timeZone: "UTC"
                                })
                            }</p>
                        </div>

                        <div className="flex flex-col gap-2">
                            <p className='text-xl'>Estás son las coordenadas:</p>
                            <p className='text-xl font-bold'> {notification.data.coords.latitude}</p>
                            <p className='text-xl font-bold'> {notification.data.coords.longitude}</p>
                        </div>

                    </div>
                ))
            }
            {
                notifications.length > 0 &&
                notifications.map((notification, index) => (
                    <div key={index} className='rounded-lg bg-gray-500 px-4 py-4'>
                        <div className="flex flex-col gap-2 mb-2">
                            <p className='text-xl font-bold'>{notification.data.user.name} {notification.data.user.lastName}</p>
                            <p className='text-lg ml-2'>tú mascota se fue vista por ultima vez en está ubicación:</p>
                            <p className='text-lg ml-2'>para más información ingrese al siguiente link de google maps:</p>
                            <a href={`https://www.google.com/maps/search/?api=1&query=${ notification.data.coords.latitude },${ notification.data.coords.longitude }`} target="_blank" rel="noreferrer" className='text-lg ml-2 font-bold'>https://www.google.com/maps/search/?api=1&query={notification.data.coords.latitude},{notification.data.coords.longitude}</a>
                        </div>

                        <div className="flex flex-col gap-2 mb-2">
                            <p className='text-xl'>Fecha de la última vez que se vio a la mascota:</p>
                            <p className='text-xl font-bold'>{
                                new Date(notification.createdAt).toLocaleDateString('es-ES', {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                    hour: "numeric",
                                    minute: "numeric",
                                    second: "numeric",
                                    timeZone: "UTC"
                                })
                            }</p>
                        </div>

                        <div className="flex flex-col gap-2">
                            <p className='text-xl'>Estás son las coordenadas:</p>
                            <p className='text-xl font-bold'> {notification.data.coords.latitude}</p>
                            <p className='text-xl font-bold'> {notification.data.coords.longitude}</p>
                        </div>

                    </div>
                    // <>
                    //     <h1>notificacion</h1>
                    // </>
                ))
            }
        </div>
    )
}
