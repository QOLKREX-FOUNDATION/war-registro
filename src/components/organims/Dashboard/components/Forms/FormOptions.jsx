import React from 'react'

export const FormOptions = ({
    label = "",
    id = "",
    options = [],
    register = {},
    errors
}) => {
    return (
        <div className="w-full">
            <label
                className="block text-lg leading-6 text-gray-900 dark:text-white font-bold"
                htmlFor={id}
            >
                {label}
            </label>
            <div className="flex gap-4 mt-2">
                {
                    options.map((option, index) => (
                        <div key={option.value} className="flex items-center ">
                            <input
                                id={option.value}
                                type="radio"
                                value={option.value}
                                {...register}
                                className="form-radio h-5 w-5 text-gray-600"
                            />
                            <label htmlFor={option.value} className="block text-sm font-medium text-gray-700 dark:text-white py-2 px-2">
                                {option.label}
                            </label>
                        </div>
                    ))
                }
            </div>
            <div>
                {errors[id] && (
                    <span className="text-red-500 required-dot">
                        Este campo es requerido
                    </span>
                )}
            </div>
        </div>
    )
}
