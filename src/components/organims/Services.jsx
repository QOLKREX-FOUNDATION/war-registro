import React from 'react'
import {
    // Pets as PetsIcon,
    Edit as EditIcon,
    Bathroom as BathroomIcon,
    DocumentScannerOutlined as DocumentScannerOutlinedIcon,
    Payment as PaymentIcon,
    ContentCut as ContentCutIcon,
} from '@mui/icons-material';
export const Services = ({ chip }) => {
    return (
        <div className='py-4 text-black dark:text-white'>
            {/* admin agregar serivicio */}
            {/* <div className='flex justify-between items-center'>
                <h1 className='text-2xl font-bold'>Servicios</h1>
                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                    Agregar Servicio
                </button>
            </div> */}
            {/* edit servicios */}
            {/* <div className='flex flex-col mt-4'>
                <div className='flex flex-col md:flex-row justify-between items-center'>
                    <div className='flex items-center'>
                        <BathroomIcon className='text-4xl' />
                        <div className='ml-4'>
                            <h2 className='text-xl font-bold'>Baño</h2>
                            <p className='text-gray-500'>Baño para perros</p>
                        </div>
                    </div>
                    <div className='flex items-center'>
                        <button className='bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded'>
                            <EditIcon />
                        </button>
                    </div>
                </div>
            </div> */}
            {/* cards services */}
            <div className="flex flex-wrap gap-4">
                <button className='flex items-center max-w-[200px] border border-transparent hover:border-white px-3 py-1 rounded-md'>
                    <DocumentScannerOutlinedIcon className='text-4xl' />
                    <div className='flex flex-col items-start pl-2'>
                        <h2 className='text-xl font-bold'>Reportes</h2>
                        <p className='text-gray-500'>
                            generación de reportes
                        </p>
                    </div>
                </button>
                <button className='flex items-center max-w-[200px] border border-transparent hover:border-white px-3 py-1 rounded-md'>
                    <BathroomIcon className='text-4xl' />
                    <div className='flex flex-col items-start pl-2'>
                        <h2 className='text-xl font-bold'>Baño</h2>
                        <p className='text-gray-500'>Baño para la mascota</p>
                    </div>
                </button>
                <button
                    className='flex items-center max-w-[200px] border border-transparent hover:border-white px-3 py-1 rounded-md'>
                    <PaymentIcon className='text-4xl' />
                    <div className='flex flex-col items-start pl-2'>
                        <h2 className='text-xl font-bold'>Puntos</h2>
                        <p className='text-gray-500'>Puntos de los servicios de la mascota</p>
                    </div>
                </button>
                <button
                    className='flex items-center max-w-[200px] border border-transparent hover:border-white px-3 py-1 rounded-md'>
                    <ContentCutIcon className='text-4xl' />
                    <div className='flex flex-col items-start pl-2'>
                        <h2 className='text-xl font-bold'>Cortes</h2>
                        <p className='text-gray-500'>Cortes para la mascota</p>
                    </div>
                </button>
            </div>
        </div>
    )
}
