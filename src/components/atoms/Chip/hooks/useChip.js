import { useState } from "react";
import { usePreloaderContext } from "../../../../contexts";
import { getRecordPet } from "../../../../utils/war/pets";
import { formatDataPet } from "../../../organims/Cpanel/components/PetForm/utils/formatDataPet";

export const useChip = () => {
	const { handlePreloader } = usePreloaderContext();
	const [banderaPet, setBanderaPet] = useState(false);

	const handleChip = (chip, token) => {
		getRecordPet(`chip=${chip}`, token)
			.then((r) => {
				r.pet ? setBanderaPet(true) : setBanderaPet(false);
			})
			.catch((e) => {
				setBanderaPet(false);
			});
	};

	const getSearch = (chip = "", token = "", setPet) => {
		handlePreloader(true);
		getRecordPet(`chip=${chip}`, token)
			.then((resolve) => {
				resolve.pet = formatDataPet(resolve.pet);
				setPet(resolve.pet);
				setBanderaPet(true);
				handlePreloader(false);
				// 	if (token != "") {
				// 		getAdopter(token, String(resolve2.adopter).toUpperCase())
				// 			.then((ad) => {
				// 				setAdopterValues({
				// 					...adopterValues,
				// 					address: ad.adopters.address,
				// 					name: ad.adopters.name,
				// 					lastName: ad.adopters.lastName,
				// 				});
				// 				handlePreloader(false);
				// 			})
				// 			.catch((e) => {
				// 				handlePreloader(false);
				// 				console.log(e);
				// 			});
				// 	} else {
				// 		setAdopterValues({
				// 			...adopterValues,
				// 			address: resolve2.adopter,
				// 			name: resolve2?.adopterName,
				// 			lastName: resolve2?.adopterLastName,
				// 		});
				// 		handlePreloader(false);
				// 	}
				// })
			})
			.catch((e) => {
				console.log(e);
				setPet({
					...petInit,
					chip: value != "" ? value : petValues.chip,
				});
				setBanderaPet(false);
				handlePreloader(false);
			});
	};

	return {
		banderaPet,
		getSearch,
		handleChip,
	};
};
