import React from 'react'
// import { FormRegister } from './Forms/FormRegister'
import { WarProvider } from '../../../../contexts/War/WarContext'
import { FormsManage } from '../../FormsManage/FormsManage'

export const Forms = () => {

    return (
        <div className="flex flex-col items-center justify-center">
            {/* <div className="w-full flex justify-end items-center gap-2">

                <button
                    onClick={() => { }}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-lg font-bold"
                >
                    Agregar Formulario
                </button>
            </div> */}
            <WarProvider>
                {/* <FormRegister /> */}
                <div className="flex justify-start max-w-7xl">
                    <FormsManage />
                </div>
            </WarProvider>
        </div>
    )
}
