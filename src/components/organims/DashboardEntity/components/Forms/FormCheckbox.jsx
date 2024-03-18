import React from 'react'

export const FormCheckbox = ({
    label = "",
    id = "",
    options = [],
    register = {},
    errors,
    className = ""
}) => {
    return (
        <div className="w-full">
            <label
                className="block text-lg leading-6 text-gray-900 dark:text-white font-bold"
                htmlFor={id}
            >
                {label}
            </label>
            <div className={`flex  mt-2 ${ className && className }`}>
                {
                    options.map((option, index) => (
                        <>
                            <div key={index} className="flex items-center ">
                                <input
                                    key={option.value}
                                    id={option.value}
                                    type="checkbox"
                                    // value={option.value}
                                    {...register(option.value, {
                                        required: {
                                            value: option.required.value,
                                            message: option.required.message
                                        }
                                    })}
                                    className="form-checkbox h-5 w-5 text-gray-600"
                                />
                                <label htmlFor={option.value} className="block text-base font-medium text-gray-700 dark:text-white py-2 px-2">
                                    {option.label}
                                </label>

                            </div>
                            {errors[option.value] && (
                                <div>
                                    <span className="ml-7 text-red-500 required-dot">
                                        Este campo es requerido
                                    </span>
                                </div>
                            )}
                        </>
                    ))
                }
            </div>
        </div>
    )
}
