import { useStateContext } from "../../../contexts/ContextProvider";

export const Option = ({
    label1 = "",
    label2 = "",
    name,
    id = name,
    onChange = () => false,
    checked = () => false,
}) => {
    const { currentColor } = useStateContext();



    return (
        <div
            className="flex items-center font-bold justify-center gap-3 text-md w-80 px-4 py-2 mt-1 border-solid border-2 border-slate-400 dark:border-slate-300"
            style={{
                background: checked ? currentColor : "transparent",
            }}
        >
            <span className="text-black dark:text-white"
                style={{
                    opacity: checked ? .5 : 1,
                }}
            >
                {label1}
            </span>

            <label className="relative inline-block m-0 p-0 w-16 h-8 border-solid border-2 border-slate-400 dark:border-slate-300"
                style={{
                    background: checked ? currentColor : "transparent",
                    filter: checked ? "brightness(100%)": "brightness(60%)",
                    borderRadius: 34,

                }}
            >

                <input
                    type="checkbox"
                    className="peer opacity-0 w-0 h-0"
                    name={name}
                    id={id}
                    onChange={onChange}
                    checked={checked}
                />


                <span
                    className="absolute cursor-pointer top-0 left-0 right-0 bottom-0  duration-500 rounded-full absolute w-6 h-6 left-2.5 top-0.5 bg-white duration-500 transition-all peer-checked:translate-x-5" />
            </label>
            <span className="text-black	 dark:text-white	"
                style={{
                    opacity: checked ? 1 : .5,
                }}
            >
                {label2}
            </span>
        </div >
    );
};
