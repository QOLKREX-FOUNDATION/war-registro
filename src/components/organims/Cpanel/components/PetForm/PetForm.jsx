import { useEffect } from "react";
import { API } from "../../../../../config";
import { imageURI } from "../../../../../config/constants/endpoints";
import { useCountry } from "../../../../../hooks/useCountry";
import { regexText } from "../../../../../utils/validations";
import { Chip } from "../../../../atoms/Chip/Chip";
import { FileInput, Input, ReactSelect, Select } from "../../../../atoms/Form";
import { Crop } from "../../../../molecules/Crop/Crop";
import { useColours } from "./hooks/useColours";
import { useSpecie } from "./hooks/useSpecie";
import { optionsSterilized } from "./utils/Data";

export const PetForm = ({
	petValues,
	getPet,
	errorsPet,
	watchPet,
	setPet,
	update = false,
	readOnly = false,
}) => {
	const { countries } = useCountry();
	const { species, races } = useSpecie(watchPet("type"));
	const { colours } = useColours();

	useEffect(() => {
		if (getPet.country == "")
			setPet("country", localStorage.getItem("countryCode") ?? "PE");
	}, [countries]);

	return (
		<>
			{/* DATOS PERSONALES */}
			<div className="grid grid-cols-2 gap-x-8 grid-flow-row-dense mt-14 mb-10 border-b">
				<h4 className="text-lg text-gray-400 dark:text-gray-400 mt-4 mb-4 uppercase">
					Datos de la Mascota
				</h4>
			</div>

			<div className="grid grid-cols-2 gap-x-8 grid-flow-row-dense mb-4">
				<div className="col-span-2 grid grid-cols-2 gap-x-4 gap-y-5">
					<Input
						name="primer nombre"
						required
						formInput={petValues("name", {
							required: {
								value: true,
								message: "Campo requerido",
							},
							minLength: { value: 3, message: "Nombre muy corto" },
							maxLength: { value: 30, message: "Nombre muy largo" },
							pattern: {
								value: regexText,
								message: "Formato incorrecto",
							},
						})}
						error={errorsPet?.name}
					/>

					<div>
						<ReactSelect
							options={countries}
							value={countries.filter(
								(values) => values.value == watchPet("country")
							)}
							onChange={(target) => setPet("country", target.value)}
							name="País"
							required
						/>
						<input
							type="hidden"
							required
							{...petValues("country", {
								required: {
									value: true,
									message: "Campo requerido",
								},
							})}
						/>
						{errorsPet?.country && (
							<small className="text-red-400">
								{errorsPet?.country.message}
							</small>
						)}
					</div>

					<Input
						type="date"
						name="fecha de nacimiento"
						required
						formInput={petValues("date", {
							required: {
								value: true,
								message: "Campo requerido",
							},
						})}
						error={errorsPet?.lastName}
					/>

					<Input
						type="date"
						name="fecha de Adopción"
						required
						formInput={petValues("dateAdoption", {
							required: {
								value: true,
								message: "Campo requerido",
							},
						})}
						error={errorsPet?.lastName}
					/>

					<Select
						name="sexo"
						required
						formInput={petValues("gender", {
							required: {
								value: true,
								message: "Campo requerido",
							},
						})}
						options={[
							{ label: "MACHO", value: "MALE" },
							{ label: "HEMBRA", value: "FEMALE" },
						]}
						error={errorsPet?.gender}
					/>
					{/* {!update && ( */}
					<div>
						<ReactSelect
							options={species}
							value={species.filter(
								(values) => values.value == watchPet("type")
							)}
							onChange={(target) => setPet("type", target.value)}
							name="Especie"
							required
						/>
						<input
							type="hidden"
							required
							{...petValues("type", {
								required: {
									value: true,
									message: "Campo requerido",
								},
							})}
						/>
						{errorsPet?.type && (
							<small className="text-red-400">
								{errorsPet?.type.message}
							</small>
						)}
					</div>
					{/* )} */}
				</div>
			</div>

			<div className="grid grid-cols-2 gap-x-8 grid-flow-row-dense mb-4">
				<div className="col-span-2 grid grid-cols-2 gap-x-4 gap-y-5">
					<div>
						<ReactSelect
							options={races}
							value={races.filter((values) => values.value == watchPet("race"))}
							onChange={(target) => setPet("race", target.value)}
							name="Raza"
							required
						/>
						<input
							type="hidden"
							required
							{...petValues("race", {
								required: {
									value: true,
									message: "Campo requerido",
								},
							})}
						/>
						{errorsPet?.race && (
							<small className="text-red-400">{errorsPet?.race.message}</small>
						)}
					</div>

					<div>
						{watchPet("race") != "HALF BLOOD" && watchPet("race") != "" && (
							<>

								<FileInput name="Pedigree" formInput={petValues("pedigree")} />
								{update && (
									<>
										{!getPet.pedigree ? (
											<span className="font-bold dark:bg-slate-700 dark:text-white underline-offset-1	">
												<a
													// href={`${ API.warPublic }public/images/pedigree/${ getPet.chip }.jpg`}
													href={`${ imageURI }/${ petValues?.chip }.png`}
													target="_blank"
													rel="noreferrer noopener"
												>
													VERIFICADO
												</a>
											</span>
										) : (
											<span className="font-bold">NO VERIFICADO</span>
										)}
									</>
								)}
							</>
						)}
					</div>
				</div>
			</div>

			<div className="grid grid-cols-2 gap-x-8 grid-flow-row-dense mb-4">
				<div className="col-span-2 grid grid-cols-2 gap-x-4 gap-y-5">
					<div>
						<ReactSelect
							isMulti={true}
							options={colours}
							value={colours.filter((color) =>
								watchPet("colour").split(",").includes(color.value)
							)}
							onChange={(target) => {
								if (target.length < 4) {
									const arr = target.map((t) => t.value);
									setPet("colour", arr.join(","));
								}
							}}
							name="Colores"
							required
						/>
						<input
							type="hidden"
							required
							{...petValues("colour", {
								required: {
									value: true,
									message: "Campo requerido",
								},
							})}
						/>
						{errorsPet?.colour && (
							<small className="text-red-400">
								{errorsPet?.colour.message}
							</small>
						)}
					</div>
					<Select
						readOnly={readOnly}
						name="Esterilizado"
						required
						formInput={petValues("sterilized", {
							required: {
								value: true,
								message: "Campo requerido",
							},
						})}
						options={optionsSterilized}
						error={errorsPet?.sterilized}
					/>
				</div>
			</div>

			<div className="grid grid-cols-2 gap-x-8 grid-flow-row-dense mt-14 mb-10 border-b">
				<h4 className="text-lg text-gray-400 dark:text-gray-400 mt-4 mb-4 uppercase">
					GENEALOGÍA
				</h4>
			</div>
			<div className="grid grid-cols-2 gap-x-8 grid-flow-row-dense mb-4">
				<div className="col-span-2 grid grid-cols-2 gap-x-4 gap-y-5">
					<Chip
						petValues={petValues}
						errorsPet={errorsPet}
						watchPet={watchPet}
						setPet={setPet}
						petReset={() => false}
						name="Padre Micro Chip"
						value={"chipFather"}
						update={true}
						query={true}
					/>
					<Chip
						petValues={petValues}
						errorsPet={errorsPet}
						watchPet={watchPet}
						setPet={setPet}
						petReset={() => false}
						name="Madre Micro Chip"
						value={"chipMother"}
						update={true}
						query={true}
					/>
				</div>
			</div>

			<div className="grid grid-cols-2 gap-x-8 grid-flow-row-dense mb-4">
				<div className="col-span-2 grid grid-cols-1 gap-x-4 gap-y-5">
					<div>
						{update && (
							<img
								// src={`${ API.warPublic }public/images/image/${ getPet.chip
								// 	}.jpg?${ Math.random() }`}
								src={`${ imageURI }/${ getPet.chip }.png`}
								alt={petValues.name}
								style={{ width: "15rem" }}
							/>
						)}

						<Crop
							name="Imagen de la Mascota"
							value="image"
							values={petValues}
							error={errorsPet.image}
							setValues={setPet}
							required
						/>
					</div>
				</div>
			</div>
		</>
	);
};
