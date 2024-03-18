import { useState } from "react";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { PreloaderContext } from "../../../contexts/Preloader/PreloaderContext";
import { Web3Context } from "../../../contexts/Web3/Web3Context";
import { setStatus } from "../../../utils/war/bridge";
import { handlePostStatus } from "../../../utils/war/pets";
import { Select } from "../Form";

const selectStatus = [
	{ label: "ACTIVO", value: "ACTIVE" },
	{ label: "PÉRDIDO", value: "LOST" },
	{ label: "ROBADO", value: "STOLEN" },
	{ label: "DECESO", value: "DEAD" },
];

export const Status = ({ chip, pet, handleClose, handleGetRecords }) => {
	const { web3 } = useContext(Web3Context);
	const { handlePreloader } = useContext(PreloaderContext);

	const { register: statusNew, watch } = useForm({
		defaultValues: { status: pet.status },
	});
	const [statusOptions] = useState(selectStatus);

	const handleStatus = () => {
		handlePreloader(true);
		setStatus(web3.wallet, web3.account, chip, watch("status"))
			.then((response) => {
				if (response?.transactionHash) {
					handlePostStatus(
						{ chip: chip, status: watch("status"), address: web3.account },
						web3.authToken
					).then(() => {
						handleGetRecords({
							id: sessionStorage.getItem(
								"idsEntity_" + String(web3.account).toUpperCase()
							),
							// id: sessionStorage.getItem(
							// 	"idEntity_" + String(web3.account).toUpperCase()
							// ),
							token: web3.authToken,
						});
						handlePreloader(false);
						handleClose(false);
					});
				} else {
					handlePreloader(false);
				}
			})
			.catch((e) => {
				console.log(e);
				handlePreloader(false);
			});
	};

	return (
		<>
			<div className="flex justify-center">
				<div className="w-1/2">
					<h2 className="text-center font-bold text-xl mb-12">
						{pet.name} - {chip}
					</h2>
					<p className="mb-2  text-lg">
						Activo: El animal se encuentra en perfectas condiciones.
					</p>
					<p className="mb-2  text-lg">
						Extraviado: Proceda si el animal se encuentra perdido.
					</p>
					<p className="mb-2  text-lg">
						Robado: Proceda si considera que el animal fue raptado.
					</p>
					<p className="mb-6  text-lg">
						Deceso: Si el animal carece de vida activar esta opción.
					</p>
					<div className="mb-16">
						<Select
							name="status"
							formInput={statusNew("status")}
							options={statusOptions}
						/>
					</div>

					<div
						style={{ display: "flex", justifyContent: "center", gap: "1rem" }}
					>
						<button
							className="py-2 px-4 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg bg-yellow-500"
							onClick={() => handleClose(false)}
						>
							Cerrar
						</button>

						<button
							className="py-2 px-4 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg bg-green-500"
							onClick={handleStatus}
						>
							Actualizar
						</button>
					</div>
				</div>
			</div>
		</>
	);
};
