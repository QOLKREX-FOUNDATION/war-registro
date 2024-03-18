import { API } from "../config";
import { timeStamp } from "./date";

export const handleAuth = async (email, password, handleToken) => {
	try {
		const content = await fetch(`${API.war}users/login`, {
			body: JSON.stringify({ email, password }),
			headers: {
				"Content-Type": "application/json",
			},
			method: "POST",
		});
		const response = await content.json();
		if (response?.ok) {
			sessionStorage.setItem("auth_token", response?.token);
			sessionStorage.setItem("auth_timeOut", timeStamp() + 43200);
			sessionStorage.setItem("rol", "adopter");
			sessionStorage.setItem("idEntity", response.adopter.idRegisteringEntity);
			sessionStorage.setItem(
				"name",
				`${response.adopter.name} ${response.adopter.lastName}`
			);

			handleToken(response?.token, String(timeStamp() + 43200), "adopter");
		}
		return response?.ok;
	} catch (error) {
		console.log(error);
	}
};
