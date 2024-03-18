import { useEffect, useState } from "react";
// import { LangContext } from "../../contexts/Localization/LangContext";
import countriesJson from "../../public/Json/countries.json";

const lang = { locale: "es-Es" };

export const useCountry = () => {
	// const { lang } = useContext(LangContext);
	const [countries, setCountries] = useState([]);

	const handleCountries = () => {
		const temp = [];
		for (let i = 0; i < countriesJson.countries.length; i++) {
			temp.push({
				label: countriesJson.countries[i][lang.locale],
				value: countriesJson.countries[i].code,
			});
		}
		return temp;
	};

	useEffect(() => {
		setCountries(handleCountries);
	}, []);

	return {
		countries,
	};
};
