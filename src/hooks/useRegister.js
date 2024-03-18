// import { useForm } from "../../../../../../../hooks/useForm";
// import {
// 	adopterInit,
// 	adopterInitMethods,
// 	petInit,
// 	petInitMethods,
// } from "../../../utils/initValues";
// import { validateForm } from "../../../utils/validate";
// import { useContext, useState } from "react";
// import { getAmountsIn } from "../../../../../../../utils/getAmountRouter";
// import { dateNow } from "../../../../../../../utils/date";
// import { get, post } from "../../../../../../../utils/post";
// import { setData } from "../../../../../../../utils/war/crud";
// import { API, TOKENS } from "../../../../../../../config";
// import { handlePost } from "../../../../../../../utils/war/pets";
// import {
// 	getAdopter,
// 	handlePost as handlePostAdopter,
// } from "../../../../../../../utils/war/adopters";
// import { PreloaderContext } from "../../../../../../../contexts/Preloader/PreloaderContext";
// import { useToast } from "../../../../../../../hooks/useToast";
// import { objectUppercase } from "../../../../../../../utils/helpers";
// import { getSearch as getSearchContract } from "../../../../../../../utils/war/bridge";
// import { amountFiruUSDC } from "../../../../../../../utils/bigNumber";
// import { toFileWeb3Storage } from "../../../../../../../utils/war/toFileWe3Storage";

import { useState } from "react";


