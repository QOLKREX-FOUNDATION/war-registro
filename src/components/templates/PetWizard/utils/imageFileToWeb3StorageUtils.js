import { upload } from "../../../../utils/war/pets";
import { toFileWeb3Storage } from "../../../../utils/war/toFileWe3Storage";

export const imageFileToWeb3StorageUtils = async ({
	handlePreloader,
	watchPet,
	setImage,
	setPedigree,
}) => {
	if (watchPet("image")?.name != undefined) {
		handlePreloader(true);
		toFileWeb3Storage(watchPet("image"), watchPet("image").name).then((cid) => {
			setImage(cid);
			handlePreloader(false);
		});
	}
	if (typeof watchPet("pedigree") !== undefined) {
		if (watchPet("pedigree")[0]?.name != undefined) {
			handlePreloader(true);
			toFileWeb3Storage(
				watchPet("pedigree")[0],
				watchPet("pedigree")[0]?.name
			).then((cid) => {
				setPedigree(cid);
				handlePreloader(false);
			});
		}
	}
};

export const imageFileUpload = async ({ watchPet, token }) => {
	console.log(watchPet("image").name)
	if (watchPet("image").name != undefined) {
		upload(
			{
				name: "image",
				chip: watchPet("chip"),
				file: watchPet("image"),
			},
			token
		).catch((e) => {
			console.log("error al subir la imagen", e);
		});
	}
	if (typeof watchPet("pedigree") !== undefined) {
		if (watchPet("pedigree")[0]?.name != undefined) {
			upload(
				{
					name: "pedigree",
					chip: watchPet("chip"),
					file: watchPet("pedigree")[0],
				},
				token
			).catch((e) => console.log(e));
		}
	}
};
