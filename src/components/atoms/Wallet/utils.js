export const initModuleValues = [0, 1, 2, 3, 4, 5];

export const initAccessValues = () => [
	[0],
	[0, 1, 2, 3],
	[0, 1],
	[0, 1],
	[0, 1],
	[0, 1, 2, 3],
];

export const initAccessValuesReset = () => [
	[0],
	[0, "0", "0", "0"],
	[0, "0"],
	[0, "0"],
	[0, "0"],
	[0, "0", "0", "0"],
];


export const userLocalStorage = (account, resolve) => {
	const data = {
		...resolve,
		data: JSON.parse(Buffer.from(resolve.data, "base64").toString()),
	};

	sessionStorage.setItem(
		"user_" + String(account).toUpperCase(),
		JSON.stringify(data)
	);
};

export const userPermissionLocalStorage = (account, resolve) => {
	sessionStorage.setItem(
		"userPermission_" + String(account).toUpperCase(),
		JSON.stringify(resolve)
	);
};

export const entityLocalStorage = (account, resolve) => {
	sessionStorage.setItem(
		"entity_" + String(account).toUpperCase(),
		JSON.stringify({
			...(resolve?.data
				? JSON.parse(Buffer.from(resolve?.data, "base64").toString())
				: "" ?? ""),
		})
	);
};

export const idEntityLocalStorage = (account, resolve) => {
	sessionStorage.setItem(
		"idEntity_" + String(account).toUpperCase(),
		resolve
	);
};

export const idsEntityLocalStorage = (account, resolve) => {
	sessionStorage.setItem(
		"idsEntity_" + String(account).toUpperCase(),
		resolve
	);
};

