"use client";
import clsx from "clsx";
import React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

export const FormInput = ({
    label,
    id,
    type = "text",
    required = {},
    minLength = {},
    maxLength = {},
    pattern = {},
    validate = {},
    register,
    errors,
    disabled = false,
    placeholder = "",
    onChange,
    accept = "",
    size = "",
    upperCase = false,
}) => {
    // console.log(register)
    // console.log(errors)
    return (
        <div className="w-full">
            <label
                className="block text-lg leading-6 text-gray-900 dark:text-white font-bold"
                htmlFor={id}
            >
                {label}
            </label>
            <div className="mt-2">
                <input
                    id={id}
                    type={type}
                    autoComplete="off"
                    disabled={disabled}
                    placeholder={placeholder}
                    onChange={onChange}
                    accept={accept}
                    size={size}
                    {...register(id, {
                        required: required,
                        minLength: minLength,
                        maxLength: maxLength,
                        validate: validate,
                        pattern: pattern,
                    })}
                    // {...register}
                    className={clsx(`
                    form-input
                    block
                    w-full
                    rounded-md
                    border-0
                    py-2.5
                    
                    text-gray-900
                    shadow-sm
                    ring-l
                    ring-inset
                    ring-gray-300
                    placeholder:text-gray-400
                    focus:ring-4
                    focus:ring-inset
                    focus:ring-sky-400
                    sm:text-sm
                    sm: leading-6
                    `, errors[id] && 'ring-2 focus:ring-red-500',
                        disabled && 'opacity-50 cursor-default',
                        upperCase && 'uppercase'
                    )}
                />
            </div>
            <div className="flex flex-col">
                {
                    errors[id]?.type === "required"
                    && (
                        <span className="text-red-500 required-dot">
                            - Este campo es requerido
                        </span>
                    )
                }
                {/* {
                    errors[id]?.type === "pattern" && (
                        <span className="text-red-500 required-dot">
                            - El formato del campo es incorrecto
                        </span>
                    )
                } */}
                {
                    errors[id]?.type === "minLength" && (
                        <span className="text-red-500 required-dot">
                            - El campo debe tener al menos {minLength.value} caracteres
                        </span>
                    )
                }
                {
                    errors[id]?.type === "maxLength" && (
                        <span className="text-red-500 required-dot">
                            - El campo debe tener menos de {maxLength?.value} caracteres
                        </span>
                    )
                }
                {
                    errors[id]?.type === "validate" && (
                        <span className="text-red-500 required-dot">
                            - {errors[id]?.message}
                        </span>
                    )
                }
                {
                    errors[id]?.type === "pattern" && (
                        <span className="text-red-500 required-dot">
                            {/* - El formato del campo es incorrecto */}
                            - {
                                errors[id]?.message
                            }
                        </span>
                    )
                }
            </div>
        </div>
    );
};
