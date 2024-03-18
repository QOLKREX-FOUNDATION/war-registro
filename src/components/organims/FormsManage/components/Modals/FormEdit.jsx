import React from 'react'
import { FormRegister } from '../../../Dashboard/components/Forms/FormRegister'

export const FormEdit = ({
    selectedForm,
    getForms
}) => {
    return (
        <div className='dark:text-white flex flex-col'>
            <div className="w-full flex flex-col items-center justify-center">
                <FormRegister
                    flex={false}
                    dataRegister={selectedForm}
                    getForms={getForms}
                    isEdit={true}
                />
            </div>
        </div>
    )
}
