import { toast } from "react-toastify";
import { usePreloaderContext, useWeb3Context } from "../../../contexts";
import { setDelete } from "../../../utils/war/crud";
import { deleteImage, handlePost } from "../../../utils/war/pets";

export const Delete = ({ petInitState, reset, setOpenRemove }) => {
	const { web3 } = useWeb3Context();
	const { handlePreloader } = usePreloaderContext();
	return (
		<>
			<div>
				<h5>
					¿Estás Seguro de Eliminar la mascota con el chip: <br />{" "}
					{petInitState.chip}
				</h5>
			</div>
			<hr />
			<p>
				Una vez borrado, se eliminará toda su información y se quemará Token
				NFT, y liberará el Código del chip{" "}
			</p>
			<div className="flex justify-center gap-2 mt-5">
				<div className="w-48">
					<button
						onClick={() => setOpenRemove(false)}
						type="submit"
						className="py-2 px-4  bg-gray-500 hover:gray-red-600 dark:gray-red-700 hover:dark:bg-red-800 text-white w-full transition ease-in duration-200 text-center text-xs font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
					>
						Cerrar
					</button>
				</div>

				<div className="w-48">
					<button
						type="button"
						onClick={() => {
							handlePreloader(true);
							setDelete(
								web3.wallet,
								web3.account,
								petInitState.type,
								petInitState.chip
							)
								.then((response) => {
									if (
										response?.transactionHash != "" &&
										response?.transactionHash != undefined
									) {
										handlePost(petInitState, web3.authToken, "DELETE")
											.then(async () => {
												await deleteImage(petInitState.chip, 'image', web3.authToken);
												reset();
											})
											.catch((e) => console.log(e));
										toast.warning(`Registro Eliminado Exitosamente`, {
											theme: "colored",
										});
									} else {
										toast.warning(`Error al eliminar Registro`, {
											theme: "colored",
										});
									}

									handlePreloader(false);
								})
								.catch((e) => {
									console.log(e);
									handlePreloader(false);
									toast.error(`Error, No pudo ser eliminado`, {
										theme: "colored",
									});
								});
						}}
						className="py-2 px-4  bg-red-500 hover:bg-red-600 dark:bg-red-700 hover:dark:bg-red-800 text-white w-full transition ease-in duration-200 text-center text-xs font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
					>
						Eliminar
					</button>
				</div>
			</div>
		</>
	);
};
