import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { usePrice } from "../../../hooks/usePrice";
import { Chip } from "../../atoms/Chip/Chip";
import { ChipDate } from "../../atoms/Chip/ChipDate";
import { Step } from "../../atoms/Step/Step";
import { StepButtons } from "../../atoms/Step/StepButtons";
import { Adopter } from "../../organims/Cpanel/components/Adopter/Adopter";
import { PetFinish } from "../../organims/Cpanel/components/PetFinish/PetFinish";
import { PetForm } from "../../organims/Cpanel/components/PetForm/PetForm";
import { useRegister } from "./hooks/useRegister";
import { PetButton } from "./PetButton";

export const PetWizard = ({
	request,
	handleSelection,
	adopterInit,
	petInit,
	resetInit,
	update = false,
}) => {
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

	const {
		register: petValues,
		handleSubmit: hanldePet,
		watch: watchPet,
		setValue: setPet,
		formState: { errors: errorsPet },
		reset: petReset,
		getValues: getPet,
	} = useForm({
		defaultValues: petInit,
		mode: "onBlur",
	});

	const { coin, setCoin, price, setPrice, priceCoin, setPriceCoin } =
		usePrice();

	const { image, pedigree, handleFinish, imageFileToWeb3Storage } = useRegister({
		update,
		request,
		handleSelection,
		petInit,
	});

	const [wizard, setWizard] = useState(1);

	const reset = () => {
		setWizard(1);
		resetInit();
	};

	useEffect(() => {
		petReset(petInit);
	}, [petInit]);

	useEffect(() => {
		adopterReset(adopterInit);
	}, [adopterInit]);

	useEffect(() => {
		setPet("adopter", watchAdopter("address"));
	}, [watchAdopter("address")]);

	useEffect(() => {
		setPet("adopterName", watchAdopter("name"));
	}, [watchAdopter("name")]);

	useEffect(() => {
		setPet("adopterLastName", watchAdopter("lastName"));
	}, [watchAdopter("lastName")]);
	return (
		<>
			<Step wizard={wizard} quantity={[1, 2, 3]} />
			{wizard === 1 && (
				<form onSubmit={handleAdopter(() => setWizard(wizard + 1))}>
					<Adopter
						adopterValues={adopterValues}
						setAdopter={setAdopter}
						watchAdopter={watchAdopter}
						adopterReset={adopterReset}
						errorsAdopter={errorsAdopter}
						update={true}
						showAddress={false}
						readOnly={true}
						search={update ? false : true}
					/>
					<div className=" flex justify-center ">
						<div className="w-1/2 flex justify-center  grid grid-cols-2 gap-x-8 grid-flow-row-dense mb-4 mt-20 ">
							<StepButtons
								wizard={wizard}
								setWizard={setWizard}
								init={1}
								end={3}
								bandera={watchAdopter("address") ? true : false}
							/>
						</div>
					</div>
				</form>
			)}

			{wizard === 2 && (
				<form onSubmit={hanldePet(() => setWizard(wizard + 1))}>
					<div className="grid grid-cols-2 gap-x-8 grid-flow-row-dense mt-14 mb-10 border-b">
						<h4 className="text-lg text-gray-400 dark:text-gray-400 mt-4 mb-4 uppercase">
							Identificación
						</h4>
					</div>
					<div className="grid grid-cols-2 gap-x-8 grid-flow-row-dense mb-4">
						<div className="col-span-2 grid grid-cols-2 gap-x-4 gap-y-5">
							<Chip
								petValues={petValues}
								errorsPet={errorsPet}
								watchPet={watchPet}
								setPet={setPet}
								petReset={petReset}
								required={true}
								readOnly={update}
								update={update}
								name="Micro Chip"
							/>
							<ChipDate
								petValues={petValues}
								errorsPet={errorsPet}
								watchPet={watchPet}
							/>
						</div>
					</div>
					<PetForm
						getPet={getPet()}
						petValues={petValues}
						errorsPet={errorsPet}
						watchPet={watchPet}
						setPet={setPet}
						update={update}
					/>
					<div className=" flex justify-center ">
						<div className="w-1/2 flex justify-center  grid grid-cols-2 gap-x-8 grid-flow-row-dense mb-4 mt-20 ">
							{" "}
							<StepButtons
								wizard={wizard}
								setWizard={setWizard}
								init={1}
								end={3}
								bandera={petValues.chip != "" ? true : false}
							/>
						</div>
					</div>
				</form>
			)}

			{wizard === 3 && (
				<>
					<PetFinish
						getPet={getPet()}
						watchPet={watchPet}
						price={price}
						setPrice={setPrice}
						coin={coin}
						setCoin={setCoin}
						priceCoin={priceCoin}
						setPriceCoin={setPriceCoin}
						imageFileToWeb3Storage={imageFileToWeb3Storage}
						update={update}
						setPet={setPet}
					/>
					<div className=" flex justify-center ">
						<div className="w-1/2 flex justify-center  grid grid-cols-2 gap-x-8 grid-flow-row-dense mb-4 mt-8 ">
							<StepButtons
								wizard={wizard}
								setWizard={setWizard}
								init={1}
								end={3}
								bandera={petValues.chip != "" ? true : false}
							/>
							<PetButton
								image={image}
								pedigree={pedigree}
								handleFinish={handleFinish}
								price={price}
								coin={coin}
								priceCoin={priceCoin}
								getPet={getPet}
								watchPet={watchPet}
								reset={reset}
								update={update}
							/>
						</div>
					</div>
				</>
			)}
		</>
	);
};
