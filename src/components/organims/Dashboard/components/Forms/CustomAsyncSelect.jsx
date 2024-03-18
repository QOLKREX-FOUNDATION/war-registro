import Select from "react-select";

export const CustomAsyncSelect = ({
    label = "",
    required = false,
    options = [],
    onChange = null,
    value = {},
    values = {},
    isMulti,
    id,
    loading = false,
}) => {
    console.log(options.length)

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
                isMulti={isMulti}
                className="text-black w-full font-display text-sm"
                id={id}
                onChange={onChange}
                isLoading={loading}
            />
        </div>
    );
};
