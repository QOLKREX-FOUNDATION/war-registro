import { Web3Storage } from "web3.storage";
import { API } from "../../config";

const client = new Web3Storage({
	token: API.ipfsToken,
	endpoint: new URL(API.ipfs),
});

export const toFileWeb3Storage = async (file, name) => {
	const files = [new File([file], `${name}`)];
	const response = await client.put(files, {
		maxRetries: 3,
		wrapWithDirectory: false,
	});

	return response;
};
