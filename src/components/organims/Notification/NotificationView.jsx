import React, { useContext, useEffect, useState } from 'react';
// import { SocketContext } from '../../../contexts/Socket/SocketContext';
// import { useRouter } from 'next/router';
// import { Web3Context } from '../../../contexts/Web3/Web3Context';
import { useNotification } from '../../../hooks/useNotification';
import { formatDateNotification } from '../../../utils/notification';

export const NotificationView = () => {

    // trae las notificaciones desde el socket

    const {
        notifications,
        getNotifications,
        newNotifications,
        loading
    } = useNotification();


    useEffect(() => {
        getNotifications();
    }, [])

    console.log(notifications.length)
    console.log(newNotifications.length)

    return (

        <div className='dark:text-white flex flex-col gap-2 px-5 py-4'>
            <div className="flex justify-between">
                <p className='font-semibold text-xl mb-4'>Listado de Notificaciones - {notifications.length + newNotifications.length}</p>
                {
                    loading &&
                    <div className=" flex items-center justify-center gap-5">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900 dark:border-white"></div>
                        <span className='dark:text-white text-xl'>
                            Cargando...
                        </span>
                    </div>
                }

                <button
                    disabled={loading}
                    onClick={() => getNotifications()}
                    title='Actualizar'
                    className='bg-gray-600 rounded-lg w-10 h-10 flex justify-center items-center hover:bg-gray-700 hover:scale-110 transition text-white'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="" width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" fill="none" >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M19.933 13.041a8 8 0 1 1 -9.925 -8.788c3.899 -1 7.935 1.007 9.425 4.747"></path>
                        <path d="M20 4v5h-5"></path>
                    </svg>
                </button>
            </div>
            {
                newNotifications.length === 0 && notifications.length === 0 &&
                <div className="rounded-lg bg-gray-600  px-4 py-4">
                    <p className='font-semibold text-2xl text-white'>No hay notificaciones</p>
                </div>
            }
            {/* nuevas notificaciones que llegan en tiempo real */}
            {
                newNotifications.length > 0 &&
                newNotifications.map((notification, index) => (
                    <div key={index} className='rounded-lg bg-slate-300 dark:bg-gray-600 px-4 py-4'>
                        <div className="flex flex-col gap-2 mb-2">
                            <div className="flex justify-between">
                                <p className='text-xl font-bold'>{notification?.data.user.name} {notification?.data.user.lastName}</p>
                                <span className='dark:text-white bg-red-300 px-2 py-1 rounded-lg'>
                                    nuevo
                                </span>
                            </div>
                            <p className='text-lg ml-2'>tú mascota se fue vista por ultima vez en está ubicación:</p>
                            <p className='text-lg ml-2'>para más información ingrese al siguiente link de google maps:</p>
                            <a href={`https://www.google.com/maps/search/?api=1&query=${ notification?.data?.coords?.latitude },${ notification?.data?.coords?.longitude }`} target="_blank" rel="noreferrer" className='text-lg ml-2 font-bold'>https://www.google.com/maps/search/?api=1&query={notification?.data.coords.latitude},{notification?.data.coords.longitude}</a>
                        </div>

                        <div className="flex flex-col gap-2 mb-2">
                            <p className='text-lg ml-2'>Datos de su mascota:</p>
                            <p className='text-lg ml-2'>
                                <b className='mr-2'>
                                    Nombre:
                                </b>
                                {
                                    notification.data.pet.name
                                }
                            </p>
                            <p className='text-lg ml-2'>
                                <b className='mr-2'>
                                    Chip:
                                </b>
                                {
                                    notification.data.pet.chip
                                }
                            </p>
                        </div>

                        <div className="flex flex-col gap-2 mb-2">
                            <p className='text-xl'>Fecha de la última vez que se vio a la mascota:</p>
                            <p className='text-xl font-bold'>
                                {
                                    formatDateNotification(notification.createdAt)
                                }
                            </p>
                        </div>

                        <div className="flex flex-col gap-2">
                            <p className='text-xl'>Estás son las coordenadas:</p>
                            <p className='text-xl font-bold'> {notification.data.coords.latitude}</p>
                            <p className='text-xl font-bold'> {notification.data.coords.longitude}</p>
                        </div>

                    </div>
                ))
            }
            {/* listado de notificaciones */}
            {
                notifications.length > 0 &&
                notifications.map((notification, index) => (
                    <div key={index} className='rounded-lg bg-slate-200 dark:bg-gray-500 px-4 py-4'>
                        <div className="flex flex-col gap-2 mb-2">
                            <div className="flex justify-between">
                                <p className='text-xl font-bold'>{notification.data.user.name} {notification.data.user.lastName}</p>
                                <span className='dark:text-white bg-green-300 px-2 py-1 rounded-lg'>
                                    {index + 1}
                                </span>
                            </div>
                            <p className='text-lg ml-2'>tú mascota se fue vista por ultima vez en está ubicación:</p>
                            <p className='text-lg ml-2'>para más información ingrese al siguiente link de google maps:</p>
                            <a href={`https://www.google.com/maps/search/?api=1&query=${ notification.data.coords.latitude },${ notification.data.coords.longitude }`} target="_blank" rel="noreferrer" className='text-lg ml-2 font-bold'>https://www.google.com/maps/search/?api=1&query={notification.data.coords.latitude},{notification.data.coords.longitude}</a>
                        </div>

                        <div className="flex flex-col gap-2 mb-2">
                            <p className='text-lg ml-2'>Datos de su mascota:</p>
                            <p className='text-lg ml-2'>
                                <b className='mr-2'>
                                    Nombre:
                                </b>
                                {
                                    notification.data.pet.name
                                }
                            </p>
                            <p className='text-lg ml-2'>
                                <b className='mr-2'>
                                    Chip:
                                </b>
                                {
                                    notification.data.pet.chip
                                }
                            </p>
                        </div>

                        <div className="flex flex-col gap-2 mb-2">
                            <p className='text-xl'>Fecha de la última vez que se vio a la mascota:</p>
                            <p className='text-xl font-bold'>
                                {
                                    formatDateNotification(notification.createdAt)
                                }
                            </p>
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
