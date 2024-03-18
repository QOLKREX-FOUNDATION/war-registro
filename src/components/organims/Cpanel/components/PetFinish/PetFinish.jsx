import { useEffect, useState } from "react";
import { API } from "../../../../../config";
import { imageURI } from "../../../../../config/constants/endpoints";
import { dateStringYear } from "../../../../../utils/date";
import { ChooseCurrency } from "../../../../atoms/ChooseCurrency/ChooseCurrency";
import { Front } from "../../../../molecules/Carnet/Front";

export const PetFinish = ({
	getPet,
	watchPet,
	price,
	setPrice,
	coin,
	setCoin,
	priceCoin,
	setPriceCoin,
	update = false,
	imageFileToWeb3Storage,
	setPet = { setPet }

}) => {

	const [imageReader, setImgReader] = useState(null);
	useEffect(() => {
		imageFileToWeb3Storage({
			watchPet,
		});
	}, [watchPet("image"), watchPet("pedigree")]);

	useEffect(() => {
		if (watchPet("image").name != null && watchPet("image").name != undefined) {
			const reader = new FileReader();
			reader.addEventListener("load", () => {
				setImgReader(reader.result);
			});
			reader.readAsDataURL(watchPet("image"));
		} else {
			// setImgReader(
			// 	`${API.warPublic}public/images/image/${
			// 		getPet?.chip
			// 	}.jpg?${Math.random()}`
			// );
			setImgReader(`${ imageURI }/${ getPet?.chip }.png`);
		}
	}, [watchPet("image")]);

	useEffect(() => {
		update && setPet('dateIssue', dateStringYear(2, true));
	}, []);



	return (
		<div>
			<div className="grid  gap-x-8 grid-flow-row-dense mt-14 mb-4 border-b">
				<div className="col-span-2 grid grid-cols-2 gap-x-4 gap-y-5">
					<h4 className="text-lg text-gray-400 dark:text-gray-400 mt-4 mb-4 uppercase">
						Previsualización del Registro de la Mascota: {getPet?.name}
					</h4>
					<div className="text-lg  mt-4 mb-4 uppercase">
						<ChooseCurrency
							contract={getPet?.type}
							price={price}
							setPrice={setPrice}
							coin={coin}
							setCoin={setCoin}
							priceCoin={priceCoin}
							setPriceCoin={setPriceCoin}
							variantPrice={update ? 2 : 1}
						/>
					</div>
				</div>
			</div>
			<div className="mb-2 w-full flex justify-center">
				<div
					className="bg-black "
					style={{
						width: "45rem",
						height: "30rem",
					}}
				>
					<Front getPet={getPet} image={imageReader} />
				</div>
			</div>
		</div>
	);
};
