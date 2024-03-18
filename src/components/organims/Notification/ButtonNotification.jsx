import React, { useContext } from 'react'
import { SocketContext } from '../../../contexts/Socket/SocketContext'

export const ButtonNotification = ({ title }) => {
    const { notifications } = useContext(SocketContext);
    return (
        <>
            <span>
                {title}
            </span>
            {
                notifications.length > 0 &&
                <span className="flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 rounded-full capitalize">
                    {notifications.length}
                </span>
            }
        </>
    )
}
