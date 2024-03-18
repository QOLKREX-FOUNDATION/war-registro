import { API } from "../../config";

export const handlePost = async (data, token, method) => {
	try {
		const content = await fetch(`${API.war}users/updateData`, {
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json",
				"x-token": token,
			},
			method,
		});
		const response = await content.json();
		return response;
	} catch (error) {
		console.log(error);
	}
};

export const handleRecuperate = async (data, method) => {
	try {
		const content = await fetch(`${API.war}users/resetSendEmail`, {
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json",
			},
			method,
		});
		const response = await content.json();
		return response;
	} catch (error) {
		console.log(error);
	}
};


export const handleRestore = async (data, token, method) => {
	try {
		const content = await fetch(`${API.war}users/passwordReset`, {
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json",
				"x-token": token,
			},
			method,
		});
		const response = await content.json();
		return response;
	} catch (error) {
		console.log(error);
	}
};