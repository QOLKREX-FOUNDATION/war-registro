import React, { useState } from 'react';
import {
    // Pets as PetsIcon,
    PetsOutlined as PetsIcon,
    Bathroom as BathroomIcon,
    DocumentScannerOutlined as DocumentScannerOutlinedIcon,
    BarChartOutlined as BarChartOutlinedIcon,
    Payment as PaymentIcon,
    ContentCut as ContentCutIcon,
} from '@mui/icons-material';
import { HomeSectionContainer } from '../../containers/HomeSectionContainer';
// import { FormModal } from '../../molecules/modals/FormModal';
import { DashboardContent } from './components';

export const Dashboard = () => {
    const [show, setShow] = useState(false)
    const [modalType, setModalType] = useState('');
    return (
        <HomeSectionContainer>
            <div className="text-start w-full mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 z-20">
                <h2 className="font-extrabold text-black dark:text-white">
                    <span className="block text-4xl">
                        Administrador
                    </span>
                    <span className="block text-3xl text-sky-500">
                        Aqui podras administrar la información de la plataforma
                    </span>
                </h2>
                <div className="flex flex-wrap gap-x-5 gap-y-7 grid-flow-row-dense mt-20 dark:text-white text-black">

                    <button
                        onClick={() => {
                            setShow(true)
                            setModalType('reports')
                        }}
                        className='flex items-center w-full max-w-[250px] border border-gray-200 hover:border-white px-3 py-1 rounded-md'>
                        <DocumentScannerOutlinedIcon className='text-4xl' />
                        <div className='flex flex-col items-start pl-2'>
                            <h2 className='text-xl font-bold'>Reportes</h2>
                            <p className='text-gray-500 dark:text-white'>Generación de reportes</p>
                        </div>
                    </button>
                    <button
                        onClick={() => {
                            setShow(true)
                            setModalType('stadistics')
                        }}
                        className='flex items-center w-full max-w-[250px] border border-gray-200 hover:border-white px-3 py-1 rounded-md'>
                        <BarChartOutlinedIcon className='text-4xl' />
                        <div className='flex flex-col items-start pl-2'>
                            <h2 className='text-xl font-bold'>Estadísticas</h2>
                            <p className='text-gray-500 dark:text-white text-left'>Visualización de estadísticas</p>
                        </div>
                    </button>
                    <button
                        onClick={() => {
                            setShow(true)
                            setModalType('bath')
                        }}
                        className='flex items-center w-full max-w-[250px] border border-gray-200 hover:border-white px-3 py-1 rounded-md'>
                        <BathroomIcon className='text-4xl' />
                        <div className='flex flex-col items-start pl-2'>
                            <h2 className='text-xl font-bold'>Baño</h2>
                            <p className='text-gray-500 dark:text-white'>Baño para la mascota</p>
                        </div>
                    </button>
                    <button
                        onClick={() => {
                            setShow(true)
                            setModalType('bath')
                        }}
                        className='flex items-center w-full max-w-[250px] border border-gray-200 hover:border-white px-3 py-1 rounded-md'>
                        <BathroomIcon className='text-4xl' />
                        <div className='flex flex-col items-start pl-2'>
                            <h2 className='text-xl font-bold'>Baño</h2>
                            <p className='text-gray-500 dark:text-white'>Baño para la mascota</p>
                        </div>
                    </button>
                    <button
                        onClick={() => {
                            setShow(true)
                            setModalType('points')
                        }}
                        className='flex items-center w-full max-w-[250px] border border-gray-200 hover:border-white px-3 py-1 rounded-md'>
                        <PaymentIcon className='text-4xl' />
                        <div className='flex flex-col items-start pl-2'>
                            <h2 className='text-xl font-bold'>Puntos</h2>
                            <p className='text-gray-500 dark:text-white'>Puntos de los servicios de la mascota</p>
                        </div>
                    </button>
                    <button
                        onClick={() => {
                            setShow(true)
                            setModalType('cuts')
                        }}
                        className='flex items-center w-full max-w-[250px] border border-gray-200 hover:border-white px-3 py-1 rounded-md'>
                        <ContentCutIcon className='text-4xl' />
                        <div className='flex flex-col items-start pl-2'>
                            <h2 className='text-xl font-bold'>Cortes</h2>
                            <p className='text-gray-500 dark:text-white'>Cortes para la mascota</p>
                        </div>
                    </button>
                    <button
                        onClick={() => {
                            setShow(true)
                            setModalType('race')
                        }}
                        className='flex items-center w-full max-w-[250px] border border-gray-200 hover:border-white px-3 py-1 rounded-md'>
                        <PetsIcon className='text-4xl' />
                        <div className='flex flex-col items-start pl-2'>
                            <h2 className='text-xl font-bold'>Razas</h2>
                            <p className='text-gray-500 dark:text-white'>Administración de las razas de las mascotas</p>
                        </div>
                    </button>

                </div>
            </div>
            {
                show && (
                    <DashboardContent
                        modalType={modalType}
                        setShow={setShow}
                    />
                )
            }
        </HomeSectionContainer>
    )
}
