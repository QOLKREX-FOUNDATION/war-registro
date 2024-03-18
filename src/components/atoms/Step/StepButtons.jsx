import { useStateContext } from "../../../contexts/ContextProvider";

export const StepButtons = ({ wizard, setWizard, init, end, bandera = true }) => {
	const { currentColor } = useStateContext();

	return (
		<>
			{wizard > init ? (
				<button
					onClick={() => setWizard(wizard - 1)}
					type="button"
					className="py-2 px-4 text-white bg-red-600 w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg"
				>
					Regresar
				</button>
			) : (
				<div></div>
			)}
			{end > wizard && bandera && (
				<button
					className="py-2 px-4 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg"
					style={{ background: currentColor }}
				>
					Continuar
				</button>
			)}
		</>
	);
};
