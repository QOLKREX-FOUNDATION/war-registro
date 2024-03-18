import { useContext, useState } from "react";
import { PreloaderContext } from "../../../../../../contexts/Preloader/PreloaderContext";
import { formatDate } from "../../../../../../utils/date";
import { getExist, handleAdopter } from "../../../../../../utils/war/adopters";
import { getEntityAll } from "../../../../../../utils/war/RegisteringEntities";
import { adopterInit } from "../../../../../templates/PetWizard/utils/init";

export const useAdopterSearch = (update) => {
	const { handlePreloader } = useContext(PreloaderContext);
	const [banderaAdopter, setBanderaAdopter] = useState(false);
	const [banderaAddress, setBanderaAddress] = useState(false);
	const [banderaEmail, setBanderaEmail] = useState(false);

	const [entityOptions, setEntityOptions] = useState([]);

	const getEntityActive = (web3) => {
		getEntityAll(web3)
			.then((resolve) => {

				const elements = [];
				for (let index = 0; index < resolve[0].length; index++) {
					if (resolve[0][index]) {
						const item =
							resolve[2][index] != ""
								? JSON.parse(
										Buffer.from(resolve[2][index], "base64").toString()
								  )
								: "";

						item != "" &&
							elements.push({
								label: item.documentNumber + " - " + item.name,
								value: resolve[0][index],
							});
					}
				}
				setEntityOptions(elements);
			})
			.catch((e) => console.log(e));
	};

	const getAdopter = ({ web3, watchAdopter, adopterReset, token }) => {
		setBanderaAddress(false);
		setBanderaEmail(false);
		if (
			watchAdopter("country") != "" &&
			watchAdopter("document") != "" &&
			watchAdopter("documentNumber") != ""
		) {
			update && handlePreloader(true);
			handleAdopter(
				token,
				watchAdopter("country"),
				watchAdopter("document"),
				watchAdopter("documentNumber")
			)
				.then((response) => {
					if (response.adopters && update) {
						response.adopters.date = formatDate(response.adopters.date, true);
						adopterReset(response.adopters);
						setBanderaAdopter(true);
						getEntityActive(web3);
					} else if (!response.adopters && update) {
						adopterReset({
							...adopterInit,
							country: watchAdopter("country"),
							document: watchAdopter("document"),
							documentNumber: watchAdopter("documentNumber"),
						});
						setBanderaAdopter(false);
					} else {
						setBanderaAdopter(true);
					}
					handlePreloader(false);
				})
				.catch((e) => {
					console.log(e);
					setBanderaAdopter(false);
					handlePreloader(false);
					update &&
						adopterReset({
							...adopterInit,
							country: watchAdopter("country"),
							document: watchAdopter("document"),
							documentNumber: watchAdopter("documentNumber"),
						});
				});
		}
	};
	const handleAddress = (address, token, id = "") => {
		address = String(address).toUpperCase();
		handlePreloader(true);
		getExist(token, "address", address, id)
			.then((resolve) => {
				handlePreloader(false);
				resolve.ok && setBanderaAddress(resolve.bandera);
			})
			.catch((e) => {
				setBanderaAddress(false);
				handlePreloader(false);
			});
	};

	const handleEmail = (email, token, id = "") => {
		email = String(email).toUpperCase();
		handlePreloader(true);
		getExist(token, "email", email, id)
			.then((resolve) => {
				handlePreloader(false);
				resolve.ok && setBanderaEmail(resolve.bandera);
			})
			.catch((e) => {
				setBanderaEmail(false);
				handlePreloader(false);
			});
	};

	return {
		banderaAdopter,
		banderaAddress,
		banderaEmail,
		entityOptions,
		getAdopter,
		handleAddress,
		handleEmail,
	};
};
