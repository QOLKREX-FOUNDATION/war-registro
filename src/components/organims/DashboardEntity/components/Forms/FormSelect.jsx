import React from 'react'
import { ModalSelect } from './CustomSelect'

export const FormSelect = ({
    label = "",
    property = "",
    required = false,
    options = [],
    values = {},
    message = "Campo requerido",
    watch = {},
    value = options.filter((v) => v.value === watch(property)),
    setValue = {},
    error = {},
    onChange = (target) => setValue(property, target.value),
    isMulti = false,
    id
}) => {
    // console.log(typeof values)
    return (
        <div className='flex flex-col w-full'>
            <ModalSelect
                label={label}
                value={value}
                options={options}
                onChange={onChange}
                isMulti={isMulti}
                required={required}
                id={id}
            />
            {
                values &&
                <input
                    type="hidden"
                    required
                    {...values(property, {
                        required: {
                            value: required,
                            message: "Este campo es requerido"
                        }
                    })}
                />
            }
            <div>
                {error[property] && (
                    <span className="text-red-500 required-dot">
                        Este campo es requerido
                    </span>
                )}
            </div>
        </div>
    )
}
