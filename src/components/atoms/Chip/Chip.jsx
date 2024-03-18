import { useEffect } from "react";
import { useWeb3Context } from "../../../contexts";
import { regexNum } from "../../../utils/validations";
import { Error } from "../Error/Error";
import { Input } from "../Form";
import { useChip } from "./hooks/useChip";

export const Chip = ({
	petValues,
	errorsPet,
	watchPet,
	setPet,
	petReset,
	update = false,
	name = "Micro Chip",
	value = "chip",
	query = false,
	required = false,
	readOnly = false,
}) => {
	const { web3 } = useWeb3Context();
	const { banderaPet, getSearch, handleChip } = useChip();

	const handleSearch = () => {
		if (update && !query) {
			// getSearch(watchPet(value), web3.authToken, petReset);
			handleChip(watchPet(value), web3.authToken);
		} else {
			handleChip(watchPet(value), web3.authToken);
		}
	};

	const onKeyup = (e) => {
		e.preventDefault();
		if (e.keyCode === 13 && update && !query) {
			getSearch(watchPet(value), web3.authToken, petReset);
		}
	};

	const setSearch = (valueScan) => setPet(value, valueScan);

	// const getSearchScan = (valueScan) => getSearch(valueScan,  web3.authToken, petReset);

	useEffect(() => {
		!update && watchPet(value) != "" && handleSearch();
	}, []);

	// console.log(value);
	// console.log(errorsPet['chip']);

	return (
		<div>
			{/* <div style={{ display: "flex", alignItems: "center" }}>
						<BarcodeScanner getSearch={getSearchScan} setSearch={setSearch} />
					</div> */}
			<Input
				name={name}
				type="text"
				error={errorsPet[name]}
				formInput={petValues(value, {
					required: {
						value: required,
						message: "Campo requerido",
					},
					min: 0,
					max: 999999999999999,
					minLength: 0,
					maxLength: 15,
					// min: {
					// 	value: 0,
					// 	message: "No se permiten números negativos"
					// },
					// max: {
					// 	value: 999999999999999,
					// 	message: "Número muy grande"
					// },
					// minLength: { value: 0, message: "Formato incorrecto" },
					// maxLength: { value: 15, message: "Formato incorrecto" },
					pattern: {
						value: regexNum,
						message: "Formato incorrecto",
					},
				})}
				onBlur={readOnly ? () => false : handleSearch}
				onKeyup={onKeyup}
				readOnly={readOnly}
				required={required}
			/>
			{
				watchPet(value) && (

					<div className="flex flex-col pt-2 gap-2">
						<span className={`text-sm ${ watchPet(value).length === 0 ? 'dark:text-white' :
							watchPet(value).length < 15 && 'text-red-400' || watchPet(value).length > 15 && 'text-red-400' ||
							watchPet(value).length == 15 && 'text-green-600'
							}`}>
							- Número de caracteres: {watchPet(value).length} / 15
						</span>
						{
							watchPet(value).length > 15 && <small className="text-red-400">
								- El número de caracteres es mayor a 15
							</small>
						}
					</div>
				)
			}
			<Error
				bandera={banderaPet}
				value={watchPet(value)}
				name={value}
				setValue={setPet}
				text={
					update
						? `${ name } no esta registrado`
						: `${ name } pertenece a otro animal`
				}
			/>
		</div>
	);
};
