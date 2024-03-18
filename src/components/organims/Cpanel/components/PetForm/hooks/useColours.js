import { useEffect, useMemo, useState } from "react";
// import { LangContext } from "../../contexts/Localization/LangContext";
import coloursJson from "../../../../../../../public/Json/colours.json";

const lang = { locale: "es-Es" };


export const useColours = () => {
	// const { lang } = useContext(LangContext);
	const [colours, setColours] = useState([]);

	const handleColours = useMemo(() => {
		const temp = [];
		for (let i = 0; i < coloursJson.length; i++) {
			temp.push({
				label: coloursJson[i][lang.locale],
				value: coloursJson[i].value,
				hex:coloursJson[i].hex
			}); 
		}
		return temp;
	}, [lang.locale]);

	useEffect(() => {
		setColours(handleColours);
	}, [lang.locale, handleColours]);


	return {
		colours,
	};
};
