import { Input } from "../Form";

export const ChipDate = ({ petValues, watchPet, errorsPet, update = false }) => {
	return (
		<div>
			{(!update || (watchPet("chip") != "" && !errorsPet.chip)) && (
				<Input
					name="Fecha de Instalación de Chip"
					type="date"
					required
					error={errorsPet?.chipDate}
					formInput={petValues("chipDate", {
						required: {
							value: true,
							message: "Campo requerido",
						},
					})}
				/>
			)}
		</div>
	);
};
