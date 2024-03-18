import { useEffect, useState } from "react";
import { usePreloaderContext, useWeb3Context } from "../../contexts";
import { useStateContext } from "../../contexts/ContextProvider";
import { Carnet } from "../organims/Carnet";
import { Certificate } from "../organims/Certificate";
import { registeringEntity } from "../../utils/war/RegisteringEntities";
import { getRecordPet } from "../../utils/war/pets";
import { formatDataPet } from "../organims/Cpanel/components/PetForm/utils/formatDataPet";

export const Documents = ({ chip = "" }) => {
	const { web3 } = useWeb3Context();
	const { currentColor } = useStateContext();

	const { handlePreloader } = usePreloaderContext();
	const [petValues, setPetValues] = useState({});
	const [adopter, setAdopter] = useState({});

	const [carnet, setCarnet] = useState(true);
	const [certificate, setCertificate] = useState(false);
	const [entityRegister, setEntityRegister] = useState(false);

	const view = (value) => {
		if (value === "carnet") {
			setCarnet(true);
			setCertificate(false);
		} else if (value === "certificate") {
			setCarnet(false);
			setCertificate(true);
		}
	};

	useEffect(() => {
		handlePreloader(true);
		getRecordPet(`chip=${ chip }`, web3.authToken)
			.then((response) => {
				response.pet = formatDataPet(response.pet);
				setPetValues(response.pet);
				console.log(response.adopter);
				setAdopter(response.adopter);
				handlePreloader(false);
			})
			.catch((e) => {
				console.log(e);
				handlePreloader(false);
			});
	}, []);

	useEffect(() => {
		petValues?.addressEr &&
			registeringEntity(web3.wallet, petValues?.addressEr)
				.then((response) => {
					response.data =
						JSON.parse(Buffer.from(response?.data, "base64").toString()) ?? "";
					setEntityRegister(response.data);
				})
				.catch((e) => console.log(e));
	}, [petValues?.addressEr]);

	return (
		<>
			{petValues.chip && petValues.chip != "" && (
				<div className="flex justify-center mb-4 gap-4">
					<div className="w-2/6">
						<button
							onClick={() => view("carnet")}
							type="submit"
							className={`${ !carnet && "opacity-50"
								} py-2 px-4 text-white w-full transition ease-in duration-200 text-center text-xs font-semibold shadow-md rounded-lg`}
							style={{ backgroundColor: currentColor }}
						>
							Carnet
						</button>
					</div>
					<div className="w-2/6">
						<button
							onClick={() => view("certificate")}
							type="submit"
							className={`${ !certificate && "opacity-50"
								} py-2 px-4 text-white w-full transition ease-in duration-200 text-center text-xs font-semibold shadow-md rounded-lg `}
							style={{ backgroundColor: currentColor }}
						>
							Certificado
						</button>
					</div>
				</div>
			)}

			{carnet && (
				<Carnet petValues={petValues} adopter={adopter} entityRegister={entityRegister} />
			)}

			{certificate && <Certificate petValues={petValues} adopter={adopter} entityRegister={entityRegister} />}
		</>
	);
};
