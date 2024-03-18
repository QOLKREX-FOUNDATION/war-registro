import { useState } from "react";
import { API } from "../config";
import { usePreloaderContext } from "../contexts";

export const useGetPet = () => {
	const { handlePreloader } = usePreloaderContext();
	const [getRecords, setGetRecords] = useState([]);

	const handleGetRecords = async ({ id, token }) => {
		try {
			handlePreloader(true);
			const content = await fetch(
				`${API.war}pets/getHistory?idRegisteringEntity=${id}`,
				{
					headers: {
						"Content-Type": "application/json",
						"x-token": token,
					},
				}
			);
			const response = await content.json();
			handlePreloader(false);

			response.pets.reverse(function (a, b) {
				return b[0] - a[0];
			});

			for (let i = 0; i < response.pets.length; i++) {
				response.pets[i].documentNumber = "";
				response.pets[i].phone = "";
				response.pets[i].email = "";
			}

			setGetRecords(response);
		} catch (error) {
			console.log(error);
			handlePreloader(false);
		}
	};

	return {
		getRecords,
		handleGetRecords,
	};
};
