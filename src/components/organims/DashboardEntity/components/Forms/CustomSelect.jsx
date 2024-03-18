import Select from "react-select";

export const ModalSelect = ({
    label = "",
    required = false,
    options = [],
    onChange = null,
    value = {},
    isMulti,
    id
}) => {
    return (
        <div className="">
            <div
                className="flex justify-between items-center"
            >
                {
                    label && <label
                        htmlFor={id}
                        className="text-lg font-bold"
                    >{label}</label>
                }
                {required &&
                    <span
                        className="text-red-500 text-sm"
                    >(requerido)</span>}
            </div>
            <Select
                options={options}
                value={value}
                // styles={customStyles}
                aria-errormessage={id}
                aria-invalid={required}
                isMulti={isMulti}
                className="text-black w-full font-display text-sm"
                id={id}
                onChange={onChange}
                isLoading={options.length === 0}
            />
        </div>
    );
};
