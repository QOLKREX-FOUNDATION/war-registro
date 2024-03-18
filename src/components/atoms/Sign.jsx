import {
	handleAuthenticate,
	handleSignMessage,
	handleUser,
} from "../../utils/war/auth";

import { useContext } from "react";
import { Web3Context } from "../../contexts/Web3/Web3Context";
import { PreloaderContext } from "../../contexts/Preloader/PreloaderContext";
import { toast } from "react-toastify";

import { useRouter } from "next/router";
import { getAccessAll, Users } from "../../utils/war/UsersSystem";
import {
	getIds,
	getResponsibility,
	registeringEntity,
} from "../../utils/war/RegisteringEntities";
import {
	entityLocalStorage,
	idEntityLocalStorage,
	idsEntityLocalStorage,
	initAccessValuesReset,
	initModuleValues,
	userLocalStorage,
	userPermissionLocalStorage,
} from "./Wallet/utils";

export const Sign = () => {
	const { web3, handleToken } = useContext(Web3Context);
	const { handlePreloader } = useContext(PreloaderContext);
	const router = useRouter();

	const handleClick = () => {
		handlePreloader(true);
		Users(web3.wallet, web3.account)
			.then((userData) => {
				console.log(userData)
				userLocalStorage(web3.account, userData);
				return userData;
			})
			.then((userData) => {
				return registeringEntity(web3.wallet, userData?.registeringEntity);
			})
			.then((entityData) => {
				entityLocalStorage(web3.account, entityData);
				const localuser = JSON.parse(
					sessionStorage.getItem("user_" + String(web3.account).toUpperCase())
				);
				return getIds(web3.wallet, localuser?.registeringEntity);
			})
			.then((entityIds) => {
				idsEntityLocalStorage(web3.account, JSON.stringify(entityIds));
				const localuser = JSON.parse(
					sessionStorage.getItem("user_" + String(web3.account).toUpperCase())
				);
				return getResponsibility(web3.wallet, localuser?.registeringEntity);
			})
			.then((entityId) => {
				idEntityLocalStorage(web3.account, entityId);
				return handleUser(web3.account);
			})

			.then((auth) => {
				if (
					String(auth?.user.publicAddress).toUpperCase() !==
					String(web3.account).toUpperCase()
				)
					throw "Error2";

				return handleSignMessage(
					web3.wallet,
					auth?.user.publicAddress,
					auth?.user.nonce
				);
			})
			.then((auth2) => {
				return handleAuthenticate(
					String(web3.account).toUpperCase(),
					auth2,
					handleToken
				);
			})
			.then(() => {
				let temp = initAccessValuesReset();
				for (let i = 0; i < initModuleValues.length; i++) {
					getAccessAll(web3.wallet, web3.account, i)
						.then((resolve2) => {
							for (let index = 0; index < resolve2.length; index++) {
								temp[i][resolve2[index]] = resolve2[index];
								userPermissionLocalStorage(web3.account, temp);
							}
						})
						.catch((e) => {
							console.log(e);
						});
				}
				router.push("/admin");
				handlePreloader(false);
			})
			.catch((e) => {
				console.log(e);
				toast.error("Error al autentificarse");
				handlePreloader(false);
			});
	};

	return (
		<>
			<button
				type="button"
				className="py-2 px-4  bg-cyan-500 hover:bg-cyan-600 focus:ring-cyan-500 focus:ring-offset-cyan-500 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg"
				onClick={handleClick}
			>
				Autenticarse
			</button>
		</>
	);
};
