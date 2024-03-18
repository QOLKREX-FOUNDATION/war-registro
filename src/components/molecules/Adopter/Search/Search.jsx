import { useContext, useEffect } from "react";
import { Web3Context } from "../../../../contexts/Web3/Web3Context";
import { useCountry } from "../../../../hooks/useCountry";
import { regexTextAndNumber } from "../../../../utils/validations";
import { Error } from "../../../atoms/Error/Error";
import { Input, ReactSelect, Select } from "../../../atoms/Form";
import { useDocuments } from "./hooks/useDocuments";
import { usePerson } from "./hooks/usePerson";

export const Search = ({
	adopterValues,
	setAdopter,
	watchAdopter,
	errorsAdopter,
	adopterReset,
	getAdopter,
	banderaAdopter,
	update = false,
	search,
}) => {
	const { web3 } = useContext(Web3Context);
	const { countries } = useCountry();
	const { persons } = usePerson();
	const { documents, handleDocuments } = useDocuments();
	const onKeyUp = (e) => {
		e.preventDefault();
		if (e.keyCode === 13) {
			getAdopter({
				web3: web3.wallet,
				watchAdopter,
				adopterReset,
				token: web3.authToken,
			});
		}
	};

	useEffect(() => {
		if (watchAdopter("country") == "")
			setAdopter("country", localStorage.getItem("countryCode") ?? "PE");

		handleDocuments(
			setAdopter,
			watchAdopter("country") != ""
				? watchAdopter("country")
				: localStorage.getItem("countryCode") ?? "PE",
			watchAdopter("person")
		);
	}, [countries]);

	// useEffect(() => {
	// 	getAdopter({
	// 		web3: web3.wallet,
	// 		watchAdopter,
	// 		adopterReset,
	// 		token: web3.authToken,
	// 	});
	// }, []);

	return (
		<>
			<div className="grid grid-cols-2 gap-x-8 grid-flow-row-dense mt-14 mb-10 border-b">
				<h4 className="text-lg text-gray-400 dark:text-gray-400 mt-4 mb-4 uppercase">
					Identificacion
				</h4>
			</div>

			<div className="grid grid-cols-2 gap-x-8 grid-flow-row-dense mb-4">
				<div className="col-span-2 grid grid-cols-2 gap-x-4 gap-y-5">
					<div>
						<ReactSelect
							options={countries}
							value={countries.filter(
								(values) => values.value == watchAdopter("country")
							)}
							onChange={(target) => {
								setAdopter("country", target.value);
								getAdopter({
									web3: web3.wallet,
									watchAdopter,
									adopterReset,
									token: web3.authToken,
								});

								handleDocuments(
									setAdopter,
									watchAdopter("country") != ""
										? watchAdopter("country")
										: localStorage.getItem("countryCode") ?? "PE",
									watchAdopter("person")
								);

								localStorage.setItem("countryCode", target.value);
							}}
							name="País"
							required
							readOnly={search ? false : true}
						/>
						<input
							type="hidden"
							required
							{...adopterValues("country", {
								required: {
									value: true,
									message: "Campo requerido",
								},
							})}
						/>
						{errorsAdopter?.country && (
							<small className="text-red-400">
								{errorsAdopter?.country.message}
							</small>
						)}
					</div>
					<Select
						name="tipo persona"
						required
						formInput={adopterValues("person", {
							required: {
								value: true,
								message: "Campo requerido",
							},
						})}
						options={persons}
						onChange={{
							onChange: ({ target }) => {
								setAdopter("person", target.value);
								handleDocuments(
									setAdopter,
									watchAdopter("country"),
									target.value
								);
							},
						}}
						onBlur={() =>
							getAdopter({
								web3: web3.wallet,
								watchAdopter,
								adopterReset,
								token: web3.authToken,
							})
						}
						error={errorsAdopter?.person}
						readOnly={search ? false : true}
					/>
					<Select
						name="documento de Identidad"
						required
						formInput={adopterValues("document", {
							required: {
								value: true,
								message: "Campo requerido",
							},
						})}
						onBlur={() =>
							getAdopter({
								web3: web3.wallet,
								watchAdopter,
								adopterReset,
								token: web3.authToken,
							})
						}
						options={documents}
						error={errorsAdopter?.document}
						readOnly={search ? false : true}
					/>
					<div>
						<Input
							name="numero documento"
							required
							formInput={adopterValues("documentNumber", {
								required: {
									value: true,
									message: "Campo requerido",
								},
								minLength: { value: 5, message: "Formato incorrecto" },
								maxLength: { value: 20, message: "Formato incorrecto" },
								pattern: {
									value: regexTextAndNumber,
									message: "Formato incorrecto",
								},
							})}
							onBlur={() =>
								getAdopter({
									web3: web3.wallet,
									watchAdopter,
									adopterReset,
									token: web3.authToken,
								})
							}
							onKeyUp={onKeyUp}
							error={errorsAdopter?.documentNumber}
							readOnly={search ? false : true}
						/>
						{search && (
							<Error
								bandera={update ? !banderaAdopter : banderaAdopter}
								value={watchAdopter("documentNumber")}
								name="documentNumber"
								setValue={setAdopter}
								text={
									update
										? "Este Documento no esta registrado"
										: "Este Documento pertenece a otro adoptante ya registrado"
								}
							/>
						)}
					</div>
				</div>
			</div>
		</>
	);
};
