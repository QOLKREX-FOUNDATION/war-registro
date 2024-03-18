import { useState } from "react";
import { API } from "../../../../config";
import { usePreloaderContext } from "../../../../contexts";

export const useMyPet = () => {
	const [records, setRecords] = useState([]);
	const [onePet, setPet] = useState(null);
	const { handlePreloader } = usePreloaderContext();

	const changePet = (pet) => {
		window.scrollTo(0, 0);
		setPet(pet);
	};

	const handleRecords = async ({ token }) => {
		try {
			handlePreloader(true);
			const content = await fetch(`${API.war}pets/getAdopterPets/`, {
				headers: {
					"Content-Type": "application/json",
					"x-token": token,
				},
			});
			const response = await content.json();
			handlePreloader(false);
			setRecords(response);
			response?.pets?.length == 1 && setPet(response?.pets[0]);
		} catch (error) {
			console.log(error);
			handlePreloader(false);
		}
	};

	return { records, onePet, changePet, handleRecords };
};
