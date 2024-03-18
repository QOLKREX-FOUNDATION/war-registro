import { useEffect, useState } from "react";
import { usePreloaderContext, useWeb3Context } from "../../../contexts";
import { permisionActive } from "../../../utils/war/permissionVerifi";
import { getRecordPet, handlePost } from "../../../utils/war/pets";
import { Informative } from "../../molecules/modals/Informative/Informative";
import { formatDataPet } from "../../organims/Cpanel/components/PetForm/utils/formatDataPet";
import { Delete } from "./Delete";
import { PetWizard } from "./PetWizard";
import { adopterInit, petInit } from "./utils/init";

export const Pet = ({
	update = false,
	chip = "",
	handleClose,
	handleGetRecords,
}) => {
	const { web3 } = useWeb3Context();
	const { handlePreloader } = usePreloaderContext();
	const [petInitState, setPetInitState] = useState(petInit);
	const [adopterInitState, setAdopterInitState] = useState(adopterInit);

	const [openRemove, setOpenRemove] = useState(false);

	const reset = () => {
		setPetInitState(petInit);
		setAdopterInitState(adopterInit);
		handleGetRecords({
			id: sessionStorage.getItem(
				"idsEntity_" + String(web3.account).toUpperCase()
			),
			token: web3.authToken,
		}).then();
		handleClose(false);
		setOpenRemove(false);
	};

	useEffect(() => {
		if (update) {
			handlePreloader(true);
			getRecordPet(`chip=${chip}`, web3.authToken)
				.then((response) => {
					response.pet = formatDataPet(response.pet);
					setPetInitState(response.pet);
					setAdopterInitState(response.adopter);
					handlePreloader(false);
				})
				.catch((e) => handlePreloader(false));
		}
	}, [update]);

	return (
		<>
			{update && permisionActive(web3.account, 1, 3) && (
				<div className="flex justify-end">
					<button
						type="button"
						onClick={() => setOpenRemove(true)}
						className="w-48 py-2 px-4  bg-red-500 hover:bg-red-600 dark:bg-red-700 hover:dark:bg-red-800 text-white w-full transition ease-in duration-200 text-center text-xs font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
					>
						Eliminar
					</button>
				</div>
			)}
			<PetWizard
				adopterInit={adopterInitState}
				petInit={petInitState}
				resetInit={() => {
					reset();
				}}
				update={update}
			/>

			{openRemove && (
				<Informative handleClose={() => setOpenRemove(false)}>
					<Delete
						petInitState={petInitState}
						reset={reset}
						setOpenRemove={setOpenRemove}
					/>
				</Informative>
			)}
		</>
	);
};
