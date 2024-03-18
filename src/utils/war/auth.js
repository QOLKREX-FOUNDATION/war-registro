import { API } from "../../config";
import { timeStamp } from "../date";

export const handleUser = async (publicAddress) => {
	try {
		const content = await fetch(
			`${ API.war }auth?publicAddress=${ publicAddress }`
		);
		const response = await content.json();

		return response;
	} catch (error) {
		console.log(error);
	}
};

export const handleSignup = async (publicAddress, rol, rolNew, token) => {
	try {
		const response = await fetch(`${ API.war }auth/new`, {
			body: JSON.stringify({ publicAddress, rol, rolNew }),
			headers: {
				"Content-Type": "application/json",
				"x-token": token,
			},
			method: "POST",
		});
		return response;
	} catch (error) {
		console.log(error);
	}
};

export const handleSignMessage = async (web3, publicAddress, nonce) => {
	try {
		const response = await web3.eth.personal.sign(
			web3.utils.utf8ToHex(`0x${ nonce }`),
			publicAddress
		);
		return response;
	} catch (error) {
		console.log(error);
	}
};

export const handleAuthenticate = async (
	publicAddress,
	signature,
	handleToken
) => {
	try {
		const content = await fetch(`${ API.war }auth/`, {
			body: JSON.stringify({ publicAddress, signature }),
			headers: {
				"Content-Type": "application/json",
			},
			method: "POST",
		});
		const response = await content.json();

		if (response?.token) {
			sessionStorage.setItem("rol_" + String(publicAddress).toUpperCase(), "admin");

			sessionStorage.setItem(
				"auth_ER_" + String(publicAddress).toUpperCase(),
				response?.er ? true : false
			);

			sessionStorage.setItem(
				"name_" + String(publicAddress).toUpperCase(),
				response?.er ? "Administrador" : "Registrante"
			);

			sessionStorage.setItem(
				"auth_token_" + String(publicAddress).toUpperCase(),
				response?.token
			);
			sessionStorage.setItem(
				"auth_timeOut_" + String(publicAddress).toUpperCase(),
				String(timeStamp() + 43200)
			);

			handleToken(response?.token, String(timeStamp() + 43200));
		}
	} catch (error) {
		console.log(error);
	}
};

export const handleValidate = async (token, timeOut, setAuth, setLogged) => {
	let response = {};
	// try {
	try {
		const content = await fetch(`${ API.war }users/comprobeToken`, {
			headers: {
				"Content-Type": "application/json",
				"x-token": token,
			},
		});
		response = await content.json();

		if (response?.ok && token && parseInt(timeOut ?? "0") > timeStamp()) {
			setAuth(true);
		} else {
			setAuth(false);
		}
		setLogged(true);
	}
	catch (error) {
		// setAuth(false);
		// setLogged(true);
		console.log(error);
	}
	// } catch (error) {
	// 	setAuth(false);
	// 	console.log(error);
	// }
};

export const logout = async (web3, handleWeb3, handleToken, handleAccount) => {
	try {
		sessionStorage.removeItem("auth_token");
		sessionStorage.removeItem("auth_timeOut");
		sessionStorage.removeItem("rol");
		sessionStorage.removeItem("idEntity");
		sessionStorage.removeItem("name");

		sessionStorage.removeItem("user_" + String(web3.account).toUpperCase());
		sessionStorage.removeItem(
			"userPermission_" + String(web3.account).toUpperCase()
		);
		sessionStorage.removeItem("entity_" + String(web3.account).toUpperCase());
		sessionStorage.removeItem("idEntity_" + String(web3.account).toUpperCase());
		sessionStorage.removeItem("idsEntity_" + String(web3.account).toUpperCase());

		sessionStorage.removeItem(
			"auth_timeOut_" + String(web3.account).toUpperCase()
		);

		sessionStorage.removeItem(
			"auth_token_" + String(web3.account).toUpperCase()
		);
		sessionStorage.removeItem("auth_ER_" + String(web3.account).toUpperCase());

		sessionStorage.removeItem("rol_" + String(web3.account).toUpperCase());

		if (web3.providerString === "walletconnect") {
			await web3.provider.disconnect();
		}
		handleWeb3(null, null);
		handleToken("", "");
		handleAccount("");
	} catch (error) {
		console.log(error);
	}
};
