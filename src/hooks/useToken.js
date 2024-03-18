import { useState } from "react";
import Search from "../config/abi/war/Search.json";
import { CONTRACTS_WAR } from "../config";
export const useToken = () => {

    const [token, setToken] = useState(null);

    const getToken = async (web3, chip) => {
        try {
            console.log('chip', chip);
            console.log('ewb3', web3);
            const contract = new web3.network.eth.Contract(Search, CONTRACTS_WAR.Search);
            const response = await contract.methods.getSearchId(chip).call();
            console.log('token', response)
            setToken(response);
            return response;
        } catch (e) {
            console.log(e);
            setToken(null);
            return 'no se encontro';
        }
    };

    return {
        token,
        getToken,
    };

}