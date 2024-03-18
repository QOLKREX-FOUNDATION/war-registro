import React from 'react'
import Select from "react-select";
import { useStateContext } from '../../../../contexts/ContextProvider';

export const CustomSelect = ({
    name = false,
    value = {},
    onChange = () => false,
    options = [],
    required = false,
    isMulti = false,
    readOnly = false,
}) => {
    const { currentColor, currentMode } = useStateContext();

    const style = {
        fontSize: "0.75rem",
        lineHeight: "1rem",
        color: "black"
    };

    const customStyles = {
        indicatorSeparator: (provided, state) => ({
            ...provided,
            ...style,
        }),
        input: (provided, state) => ({
            ...provided,
            ...style,
        }),
        dropdownIndicator: (provided, state) => ({
            ...provided,
            ...style,
        }),
        indicatorsContainer: (provided, state) => ({
            ...provided,
            ...style,

        }),
        valueContainer: (provided, state) => ({
            ...provided,
            ...style,
        }),
        singleValue: (provided, state) => ({
            ...provided,
            ...style,

        }),
        multiValue: (provided, state) => {
            let colour = state.data?.hex ? state.data.hex : "hsl(0, 0%, 90%)";
            return {
                ...provided,
                ...style,
                backgroundColor: `${ colour }`,
                fontWeight: "bold",
            };
        },
        multiValueLabel: (provided, state) => ({
            ...provided,
            ...style,
        }),
        multiValueRemove: (provided, state) => ({
            ...provided,
            ...style,
        }),
        control: (base) => ({
            ...base,
            fontSize: "0.75rem",
            margin: 0,
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: currentMode === 'Light' ? "white" : "white",
            color: currentMode === 'Light' ? "black" : "black",
        }),
        container: (provided, state) => ({
            ...provided,
            ...style,
        }),
        width: (provided, state) => ({
            ...provided,
            ...style,
            width: "100%",
        }),
    };

    return (
        <div className=" relative w-full dark:text-black ">
            {
                name &&
                <label className="text-gray-700 text-xs">
                    <p className="capitalize mb-2" style={{ color: currentColor }}>
                        {name}
                    </p>
                </label>
            }
            <Select
                isDisabled={readOnly}
                options={options}
                value={value}
                onChange={onChange}
                isMulti={isMulti}
                className="text-black w-full"
            />
            {/* {
                required && <span className="text-red-500 required-dot">
                    Este campo es requerido
                </span>
            } */}
        </div>
    );
}
