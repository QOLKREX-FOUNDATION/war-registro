import { useContext, useEffect, useState } from "react";
import { getUserER } from "../utils/war/UsersSystem";
import { Web3Context } from "../contexts/Web3/Web3Context";
import { getImage } from "../utils/entityRegistry";

export const useEntityRegister = () => {
    const [address, setAddress] = useState("");
    const [file, setFile] = useState("");
    const { web3 } = useContext(Web3Context);
    const handleAddress = async () => {
        const address = await getUserER(web3.wallet, web3.account)
        // console.log("address", address)
        setAddress(address)
    }

    const handleGetImage = async () => {
        try {
            // console.log(data.name, web3.authToken)
            const Imagedata = await getImage("entityRegister", address, web3.authToken)
            // console.log("image", Imagedata)
            // console.log("address", address)
            // console.log("token", web3.authToken)
            setFile(Imagedata.image || "/img/logo/q-pet-logo1.png")
        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        handleAddress()
    }, [])

    useEffect(() => {
        handleGetImage()
    }, [address])

    return {
        address,
        file,
        handleAddress,
        handleGetImage
    }
}