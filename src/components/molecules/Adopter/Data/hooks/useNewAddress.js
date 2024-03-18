import { useState } from "react";

export const useNewAddress = () => {
	const [addressBoolean, setAddressBoolean] = useState(false);
	const [isAddress, setIsAddress] = useState(true);
	const [tempAddress, setTempAddress] = useState([]);

	const handleNewAddress = async (web3) => {
		const response = await web3.eth.accounts.create();
		setTempAddress(response);
	};

	const newAddress = async (setValue) => {
		setValue("privateKey", tempAddress.privateKey);
		setValue("address", tempAddress.address);
		setIsAddress(true);
	};

	const resetAddressBoolean = (conditional, setValue) => {
		setAddressBoolean(conditional);
		if (conditional) {
			newAddress(setValue);
		} else {
			setValue("privateKey", "");
			setValue("address", "");
			setIsAddress(true);
		}
	};

	return {
		addressBoolean,
		isAddress,
		setIsAddress,
		resetAddressBoolean,
		handleNewAddress,
	};
};
