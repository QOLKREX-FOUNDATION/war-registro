import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { usePreloaderContext, useWeb3Context } from "../../../contexts";
import { generatePassword } from "../../../utils/generatePassword";
import { objectUppercase } from "../../../utils/helpers";
import { handlePost } from "../../../utils/war/adopters";
import { permisionActive } from "../../../utils/war/permissionVerifi";
import { Adopter } from "../../organims/Cpanel/components/Adopter/Adopter";
import { adopterInit } from "../../templates/PetWizard/utils/init";
import { Informative } from "../modals/Informative/Informative";

export const AdopterRegister = ({
	handleClose,
	update = false,
	showAddress = true,
}) => {
	const { web3 } = useWeb3Context();
	const { handlePreloader } = usePreloaderContext();
	const [open, setOpen] = useState(false);
	const [bandera, setBandera] = useState(false);

	const {
		register: adopterValues,
		handleSubmit: handleAdopter,
		watch: watchAdopter,
		setValue: setAdopter,
		formState: { errors: errorsAdopter },
		reset: adopterReset,
	} = useForm({
		defaultValues: adopterInit,
	});

	const onSubmit = (data) => {
		const newPassword = generatePassword(8);

		const info = {
			...objectUppercase(data),
			idRegisteringEntity: sessionStorage.getItem(
				"idEntity_" + String(web3.account).toUpperCase()
			),
			sendEmail: true,
			password: newPassword,
			userAddress: String(web3.account).toUpperCase(),
		};
		info._id = update ? info._id : "";
		delete info.addressBoolean;

		handlePetition({
			info: info,
			token: web3.authToken,
			method: update ? "PUT" : "POST",
			_id: watchAdopter("_id") ? watchAdopter("_id") : "",
			action: update ? "actualizado" : "realizado",
		});
	};

	const handlePetition = ({ info = {}, token, method, _id, action }) => {
		handlePreloader(true);
		handlePost(info, token, method, _id)
			.then((response) => {
				return response;
			})
			.then((resolve) => {
				if (resolve.ok) {
					adopterReset();
					handleClose(false);
					toast.success(`Registro ${action} Exitosamente`, {
						theme: "colored",
					});
					setOpen(false);
				} else {
					toast.error(`No pudo ser ${action}  al adoptante`, {
						theme: "colored",
					});
				}
				handlePreloader(false);
			})
			.catch((e) => {
				toast.error(`Error, No pudo ser ${action}  al adoptante`, {
					theme: "colored",
				});
				console.log(e);
				handlePreloader(false);
			});
	};

	useEffect(() => {
		setBandera(permisionActive(web3.account, 1, update ? 2 : 1));
	}, [web3.account]);

	return (
		<>
			<form onSubmit={handleAdopter(onSubmit)}>
				<Adopter
					adopterValues={adopterValues}
					setAdopter={setAdopter}
					watchAdopter={watchAdopter}
					adopterReset={adopterReset}
					errorsAdopter={errorsAdopter}
					readOnly={false}
					update={update}
					showAddress={showAddress}
				/>
				<hr className="mt-5" />
				<div className="flex justify-center gap-2 mt-5">
					<div className="w-48">
						<button
							onClick={() => handleClose(false)}
							type="submit"
							className="py-2 px-4  bg-gray-500 hover:gray-red-600 dark:gray-red-700 hover:dark:bg-red-800 text-white w-full transition ease-in duration-200 text-center text-xs font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
						>
							Cerrar
						</button>
					</div>

					{update &&
						watchAdopter("idRegistry") == sessionStorage.getItem("idEntity") &&
						watchAdopter("address") != "" &&
						permisionActive(web3.account, 1, 3) && (
							<div className="w-48">
								<button
									type="button"
									onClick={() => {
										window.scrollTo(0, 0);
										setOpen(true);
									}}
									className="py-2 px-4  bg-red-500 hover:bg-red-600 dark:bg-red-700 hover:dark:bg-red-800 text-white w-full transition ease-in duration-200 text-center text-xs font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
								>
									Eliminar
								</button>
							</div>
						)}

					<div className="w-48">
						{(!update ||
							watchAdopter("idRegistry") ==
								sessionStorage.getItem("idEntity")) &&
							bandera && (
								<button
									type="submit"
									className="py-2 px-4  bg-cyan-500 hover:bg-cyan-600 focus:ring-cyan-500 focus:ring-offset-cyan-500 text-white w-full transition ease-in duration-200 text-center text-xs font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
								>
									{update ? "Actualizar" : "Registrar"}
								</button>
							)}
					</div>
				</div>
			</form>

			{open && (
				<Informative handleClose={() => setOpen(false)}>
					<div>
						<h5>
							¿Estás Seguro de Eliminar ha <br /> {watchAdopter("name")}{" "}
							{watchAdopter("lastName")}
						</h5>
					</div>
					<hr />
					<p>Una vez borrado, no podrá recuperar la información</p>
					<div className="flex justify-center gap-2 mt-5">
						<div className="w-48">
							<button
								onClick={() => setOpen(false)}
								type="submit"
								className="py-2 px-4  bg-gray-500 hover:gray-red-600 dark:gray-red-700 hover:dark:bg-red-800 text-white w-full transition ease-in duration-200 text-center text-xs font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
							>
								Cerrar
							</button>
						</div>

						<div className="w-48">
							<button
								type="button"
								onClick={() =>
									handlePetition({
										token: web3.authToken,
										method: "DELETE",
										action: "eliminado",
										_id: watchAdopter("_id") ? watchAdopter("_id") : "",
									})
								}
								className="py-2 px-4  bg-red-500 hover:bg-red-600 dark:bg-red-700 hover:dark:bg-red-800 text-white w-full transition ease-in duration-200 text-center text-xs font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
							>
								Eliminar
							</button>
						</div>
					</div>
				</Informative>
			)}
		</>
	);
};
