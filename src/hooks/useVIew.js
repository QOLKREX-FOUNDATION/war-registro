import { useState } from "react";

export const useView = () => {
	const [values, setValues] = useState([]);

	const colours = (classes, value, index) => {
		if (value?.next != undefined) {
			return index % 2
				? classes.timeline__event__type3
				: classes.timeline__event__type4;
		} else {
			return index % 2
				? classes.timeline__event__type1
				: classes.timeline__event__type2;
		}
	};

	const handleView = (pets) => {
		const temp = [];

		pets.vaccines?.map((vaccines) => {
			temp.push({
				...vaccines,
				name: vaccines.product,
				icon: "/img/icons/vaccines/vaccines.svg",
				text: `${vaccines.illness}`,
			});
		});
		temp.sort(
			(a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
		);

		setValues([
			{
				date: pets.date,
				icon: "/img/icons/vaccines/pet.svg",
				name: "Fecha de Nacimiento",
				text: `La fecha de nacimiento de ${pets.name}`,
			},
			{
				date: pets?.chipDate ? pets?.chipDate : pets?.date,
				icon: "/img/icons/vaccines/microchip.svg",
				name: "MicroChip",
				text: `La fecha de implantación del microchip`,
			},
			...temp,
		]);
	};

	return {
		colours,
		values,
		handleView,
	};
};
