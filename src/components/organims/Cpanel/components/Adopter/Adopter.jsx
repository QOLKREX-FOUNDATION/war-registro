import { useEffect } from "react";
import { useWeb3Context } from "../../../../../contexts";
import { ReactSelect } from "../../../../atoms/Form";
import { Data } from "../../../../molecules/Adopter/Data/Data";
import { DataSensitive } from "../../../../molecules/Adopter/DataSensitive/DataSensivite";
import { Search } from "../../../../molecules/Adopter/Search/Search";
import { useAdopterSearch } from "./hook/useAdopterSearch";

export const Adopter = ({
	adopterValues,
	setAdopter,
	watchAdopter,
	errorsAdopter,
	adopterReset,
	update = false,
	showAddress = true,
	readOnly = true,
	search=true
}) => {
	const { web3 } = useWeb3Context();
	const {
		banderaAdopter,
		banderaAddress,
		banderaEmail,
		entityOptions,
		getAdopter,
		handleAddress,
		handleEmail,
	} = useAdopterSearch(update);

	const idEntity = sessionStorage.getItem(
		"idEntity_" + String(web3.account).toUpperCase()
	);

	useEffect(() => {
		if(update) setAdopter("idRegisteringEntity",sessionStorage.getItem(
			"idEntity_" + String(web3.account).toUpperCase()
		) )
	  
	}, [update, web3.account])
	

	return (
		<div>
			<Search
				adopterValues={adopterValues}
				setAdopter={setAdopter}
				watchAdopter={watchAdopter}
				errorsAdopter={errorsAdopter}
				adopterReset={adopterReset}
				getAdopter={getAdopter}
				banderaAdopter={banderaAdopter}
				update={update}
				search={search}
			/>

			{(!update || watchAdopter("name")) && (
				<>
					<Data
						adopterValues={adopterValues}
						setAdopter={setAdopter}
						watchAdopter={watchAdopter}
						errorsAdopter={errorsAdopter}
						handleAddress={handleAddress}
						banderaAddress={banderaAddress}
						update={update}
						showAddress={showAddress}
						readOnly={readOnly}
					/>
				</>
			)}

			{(!update ||
				(watchAdopter("address") != "" &&
					banderaAdopter &&
					idEntity == watchAdopter("idRegisteringEntity"))) && (
				<DataSensitive
					readOnly={readOnly}
					adopterValues={adopterValues}
					setAdopter={setAdopter}
					watchAdopter={watchAdopter}
					errorsAdopter={errorsAdopter}
					banderaEmail={banderaEmail}
					handleEmail={handleEmail}
					entityOptions={entityOptions}
					update={update}
				/>
			)}

			{(update  && (watchAdopter("address") != "" && banderaAdopter)) && (
				<div className="grid grid-cols-2 gap-x-8 grid-flow-row-dense mb-4">
					<div>
						<ReactSelect
							options={entityOptions}
							value={entityOptions.filter(
								(values) => values.value == watchAdopter("idRegisteringEntity")
							)}
							onChange={(target) => {
								setAdopter("idRegisteringEntity", target.value);
							}}
							name="Entidad Registradora"
							readOnly={
								!(idEntity == watchAdopter("idEntity")) || readOnly
							}
						/>

						<input
							type="hidden"
							required
							{...adopterValues("idRegisteringEntity", {
								required: {
									value: true,
									message: "Campo requerido",
								},
							})}
						/>
						{errorsAdopter?.department && (
							<small className="text-red-400">
								{errorsAdopter?.department.message}
							</small>
						)}
					</div>
				</div>
			)}
		</div>
	);
};