export const useRegister = ({
	banderaPet,
	update = false,
	request = {},
	handleSelection = undefined,
}) => {
	// const { handlePreloader } = useContext(PreloaderContext);
	// const { message } = useToast();
	// const {
	// 	values: adopterValues,
	// 	setValues: setAdopterValues,
	// 	reset: adopterReset,
	// } = useForm(
	// 	request[0] != undefined ? { ...adopterInit, ...request[0] } : adopterInit
	// );

	// const {
	// 	values: petValues,
	// 	handleFormChange: handleFormPet,
	// 	setValues: setPetValues,
	// 	reset: petReset,
	// } = useForm(
	// 	request[1] != undefined ? { ...petInit, ...request[1] } : petInit
	// );

	// const [terms, setTerms] = useState(false);
	// const [image, setImage] = useState<any>({});
	// const [pedigree, setPedigree] = useState<any>({});
	const [wizard, setWizard] = useState(update ? 2 : 1);

	// const handleFormAdopter = ({ target }: any) => {
	// 	if (request[0] != undefined) {
	// 		setAdopterValues({
	// 			...adopterValues,
	// 			[target.name]: target.value,
	// 		});
	// 	} else {
	// 		target.name === "country" ||
	// 			target.name === "person" ||
	// 			target.name === "document" ||
	// 			(target.name === "documentNumber" &&
	// 				setAdopterValues({
	// 					...adopterValues,
	// 					[target.name]: target.value,
	// 				}));
	// 	}
	// };

	// const resetRegister = () => {
	// 	setWizard(update ? 2 : 1);
	// 	petReset();
	// 	adopterReset();
	// 	setImage({});
	// 	setTerms(false);
	// };

	// const handleValidate = (web3: any) => {
	// 	let response: any = [];
	// 	if (wizard === 1) {
	// 		response = validateForm(web3, adopterValues, adopterInitMethods);
	// 	} else if (wizard === 2) {
	// 		response = validateForm(web3, petValues, petInitMethods);
	// 		banderaPet &&
	// 			response.push({
	// 				name: "chip",
	// 				response: "warOffice.drawers.petsRegistry.modal.chipValidate",
	// 			});
	// 	} else if (wizard === 3) {
	// 		!terms &&
	// 			response.push({
	// 				name: "terms",
	// 				response: "app.validate.terms",
	// 			});
	// 	}
	// 	return response;
	// };

	// const validate = (web3: any) => {
	// 	const response: any = handleValidate(web3);
	// 	if (response.length > 0) {
	// 		for (let i = 0; i < response.length; i++) {
	// 			let element: any = document.getElementById(response[i].name);
	// 			message("warning", response[i].response);
	// 			if (element?.tagName == "INPUT") {
	// 				element?.focus();
	// 			} else {
	// 				element.style.border = "1px solid #e74c3c";
	// 			}
	// 			break;
	// 		}
	// 		return false;
	// 	} else if (wizard < 3) {
	// 		setWizard(wizard + 1);
	// 	}
	// 	return true;
	// };

	// const getSearch = (
	// 	web3: any,
	// 	setBanderaPet: any,
	// 	value = "",
	// 	token=""
	// ) => {
	// 	handlePreloader(true);
	// 	getSearchContract(web3, value != "" ? value : petValues.chip)
	// 		.then((resolve) => {
	// 			if (resolve != undefined) {
	// 				setBanderaPet(false);
	// 				get(resolve)
	// 					.then((resolve2) => {
	// 						resolve2.image = resolve2.image.replace("ipfs://", "");
	// 						resolve2.pedigree = resolve2.pedigree.replace("ipfs://", "");
	// 						setPetValues(resolve2);
	// 						if(token!="") {
	// 							getAdopter(token, String(resolve2.adopter).toUpperCase())
	// 								.then((ad: any) => {

	// 									setAdopterValues({
	// 										...adopterValues,
	// 										address: ad.adopters.address,
	// 										name: ad.adopters.name,
	// 										lastName: ad.adopters.lastName,
	// 									});
	// 									handlePreloader(false);
	// 								})
	// 								.catch((e: any) => {
	// 									handlePreloader(false);
	// 									console.log(e);
	// 								});
	// 						}else {
	// 							setAdopterValues({
	// 								...adopterValues,
	// 								address: resolve2.adopter,
	// 								name: resolve2?.adopterName,
	// 								lastName: resolve2?.adopterLastName,
	// 							});
	// 							handlePreloader(false);
	// 						}
	// 					})
	// 					.catch((e: any) => {
	// 						handlePreloader(false);
	// 						console.log(e);
	// 					});
	// 			} else {
	// 				setAdopterValues(adopterInit);
	// 				setPetValues({
	// 					...petInit,
	// 					chip: value != "" ? value : petValues.chip,
	// 				});
	// 				setBanderaPet(true);
	// 				handlePreloader(false);
	// 			}
	// 		})
	// 		.catch((e: any) => {
	// 			console.log(e);
	// 			handlePreloader(false);
	// 		});
	// };

	// const imageFileToWeb3Storage = async () => {
	// 	if (image != null && image.name != undefined && image.type != undefined) {
	// 		handlePreloader(true);
	// 		toFileWeb3Storage(image, image.name).then((cid) => {
	// 			petValues.image = cid;
	// 			handlePreloader(false);
	// 		});
	// 	}

	// 	if (
	// 		pedigree != null &&
	// 		pedigree.name != undefined &&
	// 		pedigree.type != undefined
	// 	) {
	// 		handlePreloader(true);
	// 		toFileWeb3Storage(pedigree, pedigree.name).then((cid) => {
	// 			petValues.pedigree = cid;
	// 			handlePreloader(false);
	// 		});
	// 	}
	// };

	// const handleFinish = async (
	// 	web3: any,
	// 	account: string,
	// 	price: string,
	// 	coin: string,
	// 	user: any,
	// 	token: string
	// ) => {
	// 	handlePreloader(true);
	// 	const userDate =
	// 		JSON.parse(Buffer.from(user.data, "base64").toString()) ?? undefined;
	// 	const objPet: any = objectUppercase(petValues, ["image"]);
	// 	const objAdopter: any = objectUppercase(adopterValues);

	// 	const info = {
	// 		...objPet,
	// 		dateRegistring: dateNow(),
	// 		addressEr: user.registeringEntity,
	// 		userAddress: String(account).toUpperCase(),
	// 		userName: `${userDate.name} ${userDate.lastName}`,
	// 		adopter: objAdopter.address,
	// 		adopterName: objAdopter.name,
	// 		adopterLastName: objAdopter.lastName,
	// 	};

	// 	const blob = new Blob([JSON.stringify(info)], { type: "application/json" });
	// 	toFileWeb3Storage(blob, `${info.chip}.json`)
	// 		.then((cid: any) => {
	// 			if (cid) {
	// 				info.url = cid;
	// 				getAmountsIn(web3, "FIRU", "USDC", price)
	// 					.then((responseAmount) => {
	// 						setData(
	// 							web3,
	// 							account,
	// 							update ? 2 : 1,
	// 							objPet.type,
	// 							info.url,
	// 							objPet.chip,
	// 							web3.utils.toChecksumAddress(objAdopter.address),
	// 							amountFiruUSDC(coin, price, responseAmount?.value[0]),
	// 							amountFiruUSDC(coin, price, responseAmount?.value[0], 2),
	// 							coin == "FIRU" ? TOKENS.FIRU.address : TOKENS.USDC.address
	// 						).then((response) => {
	// 							if (
	// 								response?.transactionHash != "" &&
	// 								response?.transactionHash != undefined
	// 							) {
	// 								info.hash = response.transactionHash;
	// 								if (request[0] != undefined && request[1] != undefined) {
	// 									handlePostAdopter(objAdopter, token, "POST");

	// 									post(
	// 										`${API.firulaix}request-register/${request[2]}`,
	// 										new FormData(),
	// 										"PUT"
	// 									)
	// 										.then(() => {
	// 											handleSelection("list");
	// 										})
	// 										.catch((e) => {
	// 											message("danger", "app.error");
	// 											handlePreloader(false);
	// 										});
	// 								}
	// 								message("success", "app.successful.save");
	// 								handlePost(info, token, "", "POST")
	// 									.then(() => false)
	// 									.catch((e) => console.log(e));
	// 								resetRegister();
	// 								handlePreloader(false);
	// 							} else {
	// 								message("danger", "app.error");
	// 								handlePreloader(false);
	// 							}
	// 						});
	// 					})
	// 					.catch((e) => {
	// 						message("danger", "app.error");
	// 						handlePreloader(false);
	// 					});
	// 			} else {
	// 				message("danger", "app.error");
	// 				handlePreloader(false);
	// 			}
	// 		})
	// 		.catch((e: any) => {
	// 			message("danger", "app.error");
	// 			handlePreloader(false);
	// 		});
	// };

    return{
        wizard,
        setWizard

    }

// 	return {
// 		adopterValues,
// 		petValues,
// 		image,
// 		terms,
// 		wizard,
// 		setPedigree,
// 		setTerms,
// 		setImage,
// 		setWizard,
// 		setAdopterValues,
// 		handleFormAdopter,
// 		handleFormPet,
// 		handleValidate,
// 		resetRegister,
// 		setPetValues,
// 		validate,
// 		handleFinish,
// 		getSearch,
// 		imageFileToWeb3Storage,
// 	};
};
