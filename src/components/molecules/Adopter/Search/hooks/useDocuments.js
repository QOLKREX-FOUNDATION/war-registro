import { useState } from "react";
// import documentsJson from "../../public/Json/documents.json";
// import { LangContext } from "../contexts/Localization/LangContext";
import documentsJson from "../../../../../../public/Json/documents.json";

const lang = { locale: "es-Es" };

export const useDocuments = () => {
	const [documents, setDocuments] = useState([]);
	// const { lang } = useContext(LangContext);

	const handleDocuments = (setAdopter, country, person) => {
		const temp = [];
		const documentCountry = documentsJson.documents[country];

		if (documentCountry) {
			const documentJson = documentsJson.documents[country][person];

			documentJson?.identity &&
				temp.push({
					label: documentJson.identity,
					value: documentJson.identity,
				});

			documentJson?.foreign &&
				temp.push({
					label: documentJson?.foreign,
					value: documentJson?.foreign,
				});
		} else {
			if (person == "NATURAL")
				temp.push({
					label: "C.I",
					value: "C.I",
				});
		}

		if (person == "NATURAL")
			temp.push({
				label: lang.locale == "es-Es" ? "PASAPORTE" : "PASSPORT",
				value: "PASSPORT",
			});

		setTimeout(() => {
			setDocuments(temp);
			setAdopter("document", temp[0]?.value ?? "");
		}, 100);
	};

	return {
		documents,
		handleDocuments,
	};
};
