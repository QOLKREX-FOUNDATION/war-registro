import { useContext, useEffect, useState } from "react";
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
// import { firuApi } from "../../../../api";
// import Swal from "sweetalert2";
import { useSearchForm } from "../../../hooks/useSearchForm";
// import { dateStringYear } from "../../../utils/date";
import { useCorrelative } from "../../../hooks/useCorrelative";
import { CorrelativeContext } from "../../../contexts/CorrelativeContext";
import Swal from "sweetalert2";

export const AdopterRegister = ({
	handleClose,
	update = false,
	showAddress = true,
}) => {
	const { web3 } = useWeb3Context();
	const { handlePreloader } = usePreloaderContext();
	const [open, setOpen] = useState(false);
	const [bandera, setBandera] = useState(false);
	// const [search, setSearch] = useState("");
	const { setCorrelativeId } = useContext(CorrelativeContext);
	const { setStatusCorrelative } = useCorrelative();

	const {
		register: adopterValues,
		handleSubmit: handleAdopter,
		watch: watchAdopter,
		setValue: setAdopter,
		formState: { errors: errorsAdopter },
		reset: adopterReset,
		getValues
	} = useForm({
		defaultValues: adopterInit,
	});
	console.log(getValues('country'))
	console.log(getValues('department'))

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
					toast.success(`Registro ${ action } Exitosamente`, {
						theme: "colored",
					});
					setOpen(false);
					console.log("aqui")
					action === "realizado" && setStatusCorrelative("registered-adopter");
				} else {
					toast.error(`No pudo ser ${ action }  al adoptante`, {
						theme: "colored",
					});
				}
				handlePreloader(false);
			})
			.catch((e) => {
				toast.error(`Error, No pudo ser ${ action }  al adoptante`, {
					theme: "colored",
				});
				console.log(e);
				handlePreloader(false);
			});
	};

	useEffect(() => {
		setBandera(permisionActive(web3.account, 1, update ? 2 : 1));
	}, [web3.account]);

	const [page, setPage] = useState(0);

	const { data, loading, handleSearch, handleSearchUserEmail, handleSearchUserName, handleSubmitSearch, handleCleanSearch, errorsSearch, registerSearch, handleCleanSearchUser, dataUsers, handleNextPage, totalResults } = useSearchForm();

	const handleLoadData = () => {

		console.log(data.adopter.birthDate)

		setAdopter("person", data.adopter.person)
		setAdopter("type", data.adopter.adopterType)
		setAdopter("name", data.adopter.firstName)
		setAdopter("secondName", data.adopter.secondName)
		setAdopter("lastName", data.adopter.firstLastName)
		setAdopter("mLastName", data.adopter.secondLastName)
		setAdopter("gender", data.adopter.gender === "H" ? "MAN" : "WOMAN")
		setAdopter("date", data.adopter.birthDate)
		setAdopter("address", data.adopter.addressPublic)
		setAdopter("document", data.adopter.documentType)
		setAdopter("documentNumber", data.adopter.documentNumber)
		setAdopter("phone", data.adopter.cellphone)
		setAdopter("email", data.adopter.email)
		setAdopter("country", data.adopter.country)
		setAdopter("department", data.adopter.department)
		setAdopter("province", data.adopter.province)
		setAdopter("district", data.adopter.district)
		setAdopter("direction", data.adopter.address)
		// setAdopter("idRegisteringEntity",data.adopter.registeringEntity)
		// setAdopter("idEntity",data.adopter.idEntity)
		// setAdopter("status",data.adopter.status)
		setCorrelativeId(data.id);
	}

	const showDataUserModal = (data) => {
		// list data user in modal (name, email, phone, address)
		// if accept, load data in form
		Swal.fire({
			title: '¿Desea cargar los datos del usuario?',
			showDenyButton: true,
			showCancelButton: true,
			confirmButtonText: `Cargar`,
			denyButtonText: `No cargar`,
			html: `<div class="flex flex-col gap-2 mt-5 dark:text-white">
			<div className="flex flex-col flex-wrap gap-4">
				<h1 className="font-semibold">
					Datos del Adoptante
				</h1>
				<hr />
				<div className="flex flex-col">
					<h2 className="text-start dark:text-white"><b>Nombre:</b> ${ data?.name }</h2>
					<h2 className="text-start dark:text-white"><b>Tipo de Persona:</b> ${ data?.type }</h2>
					<h2 className="text-start dark:text-white"><b>Tipo de Documnento:</b> ${ data?.document }</h2>
					<h2 className="text-start dark:text-white"><b>Número de Documnento:</b> ${ data?.documentNumber }</h2>
					<h2 className="text-start dark:text-white"><b>Género:</b> ${ data?.gender === 'MAN' ? 'HOMBRE' : 'MUJER' }</h2>
					<h2 className="text-start dark:text-white"><b>Tipo de Persona:</b> ${ data?.person }</h2>
					<h2 className="text-start dark:text-white"><b>Email:</b> ${ data?.email }</h2>
					<h2 className="text-start dark:text-white"><b>Celular:</b> ${ data?.phone }</h2>
					<h2 className="text-start dark:text-white"><b>Address del adoptante:</b> ${ data?.address }</h2>
				</div>
			</div>
		</div>`
		}).then((result) => {
			/* Read more about isConfirmed, isDenied below */
			if (result.isConfirmed) {
				setAdopter("person", data.person)
				setAdopter("type", data.adopterType)
				setAdopter("name", data.name)
				setAdopter("secondName", data.secondName)
				setAdopter("lastName", data.lastName)
				setAdopter("mLastName", data.mLastName)
				setAdopter("gender", data.gender)
				setAdopter("date", data.date)
				setAdopter("address", data.address)
				setAdopter("document", data.document)
				setAdopter("documentNumber", data.documentNumber)
				setAdopter("phone", data.phone)
				setAdopter("email", data.email)
				setAdopter("country", data.country)
				setAdopter("department", data.department)
				setAdopter("province", data.province)
				setAdopter("district", data.district)
				setAdopter("direction", data.direction)
				Swal.fire('Cargado!', '', 'success')
			} else if (result.isDenied) {
				Swal.fire('No se cargaron los datos', '', 'info')
			}
		})

	}

	const [activeIndex, setActiveIndex] = useState(1);

	// console.log({ dataUsers })

	return (
		<>


			<div className="border-b border-gray-200 dark:border-gray-700">
				<ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
					<li className="mr-2">
						<a
							onClick={() => setActiveIndex(1)}
							href="#"
							className={`inline-flex items-center justify-center p-4  border-b-2  rounded-t-lg active group  ${ activeIndex == 1 ? 'active-tab' : 'inactive-tab' }`} aria-current="page">
							<svg className={`w-4 h-4 mr-2 ${ activeIndex == 1 ? 'svg-active' : 'svg-inactive' }`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
								<path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
							</svg>Correlativo
						</a>
					</li>
					{
						update && <>
							<li className="mr-2">
								<a
									onClick={() => {
										setActiveIndex(2)
										setPage(0)
										handleCleanSearchUser()
									}}
									href="#"
									className={`inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg group ${ activeIndex == 2 ? 'active-tab' : 'inactive-tab' }`}>
									<svg className={`w-4 h-4 mr-2 ${ activeIndex == 2 ? 'svg-active' : 'svg-inactive' }`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
										<path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
									</svg>Email
								</a>
							</li>
							<li className="mr-2">
								<a
									onClick={() => {
										setActiveIndex(3)
										setPage(0)
										handleCleanSearchUser()
									}}
									href="#"
									className={`inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg group ${ activeIndex == 3 ? 'active-tab' : 'inactive-tab' }`}>
									<svg className={`w-4 h-4 mr-2 ${ activeIndex == 3 ? 'svg-active' : 'svg-inactive' }`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
										<path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
									</svg>Nombre
								</a>
							</li>
						</>
					}
					{/* <li>
						<a className="inline-block p-4 text-gray-400 rounded-t-lg cursor-not-allowed dark:text-gray-500">Disabled</a>
					</li> */}
				</ul>
			</div>

			{/* search by correlative only forms completed*/}
			{
				activeIndex === 1 &&
				<>
					<form
						onSubmit={handleSubmitSearch(handleSearch)}
						className="flex flex-row gap-2 mt-5 w-1/2"
					>
						{/* input text search correlative */}
						<div className="w-full flex flex-col h-32 gap-3">
							<label htmlFor="searchCorrelative" className="font-semibold dark:text-white">
								Buscar por Nro de Formulario
							</label>
							<input
								id="searchCorrelative"
								type="text"
								className="h-10 px-3 dark:text-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 w-full"
								placeholder="Buscar por Correlativo"
								{
								...registerSearch("search", {
									required: {
										value: true,
										message: "Campo requerido",
									},
									minLength: {
										value: 1,
										message: "Mínimo 1 caracteres",
									},
									// maxLength: {
									// 	value: 4,
									// 	message: "Máximo 4 caracteres",
									// },
								})
								}
							/>
							<span className="text-red-500 px-3">
								{
									(data.status === "registered-adopter" ||
										data.status === "registered-pet")
									&&
									"El usuario se encuentra registrado"
								}
							</span>
							<span className="dark:text-white px-3">
								Ejemplo: 1
							</span>
						</div>
						{/* button search */}
						<div className="flex gap-2 mt-8">
							<button
								type="submit"
								className="w-36 h-10 py-2 px-4 flex justify-center gap-2 bg-cyan-500 hover:bg-cyan-600 focus:ring-cyan-500 focus:ring-offset-cyan-500 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
							>
								<span>
									Buscar
								</span>
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
									<path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
								</svg>

							</button>
							<button
								type="button"
								className="w-36 h-10 py-2 px-4 flex justify-center gap-2 bg-cyan-500 hover:bg-cyan-600 focus:ring-cyan-500 focus:ring-offset-cyan-500 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
								onClick={handleCleanSearch}
							>
								<span>
									Limpiar
								</span>
								<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-search-off" width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth={1.5} >
									<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
									<path d="M5.039 5.062a7 7 0 0 0 9.91 9.89m1.584 -2.434a7 7 0 0 0 -9.038 -9.057"></path>
									<path d="M3 3l18 18"></path>
								</svg>

							</button>
						</div>
					</form>
					{
						errorsSearch?.search && (
							<p className="ml-3 text-red-400 font-semibold">
								{errorsSearch?.search.message}
							</p>
						)
					}

					{
						// muestra los datos del formulario encontrado
						loading ?
							<div className="flex justify-center mt-5 ">
								<div className="animate-spin rounded-full h-20 w-20 border-b-4 border-gray-900 dark:border-white"></div>
							</div>
							:
							(data.id &&
								<div className="flex flex-col justify-center gap-2 mt-5 dark:text-white">
									{/* triangle border */}
									<div className="flex max-w-xl overflow-hidden relative -bottom-2">
										<div className="w-16 overflow-hidden inline-block">
											<div className=" h-11 w-11 border border-black dark:border-white rotate-45 transform origin-bottom-left"></div>
										</div>
										<div className="w-16 overflow-hidden inline-block">
											<div className=" h-11 w-11 border border-black dark:border-white rotate-45 transform origin-bottom-left"></div>
										</div>
										<div className="w-16 overflow-hidden inline-block">
											<div className=" h-11 w-11 border border-black dark:border-white rotate-45 transform origin-bottom-left"></div>
										</div>
										<div className="w-16 overflow-hidden inline-block">
											<div className=" h-11 w-11 border border-black dark:border-white rotate-45 transform origin-bottom-left"></div>
										</div>
										<div className="w-16 overflow-hidden inline-block">
											<div className=" h-11 w-11 border border-black dark:border-white rotate-45 transform origin-bottom-left"></div>
										</div>
										<div className="w-16 overflow-hidden inline-block">
											<div className=" h-11 w-11 border border-black dark:border-white rotate-45 transform origin-bottom-left"></div>
										</div>
										<div className="w-16 overflow-hidden inline-block">
											<div className=" h-11 w-11 border border-black dark:border-white rotate-45 transform origin-bottom-left"></div>
										</div>
										<div className="w-16 overflow-hidden inline-block">
											<div className=" h-11 w-11 border border-black dark:border-white rotate-45 transform origin-bottom-left"></div>
										</div>
										<div className="w-16 overflow-hidden inline-block">
											<div className=" h-11 w-11 border border-black dark:border-white rotate-45 transform origin-bottom-left"></div>
										</div>
									</div>
									<div className="flex flex-col  gap-2 max-w-xl  border border-black dark:border-white border-t-transparent dark:border-t-transparent h-96 pl-4">
										<h2 className="font-semibold py-3">
											Nro de Formulario:
											<span className="ml-2">
												{data.correlativeNumber.toString().padStart(4, "0")}
											</span>
										</h2>
										<div className="max-h-96 overflow-y-auto ">
											<div className="flex flex-col flex-wrap gap-4">
												<h1 className="font-semibold">
													Datos del Adoptante
												</h1>
												<hr />
												<h2 className="dark:text-white"><b>Nombre:</b> {data.adopter.firstName}</h2>
												<h2 className="dark:text-white"><b>Segundo Nombre:</b> {data.adopter.secondName}</h2>
												<h2 className="dark:text-white"><b>Primer Apellido:</b> {data.adopter.firstLastName}</h2>
												<h2 className="dark:text-white"><b>Segundo Apellido:</b> {data.adopter.secondLastName}</h2>
												<h2 className="dark:text-white"><b>Tipo de Persona:</b> {data.adopter.person}</h2>
												<h2 className="dark:text-white"><b>Tipo:</b> {data.adopter.adopterType}</h2>
												<h2 className="dark:text-white"><b>Género:</b> {data.adopter.gender}</h2>
												<h2 className="dark:text-white"><b>Fecha de Nacimiento:</b> {data.adopter.birthDate}</h2>
												<h2 className="dark:text-white"><b>Address:</b> {data.adopter.address}</h2>
												<h2 className="dark:text-white"><b>Tipo de Documento:</b> {data.adopter.documentType}</h2>
												<h2 className="dark:text-white"><b>Número de Documento:</b> {data.adopter.documentNumber}</h2>
												<h2 className="dark:text-white"><b>Celular:</b> {data.adopter.cellphone}</h2>
												<h2 className="dark:text-white"><b>Email:</b> {data.adopter.email}</h2>
												<h2 className="dark:text-white"><b>País:</b> {data.adopter.country}</h2>
												<h2 className="dark:text-white"><b>Departmento:</b> {data.adopter.department}</h2>
												<h2 className="dark:text-white"><b>Provincia:</b> {data.adopter.province}</h2>
												<h2 className="dark:text-white"><b>Distrito:</b> {data.adopter.district}</h2>
												<h2 className="dark:text-white"><b>Dirección:</b> {data.adopter.address}</h2>
											</div>
										</div>
									</div>
									{
										(data.status !== "registered-pet" &&
											data.status !== "registered-adopter")
										&&
										<button
											type="button"
											onClick={handleLoadData}
											className="w-56 py-3 mx-auto bg-green-500 hover:bg-green-600 focus:ring-green-500 focus:ring-offset-green-500 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg flex justify-center gap-2"
										>
											<span>
												Cargar datos
											</span>
											<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-file-download" width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth={1.5}>
												<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
												<path d="M14 3v4a1 1 0 0 0 1 1h4"></path>
												<path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z"></path>
												<path d="M12 17v-6"></path>
												<path d="M9.5 14.5l2.5 2.5l2.5 -2.5"></path>
											</svg>
										</button>
									}
									{/* <button
									className="w-56 py-3 mx-auto bg-red-500 hover:bg-red-600 focus:ring-red-500 focus:ring-offset-red-500 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg flex justify-center gap-2"
									onClick={() => {
										setStatusCorrelative("registered-adopter")
									}}
								>
									Actualizar estado
								</button> */}
								</div>
							)
					}
				</>
			}
			{
				activeIndex === 2 &&
				<>
					{
						update && <>
							{/* search by email or name aquí se mostrarán varios resultados y se podrán abrir en un modalpara ver su data */}
							<form
								onSubmit={handleSubmitSearch(handleSearchUserEmail)}
								className="flex flex-row gap-2 mt-5 w-1/2"
							>
								{/* input text search correlative */}
								<div className="w-full flex flex-col h-40 gap-3">
									<label htmlFor="search-user" className="font-semibold dark:text-white">
										Buscar por Email
									</label>
									<input
										id="search-user"
										type="text"
										className="h-10 px-3 dark:text-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 w-full"
										placeholder="Buscar por Email"
										{
										...registerSearch("searchUser", {
											required: {
												value: true,
												message: "Campo requerido",
											},
											minLength: {
												value: 1,
												message: "Mínimo 1 caracteres",
											},
										})
										}
									/>
									<span className="text-red-500 px-3">
										{
											(data.status === "registered-adopter" ||
												data.status === "registered-pet")
											&&
											"El usuario se encuentra registrado"
										}
									</span>
									<span className="dark:text-white px-3">
										Ejemplo: juan@gmail.com
									</span>
								</div>
								{/* button search */}
								<div className="flex gap-2 mt-8">
									<button
										type="submit"
										className="w-36 h-10 py-2 px-4 flex justify-center gap-2 bg-cyan-500 hover:bg-cyan-600 focus:ring-cyan-500 focus:ring-offset-cyan-500 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
										onClick={() => {
											setPage(0)
										}}
									>
										<span>
											Buscar
										</span>
										<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
											<path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
										</svg>

									</button>
									<button
										type="button"
										className="w-36 h-10 py-2 px-4 flex justify-center gap-2 bg-cyan-500 hover:bg-cyan-600 focus:ring-cyan-500 focus:ring-offset-cyan-500 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
										onClick={handleCleanSearchUser}
									>
										<span>
											Limpiar
										</span>
										<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-search-off" width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth={1.5} >
											<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
											<path d="M5.039 5.062a7 7 0 0 0 9.91 9.89m1.584 -2.434a7 7 0 0 0 -9.038 -9.057"></path>
											<path d="M3 3l18 18"></path>
										</svg>

									</button>
								</div>
							</form>
							{
								errorsSearch?.searchUser && (
									<p className="ml-3 text-red-400 font-semibold">
										{errorsSearch?.searchUser.message}
									</p>
								)
							}

							{
								// muestra los datos del formulario encontrado
								loading ?
									<div className="flex justify-center mt-5 ">
										<div className="animate-spin rounded-full h-20 w-20 border-b-4 border-gray-900 dark:border-white"></div>
									</div>
									:
									(dataUsers.length > 0 &&
										<div className=" w-1/2 flex flex-col">
											<span className="dark:text-white text-xl">
												total:	{dataUsers.length} resultados de {totalResults}
											</span>
											<div className="flex flex-col flex-shrink-0 justify-start gap-2 mt-5 dark:text-white max-h-64 overflow-y-auto ">
												{/* triangle border */}
												{
													dataUsers.map((user, index) => (

														<div key={index} className=" flex flex-wrap justify-between max-w-xl overflow-hidden relative -bottom-2  dark:bg-gray-600 rounded-lg py-3 px-4 min-h-[100px] dark:text-white bg-gray-300 hover:bg-gray-400">
															<div className="flex flex-col">
																<span className="absolute bottom-3 bg-blue-600 rounded-xl w-6 -h-6 text-sm m-auto text-center text-white">
																	{
																		index + 1
																	}
																</span>
																<span>
																	{user.name}
																</span>
																<span>
																	{user.email}
																</span>
															</div>
															<div className="flex items-center">

																<button
																	className="w-36 py-2 mx-auto bg-green-500 hover:bg-green-600 focus:ring-green-500 focus:ring-offset-green-500 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg flex justify-center gap-2"
																	onClick={() => {
																		console.log("user", user)
																		showDataUserModal(user)
																	}
																	}
																>
																	<span>
																		Ver más
																	</span>
																</button>
															</div>
														</div>
													))
												}
											</div>
											<div className="flex justify-end">
												<button
													type="button"
													onClick={() => {
														setPage(page + 1)
														handleNextPage({
															page: page + 1,
															name: false,
															email: true
														})
														toast.success("Se cargaron más resultados")
													}}
													disabled={totalResults <= dataUsers.length}
													className="w-56 py-3 bg-green-500 hover:bg-green-600 focus:ring-green-500 focus:ring-offset-green-500 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg flex justify-center gap-2
												mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
												>
													<span>
														Cargar más resultados
													</span>
												</button>
											</div>
										</div>
									)
							}
						</>
					}
				</>
			}
			{
				activeIndex === 3 &&
				<>
					{
						update && <>
							{/* search by email or name aquí se mostrarán varios resultados y se podrán abrir en un modalpara ver su data */}
							<form
								onSubmit={handleSubmitSearch(handleSearchUserName)}
								className="flex flex-row gap-2 mt-5 w-1/2"
							>
								{/* input text search correlative */}
								<div className="w-full flex flex-col h-40 gap-3">
									<label htmlFor="search-user" className="font-semibold dark:text-white">
										Buscar por Nombre
									</label>
									<input
										id="search-user"
										type="text"
										className="h-10 px-3 dark:text-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 w-full"
										placeholder="Buscar por Nombre"
										{
										...registerSearch("searchUser", {
											required: {
												value: true,
												message: "Campo requerido",
											},
											minLength: {
												value: 1,
												message: "Mínimo 1 caracteres",
											},
										})
										}
									/>
									<span className="text-red-500 px-3">
										{
											(data.status === "registered-adopter" ||
												data.status === "registered-pet")
											&&
											"El usuario se encuentra registrado"
										}
									</span>
									<span className="dark:text-white px-3">
										Ejemplo: juan perez
									</span>
								</div>
								{/* button search */}
								<div className="flex gap-2 mt-8">
									<button
										type="submit"
										className="w-36 h-10 py-2 px-4 flex justify-center gap-2 bg-cyan-500 hover:bg-cyan-600 focus:ring-cyan-500 focus:ring-offset-cyan-500 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
										onClick={() => {
											setPage(0)
										}}
									>
										<span>
											Buscar
										</span>
										<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
											<path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
										</svg>

									</button>
									<button
										type="button"
										className="w-36 h-10 py-2 px-4 flex justify-center gap-2 bg-cyan-500 hover:bg-cyan-600 focus:ring-cyan-500 focus:ring-offset-cyan-500 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
										onClick={handleCleanSearchUser}
									>
										<span>
											Limpiar
										</span>
										<svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-search-off" width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth={1.5} >
											<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
											<path d="M5.039 5.062a7 7 0 0 0 9.91 9.89m1.584 -2.434a7 7 0 0 0 -9.038 -9.057"></path>
											<path d="M3 3l18 18"></path>
										</svg>

									</button>
								</div>
							</form>
							{
								errorsSearch?.searchUser && (
									<p className="ml-3 text-red-400 font-semibold">
										{errorsSearch?.searchUser.message}
									</p>
								)
							}

							{
								// muestra los datos del formulario encontrado
								loading ?
									<div className="flex justify-center mt-5 ">
										<div className="animate-spin rounded-full h-20 w-20 border-b-4 border-gray-900 dark:border-white"></div>
									</div>
									:
									(dataUsers.length > 0 &&
										<div className=" w-1/2 flex flex-col">
											<span className="dark:text-white text-xl">
												total:	{dataUsers.length} resultados de {totalResults}
											</span>
											<div className="flex flex-col flex-shrink-0 justify-start gap-2 mt-5 dark:text-white max-h-64 overflow-y-auto">
												{/* triangle border */}
												{
													dataUsers.map((user, index) => (

														<div key={index} className=" flex flex-wrap justify-between max-w-xl overflow-hidden relative -bottom-2  dark:bg-gray-600 rounded-lg py-3 px-4 min-h-[100px] dark:text-white bg-gray-300 hover:bg-gray-400">
															<div className="flex flex-col">
																<span className="absolute bottom-3 bg-blue-600 rounded-xl w-6 -h-6 text-sm m-auto text-center text-white">
																	{
																		index + 1
																	}
																</span>
																<span>
																	{user.name}
																</span>
																<span>
																	{user.email}
																</span>
															</div>
															<div className="flex items-center">

																<button
																	className="w-36 py-2 mx-auto bg-green-500 hover:bg-green-600 focus:ring-green-500 focus:ring-offset-green-500 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg flex justify-center gap-2"
																	onClick={() => {
																		console.log("user", user)
																		showDataUserModal(user)
																	}
																	}
																>
																	<span>
																		Ver más
																	</span>
																</button>
															</div>
														</div>
													))
												}
											</div>
											<div className="flex justify-end">
												<button
													type="button"
													onClick={() => {
														setPage(page + 1)
														handleNextPage({
															page: page + 1,
															name: true,
															email: false
														})

														toast.success("Se cargaron más resultados")
													}}
													disabled={totalResults <= dataUsers.length}
													className="w-56 py-3 bg-green-500 hover:bg-green-600 focus:ring-green-500 focus:ring-offset-green-500 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg flex justify-center gap-2
													mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
												>
													<span>
														Cargar más resultados
													</span>
												</button>
											</div>
										</div>
									)
							}
						</>
					}
				</>
			}


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

			{
				open && (
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
				)
			}
		</>
	);
};
