import { useState } from "react";

export const useSelection = (initValues, resetInit = () => false) => {
    const [selection, setSeleccion] = useState(initValues);

    const handleSelection = (target) => {
        resetInit();
        setSeleccion({
            ...initValues,
            [target]: true,
        });
    };

    return {
        selection,
        setSeleccion,
        handleSelection,
    };
};
