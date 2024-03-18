import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';

export const ButtonTop = ({
    buttonTopRef
}) => {

    // console.log(buttonTopRef)
    const [show, setShow] = useState(false);

    useEffect(() => {
        // if (!buttonTopRef.current) return;
        (buttonTopRef ?
            buttonTopRef.current
            : window)
            .addEventListener('scroll', () => {
                if ((buttonTopRef ?
                    buttonTopRef.current
                    : window)?.scrollY > 100) {
                    setShow(true);
                } else {
                    setShow(false);
                }
            })
        // return () => {
        //     (buttonTopRef ?
        //         buttonTopRef.current
        //         : window).removeEventListener('scroll');
        // }
    }, [])

    const scrollToTop = () => {
        // if (!buttonTopRef.current) return;
        (buttonTopRef ?
            buttonTopRef.current
            : window)
            .scrollTo({
                top: 0,
                behavior: 'smooth'
            })
    }

    const scrollBottom = () => {
        // if (!buttonTopRef.current) return;
        (buttonTopRef ?
            buttonTopRef.current
            : window)
            .scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth'
            })
    }

    return (
        <>
            {
                show ?
                    <button
                        onClick={scrollToTop}
                        className='fixed bottom-20 right-5 w-12 h-12 flex justify-center items-center bg-green-500 rounded-full hover:bg-green-600'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75" />
                        </svg>

                    </button>
                    :
                    <button
                        onClick={scrollBottom}
                        className='fixed bottom-20 right-5 w-12 h-12 flex justify-center items-center bg-green-500 rounded-full hover:bg-green-600'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3.5} stroke="currentColor" className="w-6 h-6 rotate-180">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75" />
                        </svg>

                    </button>
            }
        </>
    )
}
