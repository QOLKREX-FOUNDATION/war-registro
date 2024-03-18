import { useEffect, useMemo, useState } from "react";
import personJson from "../../../../../../public/Json/person.json";

const lang = { locale: "es-Es" };

export const usePerson = () => {
	// const { lang } = useContext(LangContext);
	const [persons, setPersons] = useState ([]);

	const handlePersons = useMemo(() => {
		const temp = [];
		for (let i = 0; i < personJson.person.length; i++) {
			temp.push({
				label: personJson.person[i][lang.locale],
				value: personJson.person[i].value,
			});
		}

		return temp;
	}, [lang.locale]);

	useEffect(() => {
		setPersons(handlePersons);
	}, [lang.locale, handlePersons]);

	return {
		persons,
	};
};
