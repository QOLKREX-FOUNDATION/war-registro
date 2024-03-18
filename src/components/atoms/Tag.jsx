import { useStateContext } from '../../contexts/ContextProvider';

export const Tag = ({
    access = true,
    width = "w-2/6",
    conditional,
    selection,
    handleSelection,
    icon='',
    id,
}) => {
    const { currentColor } = useStateContext();
    return (
        <>
            {
                access &&
                <div className={width}

                >
                    <button
                        onClick={() => handleSelection(conditional)}
                        className={`${!selection[conditional] && "opacity-50"
                            } py-2 px-4 text-white w-full transition ease-in duration-200 text-center text-xs font-semibold shadow-md rounded-lg`}
                        style={{ backgroundColor: currentColor }}
                    >
                        {id}
                    </button>
                </div>
            }

        </>

    )
}
