import { API } from "../config";

export const getImage = async (folder, name, token) => {

    const data = new FormData();
    data.append("name", name);
    data.append("folder", folder);

    try {
        const imageRequest = await fetch(`${ API.war }files`, {
            body: data,
            headers: {
                "x-token": token,
            },
            method: "POST",
        })
        // console.log(imageRequest)
        const response = await imageRequest.json();
        return response;
    } catch (error) {
        console.log(error);
    }
}
